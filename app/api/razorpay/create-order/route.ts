import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { products } from '@/lib/products';

type CartItem = {
  slug: string;
  quantity: number;
  size?: string;
};

export async function POST(request: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay credentials are not configured.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const cart: CartItem[] = Array.isArray(body.cart) ? body.cart : [];

    if (!cart.length) {
      return NextResponse.json(
        { error: 'Your cart is empty.' },
        { status: 400 }
      );
    }

    let subtotal = 0;

    for (const item of cart) {
      const product = products.find((p) => p.slug === item.slug);

      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.slug}` },
          { status: 400 }
        );
      }

      const quantity = Math.max(
        1,
        Math.floor(Number(item.quantity) || 1)
      );

      subtotal += product.price * quantity;
    }

    const shipping = subtotal >= 999 ? 0 : 79;
    const total = subtotal + shipping;

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(total * 100),
      currency: 'INR',
      receipt: `YS-${Date.now()}`,
      notes: {
        source: 'YASHOVASTRA website',
      },
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
    });
  } catch (error) {
    console.error('Razorpay create order error:', error);

    return NextResponse.json(
      { error: 'Unable to create Razorpay order.' },
      { status: 500 }
    );
  }
}

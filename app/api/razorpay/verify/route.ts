import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: 'Razorpay secret is not configured.' },
        { status: 500 }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await request.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing payment verification data.',
        },
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const received = Buffer.from(razorpay_signature, 'utf8');
    const generated = Buffer.from(generatedSignature, 'utf8');

    if (
      received.length !== generated.length ||
      !crypto.timingSafeEqual(generated, received)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid payment signature.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Razorpay verification error:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Payment verification failed.',
      },
      { status: 500 }
    );
  }
}

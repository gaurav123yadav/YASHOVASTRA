'use client';

import Link from 'next/link';
import Script from 'next/script';
import { FormEvent, useEffect, useMemo, useState } from 'react';

type CartItem = {
  slug: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  image?: string;
};

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
    };
  }
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Punjab',
    pincode: '',
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('yashovastra-cart');
      setCart(saved ? JSON.parse(saved) : []);
    } catch {
      setCart([]);
    } finally {
      setLoaded(true);
    }
  }, []);

  const subtotal = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + item.price * Math.max(1, item.quantity),
        0
      ),
    [cart]
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + shipping;

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (!cart.length) {
      setError('Your cart is empty.');
      return;
    }

    if (!window.Razorpay) {
      setError('Payment system is still loading. Please try again.');
      return;
    }

    setLoading(true);

    try {
      const orderResponse = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cart: cart.map((item) => ({
            slug: item.slug,
            quantity: item.quantity,
            size: item.size,
          })),
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(
          orderData.error || 'Unable to create payment order.'
        );
      }

      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'YASHOVASTRA',
        description: 'Devotional Poshak & Shringar',
        order_id: orderData.orderId,

        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },

        notes: {
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
        },

        theme: {
          color: '#174c5b',
        },

        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyResponse = await fetch(
              '/api/razorpay/verify',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(response),
              }
            );

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.error || 'Payment verification failed.'
              );
            }

            localStorage.setItem(
              'yashovastra-last-order',
              JSON.stringify({
                orderId: verifyData.orderId,
                paymentId: verifyData.paymentId,
                customer: form,
                total,
              })
            );

            localStorage.removeItem('yashovastra-cart');

            window.location.href = `/order-success?orderId=${encodeURIComponent(
              verifyData.orderId
            )}&paymentId=${encodeURIComponent(verifyData.paymentId)}`;
          } catch (verificationError) {
            setError(
              verificationError instanceof Error
                ? verificationError.message
                : 'Payment verification failed.'
            );
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      });

      razorpay.open();
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : 'Something went wrong while starting payment.'
      );
      setLoading(false);
    }
  }

  if (!loaded) {
    return (
      <main className="checkout-page">
        <div className="checkout-loading">Loading your checkout...</div>
      </main>
    );
  }

  if (!cart.length) {
    return (
      <main className="checkout-page">
        <div className="checkout-empty">
          <p className="eyebrow">YASHOVASTRA</p>
          <h1>Your cart is empty.</h1>
          <p>Add something beautiful for your Laddu Gopal before checkout.</p>
          <Link className="btn primary" href="/shop">
            Explore the collection →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />

      <main className="checkout-page">
        <section className="checkout-hero">
          <p className="eyebrow">YASHOVASTRA • SECURE CHECKOUT</p>
          <h1>
            Complete your <em>seva.</em>
          </h1>
          <p>
            Enter your delivery details and continue securely with
            Razorpay.
          </p>
        </section>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="checkout-card">
              <div className="checkout-card-heading">
                <span>01</span>
                <div>
                  <h2>Delivery details</h2>
                  <p>Where should we deliver your order?</p>
                </div>
              </div>

              <div className="checkout-fields">
                <label>
                  Full name
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      updateField('name', e.target.value)
                    }
                    placeholder="Your full name"
                  />
                </label>

                <label>
                  Phone number
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    value={form.phone}
                    onChange={(e) =>
                      updateField(
                        'phone',
                        e.target.value.replace(/\D/g, '').slice(0, 10)
                      )
                    }
                    placeholder="10-digit mobile number"
                  />
                </label>

                <label className="field-full">
                  Email address
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateField('email', e.target.value)
                    }
                    placeholder="you@example.com"
                  />
                </label>

                <label className="field-full">
                  Full address
                  <textarea
                    required
                    rows={3}
                    value={form.address}
                    onChange={(e) =>
                      updateField('address', e.target.value)
                    }
                    placeholder="House / Flat / Street / Area"
                  />
                </label>

                <label>
                  City
                  <input
                    required
                    value={form.city}
                    onChange={(e) =>
                      updateField('city', e.target.value)
                    }
                    placeholder="City"
                  />
                </label>

                <label>
                  State
                  <input
                    required
                    value={form.state}
                    onChange={(e) =>
                      updateField('state', e.target.value)
                    }
                    placeholder="State"
                  />
                </label>

                <label>
                  Pincode
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) =>
                      updateField(
                        'pincode',
                        e.target.value.replace(/\D/g, '').slice(0, 6)
                      )
                    }
                    placeholder="6-digit pincode"
                  />
                </label>
              </div>
            </div>

            {error && (
              <div className="checkout-error" role="alert">
                {error}
              </div>
            )}

            <button
              className="checkout-pay-button"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Opening secure payment...' : `Pay ₹${total}`}
            </button>

            <p className="checkout-security">
              🔒 Secure payment powered by Razorpay
            </p>
          </form>

          <aside className="checkout-summary">
            <div className="checkout-card">
              <div className="checkout-card-heading">
                <span>02</span>
                <div>
                  <h2>Your order</h2>
                  <p>{cart.length} item(s) in your cart</p>
                </div>
              </div>

              <div className="checkout-items">
                {cart.map((item) => (
                  <div
                    className="checkout-item"
                    key={`${item.slug}-${item.size || ''}`}
                  >
                    <div>
                      <strong>{item.name}</strong>
                      {item.size && (
                        <small>Size: {item.size}</small>
                      )}
                      <small>Qty: {item.quantity}</small>
                    </div>

                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="checkout-totals">
                <div>
                  <span>Subtotal</span>
                  <strong>₹{subtotal.toLocaleString('en-IN')}</strong>
                </div>

                <div>
                  <span>Shipping</span>
                  <strong>
                    {shipping === 0
                      ? 'FREE'
                      : `₹${shipping.toLocaleString('en-IN')}`}
                  </strong>
                </div>

                <div className="checkout-grand-total">
                  <span>Total</span>
                  <strong>₹{total.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {subtotal < 999 && (
                <div className="checkout-shipping-note">
                  Add ₹{(999 - subtotal).toLocaleString('en-IN')} more
                  for free shipping.
                </div>
              )}
            </div>

            <div className="checkout-trust">
              <span>✦</span>
              <div>
                <strong>Made for your seva</strong>
                <p>Carefully packed with devotion.</p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

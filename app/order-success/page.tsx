'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId') || '';
  const paymentId = searchParams.get('paymentId') || '';

  return (
    <main className="order-success-page">
      <section className="order-success-card">
        <div className="success-symbol">✓</div>

        <p className="eyebrow">YASHOVASTRA • ORDER CONFIRMED</p>

        <h1>
          Your seva is <em>confirmed.</em>
        </h1>

        <p className="success-message">
          Thank you for shopping with YASHOVASTRA. Your payment has
          been verified successfully.
        </p>

        <div className="success-details">
          <div>
            <span>Order ID</span>
            <strong>{orderId || 'Confirmed'}</strong>
          </div>

          <div>
            <span>Payment ID</span>
            <strong>{paymentId || 'Verified'}</strong>
          </div>
        </div>

        <div className="success-note">
          <strong>Radhe Radhe 🙏</strong>
          <p>
            We will carefully prepare your order and keep your
            devotion at the heart of every package.
          </p>
        </div>

        <div className="success-actions">
          <Link className="btn primary" href="/shop">
            Continue shopping →
          </Link>

          <Link className="btn secondary" href="/">
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="order-success-page">
          <div className="order-success-card">
            <p>Loading your confirmation...</p>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

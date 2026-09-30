import type { Metadata } from 'next';
import './globals.css';
import './brand.css';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { Instagram, Facebook, Youtube, MessageCircle, ShieldCheck, PackageCheck, Truck, Headphones } from 'lucide-react';

export const metadata: Metadata = {
  title: 'YASHOVASTRA — Laddu Gopal Poshak & Shringar',
  description: 'Laddu Gopal Ji ke liye poshak, mukut, shringar aur seva essentials.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi">
      <body>
        <Header />
        {children}

        <footer className="footerV2">
          <div className="footerTrust">
            <div><ShieldCheck size={20} /><b>Secure payments</b><span>Safe checkout</span></div>
            <div><PackageCheck size={20} /><b>Careful packing</b><span>Prepared with care</span></div>
            <div><Truck size={20} /><b>Easy shipping</b><span>Across India</span></div>
            <div><Headphones size={20} /><b>Customer support</b><span>We're here to help</span></div>
          </div>

          <div className="footerMain">
            <div className="footerBrand">
              <Link className="footerLogo" href="/">YASHO<span>VASTRA</span><i>✦</i></Link>
              <p>हर श्रृंगार में प्रेम, हर सेवा में समर्पण।</p>
              <div className="footerSocial">
                <a href="#" aria-label="Instagram"><Instagram size={17} /></a>
                <a href="#" aria-label="Facebook"><Facebook size={17} /></a>
                <a href="#" aria-label="YouTube"><Youtube size={17} /></a>
                <a href="#" aria-label="WhatsApp"><MessageCircle size={17} /></a>
              </div>
            </div>

            <div className="footerCol">
              <h3>Shop</h3>
              <Link href="/shop">Shop All</Link>
              <Link href="/shop?cat=poshak">Poshak</Link>
              <Link href="/shop?cat=shringar">Mukut & Shringar</Link>
              <Link href="/shop?cat=seva">Seva Essentials</Link>
              <Link href="/size-guide">Size Guide</Link>
            </div>

            <div className="footerCol">
              <h3>Help</h3>
              <Link href="/help">Help Center</Link>
              <Link href="/contact">Contact Us</Link>
              <Link href="/help">Track Order</Link>
              <Link href="/help">FAQs</Link>
            </div>

            <div className="footerCol">
              <h3>Information</h3>
              <Link href="/about">About Us</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms">Terms & Conditions</Link>
              <Link href="/shipping-policy">Shipping Policy</Link>
              <Link href="/return-refund-policy">Returns & Refunds</Link>
              <Link href="/cancellation-policy">Cancellation Policy</Link>
              <Link href="/care-instructions">Care Instructions</Link>
            </div>
          </div>

          <div className="footerBottom">
            <span>© 2026 YASHOVASTRA. All rights reserved.</span>
            <span>Made with devotion for Laddu Gopal Ji.</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

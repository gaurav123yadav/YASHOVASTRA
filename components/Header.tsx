'use client';

import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, ChevronRight, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';

    const syncCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem('yashovastra-cart') || '[]');
        setCartCount(
          Array.isArray(cart)
            ? cart.reduce((sum: number, item: { quantity?: number }) => sum + Math.max(1, Number(item.quantity) || 1), 0)
            : 0
        );
      } catch {
        setCartCount(0);
      }
    };

    syncCart();
    window.addEventListener('storage', syncCart);
    window.addEventListener('yashovastra-cart-updated', syncCart);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('storage', syncCart);
      window.removeEventListener('yashovastra-cart-updated', syncCart);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="announcement">
        <div className="announcementInner">
          <span>FREE SHIPPING ON ₹999+ ORDERS</span>
          <span className="announcementDot">•</span>
          <Link href="/shop">SHOP NOW <ChevronRight size={13} /></Link>
        </div>
      </div>

      <header className="siteHeader">
        <Link className="logo" href="/" onClick={closeMenu}>YASHO<span>VASTRA</span><i>✦</i></Link>
        <nav className="desktopNav">
          <Link href="/shop">Shop</Link>
          <Link href="/shop?cat=poshak">Poshak</Link>
          <Link href="/shop?cat=shringar">Shringar</Link>
          <Link href="/shop?cat=seva">Seva</Link>
          <Link href="/size-guide">Size Guide</Link>
        </nav>
        <div className="actions">
          <Link href="/shop" className="iconBtn" aria-label="Search"><Search size={19} strokeWidth={1.7} /></Link>
          <Link href="/about" className="iconBtn desktopOnly" aria-label="Our story"><Heart size={18} strokeWidth={1.7} /></Link>
          <Link href="/cart" className="iconBtn cartBtn" aria-label="Cart">
            <ShoppingBag size={19} strokeWidth={1.7} />
            {cartCount > 0 && <span className="cartBadge">{cartCount > 99 ? '99+' : cartCount}</span>}
          </Link>
          <button onClick={() => setOpen(true)} className="mobileBtn" aria-label="Open menu"><Menu size={22} /></button>
        </div>
      </header>

      <div className={`mobileBackdrop ${open ? 'show' : ''}`} onClick={closeMenu} aria-hidden="true" />
      <aside className={`mobileDrawer ${open ? 'open' : ''}`}>
        <div className="mobileDrawerTop">
          <Link className="logo" href="/" onClick={closeMenu}>YASHO<span>VASTRA</span><i>✦</i></Link>
          <button onClick={closeMenu} className="drawerClose" aria-label="Close menu"><X size={22} /></button>
        </div>
        <div className="mobileDrawerIntro"><span>ॐ</span><div><b>YASHOVASTRA</b><small>Laddu Gopal seva collection</small></div></div>
        <nav className="mobileNav">
          {[
            ['/shop', 'Shop All'],
            ['/shop?cat=poshak', 'Poshak'],
            ['/shop?cat=shringar', 'Mukut & Shringar'],
            ['/shop?cat=seva', 'Seva Essentials'],
            ['/size-guide', 'Size Guide'],
            ['/about', 'Our Story'],
            ['/help', 'Help & Support'],
          ].map(([href, label]) => (
            <Link href={href} onClick={closeMenu} key={href}><span>{label}</span><ChevronRight size={16} /></Link>
          ))}
        </nav>
        <div className="mobileDrawerFooter"><span>हर श्रृंगार में प्रेम</span><span>•</span><span>हर सेवा में समर्पण</span></div>
      </aside>
    </>
  );
}

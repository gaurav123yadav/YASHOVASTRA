'use client';

import Link from 'next/link';
import { Search, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <div className="announcement">
        <div className="announcementInner">
          <span className="announcementLabel">YASHOVASTRA SPECIAL</span>
          <span>FREE SHIPPING ON ₹999+ ORDERS</span>
          <Link href="/shop">
            SHOP NOW <ChevronRight size={13} />
          </Link>
        </div>
      </div>

      <header className="siteHeader">
        <Link className="logo" href="/" onClick={closeMenu}>
          YASHO<span>VASTRA</span><i>✦</i>
        </Link>

        <nav className="desktopNav">
          <Link href="/shop">Shop All</Link>
          <Link href="/shop?cat=poshak">Poshak</Link>
          <Link href="/shop?cat=shringar">Shringar</Link>
          <Link href="/shop?cat=seva">Seva Essentials</Link>
          <Link href="/about">Our Story</Link>
        </nav>

        <div className="actions">
          <Link href="/shop" className="iconBtn" aria-label="Search">
            <Search size={20} strokeWidth={1.7} />
          </Link>

          <Link href="/cart" className="iconBtn cartBtn" aria-label="Cart">
            <ShoppingBag size={20} strokeWidth={1.7} />
          </Link>

          <button
            onClick={() => setOpen(true)}
            className="mobileBtn"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={23} strokeWidth={1.8} />
          </button>
        </div>
      </header>

      <div
        className={`mobileBackdrop ${open ? 'show' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <aside className={`mobileDrawer ${open ? 'open' : ''}`} aria-hidden={!open}>
        <div className="mobileDrawerTop">
          <Link className="logo" href="/" onClick={closeMenu}>
            YASHO<span>VASTRA</span><i>✦</i>
          </Link>

          <button onClick={closeMenu} className="drawerClose" aria-label="Close menu">
            <X size={23} />
          </button>
        </div>

        <div className="mobileDrawerIntro">
          <span>ॐ</span>
          <div>
            <b>Radhe Radhe</b>
            <small>Explore our seva collection</small>
          </div>
        </div>

        <nav className="mobileNav">
          <Link href="/shop" onClick={closeMenu}>
            <span>Shop All</span><ChevronRight size={17} />
          </Link>
          <Link href="/shop?cat=poshak" onClick={closeMenu}>
            <span>Poshak</span><ChevronRight size={17} />
          </Link>
          <Link href="/shop?cat=shringar" onClick={closeMenu}>
            <span>Shringar</span><ChevronRight size={17} />
          </Link>
          <Link href="/shop?cat=seva" onClick={closeMenu}>
            <span>Seva Essentials</span><ChevronRight size={17} />
          </Link>
          <Link href="/size-guide" onClick={closeMenu}>
            <span>Size Guide</span><ChevronRight size={17} />
          </Link>
          <Link href="/about" onClick={closeMenu}>
            <span>Our Story</span><ChevronRight size={17} />
          </Link>
          <Link href="/help" onClick={closeMenu}>
            <span>Help & Support</span><ChevronRight size={17} />
          </Link>
        </nav>

        <div className="mobileDrawerFooter">
          <span>हर श्रृंगार में प्रेम</span>
          <span>•</span>
          <span>हर सेवा में समर्पण</span>
        </div>
      </aside>
    </>
  );
}

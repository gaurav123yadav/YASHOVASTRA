 "use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  tone: string;
  qty: number;
  size?: string;
};

const FREE_SHIPPING = 999;
const SHIPPING = 79;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  const readCart = () => {
    try {
      const raw = localStorage.getItem("yashovastra-cart");
      setCart(raw ? JSON.parse(raw) : []);
    } catch {
      setCart([]);
    }
    setLoaded(true);
  };

  useEffect(() => {
    readCart();

    const sync = () => readCart();
    window.addEventListener("yashovastra-cart-updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("yashovastra-cart-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const save = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem("yashovastra-cart", JSON.stringify(next));
    window.dispatchEvent(new Event("yashovastra-cart-updated"));
  };

  const changeQty = (index: number, amount: number) => {
    const next = [...cart];
    next[index].qty = Math.max(1, next[index].qty + amount);
    save(next);
  };

  const removeItem = (index: number) => {
    save(cart.filter((_, itemIndex) => itemIndex !== index));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING;
  const total = subtotal + shipping;
  const remaining = Math.max(0, FREE_SHIPPING - subtotal);

  if (!loaded) {
    return <main className="page simple"><p>Loading your cart...</p></main>;
  }

  if (cart.length === 0) {
    return (
      <main className="cartPage">
        <div className="emptyCart">
          <div className="emptyCartIcon"><ShoppingBag size={32} /></div>
          <p className="eyebrow">YASHOVASTRA</p>
          <h1>Your cart is <em>waiting.</em></h1>
          <p>Add something beautiful for your Laddu Gopal seva.</p>
          <Link href="/shop" className="btn primary">Continue shopping →</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cartPage">
      <div className="cartHeading">
        <Link className="back" href="/shop">
          <ArrowLeft size={16} /> Continue shopping
        </Link>
        <p className="eyebrow">YASHOVASTRA CART</p>
        <h1>Your <em>seva basket.</em></h1>
        <p>{cart.reduce((sum, item) => sum + item.qty, 0)} item(s) selected for your order.</p>
      </div>

      {remaining > 0 && (
        <div className="freeShippingBar">
          Add <b>₹{remaining.toLocaleString("en-IN")}</b> more to unlock <strong>FREE SHIPPING</strong>
        </div>
      )}

      <div className="cartLayout">
        <section className="cartItems">
          {cart.map((item, index) => (
            <article className="cartItem" key={`${item.id}-${item.size || "default"}`}>
              <Link href={`/product/${item.slug}`} className={`cartThumb ${item.tone}`}>
                <span>✦</span>
              </Link>

              <div className="cartItemInfo">
                <small>YASHOVASTRA · {item.size ? `SIZE ${item.size}` : "SEVA"}</small>
                <Link href={`/product/${item.slug}`}><h3>{item.name}</h3></Link>
                <b>₹{item.price.toLocaleString("en-IN")}</b>
              </div>

              <div className="cartActions">
                <div className="qty">
                  <button onClick={() => changeQty(index, -1)}><Minus size={15} /></button>
                  <span>{item.qty}</span>
                  <button onClick={() => changeQty(index, 1)}><Plus size={15} /></button>
                </div>

                <button className="removeBtn" onClick={() => removeItem(index)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>

              <strong className="cartLineTotal">
                ₹{(item.price * item.qty).toLocaleString("en-IN")}
              </strong>
            </article>
          ))}
        </section>

        <aside className="cartSummary">
          <p className="eyebrow">ORDER SUMMARY</p>
          <h2>Almost <em>yours.</em></h2>

          <div className="summaryRow">
            <span>Subtotal</span>
            <b>₹{subtotal.toLocaleString("en-IN")}</b>
          </div>

          <div className="summaryRow">
            <span>Shipping</span>
            <b>{shipping === 0 ? "FREE" : `₹${shipping}`}</b>
          </div>

          <div className="summaryLine" />

          <div className="summaryRow total">
            <span>Total</span>
            <b>₹{total.toLocaleString("en-IN")}</b>
          </div>

          <Link href="/checkout" className="btn primary checkoutBtn">
            Proceed to checkout →
          </Link>

          <div className="secureNote">
            <ShieldCheck size={17} />
            <span>Secure checkout · Carefully packed · Easy support</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

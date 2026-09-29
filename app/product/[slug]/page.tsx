"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  ChevronDown,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/products";

type CartItem = {
  id: number;
  slug: string;
  name: string;
  price: number;
  tone: string;
  qty: number;
  size?: string;
};

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [product, setProduct] = useState<(typeof products)[number] | null>(null);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("2");
  const [liked, setLiked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    params.then(({ slug }) => {
      const found = products.find((item) => item.slug === slug);
      if (found) setProduct(found);
    });
  }, [params]);

  const related = useMemo(
    () => products.filter((item) => item.cat === product?.cat && item.id !== product?.id),
    [product]
  );

  if (!product) {
    return <main className="page simple"><p>Loading product...</p></main>;
  }

  const addToCart = (goToCart = false) => {
    const raw = localStorage.getItem("yashovastra-cart");
    const cart: CartItem[] = raw ? JSON.parse(raw) : [];

    const existing = cart.find(
      (item) => item.id === product.id && item.size === (product.sizes ? size : undefined)
    );

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        tone: product.tone,
        qty,
        size: product.sizes ? size : undefined,
      });
    }

    localStorage.setItem("yashovastra-cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("yashovastra-cart-updated"));
    setAdded(true);

    if (goToCart) {
      window.location.href = "/cart";
    }
  };

  const wishlist = () => {
    setLiked((value) => !value);
  };

  return (
    <main className="productPage">
      <div className="productTopBar">
        <Link className="back" href="/shop">
          <ArrowLeft size={16} /> Back to shop
        </Link>
        <span>Radhe Radhe · YASHOVASTRA</span>
      </div>

      <section className="productDetail">
        <div className={`detailVisual ${product.tone}`}>
          <div className="detailOrb" />
          <div className="detailPeacock">🪶</div>
          <div className="detailOm">ॐ</div>
          <div className="idol">✦</div>
          <small>YASHOVASTRA</small>
        </div>

        <div className="detailCopy">
          <p className="eyebrow">{product.cat} · YASHOVASTRA</p>
          <h1>{product.name}</h1>

          <div className="detailRating">
            <span>★★★★★</span>
            <small> Devotional favourite</small>
          </div>

          <div className="priceRow">
            <div className="price">₹{product.price.toLocaleString("en-IN")}</div>
            <span>Inclusive of applicable taxes</span>
          </div>

          <p className="detailDescription">{product.desc}</p>

          {product.sizes && (
            <div className="option">
              <div className="optionHeading">
                <b>Choose Size</b>
                <Link href="/size-guide">Size guide →</Link>
              </div>

              <div className="sizeChoices">
                {product.sizes.map((item) => (
                  <button
                    key={item}
                    className={size === item ? "selected" : ""}
                    onClick={() => setSize(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="option">
            <b>Quantity</b>
            <div className="qty">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((value) => Math.max(1, value - 1))}
              >
                <Minus size={16} />
              </button>
              <span>{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((value) => value + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="detailBtns">
            <button className="btn primary buyNow" onClick={() => addToCart(true)}>
              <ShoppingBag size={18} />
              Buy Now
            </button>

            <button
              className="btn secondary"
              onClick={() => addToCart(false)}
            >
              {added ? <Check size={18} /> : <ShoppingBag size={18} />}
              {added ? "Added to cart" : "Add to cart"}
            </button>

            <button
              className={`wish ${liked ? "active" : ""}`}
              onClick={wishlist}
              aria-label="Wishlist"
            >
              <Heart size={19} fill={liked ? "currentColor" : "none"} />
            </button>
          </div>

          <div className="promise">
            <div><Check size={15} /> Quality checked</div>
            <div><Check size={15} /> Secure packaging</div>
            <div><Check size={15} /> Easy support</div>
          </div>
        </div>
      </section>

      <section className="serviceGrid">
        <div><Truck /><b>Safe delivery</b><span>Carefully packed for your order.</span></div>
        <div><ShieldCheck /><b>Secure shopping</b><span>Your shopping experience stays protected.</span></div>
        <div><Headphones /><b>Easy support</b><span>Need help? We are here for you.</span></div>
      </section>

      <section className="productInfoSections">
        <div className="detailSection">
          <p className="eyebrow">PRODUCT DETAILS</p>
          <h2>Made for your <em>seva.</em></h2>

          <div className="specGrid">
            <div><span>Material</span><b>{product.material}</b></div>
            <div><span>Suitable for</span><b>{product.suitableFor}</b></div>
            <div><span>Package contains</span><b>{product.packageContains}</b></div>
            <div><span>Care</span><b>{product.care}</b></div>
          </div>
        </div>

        <div className="faqSection">
          <p className="eyebrow">HELP BEFORE YOU ORDER</p>

          {[ 
            ["Is this product ready to use?", "Yes. The product is designed to be used directly for Laddu Gopal seva after unpacking."],
            ["How should I choose a poshak size?", "Use our Size Guide before ordering. If you are unsure, measure your Laddu Gopal and compare the measurements."],
            ["When will my order be shipped?", "Orders are prepared carefully and shipped according to the delivery option available at checkout."],
          ].map(([question, answer], index) => (
            <div className="faqItem" key={question}>
              <button onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                <span>{question}</span>
                <ChevronDown size={17} className={openFaq === index ? "rotate" : ""} />
              </button>
              {openFaq === index && <p>{answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section className="relatedSection">
          <div className="sectionHead">
            <div>
              <p className="eyebrow">YOU MAY ALSO LIKE</p>
              <h2>Complete the <em>darshan.</em></h2>
            </div>
            <Link href="/shop">View all →</Link>
          </div>

          <div className="relatedGrid">
            {related.map((item) => (
              <Link href={`/product/${item.slug}`} className="relatedCard" key={item.id}>
                <div className={`relatedVisual ${item.tone}`}>
                  <span>{item.tag}</span>
                  <div>✦</div>
                </div>
                <small>{item.cat}</small>
                <h3>{item.name}</h3>
                <b>₹{item.price.toLocaleString("en-IN")}</b>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

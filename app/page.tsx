import Link from 'next/link';
import { ArrowRight, ChevronRight, Sparkles, Heart, ShieldCheck, Truck, Ruler, Star, Flower2 } from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

const categories = [
  { href: '/shop?cat=poshak', title: 'Poshak', sub: 'Daily & festive', symbol: '✦', tone: 'blue' },
  { href: '/shop?cat=shringar', title: 'Mukut & Shringar', sub: 'Beautiful details', symbol: '✧', tone: 'plum' },
  { href: '/shop?cat=seva', title: 'Seva Essentials', sub: 'For every darshan', symbol: '◈', tone: 'gold' },
];

const sizes = ['0', '1', '2', '3', '4'];

const reviews = [
  { name: 'Priya S.', text: 'Beautiful finish and the size guide made choosing very easy.', rating: 5 },
  { name: 'Neha K.', text: 'The poshak looked lovely and arrived carefully packed.', rating: 5 },
  { name: 'Aarav M.', text: 'Simple shopping experience and the product was as expected.', rating: 5 },
];

export default function Home() {
  return (
    <main className="home">
      <section className="heroV2">
        <div className="heroV2Glow heroV2GlowA" />
        <div className="heroV2Glow heroV2GlowB" />
        <div className="heroV2Copy revealUp">
          <span className="heroV2Kicker"><span>✦</span> LADDU GOPAL SEVA <span>✦</span></span>
          <h1>Har shringar mein <em>prem.</em><br />Har seva mein <em>samarpan.</em></h1>
          <p>Poshak, mukut aur shringar — thoughtfully chosen for your little Kanha.</p>
          <div className="heroV2Actions">
            <Link className="brandBtn brandBtnGold" href="/shop">Shop Poshak <ArrowRight size={16} /></Link>
            <Link className="brandBtn brandBtnGhost" href="/size-guide">Find My Size <Ruler size={15} /></Link>
          </div>
          <div className="heroV2Trust">
            <span><ShieldCheck size={15} /> Secure payment</span>
            <span><Truck size={15} /> India delivery</span>
          </div>
        </div>
        <div className="heroV2Visual" aria-hidden="true">
          <div className="heroOrb" />
          <div className="heroRing heroRingOne" />
          <div className="heroRing heroRingTwo" />
          <div className="heroFeather">🪶</div>
          <div className="heroFlute">────•──•──•────</div>
          <div className="heroOm">ॐ</div>
          <div className="floatingPetal petalA">✦</div>
          <div className="floatingPetal petalB">✧</div>
          <div className="floatingPetal petalC">✦</div>
        </div>
      </section>

      <section className="quickTrust">
        <div><Sparkles size={18} /><b>Thoughtfully curated</b><span>For Laddu Gopal Ji</span></div>
        <div><Ruler size={18} /><b>Easy size selection</b><span>Find the right fit</span></div>
        <div><ShieldCheck size={18} /><b>Secure checkout</b><span>Protected payments</span></div>
        <div><Truck size={18} /><b>Careful dispatch</b><span>Across India</span></div>
      </section>

      <section className="brandSection sizeFinderHome">
        <div className="sectionIntro centered">
          <span className="sectionEyebrow">FIND THE RIGHT FIT</span>
          <h2>Shop by <em>Laddu Gopal size</em></h2>
          <p>Choose a size and start with products made for that fit.</p>
        </div>
        <div className="sizeChoicesHome">
          {sizes.map((size) => (
            <Link key={size} href={`/shop?size=${size}`} className="sizeChoice">
              <strong>{size} <small>NO</small></strong>
              <span>View products</span>
              <ChevronRight size={15} />
            </Link>
          ))}
        </div>
        <Link className="sizeHelp" href="/size-guide">Not sure about the size? <b>Find it in a minute →</b></Link>
      </section>

      <section className="brandSection categoryHome">
        <div className="sectionIntro">
          <div>
            <span className="sectionEyebrow">SHOP THE COLLECTION</span>
            <h2>Made for <em>every seva.</em></h2>
          </div>
          <Link className="sectionLink" href="/shop">View all <ArrowRight size={15} /></Link>
        </div>
        <div className="categoryHomeGrid">
          {categories.map((item) => (
            <Link href={item.href} className="categoryHomeCard" key={item.title}>
              <div className={`categoryHomeArt ${item.tone}`}>
                <span>{item.symbol}</span>
              </div>
              <div className="categoryHomeInfo">
                <div><h3>{item.title}</h3><p>{item.sub}</p></div>
                <ArrowRight size={17} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="brandSection featuredHome">
        <div className="sectionIntro">
          <div>
            <span className="sectionEyebrow">YASHOVASTRA EDIT</span>
            <h2>Most <em>loved.</em></h2>
          </div>
          <Link className="sectionLink" href="/shop">Shop all <ArrowRight size={15} /></Link>
        </div>
        <div className="homeProductGrid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.id} p={product} />)}
        </div>
      </section>

      <section className="bundleHome">
        <div className="bundleArt" aria-hidden="true">
          <span>✦</span><span>✧</span><span>◈</span>
        </div>
        <div className="bundleCopy">
          <span className="sectionEyebrow">COMPLETE THE SEVA</span>
          <h2>Build a beautiful <em>darshan.</em></h2>
          <p>Pair a poshak with mukut, jewellery or aasan and create a complete look in fewer clicks.</p>
          <div className="bundlePills"><span>Poshak</span><span>+</span><span>Mukut</span><span>+</span><span>Shringar</span></div>
          <Link className="brandBtn brandBtnDark" href="/shop">Explore products <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="brandSection occasionHome">
        <div className="sectionIntro centered">
          <span className="sectionEyebrow">SPECIAL MOMENTS</span>
          <h2>Celebrate every <em>darshan.</em></h2>
        </div>
        <div className="occasionGrid">
          {[
            ['Janmashtami', 'Festive poshak & shringar', 'blue'],
            ['Daily Seva', 'Simple, beautiful essentials', 'ivory'],
            ['Special Darshan', 'Royal details for the moment', 'plum'],
          ].map(([title, sub, tone]) => (
            <Link href="/shop" className={`occasionCard ${tone}`} key={title}>
              <span>✦</span><div><h3>{title}</h3><p>{sub}</p></div><ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      <section className="whyHome">
        <div className="brandSection">
          <div className="sectionIntro centered">
            <span className="sectionEyebrow">WHY YASHOVASTRA</span>
            <h2>Simple to choose. <em>Beautiful to keep.</em></h2>
          </div>
          <div className="whyGrid">
            <div><span>01</span><ShieldCheck size={22} /><h3>Clear & secure</h3><p>Simple pricing and a secure checkout experience.</p></div>
            <div><span>02</span><Ruler size={22} /><h3>Size made easy</h3><p>A guided size experience for Laddu Gopal Ji.</p></div>
            <div><span>03</span><Heart size={22} /><h3>Curated with care</h3><p>Focused products for poshak, shringar and seva.</p></div>
            <div><span>04</span><Truck size={22} /><h3>Easy after purchase</h3><p>Order support, shipping information and tracking.</p></div>
          </div>
        </div>
      </section>

      <section className="brandSection reviewsHome">
        <div className="sectionIntro centered">
          <span className="sectionEyebrow">CUSTOMER LOVE</span>
          <h2>From our <em>bhaktas.</em></h2>
        </div>
        <div className="reviewGrid">
          {reviews.map((review) => (
            <article className="reviewCard" key={review.name}>
              <div className="reviewStars">{Array.from({ length: review.rating }).map((_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
              <p>“{review.text}”</p>
              <b>{review.name}</b><span>Verified customer</span>
            </article>
          ))}
        </div>
      </section>

      <section className="faqHome">
        <div className="brandSection faqInner">
          <div>
            <span className="sectionEyebrow">NEED HELP?</span>
            <h2>Quick answers,<br /><em>no searching.</em></h2>
            <Link className="sectionLink" href="/help">Visit Help Center <ArrowRight size={15} /></Link>
          </div>
          <div className="faqList">
            <details><summary>How do I choose the right size?</summary><p>Use our Size Guide for a simple recommendation before adding a product to your cart.</p></details>
            <details><summary>How can I track my order?</summary><p>Once order tracking is available for your order, you can follow its status from the order area.</p></details>
            <details><summary>Which payment methods are available?</summary><p>Online payments are handled through the secure Razorpay checkout flow.</p></details>
          </div>
        </div>
      </section>

      <section className="closingHome"><Flower2 size={18} /><span>हर श्रृंगार में प्रेम · हर सेवा में समर्पण</span><Flower2 size={18} /></section>
    </main>
  );
}

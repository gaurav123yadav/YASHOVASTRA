import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Sparkles,
  Heart,
  ShieldCheck,
  Truck,
  Feather,
  Flower2,
} from 'lucide-react';
import { products } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="heroGlow heroGlowOne" />
        <div className="heroGlow heroGlowTwo" />

        <div className="heroCopy">
          <div className="heroKicker">
            <span>ॐ</span>
            <span>SHRI RADHE · LADDU GOPAL SEVA</span>
            <span>ॐ</span>
          </div>

          <p className="eyebrow">THE ART OF LADDU GOPAL SEVA</p>

          <h1>
            हर श्रृंगार में <em>प्रेम</em>.
            <br />
            हर सेवा में <em>समर्पण</em>.
          </h1>

          <p className="heroText">
            Thoughtfully curated poshak, mukut, shringar & seva essentials
            for the little Kanha who makes your home feel complete.
          </p>

          <div className="heroBtns">
            <Link className="btn primary" href="/shop">
              Explore Collection <ArrowRight size={17} />
            </Link>

            <Link className="textBtn" href="/size-guide">
              Find Your Size <ChevronRight size={16} />
            </Link>
          </div>

          <div className="heroMiniTrust">
            <span><Sparkles size={14} /> Handpicked</span>
            <span><span className="dot" /> Made for seva</span>
            <span><ShieldCheck size={14} /> Quality checked</span>
          </div>
        </div>

        <div className="heroArt">
          <div className="heroMandala" />
          <div className="heroSun" />

          <div className="peacockFeather featherOne">
            <span className="featherEye">◉</span>
          </div>

          <div className="peacockFeather featherTwo">
            <span className="featherEye">◉</span>
          </div>

          <div className="flute">
            <span />
            <span />
            <span />
            <span />
          </div>

          <div className="krishnaArch">
            <div className="archHalo">श्री</div>
            <div className="archRadhe">राधे</div>
            <div className="archOm">ॐ</div>
          </div>

          <div className="heroPetal petalOne">✦</div>
          <div className="heroPetal petalTwo">✧</div>
          <div className="heroPetal petalThree">✦</div>
        </div>
      </section>

      <section className="trust">
        <div>
          <Sparkles />
          <span><b>Handpicked</b> with care</span>
        </div>
        <div>
          <Heart />
          <span><b>Made for</b> mindful seva</span>
        </div>
        <div>
          <ShieldCheck />
          <span><b>Quality checked</b> pieces</span>
        </div>
        <div>
          <Truck />
          <span><b>Safe shipping</b> across India</span>
        </div>
      </section>

      <section className="section categorySection">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">CURATED FOR DARSHAN</p>
            <h2>
              Everything Kanha needs,
              <br />
              <em>with love.</em>
            </h2>
          </div>

          <Link className="textBtn" href="/shop">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="categoryGrid">
          <Link href="/shop?cat=poshak" className="categoryCard">
            <div className="catArt blue">
              <div className="catHalo" />
              <div className="catSymbol">✦</div>
              <span>SHRINGAR</span>
            </div>
            <div className="categoryInfo">
              <div>
                <b>Poshak</b>
                <small>Daily to festive</small>
              </div>
              <ChevronRight size={18} />
            </div>
          </Link>

          <Link href="/shop?cat=shringar" className="categoryCard">
            <div className="catArt rose">
              <div className="catHalo" />
              <div className="catSymbol">✧</div>
              <span>ADORNMENT</span>
            </div>
            <div className="categoryInfo">
              <div>
                <b>Shringar</b>
                <small>Details that delight</small>
              </div>
              <ChevronRight size={18} />
            </div>
          </Link>

          <Link href="/shop?cat=seva" className="categoryCard">
            <div className="catArt gold">
              <div className="catHalo" />
              <div className="catSymbol">◈</div>
              <span>SEVA</span>
            </div>
            <div className="categoryInfo">
              <div>
                <b>Seva Essentials</b>
                <small>For every ritual</small>
              </div>
              <ChevronRight size={18} />
            </div>
          </Link>
        </div>
      </section>

      <section className="section cream featuredSection">
        <div className="sectionHead">
          <div>
            <p className="eyebrow">THE YASHOVASTRA EDIT</p>
            <h2>
              Loved by <em>bhaktas.</em>
            </h2>
          </div>

          <Link className="textBtn" href="/shop">
            Shop collection <ArrowRight size={16} />
          </Link>
        </div>

        <div className="productGrid">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      <section className="story">
        <div className="storyArt">
          <div className="storyGlow" />
          <div className="storyFeather">🪶</div>
          <div className="storyCircle">
            <span>ॐ</span>
          </div>
          <div className="storyFlute">
            <i />
            <i />
            <i />
            <i />
          </div>
        </div>

        <div className="storyCopy">
          <p className="eyebrow">OUR PHILOSOPHY</p>

          <h2>
            Not just an outfit.
            <br />
            <em>A feeling of seva.</em>
          </h2>

          <p>
            YASHOVASTRA began with one simple thought: the little details of
            Laddu Gopal seva deserve the same love with which they are offered.
          </p>

          <p>
            From festive poshak to everyday essentials, every piece is chosen
            to make your darshan feel beautiful, personal and full of warmth.
          </p>

          <Link className="btn dark" href="/about">
            Discover our story <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="sizeBanner">
        <div className="sizeDecor">
          <Feather size={42} strokeWidth={1} />
        </div>

        <div>
          <p className="eyebrow">A PERFECT FIT, EVERY TIME</p>
          <h2>
            Not sure about the <em>size?</em>
          </h2>
          <p>
            Use our simple size finder to choose the right poshak with
            confidence.
          </p>
        </div>

        <Link className="btn primary" href="/size-guide">
          Open size guide <ArrowRight size={17} />
        </Link>
      </section>

      <section className="closingNote">
        <Flower2 size={19} />
        <span>Created with devotion for every little Kanha.</span>
        <Flower2 size={19} />
      </section>
    </main>
  );
}

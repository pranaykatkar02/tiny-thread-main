// import { Banner, CategoriesSection, HomeCollectionSection } from "../components";

// const Landing = () => {
//   return (
//     <>
//       <Banner />
//       <HomeCollectionSection />
//       <CategoriesSection /> */}

//     </>);
// };
// export default Landing;

// HPI 1.6-V
import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { Image } from "./../components/Images";
import { Button } from "./../components/ButtonfromWix";
import {
  Sparkles,
  TrendingUp,
  Star,
  ArrowRight,
  Heart,
  Music,
  Camera,
  Sun,
} from "lucide-react";

// --- 1. DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES ---

const HERO_SLIDES = [
  {
    id: 1,
    title: "Dress Up Your Dreams",
    subtitle: "Magical themed outfits for your little ones",
    image:
      "https://static.wixstatic.com/media/ef77f4_35ab0a269bd548828d6d54b0bd07a229~mv2.jpeg?id=hero-1",
  },
  {
    id: 2,
    title: "Celebrate Every Moment",
    subtitle: "From festivals to photoshoots",
    image: "https://i.postimg.cc/SxBVhMQJ/image.png",
  },
  {
    id: 3,
    title: "Imagination Comes Alive",
    subtitle: "Unique costumes for special occasions",
    image:
      "https://static.wixstatic.com/media/ef77f4_1a931770f4734b52bb72e0290f53e8e5~mv2.jpeg?id=hero-3",
  },
];

const CATEGORIES = [
  {
    title: "Seasonal Favorites",
    description: "Perfect for the current season",
    icon: Sparkles,
    color: "bg-light-yellow",
    accent: "text-yellow-600",
    colSpan: "md:col-span-2",
  },
  {
    title: "Trending Now",
    description: "Most popular this month",
    icon: TrendingUp,
    color: "bg-light-blue",
    accent: "text-blue-600",
    colSpan: "md:col-span-1",
  },
  {
    title: "Best Sellers",
    description: "Customer favorites",
    icon: Star,
    color: "bg-light-green",
    accent: "text-green-600",
    colSpan: "md:col-span-3",
  },
];

const GALLERY_ITEMS = [
  {
    img: "https://static.wixstatic.com/media/ef77f4_35ab0a269bd548828d6d54b0bd07a229~mv2.jpeg?id=gal-1",
    alt: "Gingerbread costume",
    rotate: "-2deg",
  },
  {
    img: "https://i.postimg.cc/SxBVhMQJ/image.png",
    alt: "Festival outfit",
    rotate: "3deg",
  },
  {
    img: "https://static.wixstatic.com/media/ef77f4_0bb4cd07c5ce45e384422fc1cf26118b~mv2.jpeg?id=gal-3",
    alt: "Christmas themed",
    rotate: "-1deg",
  },
  {
    img: "https://static.wixstatic.com/media/ef77f4_1a931770f4734b52bb72e0290f53e8e5~mv2.jpeg?id=gal-4",
    alt: "Pilot costume",
    rotate: "2deg",
  },
];

// --- 2. UTILITY COMPONENTS (MANDATORY & SAFE) ---

type AnimatedElementProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const AnimatedElement: React.FC<AnimatedElementProps> = ({
  children,
  className,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            element.classList.add("is-visible");
          }, delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

// --- 3. CUSTOM STYLES FOR UNIQUE SHAPES ---

const CustomStyles = () => (
  <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Montserrat:ital,wght@0,400;0,700;1,400&display=swap');

    /* make .font-heading use the Pacifico script (Pick Your Theme / headings) */
    .font-heading {
      font-family: 'Pacifico', cursive !important;
      color: #ff4da6;
      text-shadow: 0 6px 14px rgba(255,77,166,0.12);
      line-height: 1;
    }

    .is-visible {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    /* hero background gradient + explicit bg color */
    .hero-bg {
      background: linear-gradient(120deg, #fff5f9 0%, #ffeef6 40%, #fff6fb 100%);
      background-color: rgb(253 226 243 / var(--tw-bg-opacity, 1)) !important;
    }

    /* headline script look */
    .hero-title {
      font-family: 'Pacifico', cursive;
      color: #ff4da6;
      text-shadow: 0 10px 30px rgba(255,77,166,0.18);
      line-height: 0.88;
      letter-spacing: -0.02em;
    }

    /* small pill badge above headline */
    .hero-badge {
      display: inline-block;
      background: rgba(255,255,255,0.85);
      color: #ff4da6;
      font-family: 'Montserrat', sans-serif;
      font-weight: 700;
      border-radius: 999px;
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.12em;
      padding: 0.5rem 0.9rem;
    }

    /* category title uses script font like the design */
    .category-title {
      font-family: 'Pacifico', cursive;
      text-shadow: 0 6px 12px rgba(0,0,0,0.04);
      line-height: 1;
    }

    /* pastel background helpers for category cards */
    .bg-light-yellow {
      background: linear-gradient(180deg, #fffbea 0%, #fff3cc 60%, #fff1d6 100%);
      background-size: cover;
    }
    .bg-light-blue {
      background: linear-gradient(180deg, #f0f8ff 0%, #e6f2ff 60%, #eaf6ff 100%);
      background-size: cover;
    }
    .bg-light-green {
      background: linear-gradient(180deg, #f3fff6 0%, #e6ffeb 60%, #e9ffef 100%);
      background-size: cover;
    }

    /* accent overlays and card polish */
    .category-card-hover {
      transition: transform .38s cubic-bezier(.2,.9,.2,1), box-shadow .38s;
    }
    .category-card-hover:hover {
      transform: translateY(-8px);
      box-shadow: 0 30px 60px rgba(18,18,18,0.08);
    }

    /* soft inner highlight for cards */
    .category-glow {
      position: absolute;
      inset: -10%;
      border-radius: inherit;
      background: radial-gradient(circle at 85% 15%, rgba(255,255,255,0.35), transparent 30%);
      mix-blend-mode: overlay;
      pointer-events: none;
      transition: transform .45s ease, opacity .45s ease;
      opacity: 0.9;
    }

    /* subtitle under the headline */
    .hero-subtitle {
      font-family: 'Montserrat', system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
      color: rgba(17,24,39,0.65);
      font-weight: 500;
      font-size: 1.375rem;
      line-height: 1.5;
      max-width: 44rem;
    }

    /* image card styling used on wrapper divs */
    .image-card {
      border-radius: 2.5rem;
      box-shadow: 0 30px 60px rgba(18,18,18,0.12), 0 8px 20px rgba(18,18,18,0.06);
      overflow: hidden;
      border: 8px solid white;
    }

    .texture-grain { /* existing rule kept */ }
    .text-stroke-white { -webkit-text-stroke: 2px white; }

    /* praise / testimonial mini-card (Pure Joy!) */
    .praise-card {
      background: #fff;
      padding: 0.9rem 1rem;
      border-radius: 1.25rem;
      box-shadow: 0 18px 40px rgba(18,18,18,0.14), 0 6px 18px rgba(18,18,18,0.06);
      border: 6px solid #fff;
      max-width: 220px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .praise-quote {
      font-family: 'Pacifico', cursive;
      color: #ff4da6;
      font-size: 1.35rem;
      margin: 0;
      line-height: 1;
      text-align: center;
      text-shadow: 0 6px 20px rgba(255,77,166,0.12);
    }

    .praise-stars { display:flex; gap:6px; margin-top:6px; }
    .praise-stars svg { color: #facc15; width:18px; height:18px; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08)); }
  `}</style>
);

// ...existing code...

// --- 4. SUB-COMPONENTS FOR LAYOUT ---

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 10]);

  return (
    <section className="relative w-full min-h-[110vh] hero-bg overflow-hidden flex items-center justify-center pt-20 pb-32">
      <div className="absolute inset-0 texture-grain pointer-events-none z-10" />

      {/* Decorative Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-light-yellow rounded-full blur-3xl opacity-60 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-light-blue rounded-full blur-3xl opacity-60" />

      <div className="relative z-20 w-full max-w-[120rem] mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-5 text-center lg:text-left relative">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <div className="inline-block bg-white/80 backdrop-blur-sm px-6 py-2 rounded-full mb-6 border border-primary/20 shadow-sm">
              <span className="hero-badge">New Collection 2026</span>
            </div>
            <h1 className="text-7xl md:text-8xl xl:text-9xl font-heading hero-title mb-8 drop-shadow-sm">
              {HERO_SLIDES[0].title}
            </h1>
            <p className="hero-subtitle mb-10 mx-auto lg:mx-0">
              {HERO_SLIDES[0].subtitle}. Step into a world where every outfit
              tells a story and every day is an adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/store">
                <Button
                  size="lg"
                  className="bg-pink-400 text-white hover:bg-primary/90 text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                >
                  Shop The Magic <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/store?category=seasonal">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-white/60 text-pink-600 border-2 border-pink-300 hover:bg-pink-500 hover:text-white text-lg px-10 py-7 rounded-full backdrop-blur-sm shadow-lg transition-all hover:scale-105"
                >
                  View Lookbook
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Collage Hero Image */}
        <div className="lg:col-span-7 relative h-[60vh] lg:h-[80vh] w-full">
          {/* Main Image */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-10 right-10 w-[70%] h-[80%] z-20"
          >
            <div className="relative w-full h-full rounded-[3rem] image-card rotate-[-3deg]">
              <Image
                src={HERO_SLIDES[0].image}
                alt="Hero Main"
                className="w-full h-full object-cover"
                width={1000}
              />
            </div>
          </motion.div>

          {/* Secondary Image (Floating) */}
          <motion.div
            style={{ y: y2, rotate }}
            className="absolute bottom-20 left-0 w-[45%] h-[50%] z-30"
          >
            <div className="relative w-full h-full rounded-[2rem] image-card rotate-[6deg]">
              <Image
                src={HERO_SLIDES[1].image}
                alt="Hero Secondary"
                className="w-full h-full object-cover"
                width={600}
              />
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 text-light-yellow z-10 opacity-80"
          >
            <Sun className="w-32 h-32" />
          </motion.div>

          <div className="absolute bottom-10 right-20 z-40 rotate-[-6deg]">
            <div className="praise-card">
              <p className="praise-quote">Pure Joy!</p>
              <div className="praise-stars" aria-hidden>
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BentoCategories = () => {
  return (
    <section className="w-full py-24 bg-white relative">
      <div className="max-w-[120rem] mx-auto px-4">
        <AnimatedElement className="text-center mb-16">
          <h2 className="text-6xl md:text-7xl font-heading text-primary mb-6">
            Pick Your Theme
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Explore our curated collections designed to spark joy and creativity
            in every little heart.
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <AnimatedElement
                key={index}
                delay={index * 100}
                className={`relative group overflow-hidden rounded-[2.5rem] ${category.colSpan} ${category.color} transition-all duration-500 hover:shadow-2xl category-card-hover`}
              >
                {/* soft inner glow */}
                <div className="category-glow" />

                <Link
                  to="/store"
                  className="block w-full h-full p-8 md:p-10 flex flex-col justify-between relative z-10"
                >
                  <div className="flex justify-between items-start">
                    <div
                      className={`p-3 md:p-4 bg-white rounded-2xl shadow-md flex items-center justify-center`}
                      aria-hidden
                    >
                      <Icon className={`w-7 h-7 ${category.accent}`} />
                    </div>

                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className={`w-6 h-6 ${category.accent}`} />
                    </div>
                  </div>

                  <div>
                    <h3
                      className={`category-title text-3xl md:text-4xl mb-3 ${category.accent}`}
                    >
                      {category.title}
                    </h3>
                    <p className="text-lg text-foreground/70 font-medium">
                      {category.description}
                    </p>
                  </div>
                </Link>

                {/* Decorative Background Pattern */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 ease-out" />
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const StickyStorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 texture-grain opacity-20 pointer-events-none" />

        <div className="max-w-[120rem] mx-auto px-4 w-full mb-12 z-20">
          <h2 className="text-6xl md:text-8xl font-heading text-primary text-center drop-shadow-md">
            Our Storybook
          </h2>
        </div>

        <div className="relative w-full h-[60vh] flex items-center">
          <motion.div style={{ x }} className="flex gap-12 px-[10vw] w-max">
            {/* Card 1 */}
            <div className="w-[80vw] md:w-[40vw] h-[50vh] bg-white rounded-[3rem] p-4 shadow-xl rotate-[-2deg] flex flex-col md:flex-row overflow-hidden border-4 border-white">
              <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden">
                <Image
                  src={HERO_SLIDES[0].image}
                  alt="Story 1"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <Camera className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-4xl font-heading text-foreground mb-4">
                  Picture Perfect
                </h3>
                <p className="text-lg text-foreground/70">
                  Every stitch is designed for comfort and style, ensuring your
                  little ones look adorable from every angle.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="w-[80vw] md:w-[40vw] h-[50vh] bg-light-yellow rounded-[3rem] p-4 shadow-xl rotate-[2deg] flex flex-col md:flex-row overflow-hidden border-4 border-white">
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center order-2 md:order-1">
                <Music className="w-10 h-10 text-yellow-600 mb-4" />
                <h3 className="text-4xl font-heading text-foreground mb-4">
                  Playful Rhythms
                </h3>
                <p className="text-lg text-foreground/70">
                  Clothes that move with them. From dancing in the living room
                  to running in the park.
                </p>
              </div>
              <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden order-1 md:order-2">
                <Image
                  src={HERO_SLIDES[1].image}
                  alt="Story 2"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
            </div>

            {/* Card 3 */}
            <div className="w-[80vw] md:w-[40vw] h-[50vh] bg-light-green rounded-[3rem] p-4 shadow-xl rotate-[-1deg] flex flex-col md:flex-row overflow-hidden border-4 border-white">
              <div className="w-full md:w-1/2 h-full rounded-[2.5rem] overflow-hidden">
                <Image
                  src={HERO_SLIDES[2].image}
                  alt="Story 3"
                  className="w-full h-full object-cover"
                  width={600}
                />
              </div>
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                <Heart className="w-10 h-10 text-green-600 mb-4" />
                <h3 className="text-4xl font-heading text-foreground mb-4">
                  Made with Love
                </h3>
                <p className="text-lg text-foreground/70">
                  Sustainable fabrics and ethical production. Because we care
                  about their future as much as you do.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-0 w-full text-center z-20">
          <p className="text-primary/60 font-heading text-2xl animate-bounce">
            Scroll to explore
          </p>
        </div>
      </div>
    </section>
  );
};

const CollageGallery = () => {
  return (
    <section className="w-full py-32 bg-white overflow-hidden">
      <div className="max-w-[120rem] mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <AnimatedElement className="max-w-2xl">
            <h2 className="text-6xl md:text-7xl font-heading text-primary mb-6">
              Captured Moments
            </h2>
            <p className="text-xl text-foreground/70">
              Real smiles, real magic. See how our community styles their
              favorite pieces.
            </p>
          </AnimatedElement>
          <AnimatedElement delay={200}>
            <Link to="/store">
              <Button
                variant="outline"
                className="mt-8 md:mt-0 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 text-lg"
              >
                View Full Gallery
              </Button>
            </Link>
          </AnimatedElement>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <AnimatedElement
              key={index}
              delay={index * 150}
              className="relative group"
            >
              <div
                className="relative bg-white p-3 shadow-lg hover:shadow-2xl transition-all duration-500 ease-out hover:z-10 hover:scale-105"
                style={{ transform: `rotate(${item.rotate})` }}
              >
                {/* Tape Effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm border border-white/50 shadow-sm rotate-[-2deg] z-20" />

                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={item.img}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    width={400}
                  />
                </div>
                <div className="pt-4 pb-2 text-center font-heading text-2xl text-foreground/80">
                  {item.alt}
                </div>
              </div>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

const NewsletterSection = () => {
  return (
    <section className="w-full py-32 bg-light-blue relative overflow-hidden">
      <div className="absolute inset-0 texture-grain opacity-30 pointer-events-none" />
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-white/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <AnimatedElement>
          <div className="bg-white rounded-[3rem] p-12 md:p-20 shadow-2xl border-8 border-white/50 backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-5xl md:text-7xl font-heading text-primary mb-6">
              Join the Magic Club
            </h2>
            <p className="text-xl text-foreground/70 mb-10 max-w-lg mx-auto">
              Subscribe to our newsletter for exclusive offers, new collection
              drops, and a daily dose of cuteness.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-lg bg-gray-50"
              />
              <Button className="bg-pink-400 text-white hover:bg-primary/90 text-lg px-10 py-7 rounded-full shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                Subscribe
              </Button>
            </div>
            <p className="mt-6 text-sm text-gray-400">
              No spam, just sparkles. Unsubscribe anytime.
            </p>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
};

// --- 5. MAIN PAGE COMPONENT ---

export default function Landing() {
  return (
    <div className="w-full min-h-screen bg-background font-paragraph selection:bg-primary/20 selection:text-primary">
      <CustomStyles />

      <HeroSection />

      <div className="relative z-10 bg-white rounded-t-[4rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] -mt-20 pt-10">
        <BentoCategories />
      </div>

      <StickyStorySection />

      <CollageGallery />

      <NewsletterSection />
    </div>
  );
}

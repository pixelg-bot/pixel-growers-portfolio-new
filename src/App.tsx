import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Globe2, Mail, MapPin, Monitor, MousePointerClick, Pause, Play, Search, Share2, Sparkles, Star, X, type LucideIcon } from 'lucide-react';


function FadeIn({ children, delay = 0, x = 0, y = 30, className = '' }: { children: ReactNode; delay?: number; x?: number; y?: number; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={{ opacity: 0, x: reduced ? 0 : x, y: reduced ? 0 : y }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true, margin: '50px', amount: 0 }} transition={{ duration: reduced ? 0 : 0.7, delay, ease: [.25, .1, .25, 1] }}>{children}</motion.div>;
}

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setCount(target);
      return;
    }

    const duration = 2200;
    let startTime: number | undefined;
    let frame = 0;
    const update = (time: number) => {
      startTime ??= time;
      const progress = Math.min((time - startTime) / duration, 1);
      setCount(Math.round(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = window.requestAnimationFrame(update);
    };

    frame = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(frame);
  }, [reduced, target]);

  return <>{count.toLocaleString()}+</>;
}

const services: { title: string; description: string; icon: LucideIcon }[] = [
  { title: 'Web Design & Development', description: 'User-friendly, responsive websites and e-commerce experiences designed to make your business stand out and turn visits into action.', icon: Monitor },
  { title: 'Search Engine Optimization', description: 'Build sustainable visibility in traditional search with technical improvements, useful content, and a clear SEO strategy.', icon: Search },
  { title: 'Generative Search Optimization', description: 'Help your brand become easier to discover and understand across emerging AI-powered search experiences.', icon: Sparkles },
  { title: 'Social Media Marketing', description: 'Create a consistent social presence with thoughtful content, community engagement, and campaigns built around your audience.', icon: Share2 },
  { title: 'PPC & Paid Advertising', description: 'Plan and optimize paid campaigns to reach the right people, make budgets work harder, and generate measurable leads.', icon: MousePointerClick },
  { title: 'Local Listing', description: 'Keep your business details accurate and visible across local search and listings where nearby customers look for you.', icon: MapPin },
  { title: 'Email Marketing', description: 'Stay connected with customers through relevant email campaigns, useful updates, and lifecycle communication.', icon: Mail },
];
const serviceTags = [
  ['UI/UX Design', 'Development', 'E-commerce'],
  ['Technical SEO', 'Content Strategy', 'Organic Growth'],
  ['AI Search', 'Brand Visibility', 'Content'],
  ['Content Creation', 'Community', 'Campaigns'],
  ['Paid Search', 'Social Ads', 'Conversion'],
  ['Google Business', 'Business Listings', 'Reputation'],
  ['Email Campaigns', 'Automation', 'Retention'],
];
const serviceImageFiles = ["web-design.webp","seo.webp","ai-search.webp","social-media.webp","paid-ads.webp","local-seo.webp","email-marketing.webp"];
function ServicePreviewArtwork({ index }: { index: number }) {
 return <img className="service-artwork service-generated-image" src={`/images/services/${serviceImageFiles[index]}`} alt={`${services[index].title} illustration`} loading="lazy" decoding="async" />;
}
function ServiceDetails({ index }: { index: number }) {
  const service = services[index];
  return <motion.article className="service-preview" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .28 }}>
    <div className="service-preview-image"><ServicePreviewArtwork index={index} /></div>
    <div className="service-preview-content"><h3>{service.title === 'Web Design & Development' ? 'Websites built to move people.' : service.title}</h3><p>{service.description}</p>
      <div className="service-tags">{serviceTags[index].map(tag => <span key={tag}>{tag}</span>)}</div>

    </div>
  </motion.article>;
}
type PortfolioPlatform = 'Shopify' | 'WordPress';
type PortfolioProject = {
  title: string;
  category: string;
  platform: PortfolioPlatform;
  previewImage: string;
  liveUrl?: string;
};
const projects: PortfolioProject[] = [
  { title: "Skin & Tan", category: "Skincare & self-tan", platform: 'Shopify', previewImage: '/images/portfolio/shopify/skin-and-tan.webp', liveUrl: 'https://www.skinandtan.co.uk/' },
  { title: "UN/DN LAQR", category: "Nail care", platform: 'Shopify', previewImage: '/images/portfolio/shopify/undn-laqr.webp', liveUrl: 'https://undnlaqr.com/' },
  { title: "ROAR Organic", category: "Beverages", platform: 'Shopify', previewImage: '/images/portfolio/shopify/roar-organic.webp', liveUrl: 'https://roarorganic.com/' },
  { title: "Swiss Arabian", category: "Fragrance", platform: 'Shopify', previewImage: '/images/portfolio/shopify/swiss-arabian.webp', liveUrl: 'https://swissarabian.com/' },
  { title: "82°E", category: "Skincare", platform: 'Shopify', previewImage: '/images/portfolio/shopify/82e.webp', liveUrl: 'https://82e.com/' },
  { title: "e·fek·tiv Beauty", category: "Haircare & bodycare", platform: 'Shopify', previewImage: '/images/portfolio/shopify/efektiv-beauty.webp', liveUrl: 'https://efektivshop.com/' },
  { title: "Dear Diary", category: "Fragrance", platform: 'Shopify', previewImage: '/images/portfolio/shopify/dear-diary.webp', liveUrl: 'https://deardiary.in/' },
  { title: "Style Rule", category: "Beauty & fragrance", platform: 'Shopify', previewImage: '/images/portfolio/shopify/style-rule.webp', liveUrl: 'https://stylerule.com/' },
  { title: "Ayurvita", category: "Ayurvedic wellness", platform: 'Shopify', previewImage: '/images/portfolio/shopify/ayurvita.webp', liveUrl: 'https://myayurvita.com/' },
  { title: "Sally Hershberger", category: "Haircare", platform: 'Shopify', previewImage: '/images/portfolio/shopify/sally-hershberger.webp', liveUrl: 'https://sally-hershberger.com/' },
  { title: "Fitqii", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/fitqii.webp', liveUrl: 'https://fitqii.com/' },
  { title: "Monkify", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/monkify.webp', liveUrl: 'https://monkify.app/' },
  { title: "Rajkunwar Pawar", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/rajkunwar-pawar.webp', liveUrl: 'https://rajkunwarpawar.com/' },
  { title: "Homekode", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/homekode.webp', liveUrl: 'https://homekode.com/' },
  { title: "Opel Home", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/opel-home.webp', liveUrl: 'https://opelhome.com/' },
  { title: "Woodan Furniture House", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/woodan-furniture-house.webp', liveUrl: 'https://woodanfurniturehouse.com/' },
  { title: "India Informatics", category: 'Website design', platform: 'WordPress', previewImage: '/images/portfolio/wordpress/india-informatics.webp', liveUrl: 'https://indiainformatics.net/' },
];

function ProjectCarousel() {
  const [platform, setPlatform] = useState<PortfolioPlatform>('Shopify');
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const visibleSlides = projects.filter(project => project.platform === platform).map(project => ({ project, image: project.previewImage, imageIndex: 0 }));
  const activeSlide = visibleSlides[activeIndex];
  const activeProject = activeSlide.project;
  const rotationPaused = Boolean(reducedMotion);

  useEffect(() => {
    if (rotationPaused || visibleSlides.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex(index => (index + 1) % visibleSlides.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [platform, rotationPaused, visibleSlides.length]);

  const selectPlatform = (nextPlatform: PortfolioPlatform) => {
    setPlatform(nextPlatform);
    setActiveIndex(0);
  };
  const moveSlide = (offset: number) => {
    setActiveIndex(index => (index + offset + visibleSlides.length) % visibleSlides.length);
  };
  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveSlide(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveSlide(-1);
    }
  };

  return <div className="portfolio-carousel" onKeyDown={handleKeyDown} aria-label={`${platform} portfolio`}>
    <div className="portfolio-tabs" role="tablist" aria-label="Filter portfolio by platform">
      {(['Shopify', 'WordPress'] as const).map(option => <button key={option} type="button" role="tab" aria-selected={platform === option} className={`portfolio-tab${platform === option ? ' is-active' : ''}`} onClick={() => selectPlatform(option)} aria-label={`Show ${option} projects`} title={option}>{option === 'Shopify' ? <svg viewBox="0 0 48 48" className="portfolio-platform-icon shopify-icon" aria-hidden="true"><path fill="#95bf47" d="M10 12 34 8l6 34-33 3z"/><path fill="#5e8e3e" d="m34 8 7 4 3 29-4 1z"/><path d="M16 14C16 1 30 0 30 11M21 13C21 3 34 2 34 10" fill="none" stroke="#95bf47" strokeWidth="2.5"/><path d="M29 19c-2-1-5-1-6 1-2 3 5 4 4 9-1 5-6 7-11 4l1-5c3 2 5 2 5 0 1-2-6-3-5-8 1-5 6-8 13-5z" fill="#fff"/></svg> : <svg viewBox="0 0 48 48" className="portfolio-platform-icon wordpress-icon" aria-hidden="true"><circle cx="24" cy="24" r="22" fill="#21759b"/><circle cx="24" cy="24" r="18.5" fill="none" stroke="white" strokeWidth="1.3"/><text x="24" y="36" fill="white" textAnchor="middle" fontFamily="Georgia, serif" fontSize="35" fontWeight="bold">W</text></svg>}</button>)}
    </div>
    <div className="portfolio-stage" role="tabpanel" aria-label={`${activeProject.title} preview ${activeSlide.imageIndex + 1}, ${activeIndex + 1} of ${visibleSlides.length}`}>
      <div className="portfolio-depth-glow" aria-hidden="true" />
      <AnimatePresence initial={false}>
        {visibleSlides.map((slide, index) => {
          let offset = index - activeIndex;
          if (offset > Math.floor(visibleSlides.length / 2)) offset -= visibleSlides.length;
          if (offset < -Math.floor(visibleSlides.length / 2)) offset += visibleSlides.length;
          if (Math.abs(offset) > 2) return null;
          const isActive = index === activeIndex;
          return <motion.button key={`${slide.project.title}-${slide.imageIndex}`} type="button" className={`portfolio-preview-card${isActive ? ' is-active' : ''}`} aria-label={`Select ${slide.project.title} preview ${slide.imageIndex + 1}`} aria-pressed={isActive} initial={false} animate={{ x: `${offset * 82}%`, scale: isActive ? 1 : Math.abs(offset) === 1 ? .76 : .58, opacity: isActive ? 1 : Math.abs(offset) === 1 ? .64 : .28, rotateY: isActive ? 0 : offset < 0 ? 24 : -24, zIndex: 10 - Math.abs(offset) }} exit={{ opacity: 0, x: '-120%' }} transition={{ duration: reducedMotion ? 0 : 1.2, ease: [.22, .68, 0, 1] }} onClick={() => setActiveIndex(index)}>
            <img decoding="async" src={slide.image} alt={`${slide.project.title} preview ${slide.imageIndex + 1}`} />
            <span className="portfolio-card-shade" aria-hidden="true" />

          </motion.button>;
        })}
      </AnimatePresence>
    </div>
    <div className="portfolio-slide-footer">

      <div className="portfolio-slide-controls" aria-label="Portfolio slides">
        <button type="button" className="portfolio-arrow" onClick={() => moveSlide(-1)} aria-label="Previous project"><ChevronLeft size={20} /></button>
        {visibleSlides.map((slide, index) => <button key={`${slide.project.title}-${slide.imageIndex}`} type="button" className={`portfolio-dot${index === activeIndex ? ' is-active' : ''}`} aria-label={`Show ${slide.project.title} preview ${slide.imageIndex + 1}`} aria-current={index === activeIndex ? 'true' : undefined} onClick={() => setActiveIndex(index)} />)}
        <span className="portfolio-slide-count">{String(activeIndex + 1).padStart(2, '0')} / {String(visibleSlides.length).padStart(2, '0')}</span>
        <button type="button" className="portfolio-arrow" onClick={() => moveSlide(1)} aria-label="Next project"><ChevronRight size={20} /></button>
      </div>
      <a className="portfolio-live-link" href={activeProject.liveUrl ?? '#contact'} target={activeProject.liveUrl ? '_blank' : undefined} rel={activeProject.liveUrl ? 'noreferrer' : undefined}>View live portfolio <ArrowUpRight size={17} /></a>
    </div>
  </div>;
}
const team = [
  { name: 'Swati Mitra', role: 'Founder & CEO', image: '/images/swati-mitra-portrait.webp' },
  { name: 'Atul Das', role: 'Managing Partner', image: '/images/atul-das.webp' },
  { name: 'Somya Sachan', role: 'Client Relationship Manager', image: '/images/somya-sachan-portrait.webp' },
  { name: 'Suraj Shrimali', role: 'Project Lead', image: '/images/suraj-shrimali-closeup.webp' },
];
const testimonials = [
  { quote: 'The team worked efficiently, made requested website updates promptly, and left me happy with the result.', highlight: 'made requested website updates promptly', name: 'Xubaojian', location: 'United States' },
  { quote: 'A reliable, skilled team that built our Shopify store and brought helpful ideas to improve it along the way.', highlight: 'built our Shopify store', name: 'River Jayden', location: 'United States' },
  { quote: 'Their digital marketing work helped improve our online visibility, website traffic, and quality of incoming leads.', highlight: 'improve our online visibility', name: 'Digital marketing client', location: 'Canada' },
  { quote: 'Responsive communication, strong skills, and reasonable pricing made the experience stand out.', highlight: 'Responsive communication', name: 'Diana Hassine', location: 'United Arab Emirates' },
  { quote: 'Knowledgeable, prompt, and a pleasure to work with. I would happily recommend the team.', highlight: 'a pleasure to work with', name: 'Tori Graham', location: 'United States' },
  { quote: 'We have worked together on many projects, and the experience has been consistently positive.', highlight: 'consistently positive', name: 'Zaiba Hussaini', location: 'United Arab Emirates' },
];
const partnerLogos = [
  { src: '/partners/google-partner.png', name: 'Google Partner' },
  { src: '/partners/klaviyo-partner.png', name: 'Klaviyo Partner' },
  { src: '/partners/meta-business-partner.png', name: 'Meta Business Partner' },
  { src: '/partners/amazon-ads-partner.png', name: 'Amazon Ads Verified Partner' },
  { src: '/partners/shopify-partner.png', name: 'Shopify Partners' },
  { src: '/partners/bing-partner.png', name: 'Bing Partner' },
  { src: '/partners/google-ads-partner.png', name: 'Google Ads' },
];
const navigation = [['Portfolio', '#projects'], ['Services', '#services'], ['About', '#about'], ['Team', '#team'], ['Reviews', '#testimonials']];
const rotatingHeroWords = ['Your Website', 'Clicks', 'Searches', 'Visits', 'Followers'];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState<string | null>(null);
  const [clientVideoStarted, setClientVideoStarted] = useState(false);
  const [clientVideoPlaying, setClientVideoPlaying] = useState(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(1);
  const [reviewRotationPaused, setReviewRotationPaused] = useState(false);
  const [reviewHovered, setReviewHovered] = useState(false);
  const [reviewFocused, setReviewFocused] = useState(false);
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const reviewTouchStartX = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const serviceButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setHeroWordIndex(index => (index + 1) % rotatingHeroWords.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion || reviewRotationPaused || clientVideoPlaying || dialog) return;
    const interval = window.setInterval(() => {
      setActiveTestimonialIndex(index => (index + 1) % testimonials.length);
    }, 3000);
    return () => window.clearInterval(interval);
  }, [activeTestimonialIndex, clientVideoPlaying, dialog, reducedMotion, reviewRotationPaused]);

  useEffect(() => {
    if (!menuOpen) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!dialog) return;
    lastFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDialog(null);
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener('keydown', key);
      lastFocus.current?.focus();
    };
  }, [dialog]);

  const contact = () => setDialog('contact');
  const closeDialog = () => setDialog(null);
  const handleServiceKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % services.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + services.length) % services.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = services.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    setActiveServiceIndex(nextIndex);
    serviceButtonRefs.current[nextIndex]?.focus();
  };
  const changeTestimonial = (offset: number) => {
    setActiveTestimonialIndex(index => (index + offset + testimonials.length) % testimonials.length);
  };
  const activeTestimonial = testimonials[activeTestimonialIndex];
  const [quoteBeforeHighlight, quoteAfterHighlight = ''] = activeTestimonial.quote.split(activeTestimonial.highlight);
  const reviewRotationIsPaused = Boolean(reducedMotion || reviewRotationPaused || clientVideoPlaying);
  const dialogReview = dialog?.startsWith('review:') ? testimonials.find(review => review.name === dialog.slice('review:'.length)) : undefined;

  return <main>
    <section className="pixel-hero relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black text-white">
      <div className="pixel-hero-background absolute inset-0 -z-10" aria-hidden="true" />
      <header className="relative z-10 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16 lg:py-7">
        <a href="#" aria-label="Pixel Growers home" className="inline-flex items-center"><img loading="eager" decoding="async" src="/branding/logo.png" alt="Pixel Growers" className="h-9 w-auto sm:h-11" /></a>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex lg:gap-12">
          {navigation.map(([label, href]) => <a key={label} href={href} className="font-inter text-sm uppercase tracking-widest text-white/80 transition hover:text-white">{label}</a>)}
        </nav>
        <a href="https://calendly.com/atul-das/free-consultation" target="_blank" rel="noreferrer" className="consultation-cta hidden items-center gap-3 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest transition hover:border-white/60 md:inline-flex">FREE CONSULTATION <ArrowUpRight size={16} /></a>
        <button type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className="space-y-1.5 md:hidden">
          <span className="block h-0.5 w-6 bg-white" /><span className="block h-0.5 w-6 bg-white" /><span className="block h-0.5 w-4 bg-white" />
        </button>
      </header>

      <div aria-hidden={!menuOpen} className={`fixed inset-0 z-50 flex flex-col bg-black/95 px-6 py-5 backdrop-blur-sm transition-all duration-500 sm:px-10 lg:px-16 lg:py-7 ${menuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div className="flex items-center justify-between">
          <a href="#" onClick={() => setMenuOpen(false)} aria-label="Pixel Growers home" className="inline-flex items-center"><img loading="eager" decoding="async" src="/branding/logo.png" alt="Pixel Growers" className="h-9 w-auto sm:h-11" /></a>
          <button ref={closeRef} type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-white"><X size={28} /></button>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center gap-5">
          {navigation.map(([label, href], i) => <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ transitionDelay: `${menuOpen ? i * 80 + 100 : 0}ms`, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)' }} className="font-podium text-4xl uppercase text-white transition-all duration-500 sm:text-5xl">{label}</a>)}
          <a href="https://calendly.com/atul-das/free-consultation" target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)} style={{ transitionDelay: `${menuOpen ? navigation.length * 80 + 100 : 0}ms`, opacity: menuOpen ? 1 : 0, transform: menuOpen ? 'translateY(0)' : 'translateY(20px)' }} className="consultation-cta mt-5 inline-flex items-center gap-3 border border-white/30 px-6 py-3 font-inter text-xs uppercase tracking-widest text-white transition-all duration-500 hover:border-white/60">FREE CONSULTATION <ArrowUpRight size={16} /></a>
        </div>
      </div>

      <div className="relative z-0 my-auto w-full px-6 py-10 sm:px-10 lg:px-16 lg:py-14">
        <div className="animate-fade-up mb-6 flex items-center gap-3 lg:mb-8">
          <Globe2 className="h-4 w-4 text-white/70" />
          <p className="font-inter text-xs font-bold uppercase tracking-[0.3em] text-white sm:text-sm">GROWTH HAPPENS.</p>
        </div>
        <div className="animate-fade-up-delay-1">
          <h1 aria-label={`Turn ${rotatingHeroWords[heroWordIndex]} Into Customers.`} className="font-podium text-[clamp(1.65rem,8vw,7rem)] uppercase leading-[0.98] tracking-tight text-white">
            <span className="block">Turn</span>
            <span className="hero-rotating-word">
              <span className="hero-rotating-sizer" aria-hidden="true">Your Website</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span className="hero-rotating-item" key={rotatingHeroWords[heroWordIndex]} aria-hidden="true" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reducedMotion ? 0 : .3 }}>
                  {rotatingHeroWords[heroWordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="block whitespace-nowrap">Into Customers.</span>
          </h1>
          <p className="animate-fade-up-delay-2 mt-5 max-w-md font-inter text-sm leading-relaxed text-white/70 sm:text-base lg:mt-7">
            Where web excellence meets creativity.<br />Digital experiences and marketing<br /><strong className="font-bold text-white">built for your next stage of growth.</strong>
          </p>
        </div>
        <div className="hero-social-proof animate-fade-up-delay-3 mt-8 lg:mt-10" aria-label="1000+ happy customers, rated five stars">
          <div className="hero-review-avatars" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <img loading="lazy" decoding="async" key={index} className="hero-review-avatar" src={`/images/customer-avatars/customer-${index + 1}.jpg`} alt="" />)}
          </div>
          <a className="hero-review-link" href="#testimonials">1000+ happy customers <ArrowUpRight size={15} /></a>
          <div className="hero-review-stars" aria-hidden="true">
            <svg className="hero-star-gradient" aria-hidden="true" focusable="false"><defs><linearGradient id="hero-star-gold" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#fff3a6" /><stop offset="45%" stopColor="#ffd34f" /><stop offset="100%" stopColor="#e79b19" /></linearGradient></defs></svg>
            {Array.from({ length: 5 }, (_, index) => <Star key={index} size={27} strokeWidth={1.5} fill="url(#hero-star-gold)" />)}
          </div>
        </div>
        <div className="hero-stats animate-fade-up-delay-4 mt-8 grid w-full grid-cols-3 gap-2 sm:mt-10 sm:flex sm:w-auto sm:flex-wrap sm:gap-12 lg:mt-14 lg:gap-16">
          {[{ value: 1000, label: 'Projects' }, { value: 15, label: 'Skilled Professionals' }, { value: 1000, label: 'Satisfied Clients' }].map(({ value, label }) => <div key={label}>
            <p className="font-inter text-[clamp(1.1rem,6vw,2.5rem)] font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"><CountUp target={value} /></p>
            <p className="mt-1 font-inter text-[clamp(0.45rem,2.15vw,0.75rem)] uppercase tracking-[0.08em] text-white/50 sm:text-xs sm:tracking-widest">{label}</p>
          </div>)}
        </div>
      </div>
    </section>

    <section className="partners-marquee" aria-label="Our platform and advertising partners">
      <div className="partners-track">
        {[0, 1].map(copy => <div className="partners-group" key={copy} aria-hidden={copy === 1}>
          {partnerLogos.map(({ src, name }) => <img loading="lazy" decoding="async" key={name} src={src} alt={copy === 0 ? name : ''} />)}
        </div>)}
      </div>
    </section>

    <section id="about" className="studio-section about-section">
      <div className="about-layout">
        <div className="about-topline">
          <FadeIn><p className="section-kicker">ABOUT PIXEL GROWERS</p><h2 className="section-title">A small team.<br />A bigger <span className="shining-word">perspective.</span></h2></FadeIn>
        </div>
        <FadeIn delay={.1}><figure className="about-visual"><img loading="lazy" decoding="async" src="/images/about-office-team.webp" alt="Office colleagues collaborating around a laptop" /><figcaption>Curious minds. Shared ambition.</figcaption></figure></FadeIn>
        <FadeIn className="about-detail" delay={.15}>
          <h3>We connect clear thinking with thoughtful design.</h3>
          <p>Pixel Growers brings strategy, design, and technology together to create digital experiences with purpose.</p>
          <p>We start by understanding your business, then shape a digital presence that feels like you and helps people take the next step.</p>
          <div className="about-disciplines" aria-label="Our disciplines"><span>Strategy</span><i /><span>Design</span><i /><span>Development</span></div>
          <button className="about-cta" type="button" onClick={contact}>Let’s get to know your business <ArrowRight size={19} /></button>
        </FadeIn>
      </div>
    </section>

    <section className="studio-section why-section">
      <div className="section-inner">
        <div className="why-layout">
          <div className="why-showcase">
            <FadeIn><p className="section-kicker"><span className="why-kicker-dot" /> WHY PIXEL GROWERS</p><h2 className="section-title">More than pixels.<br />Built for <span className="shining-word">growth.</span></h2><p className="section-intro">Strategy, creativity, and technology — working together for your business.</p></FadeIn>
            <FadeIn delay={.15}><div className="why-orbit-art" aria-hidden="true"><img loading="lazy" decoding="async" src="/images/why-pixel-growers/orbital-globe.webp" alt="" /></div></FadeIn>
          </div>
          <div className="why-reasons">
            {[
              { title: 'Purpose behind every pixel', description: 'Strategy-led decisions that connect your goals with your audience.', image: 'reason-purpose.png' },
              { title: 'Distinctive by design', description: 'A memorable digital presence that feels unmistakably yours.', image: 'reason-design.png' },
              { title: 'A partner in your growth', description: 'Clear communication, close collaboration, and care beyond launch.', image: 'reason-partner.png' },
            ].map(({ title, description, image }, index) => <FadeIn key={title} delay={index * .1}><article className="why-reason"><div className="why-reason-icon" aria-hidden="true"><img loading="lazy" decoding="async" src={`/images/why-pixel-growers/${image}`} alt="" /></div><div className="why-reason-copy"><h3>{title}</h3><p>{description}</p></div><span className="why-reason-number">0{index + 1}</span></article></FadeIn>)}
            <FadeIn delay={.3}><a className="why-cta" href="#contact">Let’s build something meaningful <ArrowRight size={20} /></a></FadeIn>
          </div>
        </div>
      </div>
    </section>

    <section id="services" className="studio-section services">
      <div className="section-inner services-inner">
        <FadeIn className="services-heading">
          <div><p className="section-kicker"><span className="why-kicker-dot" /> OUR SERVICES</p><h2 className="section-title">From first impression<br />to lasting <span className="shining-word">growth.</span></h2></div>
          <p className="services-heading-copy">Design, development, and marketing.<br />Connected by one clear purpose.</p>
        </FadeIn>
        <div className="services-explorer">
          <div className="services-list" role="group" aria-label="Choose a service">
            {services.map(({ title, icon: Icon }, index) => <div className="service-option-wrap" key={title}>
              <button ref={element => { serviceButtonRefs.current[index] = element; }} type="button" className={`service-option ${activeServiceIndex === index ? 'is-active' : ''}`} aria-pressed={activeServiceIndex === index} aria-expanded={activeServiceIndex === index} aria-controls={`service-inline-${index}`} onClick={() => setActiveServiceIndex(index)} onKeyDown={event => handleServiceKeyDown(event, index)}>
                <span className="service-option-number">0{index + 1}</span><Icon className="service-option-icon" size={22} strokeWidth={1.7} aria-hidden="true" /><span className="service-option-title">{title}</span><span className="service-option-arrow" aria-hidden="true"><ArrowUpRight size={22} /></span>
              </button>
              <div id={`service-inline-${index}`} className={`service-inline-panel ${activeServiceIndex === index ? 'is-open' : ''}`} aria-hidden={activeServiceIndex !== index}>
                {activeServiceIndex === index && <ServiceDetails index={index} />}
              </div>
            </div>)}
          </div>
          <div className="service-preview-slot">
            <AnimatePresence mode="wait" initial={false}><ServiceDetails key={activeServiceIndex} index={activeServiceIndex} /></AnimatePresence>
          </div>
        </div>
        <div className="services-footer"><p>Not sure where to start? Let’s find the right fit.</p><a href="#contact">Talk to us <ArrowUpRight size={17} /></a></div>
      </div>
    </section>

    

    

    <section id="projects" className="projects">
      <div className="section-inner portfolio-inner">
        <FadeIn><p className="section-kicker">SELECTED WORK</p><h2 className="section-title">Ideas into digital experiences.</h2><p className="section-intro">Explore selected Shopify and WordPress work. Choose a platform to browse its projects.</p></FadeIn>
        <FadeIn delay={.12}><ProjectCarousel /></FadeIn>
      </div>
    </section>

    <section id="testimonials" className="studio-section testimonials-section">
      <div className="section-inner client-stories-inner">
        <FadeIn className="client-story-heading"><div><p className="section-kicker"><span className="why-kicker-dot" /> CLIENT TESTIMONIALS</p><h2 className="section-title">Good work.<br />Even better <span className="shining-word">relationships.</span></h2></div><p className="client-story-intro">Hear directly from the people we work with.</p></FadeIn>
        <FadeIn className="client-story-content" delay={.12}>
          <div className={`client-video-frame${clientVideoStarted ? ' is-playing' : ''}`}>
            {clientVideoStarted
              ? <video className="client-feedback-video" src="/videos/client-feedback.mov" poster="/images/client-feedback-poster.jpg" controls autoPlay playsInline preload="metadata" aria-label="Client feedback from Valerio" onPlay={() => setClientVideoPlaying(true)} onPause={() => setClientVideoPlaying(false)} onEnded={() => setClientVideoPlaying(false)}>
                Your browser does not support inline video. You can <a href="/videos/client-feedback.mov">open the client feedback video</a>.
              </video>
              : <button className="client-video-poster" type="button" aria-label="Play Valerio’s client feedback video" onClick={() => setClientVideoStarted(true)}>
                <img loading="lazy" decoding="async" src="/images/client-feedback-poster.jpg" alt="" />
                <span className="client-video-badge">CLIENT VIDEO</span>
                <span className="client-video-play" aria-hidden="true"><Play size={30} fill="currentColor" /></span>
                <span className="client-video-caption"><strong>Watch Valerio’s story</strong><small>Client feedback · Portrait video</small></span>
              </button>}
          </div>
          <div className={`client-review-carousel${reviewRotationIsPaused ? ' is-paused' : ''}`}>
            <p className="section-kicker client-reviews-heading">MORE CLIENT VOICES</p>
            <div className="client-review-swipe-area" onTouchStart={event => { reviewTouchStartX.current = event.changedTouches[0]?.clientX ?? null; }} onTouchEnd={event => { const startX = reviewTouchStartX.current; const endX = event.changedTouches[0]?.clientX; if (startX !== null && endX !== undefined && Math.abs(endX - startX) > 45) changeTestimonial(endX < startX ? 1 : -1); reviewTouchStartX.current = null; }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.article key={activeTestimonial.name} className="client-review-featured" role="group" aria-roledescription="slide" aria-label={`Review ${activeTestimonialIndex + 1} of ${testimonials.length}`} aria-live={reviewRotationIsPaused ? 'polite' : 'off'} initial={reducedMotion ? false : { opacity: 0, x: 90 }} animate={{ opacity: 1, x: 0 }} exit={reducedMotion ? undefined : { opacity: 0, x: -90 }} transition={{ duration: reducedMotion ? 0 : .6 }}>
                  <span className="client-review-quote-mark" aria-hidden="true">“</span>
                  <div className="client-review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={17} fill="currentColor" aria-hidden="true" />)}</div>
                  <blockquote className="client-review-quote">{quoteBeforeHighlight}<strong>{activeTestimonial.highlight}</strong>{quoteAfterHighlight}</blockquote>
                  <div className="client-review-footer">
                    <span className="client-review-avatar" aria-hidden="true">{activeTestimonial.name.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase()}</span>
                    <span className="client-review-byline"><strong>{activeTestimonial.name}</strong><small>Client · {activeTestimonial.location}</small></span>
                  </div>
                  <button className="client-review-expand" type="button" onClick={() => setDialog(`review:${activeTestimonial.name}`)}>Read full review <ArrowRight size={17} /></button>
                </motion.article>
              </AnimatePresence>
            </div>
            <div className="client-review-controls">
              <button className="client-review-nav" type="button" aria-label="Previous review" onClick={() => changeTestimonial(-1)}><ChevronLeft size={22} /></button>
              <div className="client-review-progress" aria-label="Choose a review">
                {testimonials.map((review, index) => <button key={review.name} className={`client-review-progress-step${index === activeTestimonialIndex ? ' is-active' : ''}`} type="button" aria-label={`Show review ${index + 1}: ${review.name}`} aria-current={index === activeTestimonialIndex ? 'true' : undefined} onClick={() => setActiveTestimonialIndex(index)}><span className="client-review-progress-track"><span key={`${index}-${activeTestimonialIndex}`} className="client-review-progress-fill" /></span></button>)}
              </div>
              <span className="client-review-count">{String(activeTestimonialIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}</span>
              <button className="client-review-pause" type="button" aria-label={reviewRotationPaused ? 'Resume automatic review rotation' : 'Pause automatic review rotation'} aria-pressed={reviewRotationPaused} onClick={() => setReviewRotationPaused(paused => !paused)}>{reviewRotationPaused ? <Play size={16} fill="currentColor" /> : <Pause size={16} fill="currentColor" />}</button>
              <button className="client-review-nav" type="button" aria-label="Next review" onClick={() => changeTestimonial(1)}><ChevronRight size={22} /></button>
            </div>
            <button className="client-reviews-more" type="button" onClick={() => setDialog('reviews')}>View all reviews <ArrowRight size={17} /></button>
          </div>
        </FadeIn>
        <FadeIn className="client-story-cta" delay={.2}><strong>Have a project in mind?</strong><button type="button" onClick={contact}>Let’s talk <ArrowRight size={19} /></button></FadeIn>
      </div>
    </section>
    <section id="team" className="studio-section team-section">
      <div className="section-inner"><FadeIn className="team-heading"><p className="section-kicker">MEET THE PEOPLE</p><h2 className="section-title">Our team members.</h2><p className="section-intro">A close-knit crew of creative and technical minds, working together to make a difference for every client.</p></FadeIn>
        <div className="team-grid">{team.map(({ name, role, image }, index) => <FadeIn key={name} delay={index * .08}><article className="team-card"><span className="team-index">0{index + 1}</span><div className="team-portrait-wrap">{image ? <img loading="lazy" decoding="async" className="team-portrait team-photo" src={image} alt={name} /> : <div className="team-portrait team-monogram" aria-hidden="true">{name.split(' ').map(part => part[0]).join('')}</div>}</div><h3>{name}</h3><p>{role}</p><span className="team-card-accent" aria-hidden="true" /></article></FadeIn>)}</div>
      </div>
    </section>

    <section className="studio-section worldwide-section">
      <div className="worldwide-layout">
        <FadeIn>
          <p className="section-kicker"><Globe2 size={16} /> WORLDWIDE WORK</p>
          <h2 className="section-title">Good work knows no borders.</h2>
          <p className="section-intro">At Pixel Growers, our reach extends across the globe, collaborating with clients from diverse corners of the world. We work with businesses in <strong>THE UNITED STATES</strong>, <strong>CANADA</strong>, <strong>THE UNITED KINGDOM</strong>, <strong>THE UAE</strong>, <strong>INDIA</strong>, <strong>CHINA</strong>, and <strong>AUSTRALIA</strong>. Through seamless communication and a commitment to excellence, we transcend geographical barriers to deliver solutions that drive success.</p>
          <div className="country-list">{['United States', 'Canada', 'United Kingdom', 'The UAE', 'India', 'China', 'Australia'].map(country => <span key={country}><MapPin size={15} /><strong>{country}</strong></span>)}</div>
        </FadeIn>
        <div className="world-map" role="img" aria-label="Map showing Pixel Growers clients in Canada, the United States, the United Kingdom, the UAE, India, China, and Australia">
          <svg className="world-map-art" viewBox="0 0 600 360" fill="none" aria-hidden="true">
            <defs>
              <radialGradient id="map-ocean" cx="50%" cy="42%" r="75%">
                <stop offset="0%" stopColor="#244c65" />
                <stop offset="100%" stopColor="#102331" />
              </radialGradient>
              <linearGradient id="map-land" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a9bd91" />
                <stop offset="48%" stopColor="#789878" />
                <stop offset="100%" stopColor="#496f62" />
              </linearGradient>
            </defs>
            <rect width="600" height="360" rx="18" fill="url(#map-ocean)" />
            <path d="M150 0v360m150-360v360m150-360v360M0 90h600M0 180h600M0 270h600" stroke="#a8c5ce" strokeOpacity=".12" strokeWidth="1" />
            <path d="m66 75 20-18 39 5 16-13 38 8 12 18 30 7 12 22-17 14-9 25-25 4-8 24-26-5-14 19-22-11-16-25-26-5-13-20-21-4-12-20 12-25-2-20 22-15Zm84 120 21 8 14 24 20 15 7 24-10 19-13 32-14 14-13-20 1-22-11-20 3-28-15-20 20-26Zm112-160 29-12 37 8 22-4 31 13 16 23-16 12-26-5-15 20-24 4-13 22-22-4-7-20-22-1-11-18-25-6 5-22 20-10 6-16Zm99 71 25-13 29 7 27-15 42 6 22 18-7 14-23 1-12 15-23-4-14 18-24-4-10 17-22-5-7-20-20-6 3-17 17-12-3-15Zm-15 82 19-9 23 10 7 20-15 17-19-7-17-14 2-17Zm58 43 20-9 21 11 19 22-9 18-22 3-20-11-16-17 7-17Z" fill="url(#map-land)" stroke="#c2d0a5" strokeOpacity=".8" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M165 103c20-15 42-14 58-3m53-26c28-12 55-10 77 3m-176 63 29 10m148-45c27-8 51-7 74 4M169 222l18 17m-40 17 11 20m277 1 25 15" stroke="#e0d7a6" strokeOpacity=".42" strokeWidth="1" strokeDasharray="3 5" />
          </svg>
          <div className="map-pin pin-canada"><MapPin size={23} fill="currentColor" /><span>CANADA</span></div>
          <div className="map-pin pin-usa"><MapPin size={23} fill="currentColor" /><span>UNITED STATES</span></div>
          <div className="map-pin pin-uk"><MapPin size={23} fill="currentColor" /><span>UK</span></div>
          <div className="map-pin pin-uae"><MapPin size={23} fill="currentColor" /><span>UAE</span></div>
          <div className="map-pin pin-india"><MapPin size={23} fill="currentColor" /><span>INDIA</span></div>
          <div className="map-pin pin-china"><MapPin size={23} fill="currentColor" /><span>CHINA</span></div>
          <div className="map-pin pin-australia"><MapPin size={23} fill="currentColor" /><span>AUSTRALIA</span></div>
        </div>
      </div>
    </section>

    <footer id="contact"><div className="footer-brand"><img loading="eager" decoding="async" src="/branding/logo.png" alt="Pixel Growers" /><span>Digital partners for your next stage of growth.</span></div><div className="footer-contact"><a href="mailto:admin@pixelgrowers.com"><Mail size={16} />admin@pixelgrowers.com</a><address className="footer-location"><strong>Canada</strong><span>Milton, Ontario, Canada</span><a href="tel:+19059243063">+1 (905) 924-3063</a></address><address className="footer-location"><strong>India</strong><span>Jodhpur, Rajasthan, India</span><a href="tel:+918003239438">+91 (800) 323-9438</a></address><a href="https://www.pixelgrowers.com" target="_blank" rel="noreferrer">pixelgrowers.com <ArrowUpRight size={15} /></a></div><a className="back-to-top" href="#">Back to top ↑</a></footer>
    {dialog && <div className="modal-backdrop" onClick={closeDialog}><section className={`modal${dialog === 'reviews' ? ' all-reviews-modal' : ''}`} role="dialog" aria-modal="true" aria-labelledby="dialog-title" onClick={event => event.stopPropagation()}><button ref={closeRef} className="close" aria-label="Close dialog" onClick={closeDialog}><X /></button>
      {dialog === 'reviews' ? <><span className="eyebrow">CLIENT TESTIMONIALS</span><h2 id="dialog-title">All client reviews</h2><div className="all-reviews-list">{testimonials.map(review => <article className="all-review-item" key={review.name}><div className="client-review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={14} fill="currentColor" aria-hidden="true" />)}</div><p>{review.quote}</p><strong>{review.name}</strong><small>Client · {review.location}</small></article>)}</div></>
        : dialogReview ? <><span className="eyebrow">CLIENT REVIEW / {dialogReview.location.toUpperCase()}</span><h2 id="dialog-title">A note from {dialogReview.name}</h2><div className="client-review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={18} fill="currentColor" aria-hidden="true" />)}</div><blockquote className="all-review-quote">{dialogReview.quote}</blockquote><p className="all-review-attribution">{dialogReview.name} · Client, {dialogReview.location}</p></>
          : <><span className="eyebrow">{dialog === 'contact' ? 'LET’S GROW TOGETHER' : 'SELECTED WORK'}</span><h2 id="dialog-title">{dialog === 'contact' ? 'Call Pixel Growers.' : dialog}</h2>{dialog === 'contact' ? <><p>Choose a location to call. Tapping a number opens your device’s dialer.</p><div className="modal-call-options"><a href="tel:+19059243063"><strong>Canada</strong><span>+1 (905) 924-3063</span></a><a href="tel:+918003239438"><strong>India</strong><span>+91 (800) 323-9438</span></a></div><a className="modal-contact-link" href="mailto:admin@pixelgrowers.com">Or email admin@pixelgrowers.com <ArrowUpRight size={16} /></a></> : <p>Explore how thoughtful web design and digital growth strategy could support a project like this. Contact Pixel Growers to discuss your business goals.</p>}</>}
    </section></div>}
  </main>;
}

export default App;













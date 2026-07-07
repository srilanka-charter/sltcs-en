import { useState, useEffect } from "react";
import { Link } from "wouter";

// ─── SEO ─────────────────────────────────────────────────────────────────────
const PAGE_TITLE = "FAQ – Frequently Asked Questions | SLTCS Sri Lanka Car Hire with Private Driver";
const PAGE_DESC =
  "Answers to common questions about SLTCS (Sri Lanka Car Hire with Private Driver): tips, activities, payment, cancellation policy, driver introduction, and more.";

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
interface FaqItem {
  q: string;
  a: React.ReactNode;
  plainText: string; // plain text version for JSON-LD
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "What kind of service is SLTCS (Sri Lanka Car Hire with Private Driver)?",
    plainText: "SLTCS (Sri Lanka Car Hire with Private Driver) is an online ground transportation matching service operated by Sri Lanka Taxi Charter Service International Limited, a Hong Kong-registered company. It connects travellers with tourism drivers registered with the Sri Lanka Tourism Development Authority (SLTDA). The transportation contract is formed directly between the customer and the driver. SLTCS acts as an introduction and communication intermediary and does not itself provide transportation.",
    a: (
      <>
        <p>
          SLTCS (Sri Lanka Car Hire with Private Driver) is an online ground
          transportation matching service operated by Sri Lanka Taxi Charter
          Service International Limited, a Hong Kong-registered company. It
          connects travellers with tourism drivers registered with the Sri Lanka
          Tourism Development Authority (SLTDA).
        </p>
        <p className="mt-2">
          The transportation contract is formed directly between the customer
          and the driver. SLTCS acts as an introduction and communication
          intermediary and does not itself provide transportation.
        </p>
        <p className="mt-2 text-amber-700 bg-amber-50 rounded-lg px-3 py-2 text-xs">
          ※ Important: We do not handle bookings, sales, or arrangements for
          accommodation, tourist attractions, activities, railways, etc. Any
          information provided in this FAQ is for reference only. All contracts
          for such services are formed directly between the customer and the
          respective provider.
        </p>
      </>
    ),
  },
  {
    q: "How much tip should I give, and when?",
    plainText: "A guideline tip is LKR 2,000–4,000 per day (approx. USD 6–12). It is customary to hand it over at the end of each day's itinerary. Adding a word of thanks helps ensure even better service on subsequent days. Tipping is entirely optional.",
    a: (
      <>
        <p>
          A guideline tip is{" "}
          <strong>LKR 2,000–4,000 per day (approx. USD 6–12)</strong>. It is
          customary to hand it over at the end of each day's itinerary. Adding
          a word of thanks helps ensure even better service on subsequent days.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ※ Tipping is entirely optional.
        </p>
      </>
    ),
  },
  {
    q: "Can I consult in English about my itinerary or get route suggestions?",
    plainText: "Yes. If you share your desired itinerary and destinations with us, we can provide suggested travel routes and estimated travel times based on local knowledge (for reference purposes). The final itinerary decisions rest with you.",
    a: (
      <p>
        Yes. If you share your desired itinerary and destinations with us, we
        can provide{" "}
        <strong>suggested travel routes and estimated travel times</strong>{" "}
        based on local knowledge (for reference purposes). The final itinerary
        decisions rest with you.
      </p>
    ),
  },
  {
    q: "Can you arrange activities such as safaris or whale watching?",
    plainText: "If you are on the Silver Plan or above, you can request safari (jeep tours) and whale-watching arrangements through your driver (costs payable locally). For other activities such as Ayurveda, you are welcome to consult your driver after arrival, but SLTCS does not handle booking or sales on your behalf.",
    a: (
      <>
        <p>
          If you are on the <strong>Silver Plan or above</strong>, you can
          request safari (jeep tours) and whale-watching arrangements through
          your driver (costs payable locally). Please note that all bookings,
          payments, and contracts are made directly between you and the driver.
        </p>
        <p className="mt-2">
          For other activities such as Ayurveda, you are welcome to consult
          your driver after arrival, but SLTCS does not handle booking or sales
          on your behalf. If you are concerned, we recommend booking online in
          advance.
        </p>
      </>
    ),
  },
  {
    q: "Can I trust the driver's driving skills and punctuality?",
    plainText: "We select drivers based on qualifications and track record, and we share in advance the points that our guests value most—punctuality, safe driving, and cleanliness. Transportation is provided by the driver; SLTCS does not guarantee transport quality.",
    a: (
      <>
        <p>
          We select drivers based on qualifications and track record, and we
          share in advance the points that our guests value most—punctuality,
          safe driving, and cleanliness.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ※ Transportation is provided by the driver; SLTCS does not guarantee
          transport quality.
        </p>
      </>
    ),
  },
  {
    q: "Can a baby seat or child seat be provided?",
    plainText: "We can assist within available capacity (subject to stock and region). If you require one, please contact us in advance so we can make the necessary arrangements.",
    a: (
      <p>
        We can assist within available capacity (subject to stock and region).
        If you require one, please{" "}
        <strong>contact us in advance</strong> so we can make the necessary
        arrangements.
      </p>
    ),
  },
  {
    q: "Will meeting up with the driver go smoothly?",
    plainText: "We will provide the driver's contact details before your departure so you can get in touch beforehand. Should any issue arise, we also support you via email and our contact channels. We cannot guarantee the outcome of the meeting point arrangement.",
    a: (
      <>
        <p>
          We will provide the driver's contact details before your departure so
          you can get in touch beforehand. Should any issue arise, we also
          support you via email and our contact channels.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ※ We cannot guarantee the outcome of the meeting point arrangement.
        </p>
      </>
    ),
  },
  {
    q: "Can the driver provide commentary and guidance at tourist sites?",
    plainText: "In Sri Lanka there are two driver categories: a Tourist Driver who handles passenger transport, and a higher-qualified Chauffeur Guide Driver who can also provide site commentary and guidance. The Silver Plan and above are attended by a Tourist Driver or higher; the Gold Plan is attended by a Chauffeur Guide Driver. During peak season on the Silver Plan, a local guide will be arranged at certain sites at no additional charge.",
    a: (
      <>
        <p>
          In Sri Lanka there are two driver categories: a "Tourist Driver" who
          handles passenger transport, and a higher-qualified "Chauffeur Guide
          Driver" who can also provide site commentary and guidance.
        </p>
        <p className="mt-2">
          The <strong>Silver Plan and above</strong> are attended by a Tourist
          Driver or higher; the <strong>Gold Plan</strong> is attended by a
          Chauffeur Guide Driver. Silver Plan and above drivers can accompany
          you at tourist sites and provide explanations.
        </p>
        <p className="mt-2">
          However, during peak season on the Silver Plan with a Tourist Driver,
          the driver may not be able to accompany you inside Sigiriya Rock,
          Anuradhapura, or Polonnaruwa. In such cases, a local guide will be
          arranged at the site at no additional charge.
        </p>
        <p className="mt-2">
          Please note that drivers are not specialist guides. For more detailed
          commentary, we recommend arranging a professional guide yourself.
        </p>
      </>
    ),
  },
  {
    q: "What payment methods are accepted?",
    plainText: "No advance payment is required. When you meet your driver in Sri Lanka, you pay the service fee by credit card. The driver's transportation fee is paid directly to the driver in your chosen currency — half on the first day and the remaining half on the last day.",
    a: (
      <>
        <p>
          <strong>No advance payment is required.</strong> When you meet your
          driver in Sri Lanka, you pay the service fee by{" "}
          <strong>credit card</strong>. The driver's transportation fee is paid
          directly to the driver in your chosen currency —{" "}
          <strong>half on the first day</strong> and the{" "}
          <strong>remaining half on the last day</strong>.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ※ Please feel free to contact us regarding payment methods.
        </p>
      </>
    ),
  },
  {
    q: "What is included in the price, and what is not?",
    plainText: "Included: Vehicle cost (Japanese-made vehicle), driver's wages, meals, and accommodation, vehicle insurance, expressway tolls and parking fees. Not included: Tips (optional), entrance fees to tourist attractions, safari, whale watching, and other activity fees.",
    a: (
      <>
        <p className="font-semibold">Included:</p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
          <li>Vehicle cost (Japanese-made vehicle)</li>
          <li>Driver's wages, meals, and accommodation</li>
          <li>Vehicle insurance</li>
          <li>Expressway tolls and parking fees</li>
        </ul>
        <p className="font-semibold mt-3">Not included:</p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mt-1">
          <li>Tips (optional)</li>
          <li>Entrance fees to tourist attractions</li>
          <li>Safari, whale watching, and other activity fees</li>
        </ul>
        <p className="mt-3 text-xs text-gray-500">
          ※ Transportation conditions may change due to same-day itinerary
          changes, additional requests, or time overruns (to be discussed
          between you and the driver).
        </p>
      </>
    ),
  },
  {
    q: "What if I cannot book the tea train — can you arrange it?",
    plainText: "We ask that you arrange railway bookings yourself online. We recommend using 12Go.Asia for reservations. If you are unable to secure a reservation, we can still provide reference information from a transport perspective. SLTCS does not handle railway or other transport bookings or sales.",
    a: (
      <>
        <p>
          We ask that you arrange railway bookings yourself online. We
          recommend using <strong>12Go.Asia</strong> for reservations.
        </p>
        <p className="mt-2">
          If you are unable to secure a reservation, we can still provide
          reference information from a transport perspective — such as sections
          where standing is also enjoyable.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          ※ SLTCS does not handle railway or other transport bookings or sales.
        </p>
      </>
    ),
  },
  {
    q: "What happens if my itinerary or plans change at the last minute?",
    plainText: "No advance payment is required before your arrival in Sri Lanka. Up to 7 days before travel starts: No cancellation fee. Any service fee already paid will be refunded (minus actual costs such as payment processing fees). 2–6 days before travel starts: No advance payment is required before your arrival in Sri Lanka. Cancellation is accepted up to 7 days before your trip. Even after that, if your flight is cancelled due to war, weather, or other circumstances beyond your control, we will also accept your cancellation. The day before or on the day of travel: No refund for any reason.",
    a: (
      <>
        <ul className="text-sm text-white space-y-2">
          <li>
            <strong>Up to 7 days before travel starts:</strong> No cancellation
            fee. Any service fee already paid will be refunded (minus actual
            costs such as payment processing fees).
          </li>
          <li>
            <strong>2–6 days before travel starts:</strong> No advance payment
            is required before your arrival in Sri Lanka. Cancellation is
            accepted up to 7 days before your trip. Even after that, if your
            flight is cancelled due to war, weather, or other circumstances
            beyond your control, we will also accept your cancellation.
          </li>
          <li>
            <strong>The day before or on the day of travel:</strong> No refund
            for any reason.
          </li>
        </ul>
        <p className="mt-2 text-xs text-white/60">
          ※ Driver transportation fees are settled directly on-site and are
          therefore outside the scope of SLTCS refunds.
        </p>
      </>
    ),
  },
  {
    q: "Can I travel even if I arrive late at night on the first day?",
    plainText: "In principle, yes — but depending on the driver's availability, safety considerations, and road conditions, it may not always be possible. If you require a late-night transfer, please consult us in advance. We will do our best to accommodate your needs flexibly.",
    a: (
      <p>
        In principle, yes — but depending on the driver's availability, safety
        considerations, and road conditions, it may not always be possible. If
        you require a late-night transfer,{" "}
        <strong>please consult us in advance</strong>. We will do our best to
        accommodate your needs flexibly.
      </p>
    ),
  },
  {
    q: "Please tell me about the driver introduction.",
    plainText: "For the Silver Plan and above, we introduce SLTDA (Sri Lanka Tourism Development Authority)-registered tourism drivers. We will do our best to accommodate requests for English-speaking drivers, but we cannot guarantee availability due to supply conditions.",
    a: (
      <p>
        For the <strong>Silver Plan and above</strong>, we introduce SLTDA
        (Sri Lanka Tourism Development Authority)-registered tourism drivers.
        We will do our best to accommodate requests for English-speaking
        drivers, but we cannot guarantee availability due to supply conditions.
      </p>
    ),
  },
  {
    q: "Is travel insurance necessary?",
    plainText: "We strongly recommend purchasing travel insurance. While Sri Lankan law requires all vehicles to carry insurance, the coverage levels are low — even in a fatal accident, compensation amounts to roughly USD 1,000. Taking out your own travel insurance is the most reliable option.",
    a: (
      <>
        <p>
          <strong>We strongly recommend purchasing travel insurance.</strong>{" "}
          While Sri Lankan law requires all vehicles to carry insurance, the
          coverage levels are low — even in a fatal accident, compensation
          amounts to roughly USD 1,000.
        </p>
        <p className="mt-2">
          To cover medical expenses, property damage, and liability during your
          trip, taking out your own travel insurance is the most reliable
          option. Some credit cards include travel insurance as a benefit —
          please check your card's terms and conditions.
        </p>
      </>
    ),
  },
];

// ─── Accordion Item ───────────────────────────────────────────────────────────
function AccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="faq-accordion-item">
      <button
        className="faq-accordion-btn"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-q-badge">Q</span>
        <span className="faq-q-text">{item.q}</span>
        <span className={`faq-chevron${isOpen ? " open" : ""}`}>›</span>
      </button>
      {isOpen && (
        <div className="faq-accordion-body">
          <span className="faq-a-badge">A</span>
          <div className="faq-a-content">{item.a}</div>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = PAGE_TITLE;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      (meta as HTMLMetaElement).name = "description";
      document.head.appendChild(meta);
    }
    (meta as HTMLMetaElement).content = PAGE_DESC;

    // ─ Canonical ─────────────────────────────────────────────────────────────────
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.href ?? '';
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://en.srilanka-charter.com/faq";
    // ─ hreflang ──────────────────────────────────────────────────────────────────
    const hreflangData = [
      { hreflang: "en", href: "https://en.srilanka-charter.com/faq" },
      { hreflang: "fr", href: "https://fr.srilanka-charter.com/faq" },
      { hreflang: "de", href: "https://de.srilanka-charter.com/faq" },
      { hreflang: "es", href: "https://es.srilanka-charter.com/faq" },
      { hreflang: "nl", href: "https://nl.srilanka-charter.com/faq" },
      { hreflang: "ko", href: "https://ko.srilanka-charter.com/faq" },
      { hreflang: "x-default", href: "https://en.srilanka-charter.com/faq" },
    ];
    const existingHreflangs = document.querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]');
    existingHreflangs.forEach((el) => el.remove());
    const addedHreflangs: HTMLLinkElement[] = [];
    hreflangData.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.setAttribute('hreflang', hreflang);
      link.href = href;
      document.head.appendChild(link);
      addedHreflangs.push(link);
    });

    // JSON-LD: FAQPage schema for Google rich results
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.plainText,
        },
      })),
    };
    const existingScript = document.querySelector('script[data-id="faq-jsonld"]');
    if (existingScript) existingScript.remove();
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-id", "faq-jsonld");
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.querySelector('script[data-id="faq-jsonld"]')?.remove();
      addedHreflangs.forEach((el) => el.remove());
      if (canonical) canonical.href = prevCanonical;
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="faq-page">
      {/* ── Navbar ── */}
      <nav className={`sltcs-nav${scrolled ? " scrolled" : ""}`}>
        <Link href="/" className="nav-logo">
          SLTCS｜Sri Lanka Car Hire with Private Driver
        </Link>
        <ul className="nav-links">
          <li>
            <Link href="/plans">PLANS</Link>
          </li>
          <li
            className="nav-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button>MODEL ITINERARY</button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link href="/information/model-itinerary/sri-lanka-4-nights-5-days-itinerary">4 Nights / 5 Days</Link>
                <Link href="/information/model-itinerary/sri-lanka-5-nights-6-days-itinerary">5 Nights / 6 Days</Link>
                <Link href="/information/model-itinerary/sri-lanka-6-nights-7-days-itinerary">6 Nights / 7 Days</Link>
                <Link href="/information/model-itinerary/sri-lanka-5-7-days-cultural-triangle-itinerary">5 to 7 Days – Cultural Triangle</Link>
                <Link href="/information/model-itinerary/sri-lanka-10-days-2-weeks-itinerary">10 Days to 2 Weeks – Classic Plan</Link>
              </div>
            )}
          </li>
          <li>
            <Link href="/vehicles">VEHICLES</Link>
          </li>
          <li>
            <Link href="/price">PRICE</Link>
          </li>
          <li>
            <Link href="/#contact" onClick={(e) => { e.preventDefault(); window.location.href = "/#contact"; }}>CONTACT</Link>
          </li>
          <li>
            <Link href="/faq" className="active">FAQ</Link>
          </li>
        </ul>
        <button
          className="hamburger"
          aria-label="Menu"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu open">
          <Link href="/plans">Plans</Link>
          <Link href="/information/model-itinerary" onClick={() => setMobileOpen(false)}>Model Itinerary</Link>
          <Link href="/vehicles" onClick={() => setMobileOpen(false)}>Vehicles</Link>
          <Link href="/price" onClick={() => setMobileOpen(false)}>Price</Link>
          <Link href="/#contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
          <Link href="/#contact" className="btn-nav-mobile" onClick={() => setMobileOpen(false)}>
            Free Enquiry
          </Link>
        </div>
      )}

      {/* ── Hero ── */}
      <section className="faq-hero">
        <div className="faq-hero-content">
          <div className="section-eyebrow">SLTCS – SRI LANKA CAR HIRE WITH PRIVATE DRIVER</div>
          <h1>Frequently Asked Questions – Sri Lanka Car Hire with Private Driver</h1>
          <p className="faq-hero-sub">
            Frequently Asked Questions about SLTCS (Sri Lanka Car Hire with Private Driver)
          </p>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span> / </span>
            <span>FAQ</span>
          </nav>
        </div>
      </section>

      {/* ── Intro ── */}
      <section className="faq-intro">
        <div className="faq-intro-inner">
          <p>
            Below are answers to frequently asked questions from customers
            considering or using SLTCS (Sri Lanka Car Hire with Private Driver).
            If you have any further questions, please feel free to contact us.
          </p>
        </div>
      </section>

      {/* ── Table of Contents ── */}
      <section className="faq-toc-section">
        <div className="faq-toc-inner">
          <h2 className="faq-toc-title">Table of Contents</h2>
          <ol className="faq-toc-list">
            {FAQ_ITEMS.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() => {
                    setOpenIndex(i);
                    setTimeout(() => {
                      document
                        .getElementById(`faq-item-${i}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 50);
                  }}
                >
                  {item.q}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Accordion ── */}
      <section className="faq-accordion-section">
        <div className="faq-accordion-inner">
          {FAQ_ITEMS.map((item, i) => (
            <div id={`faq-item-${i}`} key={i}>
              <AccordionItem
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="faq-cta">
        <div className="faq-cta-inner">
          <p className="faq-cta-sub">If your question is not answered here</p>
          <h2 className="faq-cta-title">Feel free to contact us</h2>
          <a href="/#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); window.location.href = "/#contact"; }}>
            <span>💬</span> Free Enquiry
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="sltcs-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">
              Sri Lanka Car Hire with Private Driver
              <span className="footer-logo-sub">SLTCS</span>
            </div>
            <p className="footer-tagline">
              A fully private charter service exploring all of Sri Lanka with a
              dedicated English-speaking driver.
            </p>
          </div>
          <div className="footer-nav">
            <div className="footer-nav-col">
              <div className="footer-nav-title">Navigation</div>
              <Link href="/plans">Plans</Link>
              <Link href="/information/model-itinerary/sri-lanka-4-nights-5-days-itinerary">4 Nights / 5 Days</Link>
              <Link href="/information/model-itinerary/sri-lanka-5-nights-6-days-itinerary">5 Nights / 6 Days</Link>
              <Link href="/information/model-itinerary/sri-lanka-6-nights-7-days-itinerary">6 Nights / 7 Days</Link>
              <Link href="/information/model-itinerary">Model Itinerary</Link>
            </div>
            <div className="footer-nav-col">
              <Link href="/vehicles">Vehicles</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/#contact">Contact</Link>
            </div>
          </div>
          <div className="footer-contact">
            <div className="footer-nav-title">Contact</div>
            <a href="/#contact" className="btn-footer-cta">
              Free Enquiry
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © Sri Lanka Car Hire with Private Driver All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

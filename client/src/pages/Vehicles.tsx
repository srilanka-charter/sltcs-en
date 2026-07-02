/**
 * SLTCS – Vehicles Page (English)
 * Translated from the Japanese version at https://sltcs.srilanka-charter.com/vehicles
 * Design: Dark luxury travel aesthetic matching the main site
 */

import { useState, useEffect, useRef } from "react";

// ─── Navbar (shared style with Home) ─────────────────────────────────────────
const LANGUAGES = [
  { label: "French",   url: "https://fr.srilanka-charter.com/" },
  { label: "Spanish",  url: "https://es.srilanka-charter.com/" },
  { label: "German",   url: "https://de.srilanka-charter.com/" },
  { label: "Dutch",    url: "https://nl.srilanka-charter.com/" },
  { label: "Russian",  url: "https://ru.srilanka-charter.com/" },
  { label: "Japanese", url: "https://sltcs.srilanka-charter.com/" },
];

function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`sltcs-nav${scrolled ? " scrolled" : ""}`}>
        <a href="/" className="nav-logo">
          SLTCS｜Sri Lanka Car Hire with Private Driver
        </a>
        <ul className="nav-links">
          <li><a href="/plans">PLANS</a></li>
          <li
            className="nav-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button>MODEL ITINERARY</button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <a href="/information/model-itinerary/sri-lanka-4-nights-5-days-itinerary">4 Nights / 5 Days</a>
                <a href="/information/model-itinerary/sri-lanka-5-nights-6-days-itinerary">5 Nights / 6 Days</a>
                <a href="/information/model-itinerary/sri-lanka-6-nights-7-days-itinerary">6 Nights / 7 Days</a>
                <a href="/information/model-itinerary/sri-lanka-5-7-days-cultural-triangle-itinerary">5 to 7 Days – Cultural Triangle</a>
                <a href="/information/model-itinerary/sri-lanka-10-days-2-weeks-itinerary">10 Days to 2 Weeks – Classic Plan</a>
              </div>
            )}
          </li>
          <li><a href="/vehicles" style={{ color: "#c9a84c" }}>VEHICLES</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/price">PRICE</a></li>
          <li><a href="/#contact">CONTACT</a></li>
          <li
            className="nav-dropdown nav-lang-dropdown"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <button style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              EN
            </button>
            {langOpen && (
              <div className="nav-dropdown-menu">
                {LANGUAGES.map((lang) => (
                  <a key={lang.label} href={lang.url}>{lang.label}</a>
                ))}
              </div>
            )}
          </li>
        </ul>
        <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu open">
          <a href="/plans">Plans</a>
          <a href="/information/model-itinerary">Model Itinerary</a>
          <a href="/vehicles">Vehicles</a>
          <a href="/#faq">FAQ</a>
          <a href="/price">Price</a>
          <a href="/#contact">Contact</a>
          <a href="/#contact" className="btn-nav-mobile">Free Enquiry</a>
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.3)", paddingTop: "8px", marginTop: "4px" }}>
            <div style={{ color: "#c9a84c", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "6px", paddingLeft: "4px" }}>OTHER LANGUAGES</div>
            {LANGUAGES.map((lang) => (
              <a key={lang.label} href={lang.url}>{lang.label}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Vehicle Data ─────────────────────────────────────────────────────────────
type VehicleInfo = {
  id: string;
  name: string;
  tagline: string;
  maxPassengers: string;
  comfortablePassengers: string;
  maxLuggage: string;
  description: string;
  idealFor: string;
  features: string[];
  note?: string;
  badge?: string;
  image: string;
  images: string[];
};

const VEHICLES: VehicleInfo[] = [
  {
    id: "sedan",
    name: "Sedan",
    tagline: "Up to 3 adults",
    maxPassengers: "3 adults",
    comfortablePassengers: "2 adults + 1 child",
    maxLuggage: "2 large suitcases + 1 small suitcase",
    description:
      "The Sedan accommodates up to 3 passengers. However, the boot can hold a maximum of 2 large suitcases and 1 small suitcase, so we recommend a maximum of 2 adults and 1 child. If you are travelling as 3 adults and would like more comfort, we recommend the Van.",
    idealFor: "Couples & small groups (2–3 people)",
    features: [
      "Air conditioning",
      "Compact and easy to manoeuvre",
      "Ideal for city and short-distance travel",
      "Complimentary mineral water",
    ],
    badge: "★ Most popular vehicle",
    image: "/manus-storage/vehicle_sedan_b6b21042.png",
    images: [
      "/manus-storage/vehicle_sedan_b6b21042.png",
    ],
  },
  {
    id: "van",
    name: "Van",
    tagline: "Up to 6 adults",
    maxPassengers: "6 adults",
    comfortablePassengers: "4 adults + 2 children",
    maxLuggage: "8 large suitcases",
    description:
      "The Van accommodates up to 6 passengers. However, with a 3-seat × 2-row configuration, 6 adults may feel slightly cramped. For maximum comfort, we recommend 4 adults + 2 children. If you are travelling as a group of 5 or more adults, please consider the Big Van.",
    idealFor: "Families & group travel (4–6 people)",
    features: [
      "Air conditioning",
      "Spacious interior",
      "Ample luggage storage",
      "Complimentary mineral water",
      "Comfortable for long-distance travel",
    ],
    image: "/manus-storage/vehicle_van_70a807f8.png",
    images: [
      "/manus-storage/vehicle_van_70a807f8.png",
    ],
  },
  {
    id: "bigvan",
    name: "Big Van",
    tagline: "Up to 10 adults",
    maxPassengers: "10 adults",
    comfortablePassengers: "9 adults",
    maxLuggage: "10 large suitcases",
    description:
      "The Big Van has 9 individual seats, comfortably accommodating up to 9 adults. With the front passenger seat, a maximum of 10 passengers can be carried. For groups of 10 or more, please consider a minibus or larger vehicle.",
    idealFor: "Large groups & corporate travel (7–10 people)",
    features: [
      "Air conditioning",
      "9 individual seats",
      "Large luggage compartment",
      "Complimentary mineral water",
      "Suitable for long-distance travel",
    ],
    image: "/manus-storage/vehicle_large_van_61632670.png",
    images: [
      "/manus-storage/vehicle_large_van_61632670.png",
    ],
  },
];

// ─── Vehicle Card ─────────────────────────────────────────────────────────────
function VehicleCard({ vehicle, index }: { vehicle: VehicleInfo; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        transitionDelay: `${index * 0.1}s`,
        background: "var(--dark2, #1a1a1a)",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid rgba(201,168,76,0.12)",
        marginBottom: "48px",
      }}
    >
      {/* Tab label */}
      <div
        style={{
          background: "rgba(201,168,76,0.1)",
          borderBottom: "1px solid rgba(201,168,76,0.2)",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span
          style={{
            background: "#c9a84c",
            color: "#000",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            padding: "3px 10px",
            borderRadius: "20px",
            textTransform: "uppercase",
          }}
        >
          {vehicle.name}
        </span>
        <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem" }}>
          {vehicle.tagline}
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,1fr) minmax(0,1.4fr)",
          gap: "0",
        }}
        className="vehicle-detail-grid"
      >
        {/* Image */}
        <div
          style={{
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            order: isEven ? 0 : 1,
          }}
        >
          <img
            src={vehicle.image}
            alt={vehicle.name}
            style={{
              width: "100%",
              maxWidth: "380px",
              height: "auto",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "32px 36px", order: isEven ? 1 : 0 }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 4px",
            }}
          >
            {vehicle.name}{" "}
            <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.7em", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
              {vehicle.tagline}
            </span>
          </h2>

          {/* Specs table */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              margin: "16px 0 20px",
              fontSize: "0.85rem",
            }}
          >
            <tbody>
              {[
                { label: "Maximum capacity",             value: vehicle.maxPassengers },
                { label: "Comfortable capacity",         value: vehicle.comfortablePassengers },
                { label: "Maximum luggage",              value: vehicle.maxLuggage },
              ].map((row) => (
                <tr
                  key={row.label}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <td
                    style={{
                      padding: "9px 12px 9px 0",
                      color: "rgba(255,255,255,0.75)",
                      whiteSpace: "nowrap",
                      width: "48%",
                    }}
                  >
                    {row.label}
                  </td>
                  <td
                    style={{
                      padding: "9px 0",
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  >
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.9rem",
              lineHeight: 1.75,
              margin: "0 0 20px",
            }}
          >
            {vehicle.description}
          </p>

          {/* Ideal for */}
          <div style={{ marginBottom: "16px" }}>
            <div
              style={{
                color: "#c9a84c",
                fontSize: "0.72rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginBottom: "4px",
              }}
            >
              Recommended for
            </div>
            <div style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 600 }}>
              {vehicle.idealFor}
            </div>
          </div>

          {/* Features */}
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: "0 0 24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "6px 12px",
            }}
          >
            {vehicle.features.map((f) => (
              <li
                key={f}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "0.82rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "6px",
                }}
              >
                <span style={{ color: "#c9a84c", flexShrink: 0, marginTop: "1px" }}>✓</span>
                {f}
              </li>
            ))}
          </ul>

          {/* Badge */}
          {vehicle.badge && (
            <div
              style={{
                background: "rgba(201,168,76,0.1)",
                border: "1px solid rgba(201,168,76,0.3)",
                borderRadius: "8px",
                padding: "8px 14px",
                color: "#c9a84c",
                fontSize: "0.82rem",
                fontWeight: 600,
                marginBottom: "20px",
                display: "inline-block",
              }}
            >
              {vehicle.badge}
            </div>
          )}

          {/* CTA */}
          <div>
            <a
              href="/#contact"
              className="btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
            >
              <span>💬</span> Book This Vehicle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer (simplified) ──────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      style={{
        background: "var(--dark, #0d0d0d)",
        borderTop: "1px solid rgba(201,168,76,0.15)",
        padding: "40px 0 24px",
        marginTop: "0",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "24px",
            marginBottom: "32px",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                color: "#c9a84c",
                fontSize: "1.1rem",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              SLTCS
            </div>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.82rem", maxWidth: "280px", lineHeight: 1.6 }}>
              Sri Lanka Car Hire with Private Driver. Fully private, fully flexible.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Navigation</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Plans",           href: "/plans" },
                { label: "Model Itinerary", href: "/information/model-itinerary" },
                { label: "Vehicles",        href: "/vehicles" },
                { label: "FAQ",             href: "/#faq" },
                { label: "Price",           href: "/price" },
                { label: "Contact",         href: "/#contact" },
              ].map((item) => (
                <li key={item.label} style={{ marginBottom: "6px" }}>
                  <a href={item.href} style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.85rem", textDecoration: "none" }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "12px",
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.78rem",
          }}
        >
          <span>© 2025 SLTCS – Sri Lanka Car Hire with Private Driver. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating CTA ─────────────────────────────────────────────────────────────
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <a
      href="/#contact"
      className="floating-cta"
      style={{ display: "flex", alignItems: "center", gap: "8px" }}
    >
      <span>💬</span> Free Enquiry
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Vehicles() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Sri Lanka Car Hire Vehicles | Sedan, Van & Big Van | SLTCS";
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) { metaDesc = document.createElement("meta"); metaDesc.name = "description"; document.head.appendChild(metaDesc); }
    const prevDesc = metaDesc.content;
    metaDesc.content = "Choose your vehicle for Sri Lanka private car hire — Sedan, Van, or Big Van. All vehicles include an English-speaking driver. Flat-rate pricing from $270.";
    // ─ Canonical ─────────────────────────────────────────────────────────────────
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.href ?? '';
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = "https://en.srilanka-charter.com/vehicles";
    // ─ hreflang ──────────────────────────────────────────────────────────────────
    const hreflangData = [
      { hreflang: "en", href: "https://en.srilanka-charter.com/vehicles" },
      { hreflang: "x-default", href: "https://en.srilanka-charter.com/vehicles" },
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
    // ─ Service Structured Data ───────────────────────────────────────────────────────────────
    const vehiclesSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Sri Lanka Car Hire Vehicles",
      "description": "Choose your vehicle for Sri Lanka private car hire — Sedan, Van, or Big Van. All vehicles include an English-speaking driver. Flat-rate pricing from $270.",
      "provider": {
        "@type": "TravelAgency",
        "name": "SLTCS – Sri Lanka Car Hire with Private Driver",
        "url": "https://en.srilanka-charter.com/"
      },
      "areaServed": { "@type": "Country", "name": "Sri Lanka" },
      "url": "https://en.srilanka-charter.com/vehicles",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Vehicle Options",
        "itemListElement": [
          { "@type": "Offer", "name": "Sedan", "description": "Comfortable sedan for 1-3 passengers with private driver" },
          { "@type": "Offer", "name": "Van", "description": "Spacious van for 4-8 passengers with private driver" },
          { "@type": "Offer", "name": "Big Van", "description": "Large van for 9-13 passengers with private driver" }
        ]
      }
    };
    const existingVehiclesSchema = document.querySelector('script[data-id="vehicles-jsonld"]');
    if (existingVehiclesSchema) existingVehiclesSchema.remove();
    const vehiclesScript = document.createElement('script');
    vehiclesScript.type = 'application/ld+json';
    vehiclesScript.setAttribute('data-id', 'vehicles-jsonld');
    vehiclesScript.textContent = JSON.stringify(vehiclesSchema);
    document.head.appendChild(vehiclesScript);
    return () => {
      document.title = prevTitle;
      metaDesc!.content = prevDesc;
      addedHreflangs.forEach((el) => el.remove());
      if (canonical) canonical.href = prevCanonical;
      document.querySelector('script[data-id="vehicles-jsonld"]')?.remove();
    };
  }, []);

  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
          padding: "120px 0 60px",
          textAlign: "center",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        <div className="container">
          <div className="section-eyebrow">VEHICLES</div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Vehicle Lineup
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1rem",
              maxWidth: "560px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            We provide the ideal vehicle to match your group size and travel style.
          </p>
        </div>
      </section>

      {/* Vehicle Cards */}
      <section style={{ background: "var(--dark, #0d0d0d)", padding: "60px 0 20px" }}>
        <div className="container">
          {VEHICLES.map((vehicle, i) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
          ))}
        </div>
      </section>

      {/* Groups of 10+ */}
      <section style={{ background: "var(--dark2, #1a1a1a)", padding: "48px 0" }}>
        <div className="container">
          <div
            style={{
              background: "rgba(201,168,76,0.06)",
              border: "1px solid rgba(201,168,76,0.2)",
              borderRadius: "12px",
              padding: "28px 32px",
              maxWidth: "720px",
              margin: "0 auto",
            }}
          >
            <h3
              style={{
                color: "#c9a84c",
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                margin: "0 0 10px",
              }}
            >
              For groups of 10 or more
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              We can also arrange minibuses and larger coaches for bigger groups. Please indicate your required number of passengers in the free-text field of the enquiry form.
            </p>
          </div>
        </div>
      </section>

      {/* Not sure CTA */}
      <section style={{ background: "var(--dark, #0d0d0d)", padding: "60px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 12px",
            }}
          >
            Not sure which vehicle is right for you?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.95rem",
              maxWidth: "500px",
              margin: "0 auto 28px",
              lineHeight: 1.7,
            }}
          >
            Tell us your group size, luggage, and travel style — we will recommend the best option for your trip.
          </p>
          <a href="/#contact" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>💬</span> Free Consultation
          </a>
        </div>
      </section>

      <Footer />
      <FloatingCTA />

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 768px) {
          .vehicle-detail-grid {
            grid-template-columns: 1fr !important;
          }
          .vehicle-detail-grid > div {
            order: unset !important;
          }
        }
      `}</style>
    </div>
  );
}

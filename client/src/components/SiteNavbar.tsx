import { useState, useEffect } from "react";

interface SiteNavbarProps {
  /** "home" uses smooth-scroll anchors; other pages use absolute links */
  mode?: "home" | "page";
}

export default function SiteNavbar({ mode = "page" }: SiteNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileInfoOpen, setMobileInfoOpen] = useState(false);

  const LANGUAGES = [
    { label: "French",   url: "https://fr.srilanka-charter.com/" },
    { label: "Spanish",  url: "https://es.srilanka-charter.com/" },
    { label: "German",   url: "https://de.srilanka-charter.com/" },
    { label: "Dutch",    url: "https://nl.srilanka-charter.com/" },
    { label: "Russian",  url: "https://ru.srilanka-charter.com/" },
    { label: "Malay",    url: "https://ms.srilanka-charter.com/" },
    { label: "Swedish",  url: "https://sv.srilanka-charter.com/" },
    { label: "Japanese", url: "https://sltcs.srilanka-charter.com/" },
  ];

  const INFO_CATEGORIES = [
    { label: "Private Driver Guide",  path: "/information/private-driver-guide" },
    { label: "Cost & Booking Guide",  path: "/information/cost-booking-guide" },
    { label: "Family & Group Travel", path: "/information/family-group-travel" },
    { label: "Travel Tips & Safety",  path: "/information/travel-tips-safety" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (mode === "home") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    } else {
      window.location.href = `/#${id}`;
    }
  };

  return (
    <>
      <nav className={`sltcs-nav${scrolled ? " scrolled" : ""}`}>
        <a href="/" className="nav-logo">
          SLTCS｜Sri Lanka Car Hire with Private Driver
        </a>
        <ul className="nav-links">
          <li>
            <a href="/plans">PLANS</a>
          </li>
          <li className="nav-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
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
          <li><a href="/vehicles">VEHICLES</a></li>
          <li><a href="/voice">VOICE</a></li>
          <li className="nav-dropdown" onMouseEnter={() => setInfoOpen(true)} onMouseLeave={() => setInfoOpen(false)}>
            <button>INFORMATION</button>
            {infoOpen && (
              <div className="nav-dropdown-menu">
                {INFO_CATEGORIES.map((cat) => (
                  <a key={cat.path} href={cat.path}>{cat.label}</a>
                ))}
              </div>
            )}
          </li>
          <li><a href="/price">PRICE</a></li>
          <li>
            <a href={mode === "home" ? "#contact" : "/#contact"}
              onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
              CONTACT
            </a>
          </li>
          <li><a href="/faq">FAQ</a></li>
          <li className="nav-dropdown nav-lang-dropdown" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
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
          <a href="/voice">Voice</a>
          {/* Information accordion */}
          <div className="mobile-accordion">
            <button
              className="mobile-accordion-btn"
              onClick={() => setMobileInfoOpen((o) => !o)}
            >
              Information <span>{mobileInfoOpen ? "▲" : "▼"}</span>
            </button>
            {mobileInfoOpen && (
              <div className="mobile-accordion-body">
                {INFO_CATEGORIES.map((cat) => (
                  <a key={cat.path} href={cat.path}>{cat.label}</a>
                ))}
              </div>
            )}
          </div>
          <a href="/price">Price</a>
          <a href="/#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
          <a href="/faq">FAQ</a>
          <a href="/#contact" className="btn-nav-mobile" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Free Enquiry</a>
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

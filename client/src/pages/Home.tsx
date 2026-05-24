/**
 * SLTCS – Sri Lanka Car Hire with Private Driver
 * Design: Dark luxury travel aesthetic
 * - Playfair Display (serif) for headings
 * - Inter for body text
 * - Gold (#c9a84c) accent on deep dark background
 * - Full-bleed hero slideshow, tabbed itineraries, contact form
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

// ─── Custom Date Picker (English locale, OS-independent) ──────────────────────
const MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS_EN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function DatePicker({ id, name, value, onChange, required }: {
  id: string; name: string; value: string;
  onChange: (v: string) => void; required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(() => value ? parseInt(value.split("-")[0]) : new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState(() => value ? parseInt(value.split("-")[1]) - 1 : new Date().getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayValue = value
    ? (() => { const [y,m,d] = value.split("-"); return `${d} ${MONTHS_EN[parseInt(m)-1]} ${y}`; })()
    : "DD / MMM / YYYY";

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const selectDate = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${viewYear}-${m}-${d}`);
    setOpen(false);
  };

  const prevMonth = () => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); } else setViewMonth(m => m-1); };
  const nextMonth = () => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); } else setViewMonth(m => m+1); };

  const selectedDay = value ? parseInt(value.split("-")[2]) : null;
  const selectedMonth = value ? parseInt(value.split("-")[1]) - 1 : null;
  const selectedYear = value ? parseInt(value.split("-")[0]) : null;

  return (
    <div className="datepicker-wrap" ref={ref}>
      <input type="hidden" id={id} name={name} value={value} required={required} />
      <button type="button" className="datepicker-trigger" onClick={() => setOpen(o => !o)}>
        <span className="datepicker-icon">📅</span>
        <span className={value ? "datepicker-val" : "datepicker-placeholder"}>{displayValue}</span>
      </button>
      {open && (
        <div className="datepicker-popup">
          <div className="datepicker-header">
            <button type="button" className="datepicker-nav" onClick={prevMonth}>‹</button>
            <span className="datepicker-month-year">{MONTHS_EN[viewMonth]} {viewYear}</span>
            <button type="button" className="datepicker-nav" onClick={nextMonth}>›</button>
          </div>
          <div className="datepicker-grid">
            {DAYS_EN.map(d => <div key={d} className="datepicker-dayname">{d}</div>)}
            {Array.from({length: firstDay}).map((_,i) => <div key={`e${i}`} />)}
            {Array.from({length: daysInMonth}).map((_,i) => {
              const day = i + 1;
              const isSelected = day === selectedDay && viewMonth === selectedMonth && viewYear === selectedYear;
              const isToday = day === new Date().getDate() && viewMonth === new Date().getMonth() && viewYear === new Date().getFullYear();
              return (
                <button
                  key={day}
                  type="button"
                  className={`datepicker-day${isSelected ? " selected" : ""}${isToday && !isSelected ? " today" : ""}`}
                  onClick={() => selectDate(day)}
                >{day}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Image URLs (uploaded to manus-storage) ───────────────────────────────────
const IMAGES = {
  hero1: "/manus-storage/hero_van_srilanka_706f8966.jpg",
  hero2: "/manus-storage/slide2_sigiriya_b8468f12.jpg",
  hero3: "/manus-storage/slide3_tea_train_e100395a.jpg",
  hero4: "/manus-storage/slide4_kandy_19bf406f.jpg",
  hero5: "/manus-storage/slide5_galle_8aced38c.jpg",
  destYala: "/manus-storage/dest_yala_0e498c0a.jpg",
  destElla: "/manus-storage/dest_ella_bd8060fc.jpg",
  destNuwara: "/manus-storage/dest_nuwara_57f4e54f.jpg",
};

const SLIDES = [
  { src: IMAGES.hero1, alt: "White van driving along Sri Lanka road at sunset" },
  { src: IMAGES.hero2, alt: "Sigiriya Rock Fortress aerial view" },
  { src: IMAGES.hero3, alt: "Sri Lanka tea plantation scenic train" },
  { src: IMAGES.hero4, alt: "Kandy Temple of the Tooth Sri Lanka" },
  { src: IMAGES.hero5, alt: "Galle Fort Dutch colonial ramparts" },
];
// Note: hero1 = van image (first slide), hero2 = Sigiriya (second slide)

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileItineraryOpen, setMobileItineraryOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const LANGUAGES = [
    { label: "French", url: "https://fr.srilanka-charter.com/" },
    { label: "Spanish", url: "https://es.srilanka-charter.com/" },
    { label: "German", url: "https://de.srilanka-charter.com/" },
    { label: "Dutch", url: "https://nl.srilanka-charter.com/" },
    { label: "Russian", url: "https://ru.srilanka-charter.com/" },
    { label: "Japanese", url: "https://sltcs.srilanka-charter.com/" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`sltcs-nav${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo("hero"); }}>
          <span className="nav-logo-full">SLTCS｜Sri Lanka Car Hire with Private Driver</span>
          <span className="nav-logo-short">SLTCS</span>
        </a>
        <ul className="nav-links">
          <li><a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>PLANS</a></li>
          <li className="nav-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button>MODEL ITINERARY</button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>4 Nights / 5 Days</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 Nights / 6 Days</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>6 Nights / 7 Days</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 to 7 Days – Cultural Triangle</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>10 Days to 2 Weeks – Classic Plan</a>
              </div>
            )}
          </li>
          <li><a href="/vehicles">VEHICLES</a></li>
          <li><a href="/voice">VOICE</a></li>
          <li><a href="/price">PRICE</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>CONTACT</a></li>
          <li><a href="/faq">FAQ</a></li>
          <li className="nav-dropdown nav-lang-dropdown" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
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
          <a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>Plans</a>
          {/* Model Itinerary accordion */}
          <div className="mobile-accordion">
            <button
              className="mobile-accordion-btn"
              onClick={() => setMobileItineraryOpen(o => !o)}
            >
              <span>Model Itinerary</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: mobileItineraryOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              ><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {mobileItineraryOpen && (
              <div className="mobile-accordion-body">
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>4 Nights / 5 Days</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 Nights / 6 Days</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>6 Nights / 7 Days</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5–7 Days – Cultural Triangle</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>10 Days to 2 Weeks – Classic</a>
              </div>
            )}
          </div>
          <a href="/vehicles">Vehicles</a>
          <a href="/price">Price</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
          <a href="/faq">FAQ</a>
          <a href="/voice">Voice</a>
          {/* Language accordion */}
          <div className="mobile-accordion">
            <button
              className="mobile-accordion-btn"
              onClick={() => setMobileLangOpen(o => !o)}
            >
              <span>Other Languages</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: mobileLangOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              ><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {mobileLangOpen && (
              <div className="mobile-accordion-body">
                {[{label:"French",url:"https://fr.srilanka-charter.com/"},{label:"Spanish",url:"https://es.srilanka-charter.com/"},{label:"German",url:"https://de.srilanka-charter.com/"},{label:"Dutch",url:"https://nl.srilanka-charter.com/"},{label:"Russian",url:"https://ru.srilanka-charter.com/"},{label:"Japanese",url:"https://sltcs.srilanka-charter.com/"}].map((lang) => (
                  <a key={lang.label} href={lang.url}>{lang.label}</a>
                ))}
              </div>
            )}
          </div>
          <a href="#contact" className="btn-nav-mobile" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Free Enquiry</a>
        </div>
      )}
    </>
  );
}

// ─── Hero Slideshow ───────────────────────────────────────────────────────────
function Hero() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((n: number) => {
    setCurrent(n);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero-slider">
        {SLIDES.map((slide, i) => (
          <div key={i} className={`hero-slide${i === current ? " active" : ""}`}>
            <img src={slide.src} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div className="container" style={{ paddingLeft: "0" }}>
          <div style={{ maxWidth: "680px" }}>
          <div className="hero-eyebrow">SRI LANKA PRIVATE CHARTER SERVICE</div>
          <div className="hero-badge">CAR HIRE WITH DRIVER</div>
          <h1>Sri Lanka <em>Car Hire</em> with a Private Driver</h1>
          <p className="hero-sub">
            Explore Sri Lanka at your own pace with a dedicated private driver.
            Fully flexible, fully private — the finest way to discover the Pearl of the Indian Ocean.
          </p>
          <div className="hero-tags">
            <span className="hero-tag">English Support</span>
            <span className="hero-tag">Fully Private Charter</span>
            <span className="hero-tag">Government-Certified Driver</span>
          </div>
          <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
            Free Enquiry
          </a>
          </div>
        </div>
      </div>
      <div className="hero-location">
        <div className="hero-location-label">Location</div>
        <div className="hero-location-value">All Sri Lanka</div>
      </div>
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`hero-dot${i === current ? " active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

// ─── Stats Counter ────────────────────────────────────────────────────────────
function Stats() {
  const [counts, setCounts] = useState({ charters: 0, satisfaction: 0, drivers: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCounts({
              charters: Math.floor(400 * eased),
              satisfaction: parseFloat((4.9 * eased).toFixed(1)),
              drivers: Math.floor(30 * eased),
            });
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats" ref={ref}>
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-number">{counts.charters}+</div>
          <div className="stat-label">Total Charter Trips</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counts.satisfaction.toFixed(1)}</div>
          <div className="stat-label">Average Satisfaction</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counts.drivers}+</div>
          <div className="stat-label">Certified Drivers</div>
        </div>
      </div>
    </div>
  );
}

// ─── Contact + Why SLTCS (2-column layout) ──────────────────────────────────
function ContactAndWhy() {
  const [country, setCountry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [, setLocation] = useLocation();

  const submitMutation = trpc.enquiry.submit.useMutation({
    onSuccess: () => { setLocation("/thanks"); },
    onError: (err) => {
      setSubmitError(err.message || "Failed to send enquiry. Please try again.");
      setIsSubmitting(false);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    submitMutation.mutate({
      name: (data.get("name") as string) || "",
      country: (data.get("country") as string) || "",
      countryOther: (data.get("countryOther") as string) || undefined,
      email: (data.get("email") as string) || "",
      phone: (data.get("phone") as string) || undefined,
      startDate: startDate,
      endDate: endDate,
      pickup: (data.get("pickup") as string) || "",
      adults: (data.get("adults") as string) || "",
      children: (data.get("children") as string) || "0",
      vehicle: (data.get("vehicle") as string) || "",
      currency: (data.get("currency") as string) || undefined,
      notes: (data.get("notes") as string) || undefined,
    });
  };

  const reasons = [
    {
      num: "01",
      title: "Government-Certified Drivers",
      desc: "All our drivers hold official Sri Lanka Tourist Driver or Chauffeur Guide Driver licences. Professionally trained, safety-focused, and highly rated by past clients.",
      svgPath: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2zm0 4l6 3.27V12c0 3.79-2.58 7.33-6 8.93-3.42-1.6-6-5.14-6-8.93V9.27L12 6z",
    },
    {
      num: "02",
      title: "Full English Support",
      desc: "From first enquiry to the final drop-off, our English-speaking team is on hand to assist. No language barriers — just seamless communication throughout your trip.",
      svgPath: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
    },
    {
      num: "03",
      title: "Completely Private Charter",
      desc: "Unlike group tours, your vehicle and driver are exclusively yours. Set your own schedule, choose your stops, and travel entirely on your own terms.",
      svgPath: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z",
    },
    {
      num: "04",
      title: "Expert Local Knowledge",
      desc: "Our Chauffeur Guide Drivers are passionate about Sri Lanka's history, culture, and cuisine. They'll take you beyond the guidebook to hidden gems and authentic experiences.",
      svgPath: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
    },
    {
      num: "05",
      title: "Right Vehicle for Every Group",
      desc: "From couples to large family groups of 10, we match the perfect vehicle to your party size — ensuring comfort even on long-distance journeys across the island.",
      svgPath: "M17 5H3c-1.1 0-2 .9-2 2v9h2c0 1.65 1.34 3 3 3s3-1.35 3-3h5.5c0 1.65 1.34 3 3 3s3-1.35 3-3H23v-5l-6-6zM3 11V7h4v4H3zm3 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7-6.5H9V7h4v4zm4.5 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM15 11V7h1l4 4h-5z",
    },
    {
      num: "06",
      title: "Trusted by European Travellers",
      desc: "With over 400 completed charters and a 4.9 average satisfaction rating, SLTCS is the preferred choice for UK and European visitors exploring Sri Lanka.",
      svgPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    },
  ];

  return (
    <section id="contact" style={{ background: "#faf7f2", padding: "100px 0" }}>
      <div className="container">
        {/* 2-column grid: left = form, right = why cards */}
        <div className="contact-why-grid">

          {/* ── LEFT: Contact Form ─────────────────────────────────────────── */}
          <div>
            <div className="section-eyebrow">CONTACT</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: "0 0 16px" }}>
              Start Planning<br />Your Sri Lanka<br />Adventure
            </h2>
            <p style={{ color: "#4a4a4a", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "8px" }}>
              Tell us your travel dates, group size, and preferences — we'll respond with a tailored itinerary and quote within 24 hours.
            </p>
            <p style={{ color: "#4a4a4a", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "24px" }}>
              Fill in the form and submit. We usually reply within 24 hours.
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="form-grid">
                <div className="form-group full">
                  <label htmlFor="name">FULL NAME *</label>
                  <input type="text" id="name" name="name" placeholder="e.g. James Smith" required />
                </div>
                <div className="form-group full">
                  <label htmlFor="country">COUNTRY *</label>
                  <select id="country" name="country" required value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">— Select your country —</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Spain">Spain</option>
                    <option value="Italy">Italy</option>
                    <option value="Australia">Australia</option>
                    <option value="China">China</option>
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {country === "Other" && (
                  <div className="form-group full">
                    <label htmlFor="countryOther">PLEASE SPECIFY YOUR COUNTRY *</label>
                    <input type="text" id="countryOther" name="countryOther" placeholder="Enter your country" required />
                  </div>
                )}
                <div className="form-group full">
                  <label htmlFor="email">EMAIL ADDRESS *</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group full">
                  <label htmlFor="phone">PHONE NUMBER</label>
                  <input type="tel" id="phone" name="phone" placeholder="+44 7700 000000" />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">START DATE *</label>
                  <DatePicker id="startDate" name="startDate" value={startDate} onChange={setStartDate} required />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">END DATE *</label>
                  <DatePicker id="endDate" name="endDate" value={endDate} onChange={setEndDate} required />
                </div>
                <div className="form-group full">
                  <label htmlFor="pickup">CHARTER START LOCATION *</label>
                  <select id="pickup" name="pickup" required>
                    <option value="">— Select location —</option>
                    <option value="Colombo Airport (BIA)">Colombo Airport (BIA)</option>
                    <option value="Colombo City">Colombo City</option>
                    <option value="Negombo">Negombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Sigiriya">Sigiriya</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Galle">Galle</option>
                    <option value="Other (please specify in notes)">Other (please specify in notes)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="adults">NUMBER OF ADULTS *</label>
                  <select id="adults" name="adults" required>
                    <option value="">Select</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                    <option value="7+">7 or more</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="children">NUMBER OF CHILDREN</label>
                  <select id="children" name="children">
                    <option value="0">0</option>
                    {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                    <option value="4+">4 or more</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="vehicle">VEHICLE TYPE *</label>
                  <select id="vehicle" name="vehicle" required>
                    <option value="">— Select vehicle —</option>
                    <option value="Sedan (up to 3 pax)">Sedan (up to 3 passengers)</option>
                    <option value="Van (up to 6 pax)">Van (up to 6 passengers)</option>
                    <option value="Large Van (up to 10 pax)">Large Van (up to 10 passengers)</option>
                    <option value="Let us recommend">Let us recommend</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="currency">PREFERRED CURRENCY</label>
                  <select id="currency" name="currency">
                    <option value="">— Select currency —</option>
                    <option value="GBP">GBP (£ British Pound)</option>
                    <option value="EUR">EUR (€ Euro)</option>
                    <option value="USD">USD ($ US Dollar)</option>
                    <option value="AUD">AUD (A$ Australian Dollar)</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="notes">DESTINATIONS / ITINERARY NOTES</label>
                  <textarea id="notes" name="notes" placeholder="Please list any destinations, attractions, or special requests you have in mind." />
                </div>
              </div>
              {submitError && (
                <div className="form-error" style={{ color: "#e55", marginBottom: "12px", padding: "10px 14px", background: "rgba(220,50,50,0.1)", borderRadius: "6px", border: "1px solid rgba(220,50,50,0.3)" }}>
                  {submitError}
                </div>
              )}
              <button
                type="submit"
                className={`form-submit-btn${isSubmitting ? " loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending…" : "Send Enquiry"}
              </button>
              <p className="form-note">
                By submitting this form, you agree to our{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                No commitment required.
              </p>
            </form>
          </div>

          {/* ── RIGHT: Why SLTCS ──────────────────────────────────────────── */}
          <div id="why">
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
                <span style={{ color: "#c9a84c", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>WHY SLTCS</span>
                <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: 0 }}>
                6 Reasons Why Travellers<br />Choose <span style={{ color: "#c9a84c" }}>SLTCS</span>
              </h2>
            </div>
            {/* Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {reasons.map((r) => (
                <div
                  key={r.num}
                  style={{
                    display: "flex",
                    alignItems: "stretch",
                    background: "#f9f5ee",
                    border: "1px solid rgba(201,168,76,0.25)",
                    borderRadius: "10px",
                    overflow: "hidden",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(201,168,76,0.15)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.5)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "none"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.25)"; }}
                >
                  {/* Icon + number */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "6px", padding: "18px 16px", minWidth: "76px", borderRight: "1px solid rgba(201,168,76,0.15)" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "#f0e8d0", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1a3a1a"><path d={r.svgPath} /></svg>
                    </div>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, color: "#c9a84c", lineHeight: 1 }}>{r.num}</span>
                  </div>
                  {/* Title + desc */}
                  <div style={{ padding: "18px 20px", flex: 1 }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, color: "#1a1a1a", margin: "0 0 6px", lineHeight: 1.3 }}>{r.title}</h3>
                    <p style={{ fontSize: "0.8rem", color: "#4a4a4a", lineHeight: 1.65, margin: 0 }}>{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── Concerns ────────// ─── Concerns ─────────────────────────────────────────────
function Concerns() {
  const concerns = [
    { label: "Language barriers", svgPath: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" },
    { label: "Getting around independently", svgPath: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
    { label: "Being overcharged", svgPath: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" },
    { label: "Taxi safety concerns", svgPath: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2zm0 4l6 3.27V12c0 3.79-2.58 7.33-6 8.93-3.42-1.6-6-5.14-6-8.93V9.27L12 6z" },
    { label: "Finding the right places", svgPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" },
    { label: "Keeping to a schedule", svgPath: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" },
    { label: "Travelling with children or elderly", svgPath: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
    { label: "Understanding local culture", svgPath: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" },
  ];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="concerns" style={{ background: "#0d0f13", padding: "100px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", background: "#c9a84c" }} />
            <span style={{ color: "#c9a84c", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>YOUR CONCERNS</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: 0 }}>
            Worried About Travelling<br />in <span style={{ color: "#c9a84c" }}>Sri Lanka?</span>
          </h2>
        </div>

        {/* Concern tiles */}
        <div className="concerns-inline-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", marginBottom: "40px" }}>
          {concerns.map((c) => (
            <div
              key={c.label}
              style={{ display: "flex", alignItems: "center", gap: "14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "4px", padding: "18px 20px", transition: "border-color 0.2s, background 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(201,168,76,0.3)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(201,168,76,0.04)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)"; }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#c9a84c" style={{ flexShrink: 0, opacity: 0.8 }}><path d={c.svgPath} /></svg>
              <span style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.4 }}>{c.label}</span>
            </div>
          ))}
        </div>

        {/* CTA bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", background: "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.04) 100%)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "4px", padding: "36px 48px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
            <div style={{ flexShrink: 0, width: "48px", height: "48px", borderRadius: "50%", border: "1px solid rgba(201,168,76,0.4)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2zm0 4l6 3.27V12c0 3.79-2.58 7.33-6 8.93-3.42-1.6-6-5.14-6-8.93V9.27L12 6z" /></svg>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>SLTCS Solves Every One of These Concerns</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, maxWidth: "560px" }}>Your dedicated private driver handles everything — navigation, communication, scheduling, and local expertise. All you need to do is sit back and enjoy the journey.</p>
            </div>
          </div>
          <button
            onClick={() => scrollTo("contact")}
            style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: "10px", background: "#c9a84c", border: "none", color: "#0a0c0f", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 36px", borderRadius: "3px", cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            Enquire Now — It's Free
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── Planss ─────────────────────────────────────────────
function Plans() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="plans">
      <div className="container">
        <div className="section-eyebrow">OUR PLANS</div>
        <h2 className="section-title">Choose the Plan<br />That Suits You Best</h2>
        <p className="section-sub">Whether you're travelling on a budget or seeking a premium experience, we have a plan tailored to your needs.</p>
        <div className="plans-grid">
          <div className="plan-card">
            <div className="plan-tier">BRONZE</div>
            <h3>Bronze Plan</h3>
            <p>For budget-conscious travellers who need reliable transport.</p>
            <ul className="plan-features">
              <li>Trainee driver arrangement</li>
              <li>Airport transfers &amp; point-to-point transfers</li>
              <li>English-speaking local coordinator</li>
              <li>Clean, air-conditioned vehicle</li>
            </ul>
            <a href="#contact" className="plan-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>View Details</a>
          </div>
          <div className="plan-card featured">
            <div className="plan-badge-popular">Most Popular</div>
            <div className="plan-tier">SILVER</div>
            <h3>Silver Plan</h3>
            <p>The best balance of value and quality — our most popular choice.</p>
            <ul className="plan-features">
              <li>Government-certified Tourist Driver or above</li>
              <li>Accompaniment &amp; commentary at attractions</li>
              <li>English-speaking local coordinator</li>
              <li>Safari &amp; activity bookings arranged</li>
              <li>Guide services included at no extra charge</li>
            </ul>
            <a href="#contact" className="plan-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>View Details</a>
          </div>
          <div className="plan-card">
            <div className="plan-tier">GOLD</div>
            <h3>Gold Plan</h3>
            <p>For travellers who demand the very best Sri Lanka experience.</p>
            <ul className="plan-features">
              <li>Top-rated Chauffeur Guide Driver guaranteed</li>
              <li>Full-day accompaniment &amp; expert commentary</li>
              <li>English-speaking local coordinator</li>
              <li>Dual support structure for complete peace of mind</li>
              <li>Premium concierge-level service</li>
            </ul>
            <a href="#contact" className="plan-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>View Details</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Preview ─────────────────────────────────────────────────────────
type VehicleKeyHP = "sedan" | "van" | "bigvan";
type TierKeyHP = "bronze" | "silver" | "gold";
type CurrencyKeyHP = "USD" | "GBP" | "EUR" | "AUD";

const CURRENCY_SYMBOLS_HP: Record<CurrencyKeyHP, string> = { USD: "$", GBP: "£", EUR: "€", AUD: "A$" };

const PRICES_HP: Record<CurrencyKeyHP, Record<TierKeyHP, Record<VehicleKeyHP, number[]>>> = {
  USD: {
    bronze: { sedan: [270,340,410,480,520,560,600,680,750,830,900,980,1050,1130,1200,1280,1350,1430,1500], van: [330,410,500,580,630,670,720,820,900,1000,1080,1180,1260,1360,1440,1540,1620,1720,1800], bigvan: [390,480,590,680,740,780,840,950,1050,1160,1260,1370,1470,1580,1680,1790,1890,2000,2100] },
    silver: { sedan: [310,400,490,580,640,700,760,860,950,1050,1140,1240,1330,1430,1520,1620,1710,1810,1900], van: [370,470,580,680,750,810,880,1000,1100,1220,1320,1440,1540,1660,1760,1880,1980,2100,2200], bigvan: [430,540,670,780,860,920,1000,1130,1250,1380,1500,1630,1750,1880,2000,2130,2250,2380,2500] },
    gold:   { sedan: [350,460,570,680,760,840,920,1040,1150,1270,1380,1500,1610,1730,1840,1960,2070,2190,2300], van: [410,530,660,780,870,950,1040,1180,1300,1440,1560,1700,1820,1960,2080,2220,2340,2480,2600], bigvan: [470,600,750,880,980,1060,1160,1310,1450,1600,1740,1890,2030,2180,2320,2470,2610,2760,2900] },
  },
  GBP: {
    bronze: { sedan: [200,240,290,340,370,400,420,480,530,590,640,690,740,800,850,910,950,1010,1060], van: [250,290,360,420,450,480,510,570,640,710,770,830,890,960,1030,1090,1150,1210,1280], bigvan: [290,350,430,490,540,570,600,680,760,840,920,980,1060,1140,1220,1300,1360,1440,1520] },
    silver: { sedan: [230,290,350,420,460,510,540,620,680,760,820,890,950,1030,1090,1170,1220,1300,1360], van: [280,340,420,500,540,590,630,710,790,880,950,1030,1100,1190,1270,1350,1420,1500,1580], bigvan: [320,400,490,570,630,680,720,820,910,1010,1100,1180,1270,1370,1460,1560,1630,1730,1820] },
    gold:   { sedan: [260,340,410,500,550,620,660,760,830,930,1000,1090,1160,1260,1330,1430,1490,1590,1660], van: [310,390,480,580,630,700,750,850,940,1050,1130,1230,1310,1420,1510,1610,1690,1790,1880], bigvan: [350,450,550,650,720,790,840,960,1060,1180,1280,1380,1480,1600,1700,1820,1900,2020,2120] },
  },
  EUR: {
    bronze: { sedan: [230,280,350,400,440,460,500,560,620,680,740,810,870,930,990,1050,1120,1180,1240], van: [280,340,420,480,530,560,600,680,750,830,900,980,1050,1130,1200,1280,1350,1430,1500], bigvan: [330,400,500,570,620,650,700,790,880,970,1060,1140,1230,1320,1410,1500,1580,1670,1760] },
    silver: { sedan: [270,330,420,490,550,590,640,720,800,880,960,1040,1120,1200,1280,1360,1440,1520,1600], van: [320,390,490,570,640,690,740,840,930,1030,1120,1210,1300,1400,1490,1590,1670,1770,1860], bigvan: [370,450,570,660,730,780,840,950,1060,1170,1280,1370,1480,1590,1700,1810,1900,2010,2120] },
    gold:   { sedan: [310,380,490,580,660,720,780,880,980,1080,1180,1270,1370,1470,1570,1670,1760,1860,1960], van: [360,440,560,660,750,820,880,1000,1110,1230,1340,1440,1550,1670,1780,1900,1990,2110,2220], bigvan: [410,500,640,750,840,910,980,1110,1240,1370,1500,1600,1730,1860,1990,2120,2220,2350,2480] },
  },
  AUD: {
    bronze: { sedan: [380,480,580,680,730,790,840,960,1050,1170,1260,1380,1470,1590,1680,1800,1890,2010,2100], van: [470,580,700,820,890,940,1010,1150,1260,1400,1520,1660,1770,1910,2020,2160,2270,2410,2520], bigvan: [550,680,830,960,1040,1100,1180,1330,1470,1630,1770,1920,2060,2220,2360,2510,2650,2800,2940] },
    silver: { sedan: [440,560,690,820,900,980,1070,1210,1330,1470,1600,1740,1870,2010,2130,2270,2400,2540,2660], van: [520,660,820,960,1050,1140,1240,1400,1540,1710,1850,2020,2160,2330,2470,2640,2780,2940,3080], bigvan: [610,760,940,1100,1210,1290,1400,1590,1750,1940,2100,2290,2450,2640,2800,2990,3150,3340,3500] },
    gold:   { sedan: [490,650,800,960,1070,1180,1290,1460,1610,1780,1940,2100,2260,2430,2580,2750,2900,3070,3220], van: [580,750,930,1100,1220,1330,1460,1640,1820,2020,2190,2380,2550,2750,2920,3110,3280,3480,3640], bigvan: [660,840,1050,1240,1380,1490,1630,1840,2030,2240,2440,2650,2850,3060,3250,3460,3660,3870,4060] },
  },
};

const DAYS_HP = Array.from({ length: 19 }, (_, i) => i + 2);

const TIERS_HP: { key: TierKeyHP; label: string; badge?: string; color: string }[] = [
  { key: "bronze", label: "Bronze Plan", color: "#cd7f32" },
  { key: "silver", label: "Silver Plan", badge: "Most Popular", color: "#c9a84c" },
  { key: "gold",   label: "Gold Plan",   color: "#d4af37" },
];

const VEHICLES_HP: { key: VehicleKeyHP; label: string; capacity: string }[] = [
  { key: "sedan",  label: "Sedan",   capacity: "1–3 people" },
  { key: "van",    label: "Van",     capacity: "3–6 people" },
  { key: "bigvan", label: "Big Van", capacity: "6–9 people" },
];

function PriceCard({ tier, currency }: { tier: (typeof TIERS_HP)[number]; currency: CurrencyKeyHP }) {
  const [vehicle, setVehicle] = useState<VehicleKeyHP>("sedan");
  const sym = CURRENCY_SYMBOLS_HP[currency];
  const prices = PRICES_HP[currency][tier.key][vehicle];
  return (
    <div style={{ background: "#ffffff", border: `1.5px solid ${tier.color}50`, borderRadius: "12px", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${tier.color}22, ${tier.color}08)`, borderBottom: `1px solid ${tier.color}30`, padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
          <span style={{ background: tier.color, color: "#000", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", padding: "2px 8px", borderRadius: "20px", textTransform: "uppercase" }}>{tier.key.toUpperCase()}</span>
          {tier.badge && <span style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.4)", color: "#c9a84c", fontSize: "0.6rem", fontWeight: 600, padding: "2px 7px", borderRadius: "20px", textTransform: "uppercase" }}>{tier.badge}</span>}
        </div>
        <h3 style={{ color: "#1a1a1a", fontSize: "1rem", fontWeight: 700, margin: 0 }}>{tier.label}</h3>
      </div>
      {/* Vehicle Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid #e8e2d8", background: "#f9f5ee" }}>
        {VEHICLES_HP.map((v) => (
          <button key={v.key} onClick={() => setVehicle(v.key)} style={{ flex: 1, padding: "8px 4px", background: "none", border: "none", borderBottom: vehicle === v.key ? `2px solid ${tier.color}` : "2px solid transparent", color: vehicle === v.key ? tier.color : "#888", fontSize: "0.7rem", fontWeight: vehicle === v.key ? 600 : 400, cursor: "pointer", transition: "all 0.2s", textAlign: "center", lineHeight: 1.3 }}>
            <div>{v.label}</div>
            <div style={{ fontSize: "0.6rem", opacity: 0.7 }}>{v.capacity}</div>
          </button>
        ))}
      </div>
      {/* Price Table */}
      <div style={{ flex: 1 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ padding: "8px 14px", textAlign: "left", color: "#888", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: "#f4f0e8" }}>Days</th>
              <th style={{ padding: "8px 14px", textAlign: "right", color: "#888", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: "#f4f0e8" }}>Price (incl. tax)</th>
            </tr>
          </thead>
          <tbody>
            {DAYS_HP.map((day, idx) => (
              <tr key={day} style={{ borderBottom: "1px solid #ede8e0", background: idx % 2 === 0 ? "transparent" : "#faf7f2" }}>
                <td style={{ padding: "8px 14px", color: "#4a4a4a", fontSize: "0.82rem" }}>{day} days</td>
                <td style={{ padding: "8px 14px", textAlign: "right", color: "#1a1a1a", fontSize: "0.9rem", fontWeight: 600 }}>{sym}{prices[idx].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PricingPreview() {
  const [currency, setCurrency] = useState<CurrencyKeyHP>("USD");
  return (
    <section id="pricing" style={{ background: "#faf7f2", padding: "80px 0" }}>
      <div className="container">
        <div className="section-eyebrow">TRANSPARENT PRICING</div>
        <h2 className="section-title">Flat-Rate Price List</h2>
        <p className="section-sub" style={{ marginBottom: "32px" }}>All prices are tax-inclusive and apply to English-speaking drivers. Select your preferred currency and vehicle type.</p>

        {/* Currency Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {(["USD", "GBP", "EUR", "AUD"] as CurrencyKeyHP[]).map((c) => (
            <button key={c} onClick={() => setCurrency(c)} style={{ padding: "8px 20px", background: currency === c ? "rgba(201,168,76,0.15)" : "#ffffff", border: currency === c ? "1.5px solid rgba(201,168,76,0.6)" : "1.5px solid #d1ccc4", borderRadius: "6px", color: currency === c ? "#c9a84c" : "#4a4a4a", fontSize: "0.85rem", fontWeight: currency === c ? 700 : 400, cursor: "pointer", transition: "all 0.2s" }}>
              {CURRENCY_SYMBOLS_HP[c]} {c}
            </button>
          ))}
        </div>

        {/* Note */}
        <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "12px 18px", marginBottom: "28px" }}>
          <p style={{ color: "#4a4a4a", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#c9a84c" }}>Note:</strong> Additional charges may apply if the total distance exceeds the standard estimate, or if the pick-up/drop-off point is outside the airport area.
          </p>
        </div>

        {/* Plan Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {TIERS_HP.map((tier) => <PriceCard key={tier.key} tier={tier} currency={currency} />)}
        </div>

        {/* Link to full price page */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a href="/price" className="btn-outline" style={{ display: "inline-block" }}>View Full Price Page →</a>
        </div>
      </div>
    </section>
  );
}

// ─── Itineraries ──────────────────────────────────────────────────────────────
type DayItem = { day: string; title: string; desc: string };
type Itinerary = {
  id: string;
  label: string;
  title: string;
  duration: string;
  focus: string;
  highlights: string;
  idealFor: string;
  days: DayItem[];
};

const ITINERARIES: Itinerary[] = [
  {
    id: "4n5d",
    label: "4N/5D",
    title: "4 Nights / 5 Days",
    duration: "5 Days",
    focus: "Cultural Highlights",
    highlights: "Sigiriya, Kandy, Nuwara Eliya, Galle",
    idealFor: "First-time visitors on a tight schedule",
    days: [
      { day: "Day 1", title: "Arrival → Sigiriya", desc: "Arrive at Colombo Airport. Drive to Sigiriya via Dambulla Cave Temple (UNESCO). Check in to your hotel in the Sigiriya area." },
      { day: "Day 2", title: "Sigiriya Rock Fortress", desc: "Early morning climb of Sigiriya Rock (UNESCO). Afternoon at leisure or optional jeep safari at Minneriya National Park." },
      { day: "Day 3", title: "Kandy — Temple of the Tooth", desc: "Drive to Kandy via a spice garden in Matale. Visit the Temple of the Sacred Tooth Relic (UNESCO). Evening Kandyan dance performance." },
      { day: "Day 4", title: "Nuwara Eliya → Galle", desc: "Scenic drive through rolling tea estates. Tea plucking experience. Continue to Galle Fort (UNESCO) on the southern coast." },
      { day: "Day 5", title: "Galle Fort → Departure", desc: "Morning exploration of Galle Fort's Dutch colonial ramparts, boutique shops, and ocean views. Transfer to Colombo Airport." },
    ],
  },
  {
    id: "5n6d",
    label: "5N/6D",
    title: "5 Nights / 6 Days",
    duration: "6 Days",
    focus: "Culture + Nature",
    highlights: "Sigiriya, Kandy, Ella, Galle",
    idealFor: "Couples & small groups",
    days: [
      { day: "Day 1", title: "Arrival → Sigiriya", desc: "Arrive at Colombo Airport. Drive to Sigiriya via Dambulla Cave Temple. Overnight in Sigiriya area." },
      { day: "Day 2", title: "Sigiriya Rock & Safari", desc: "Climb Sigiriya Rock in the morning. Afternoon wildlife safari at Minneriya or Kaudulla National Park." },
      { day: "Day 3", title: "Kandy Sightseeing", desc: "Travel to Kandy via Matale Spice Garden. Visit Temple of the Tooth Relic and Peradeniya Botanical Gardens." },
      { day: "Day 4", title: "Nuwara Eliya & Ella", desc: "Drive through stunning tea highlands. Tea factory visit, then continue to Ella for the famous Nine Arches Bridge." },
      { day: "Day 5", title: "Yala National Park Safari", desc: "Full-day jeep safari at Yala National Park — home to leopards, elephants, and exotic birdlife." },
      { day: "Day 6", title: "Galle Fort → Departure", desc: "Morning visit to Galle Fort (UNESCO). Transfer to Colombo Airport for departure." },
    ],
  },
  {
    id: "6n7d",
    label: "6N/7D",
    title: "6 Nights / 7 Days",
    duration: "7 Days",
    focus: "Full Island Experience",
    highlights: "Sigiriya, Kandy, Tea Train, Yala, Galle",
    idealFor: "Families & thorough explorers",
    days: [
      { day: "Day 1", title: "Arrival → Cultural Triangle", desc: "Arrive at BIA. Drive north via Dambulla Cave Temple to the Sigiriya / Kandalama area." },
      { day: "Day 2", title: "Sigiriya & Polonnaruwa", desc: "Climb Sigiriya Rock. Afternoon visit to the ancient city of Polonnaruwa (UNESCO World Heritage)." },
      { day: "Day 3", title: "Kandy", desc: "Drive to Kandy via a spice garden. Visit Temple of the Tooth Relic and enjoy a traditional Kandyan dance show." },
      { day: "Day 4", title: "Nuwara Eliya — Tea Highlands", desc: "Scenic drive through tea country. Tea plucking experience and high tea at a colonial-era plantation hotel." },
      { day: "Day 5", title: "Ella & Nine Arches Bridge", desc: "Ride the iconic tea train. Visit the Nine Arches Bridge and Little Adam's Peak in Ella." },
      { day: "Day 6", title: "Yala National Park", desc: "Full-day jeep safari at Yala — Sri Lanka's premier wildlife reserve. Leopards, elephants, crocodiles and more." },
      { day: "Day 7", title: "Galle Fort → Departure", desc: "Morning at Galle Fort (UNESCO). Transfer to Colombo Airport via Mirissa beach (optional stop)." },
    ],
  },
  {
    id: "5to7d",
    label: "5–7 Days Cultural",
    title: "5 to 7 Days\nCultural Triangle Focus",
    duration: "5–7 Days",
    focus: "UNESCO Heritage Sites & Safari",
    highlights: "Sigiriya, Anuradhapura, Polonnaruwa, Kandy",
    idealFor: "History & culture enthusiasts",
    days: [
      { day: "Day 1", title: "Airport → Dambulla Cave Temple → Sigiriya Area", desc: "Depart from Colombo Airport (approx. 3–4 hrs drive). En route, visit the Dambulla Cave Temple — a stunning UNESCO World Heritage site carved into a rock face. Check in at Heritance Kandalama, a Geoffrey Bawa–designed architectural masterpiece." },
      { day: "Day 2", title: "Sigiriya Rock Fortress & Minneriya Safari", desc: "Early morning climb of Sigiriya Rock (UNESCO) — allow 2.5–3 hours for the round trip. Afternoon jeep safari at Minneriya National Park, famous for its elephant gatherings. Return to hotel." },
      { day: "Day 3", title: "Ancient Capital of Anuradhapura", desc: "Explore the vast UNESCO-listed ruins of Anuradhapura — Sri Lanka's first ancient capital. Visit the sacred Bodhi Tree, Ruwanwelisaya Stupa, and other remarkable monuments. Allow a full day for this sprawling site." },
      { day: "Day 4", title: "Polonnaruwa & Pidurangala Rock", desc: "Optional morning climb of Pidurangala Rock for spectacular views of Sigiriya. Then explore the medieval city of Polonnaruwa (UNESCO) — well-preserved temples, palaces, and colossal Buddha statues." },
      { day: "Day 5", title: "Kandy via Spice Garden", desc: "Drive to Kandy via a traditional spice garden in Matale. Visit the Temple of the Sacred Tooth Relic (UNESCO). Enjoy a Kandyan cultural dance performance in the evening." },
      { day: "Day 6", title: "Colombo Sightseeing & Ayurveda (Optional)", desc: "Explore Colombo's colonial architecture, vibrant markets, and waterfront. Optional: check into an Ayurveda hotel in Negombo to unwind before departure." },
      { day: "Day 7", title: "Transfer to Airport", desc: "Final morning at leisure. Transfer to Colombo Airport (BIA) for your homeward flight." },
    ],
  },
  {
    id: "10to14d",
    label: "10 Days–2 Weeks",
    title: "10 Days to 2 Weeks\nClassic First-Timer Plan",
    duration: "10–14 Days",
    focus: "Complete Island Experience",
    highlights: "Sigiriya, Kandy, Tea Train, Yala, Galle, Beach",
    idealFor: "First-timers wanting the full Sri Lanka experience",
    days: [
      { day: "Day 1", title: "Airport → Dambulla Cave Temple → Sigiriya", desc: "Depart from Colombo Airport or Negombo. Drive to the Cultural Triangle (approx. 3 hrs). Stop at Dambulla Cave Temple for lunch and sightseeing. Check in at Heritance Kandalama — a celebrated Geoffrey Bawa hotel set amid forest and lake." },
      { day: "Day 2", title: "Sigiriya Rock & Anuradhapura", desc: "Morning climb of Sigiriya Rock Fortress (UNESCO). Transfer to the ancient capital of Anuradhapura (1.5–2 hrs). Explore the sacred Bodhi Tree, stupas, and ancient ruins. Return to hotel." },
      { day: "Day 3", title: "Kandy — Spice Garden & Temple", desc: "Drive to Kandy via a spice garden in Matale (approx. 3 hrs). Visit the Geragama Tea Factory and the Temple of the Sacred Tooth Relic (UNESCO). Evening Kandyan dance performance." },
      { day: "Day 4", title: "Nuwara Eliya — Tea Highlands", desc: "Scenic mountain drive to Nuwara Eliya through rolling tea estates. Tea-plucking experience and high tea at a colonial plantation hotel. Explore the charming 'Little England' town." },
      { day: "Day 5", title: "Scenic Tea Train — Nine Arches Bridge", desc: "Board the iconic tea-country train for a breathtaking journey through misty mountains. Photograph the famous Nine Arches Bridge. Arrive in Ella." },
      { day: "Day 6", title: "Ella Sightseeing → Yala", desc: "Morning hike to Little Adam's Peak and Ella Rock for panoramic views. Afternoon transfer to Yala area (approx. 2 hrs). Check in to a safari lodge." },
      { day: "Day 7", title: "Yala National Park Safari → Mirissa Beach", desc: "Early morning jeep safari at Yala — Sri Lanka's most famous wildlife park, home to the world's highest density of leopards. Afternoon transfer to the beach resort of Mirissa." },
      { day: "Day 8", title: "Galle Fort & Beach Day", desc: "Morning visit to the UNESCO-listed Galle Fort — Dutch colonial ramparts, boutique shops, and ocean views. Afternoon at leisure on Mirissa beach. Optional whale watching (seasonal)." },
      { day: "Day 9", title: "Negombo — Ayurveda & Rest", desc: "Transfer to Negombo on the west coast (approx. 3–4 hrs). Check into an Ayurveda hotel for traditional treatments and relaxation before your departure." },
      { day: "Day 10", title: "Colombo Sightseeing → Airport", desc: "Morning exploration of Colombo — Gangaramaya Temple, Pettah Market, and the vibrant Galle Face Green. Transfer to Colombo Airport (BIA) for your departure flight." },
    ],
  },
];

function Itineraries() {
  const [activeTab, setActiveTab] = useState("4n5d");
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const active = ITINERARIES.find((it) => it.id === activeTab)!;

  return (
    <section id="courses">
      <div className="container">
        <div className="section-eyebrow">MODEL ITINERARIES</div>
        <h2 className="section-title">Suggested Itineraries</h2>
        <p className="section-sub">Not sure where to start? Browse our curated sample itineraries and use them as inspiration for your perfect Sri Lanka journey.</p>
        <div className="course-tabs">
          {ITINERARIES.map((it) => (
            <button key={it.id} className={`course-tab${activeTab === it.id ? " active" : ""}`} onClick={() => setActiveTab(it.id)}>
              {it.label}
            </button>
          ))}
        </div>
        <div className="course-panel active">
          <div className="course-overview">
            <div className="course-meta">
              <h3 style={{ whiteSpace: "pre-line" }}>{active.title}</h3>
              <div className="course-meta-item"><span className="course-meta-label">Duration</span><span className="course-meta-value">{active.duration}</span></div>
              <div className="course-meta-item"><span className="course-meta-label">Focus</span><span className="course-meta-value">{active.focus}</span></div>
              <div className="course-meta-item"><span className="course-meta-label">Highlights</span><span className="course-meta-value">{active.highlights}</span></div>
              <div className="course-meta-item"><span className="course-meta-label">Ideal For</span><span className="course-meta-value">{active.idealFor}</span></div>
            </div>
            <div className="course-timeline">
              <h4>Day-by-Day Overview</h4>
              {active.days.map((d, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-left">
                    <div className="timeline-day">{d.day}</div>
                    {i < active.days.length - 1 && <div className="timeline-line" />}
                  </div>
                  <div className="timeline-content">
                    <h5>{d.title}</h5>
                    <p>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="courses-cta">
          <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
            View All Plans &amp; Get a Quote
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Destinations ─────────────────────────────────────────────────────────────
function Destinations() {
  const dests = [
    { img: IMAGES.hero2, badge: "UNESCO World Heritage Site", title: "Sigiriya Rock Fortress", desc: "An ancient sky palace perched atop a 200m volcanic rock — Sri Lanka's most iconic landmark." },
    { img: IMAGES.hero4, badge: "UNESCO World Heritage Site", title: "Kandy — Temple of the Tooth", desc: "The sacred temple housing the relic of the Buddha's tooth, set beside a tranquil lake." },
    { img: IMAGES.destNuwara, badge: "Tea Country", title: "Nuwara Eliya — Tea Highlands", desc: "Rolling emerald tea estates at altitude. Experience tea plucking, factory tours, and colonial-era plantation hotels." },
    { img: IMAGES.hero5, badge: "UNESCO World Heritage Site", title: "Galle Fort", desc: "A perfectly preserved Dutch colonial fortified city on the southern coast, full of boutiques and cafés." },
    { img: IMAGES.destYala, badge: "Wildlife Safari", title: "Yala National Park", desc: "Home to the world's highest density of leopards. Also spot elephants, crocodiles, and hundreds of bird species." },
    { img: IMAGES.destElla, badge: "Scenic Railway", title: "Ella — Nine Arches Bridge", desc: "The iconic colonial-era railway viaduct surrounded by lush jungle and tea estates. A must-photograph moment." },
  ];
  return (
    <section id="destinations">
      <div className="container">
        <div className="section-eyebrow">DESTINATIONS</div>
        <h2 className="section-title">Sri Lanka's Most<br />Iconic Destinations</h2>
        <p className="section-sub">From UNESCO World Heritage sites to pristine beaches, Sri Lanka packs an extraordinary variety of experiences into a compact island.</p>
        <div className="destinations-grid">
          {dests.map((d, i) => (
            <div key={i} className="dest-card">
              <img src={d.img} alt={d.title} />
              <div className="dest-card-overlay">
                <div className="dest-card-badge">{d.badge}</div>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Reviews ────────────────────────────────────────────────────────────────────────────────
function HomeRatingsMini({ driver, vehicle, operator }: { driver: number; vehicle: number; operator: number }) {
  const overall = Math.round(((driver + vehicle + operator) / 3) * 10) / 10;
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: "8px", padding: "12px 16px", marginTop: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
        <span style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Overall</span>
        <span style={{ fontSize: "1.2rem", fontWeight: 700, color: "#c9a84c", fontFamily: "'Playfair Display', serif" }}>{overall.toFixed(1)}</span>
        <span style={{ color: "#c9a84c", fontSize: "0.85rem", letterSpacing: "1px" }}>
          {[1,2,3,4,5].map(i => {
            if (overall >= i) return <span key={i} style={{ opacity: 1 }}>&#9733;</span>;
            if (overall >= i - 0.5) return <span key={i} style={{ opacity: 0.6 }}>&#9733;</span>;
            return <span key={i} style={{ opacity: 0.2 }}>&#9733;</span>;
          })}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        {([{ label: "Driver", score: driver }, { label: "Vehicle", score: vehicle }, { label: "Operator", score: operator }] as { label: string; score: number }[]).map(({ label, score }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.72rem", color: "#888", width: "56px", flexShrink: 0 }}>{label}</span>
            <div style={{ flex: 1, height: "5px", background: "rgba(255,255,255,0.1)", borderRadius: "3px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(score / 5) * 100}%`, background: "linear-gradient(90deg, #c9a84c, #e8c96a)", borderRadius: "3px" }} />
            </div>
            <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#c9a84c", width: "24px", textAlign: "right" }}>{score.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Reviews() {
  const [slide, setSlide] = useState(0);
  const reviews = [
    {
      photo: "/manus-storage/review1_r_family_eranga_a3545b4c.png",
      photoPosition: "center center",
      name: "The R Family",
      pax: "4 passengers",
      period: "August 2025",
      driver: "Eranga",
      ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
      quote: "Professional service from first enquiry to final drop-off — we felt completely at ease throughout.",
      body: "From pre-booking through the day of travel, the team responded promptly and clearly. Pricing and itinerary planning were explained in a way that left no room for uncertainty. On the day, Eranga drove with care and composure, seamlessly rerouting around congestion to keep us on schedule. His deep knowledge of Anuradhapura, Dambulla, Sigiriya, and Polonnaruwa gave us a rich historical foundation for understanding this remarkable country. We consider ourselves fortunate to have had him as both driver and guide.",
    },
    {
      photo: "/manus-storage/review_lasith_family_ae2d2464.jpeg",
      name: "The R Family",
      pax: "3 passengers",
      period: "March 2026",
      driver: "Lasith",
      ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
      quote: "Lasith was endlessly patient with our children and made every moment of the trip feel effortless.",
      body: "Having Lasith with us was a genuine stroke of luck. His warm manner with the kids put us all at ease, and his clear English meant nothing was ever lost in translation. Punctual, full of thoughtful suggestions for sights and local restaurants, and consistently calm behind the wheel — he was everything we could have asked for. (We'll probably skip that road between Passikudah and Sigiriya next time, though!) We recommend him without hesitation: attentive, knowledgeable, and completely trustworthy. If you're ever in Europe, Lasith — the first round is on us.",
    },
    {
      photo: "/manus-storage/review_ranjana_new_2b654dea.png",
      name: "The H Couple",
      pax: "2 passengers",
      period: "November 2025",
      driver: "Ranjana",
      ratings: { driver: 5.0, vehicle: 4.5, operator: 4.5 },
      quote: "Ranjana turned our Sri Lanka trip into something far beyond ordinary sightseeing.",
      body: "We booked a private charter for two and were paired with Ranjana — a decision we couldn't be happier about. He brought a quiet confidence to every drive, navigating mountain roads and busy town centres with equal ease. What stood out most was his genuine enthusiasm: he suggested a white-water rafting experience we hadn't planned, and it became one of the highlights of the trip. His local knowledge of hidden viewpoints, authentic eateries, and cultural customs enriched every day. Ranjana is the kind of guide who makes you feel like a guest of the country, not just a tourist passing through.",
    },
    {
      photo: "/manus-storage/review_priyantha_couple_e0a47aaf.png",
      name: "The A&S",
      pax: "2 passengers",
      period: "August 2025",
      driver: "Priyanth",
      ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
      quote: "Priyanth made six days feel like a journey with a trusted friend rather than a hired driver.",
      body: "Starting from Colombo Airport, Priyanth guided us through Sigiriya, Kandy, Nuwara Eliya, and Galle over six days. He was punctual and drove with care throughout, always checking in on how we were feeling — something we genuinely appreciated on longer stretches. His cheerful company made every transfer enjoyable, and his insights into Sri Lankan history and culture added real depth to what we saw. He also took us to a breathtaking viewpoint that wasn't in our original plan, and introduced us to local restaurants that were simply outstanding. We'd love to travel with him again on our next visit to Sri Lanka.",
    },
    {
      photo: "/manus-storage/review5_t_couple_indika_519f1510.png",
      name: "The T Couple",
      pax: "2 passengers",
      period: "October 2025",
      driver: "Indika",
      ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
      quote: "Thanks to Indika, our trip became not just sightseeing — it became a richly colourful, unforgettable journey.",
      body: "We travelled as a couple from Negombo through Sigiriya, Kandy, Nuwara Eliya, and Mirissa over five days. On the very first morning — which happened to be a birthday — a cake appeared at breakfast, arranged quietly by Indika through the hotel. He also gave us a small elephant figurine as a gift. We were genuinely moved. Throughout the trip he was a steady, reassuring presence: briefing us before each site, handling early starts without complaint, recommending restaurants he personally frequents (every one was excellent), and even riding the train with us to keep us safe in the crowds. When something seemed overpriced, he'd simply say, 'Let's skip it' — that honesty made us trust him completely. Meeting Indika was, without question, part of what made this trip perfect.",
    },
    {
      photo: "/manus-storage/review_dfamily_chamil_9214e24c.png",
      name: "The D Family",
      pax: "5 passengers",
      period: "December 2025",
      driver: "Chamil",
      ratings: { driver: 5.0, vehicle: 5.0, operator: 4.5 },
      quote: "Despite having to completely rearrange our itinerary after a cyclone, Chamil made it the trip of a lifetime.",
      body: "We travelled as three generations — grandparents, parents, and a child — just after a cyclone had disrupted the island. Chamil constantly gathered the latest information on road conditions and safety, and always proposed the best available routes with our preferences in mind. When we needed to cancel hotels and train bookings and arrange new ones at short notice, he was right there helping us every step of the way. He joined us for the Sigiriya Rock climb and the safari, which gave us enormous reassurance. His attentiveness to our child was especially touching — when tiredness struck at an inconvenient moment, we felt completely comfortable leaving our child in his care. He also took us to local restaurants that only residents would know, and every single meal was a revelation. Chamil's warmth, quick thinking, and natural thoughtfulness won over every member of our family — children and adults alike. We are already looking forward to our next trip to Sri Lanka, and we will absolutely be asking for Chamil again.",
    },
  ];

  // Group reviews into pairs for 2-per-slide display
  const totalSlides = Math.ceil(reviews.length / 2);
  const prevSlide = () => setSlide((s) => (s - 1 + totalSlides) % totalSlides);
  const nextSlide = () => setSlide((s) => (s + 1) % totalSlides);

  const visibleReviews = reviews.slice(slide * 2, slide * 2 + 2);

  return (
    <section id="reviews" style={{ background: "var(--dark2)" }}>
      <div className="container">
        <div className="section-eyebrow">CUSTOMER VOICES</div>
        <h2 className="section-title">What Our Guests Say</h2>
        <p className="section-sub">Real reviews from travellers who have explored Sri Lanka with SLTCS.</p>
        <div className="reviews-slider">
          <div className="reviews-slide-row">
            {visibleReviews.map((r, i) => (
              <div key={slide * 2 + i} className="review-card-v2">
                <div className="review-photo-wrap">
                  <img src={r.photo} alt={r.name} className="review-photo" style={r.photoPosition ? { objectPosition: r.photoPosition } : undefined} />
                </div>
                <div className="review-card-body">
                  <div className="review-quote-v2">"{r.quote}"</div>
                  <div className="review-body-v2">{r.body}</div>
                  {r.ratings && <HomeRatingsMini driver={r.ratings.driver} vehicle={r.ratings.vehicle} operator={r.ratings.operator} />}
                  <div className="review-meta-row" style={{ marginTop: "12px" }}>
                    <div className="review-name-v2">{r.name}</div>
                    <div className="review-tags">
                      <span className="review-tag-item">{r.pax}</span>
                      <span className="review-tag-item">{r.period}</span>
                      <span className="review-tag-item">Driver: {r.driver}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-controls">
            <button className="reviews-nav" onClick={prevSlide} aria-label="Previous">‹</button>
            <div className="reviews-dots">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  className={`reviews-dot${i === slide ? " active" : ""}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
            <button className="reviews-nav" onClick={nextSlide} aria-label="Next">›</button>
          </div>
          {/* More Voice button */}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <a
              href="/voice"
              style={{
                display: "inline-block",
                border: "1.5px solid rgba(201,168,76,0.6)",
                color: "#c9a84c",
                padding: "12px 36px",
                borderRadius: "4px",
                fontSize: "0.85rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                transition: "background 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(201,168,76,0.1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >
              More Voice
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { icon: "💬", title: "1. Send Enquiry", desc: "Fill in the contact form with your travel dates, group size, and preferences." },
    { icon: "📋", title: "2. Receive Proposal", desc: "We'll send a tailored itinerary and quote within 24 hours." },
    { icon: "💳", title: "3. Confirm", desc: "Happy with the plan? Simply confirm your booking. No upfront payment is required — you pay only upon arrival in Sri Lanka." },
    { icon: "🕐", title: "4. Pre-Trip Briefing", desc: "Before departure, we confirm your driver details, meeting point, and final itinerary." },
    { icon: "🏝️", title: "5. Enjoy Sri Lanka!", desc: "Your private driver is with you every step of the way. Relax and explore." },
  ];
  return (
    <section id="how">
      <div className="container">
        <div className="section-eyebrow">HOW IT WORKS</div>
        <h2 className="section-title">Booking Your Sri Lanka<br />Private Driver in 5 Steps</h2>
        <div className="how-steps">
          {steps.map((s, i) => (
            <div key={i} className="how-step">
              <div className="how-step-num">{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Vehicles ─────────────────────────────────────────────────────────────────
function Vehicles() {
  return (
    <section id="vehicles" style={{ background: "var(--dark3)" }}>
      <div className="container">
        <div className="section-eyebrow">VEHICLES</div>
        <h2 className="section-title">Our Fleet</h2>
        <p className="section-sub">All vehicles are air-conditioned, clean, and regularly maintained for your comfort and safety.</p>
        <div className="vehicles-grid">
          <div className="vehicle-card">
            <div className="vehicle-img-wrap">
              <img src="/manus-storage/vehicle_sedan_b6b21042.png" alt="Sedan" className="vehicle-img" />
            </div>
            <h3>Sedan</h3>
            <div className="vehicle-capacity">Up to 3 passengers</div>
            <p>Ideal for solo travellers and couples. Comfortable and economical for touring Sri Lanka.</p>
          </div>
          <div className="vehicle-card featured">
            <div className="vehicle-img-wrap">
              <img src="/manus-storage/vehicle_van_70a807f8.png" alt="Van" className="vehicle-img" />
            </div>
            <h3>Van</h3>
            <div className="vehicle-capacity">Up to 6 passengers</div>
            <p>Our most popular choice. Spacious and comfortable for families and small groups.</p>
          </div>
          <div className="vehicle-card">
            <div className="vehicle-img-wrap">
              <img src="/manus-storage/vehicle_large_van_61632670.png" alt="Large Van" className="vehicle-img" />
            </div>
            <h3>Large Van</h3>
            <div className="vehicle-capacity">Up to 10 passengers</div>
            <p>Perfect for large groups and families. Maximum comfort for long-distance journeys across the island.</p>
          </div>
        </div>
      </div>
    </section>
  );
}


// ─── Company ──────────────────────────────────────────────────────────────────
function Company() {
  return (
    <section id="company" style={{ background: "var(--dark2)" }}>
      <div className="container">
        <div className="section-eyebrow">COMPANY</div>
        <h2 className="section-title">About SLTCS</h2>
        <table className="company-table">
          <tbody>
            <tr><th>Service Name</th><td>SLTCS｜Sri Lanka Car Hire with Private Driver</td></tr>
            <tr><th>Full Name</th><td>Sri Lanka Taxi Charter Service (SLTCS)<br /><small style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Registered Trademark No. 7034996</small></td></tr>
            <tr><th>Business</th><td>Online ground transportation intermediary service</td></tr>
            <tr><th>Coverage Area</th><td>All of Sri Lanka — Colombo, Negombo, Kandy, Sigiriya, Nuwara Eliya, Galle, Yala, and beyond</td></tr>
            <tr><th>Languages</th><td>English</td></tr>
            <tr><th>Operating Hours</th><td>24/7 — Enquiries accepted at any time</td></tr>
            <tr><th>Contact</th><td>Please use the enquiry form on this page</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">SLTCS</div>
            <p>Sri Lanka Car Hire with Private Driver. Fully private, fully flexible charter service covering all of Sri Lanka — trusted by European and UK travellers.</p>
          </div>
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li><a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>Plans</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>Model Itineraries</a></li>
              <li><a href="#vehicles" onClick={(e) => { e.preventDefault(); scrollTo("vehicles"); }}>Vehicles</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Itineraries</h4>
            <ul>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>4 Nights / 5 Days</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 Nights / 6 Days</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>6 Nights / 7 Days</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5–7 Days Cultural</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>10 Days – 2 Weeks</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright © SLTCS｜Sri Lanka Car Hire with Private Driver. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Floating CTA ─────────────────────────────────────────────────────────────
function FloatingCTA() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div className="floating-cta">
      <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
        <span>💬</span> Free Enquiry
      </a>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ margin: 0, padding: 0 }}>
      <Navbar />
      <Hero />
      <Stats />
      <ContactAndWhy />
      <Concerns />
      <Plans />
      <PricingPreview />
      <Itineraries />
      <Destinations />
      <Reviews />
      <HowItWorks />
      <Vehicles />
      <Company />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

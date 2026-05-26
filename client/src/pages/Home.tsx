/**
 * SLTCS – Sri Lanka Car Hire with Private Driver
 * Design: Estetik perjalanan mewah gelap
 * - Playfair Display (serif) untuk tajuk
 * - Inter untuk teks badan
 * - Emas (#c9a84c) aksen pada latar gelap pekat
 * - Tayangan slaid hero penuh-lebar, itinerari bertab, borang hubungi
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
  { src: IMAGES.hero1, alt: "Van putih memandu di jalan Sri Lanka pada waktu matahari terbenam" },
  { src: IMAGES.hero2, alt: "Pemandangan udara Benteng Batu Sigiriya" },
  { src: IMAGES.hero3, alt: "Kereta api ladang teh Sri Lanka yang indah" },
  { src: IMAGES.hero4, alt: "Kuil Gigi Kandy Sri Lanka" },
  { src: IMAGES.hero5, alt: "Parapet kolonial Belanda Benteng Galle" },
];
// Nota: hero1 = imej van (slaid pertama), hero2 = Sigiriya (slaid kedua)

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileItineraryOpen, setMobileItineraryOpen] = useState(false);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const LANGUAGES = [
    { label: "English", url: "https://en.srilanka-charter.com/" },
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
          <li><a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>PELAN</a></li>
          <li className="nav-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button>CONTOH ITINERARI</button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>4 Malam / 5 Hari</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 Malam / 6 Hari</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>6 Malam / 7 Hari</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 hingga 7 Hari – Segitiga Budaya</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>10 Hari hingga 2 Minggu – Pelan Klasik</a>
              </div>
            )}
          </li>
          <li><a href="/vehicles">KENDERAAN</a></li>
          <li><a href="/voice">ULASAN</a></li>
          <li><a href="/price">HARGA</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>HUBUNGI</a></li>
          <li><a href="/faq">SOALAN LAZIM</a></li>
          <li className="nav-dropdown nav-lang-dropdown" onMouseEnter={() => setLangOpen(true)} onMouseLeave={() => setLangOpen(false)}>
            <button style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
              MS
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
          <a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>Pelan</a>
          {/* Model Itinerary accordion */}
          <div className="mobile-accordion">
            <button
              className="mobile-accordion-btn"
              onClick={() => setMobileItineraryOpen(o => !o)}
            >
              <span>Contoh Itinerari</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: mobileItineraryOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              ><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {mobileItineraryOpen && (
              <div className="mobile-accordion-body">
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>4 Malam / 5 Hari</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 Malam / 6 Hari</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>6 Malam / 7 Hari</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5–7 Hari – Segitiga Budaya</a>
                <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>10 Hari hingga 2 Minggu – Klasik</a>
              </div>
            )}
          </div>
          <a href="/vehicles">Kenderaan</a>
          <a href="/price">Harga</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Hubungi</a>
          <a href="/faq">Soalan Lazim</a>
          <a href="/voice">Ulasan</a>
          {/* Language accordion */}
          <div className="mobile-accordion">
            <button
              className="mobile-accordion-btn"
              onClick={() => setMobileLangOpen(o => !o)}
            >
              <span>Bahasa Lain</span>
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                style={{ transform: mobileLangOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              ><path d="M6 9l6 6 6-6" /></svg>
            </button>
            {mobileLangOpen && (
              <div className="mobile-accordion-body">
                {[{label:"English",url:"https://en.srilanka-charter.com/"},{label:"French",url:"https://fr.srilanka-charter.com/"},{label:"Spanish",url:"https://es.srilanka-charter.com/"},{label:"German",url:"https://de.srilanka-charter.com/"},{label:"Dutch",url:"https://nl.srilanka-charter.com/"},{label:"Russian",url:"https://ru.srilanka-charter.com/"},{label:"Japanese",url:"https://sltcs.srilanka-charter.com/"}].map((lang) => (
                  <a key={lang.label} href={lang.url}>{lang.label}</a>
                ))}
              </div>
            )}
          </div>
          <a href="#contact" className="btn-nav-mobile" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Pertanyaan Percuma</a>
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
          <div className="hero-eyebrow">PERKHIDMATAN SRI LANKA CHARTER PERIBADI</div>
          <div className="hero-badge">SEWA KERETA DENGAN PEMANDU</div>
          <h1>Sri Lanka <em>Sewa Kereta</em> dengan Pemandu Peribadi</h1>
          <p className="hero-sub">
            Terokai Sri Lanka mengikut rentak anda sendiri dengan pemandu peribadi yang berdedikasi.
            Sepenuhnya fleksibel, sepenuhnya peribadi — cara terbaik untuk menemui Mutiara Lautan Hindi.
          </p>
          <div className="hero-tags">
            <span className="hero-tag">Sokongan Bahasa Inggeris</span>
            <span className="hero-tag">Perkhidmatan Charter Sepenuhnya Peribadi</span>
            <span className="hero-tag">Pemandu Bertauliah Kerajaan</span>
          </div>
          <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
            Pertanyaan Percuma
          </a>
          </div>
        </div>
      </div>
      <div className="hero-location">
        <div className="hero-location-label">Lokasi</div>
        <div className="hero-location-value">Seluruh Sri Lanka</div>
      </div>
      <div className="hero-dots">
        {SLIDES.map((_, i) => (
          <button key={i} className={`hero-dot${i === current ? " active" : ""}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <div className="hero-scroll">
        <span>Leret</span>
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
          <div className="stat-label">Jumlah Perjalanan Charter</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counts.satisfaction.toFixed(1)}</div>
          <div className="stat-label">Kepuasan Purata</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">{counts.drivers}+</div>
          <div className="stat-label">Pemandu Bertauliah</div>
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
      setSubmitError(err.message || "Gagal menghantar pertanyaan. Sila cuba semula.");
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
      title: "Pemandu Bertauliah Kerajaan",
      desc: "Semua pemandu kami memegang lesen Pemandu Pelancong atau Pemandu Chauffeur rasmi Sri Lanka. Dilatih secara profesional, fokus keselamatan, dan sangat dihargai oleh pelanggan sebelum ini.",
      svgPath: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2zm0 4l6 3.27V12c0 3.79-2.58 7.33-6 8.93-3.42-1.6-6-5.14-6-8.93V9.27L12 6z",
    },
    {
      num: "02",
      title: "Sokongan Bahasa Inggeris Sepenuhnya",
      desc: "Dari pertanyaan pertama hingga penghantaran akhir, pasukan berbahasa Inggeris kami sentiasa bersedia membantu. Tiada halangan bahasa — hanya komunikasi lancar sepanjang perjalanan anda.",
      svgPath: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z",
    },
    {
      num: "03",
      title: "Charter Sepenuhnya Peribadi",
      desc: "Berbeza dengan lawatan berkumpulan, kenderaan dan pemandu anda adalah eksklusif milik anda. Tetapkan jadual sendiri, pilih hentian anda, dan perjalanan mengikut kehendak sendiri sepenuhnya.",
      svgPath: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z",
    },
    {
      num: "04",
      title: "Pengetahuan Tempatan Pakar",
      desc: "Pemandu Chauffeur Guide kami sangat berminat dengan sejarah, budaya, dan masakan Sri Lanka. Mereka akan membawa anda melangkaui buku panduan ke tempat tersembunyi dan pengalaman asli.",
      svgPath: "M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z",
    },
    {
      num: "05",
      title: "Kenderaan Sesuai untuk Setiap Kumpulan",
      desc: "Dari pasangan hingga kumpulan keluarga besar 10 orang, kami padankan kenderaan sempurna dengan saiz kumpulan anda — memastikan keselesaan walaupun perjalanan jarak jauh di seluruh pulau.",
      svgPath: "M17 5H3c-1.1 0-2 .9-2 2v9h2c0 1.65 1.34 3 3 3s3-1.35 3-3h5.5c0 1.65 1.34 3 3 3s3-1.35 3-3H23v-5l-6-6zM3 11V7h4v4H3zm3 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm7-6.5H9V7h4v4zm4.5 6.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM15 11V7h1l4 4h-5z",
    },
    {
      num: "06",
      title: "Dipercayai oleh Pelancong Eropah",
      desc: "Dengan lebih 400 charter selesai dan penarafan kepuasan purata 4.9, SLTCS adalah pilihan utama pelawat UK dan Eropah yang menjelajah Sri Lanka.",
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
            <div className="section-eyebrow">HUBUNGI</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: "0 0 16px" }}>
              Mula Merancang<br />Pengembaraan Sri Lanka<br />Anda
            </h2>
            <p style={{ color: "#4a4a4a", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "8px" }}>
              Beritahu kami tarikh perjalanan, saiz kumpulan, dan keutamaan anda — kami akan balas dengan contoh itinerari dan harga dalam masa 24 jam.
            </p>
            <p style={{ color: "#4a4a4a", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "24px" }}>
              Isikan borang dan hantar. Kami biasanya membalas dalam masa 24 jam. (Komunikasi susulan akan dalam Bahasa Inggeris.)
            </p>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div className="form-grid">
                <div className="form-group full">
                  <label htmlFor="name">NAMA PENUH *</label>
                  <input type="text" id="name" name="name" placeholder="contoh: James Smith" required />
                </div>
                <div className="form-group full">
                  <label htmlFor="country">NEGARA *</label>
                  <select id="country" name="country" required value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">— Pilih negara anda —</option>
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
                    <option value="Other">Lain-lain</option>
                  </select>
                </div>
                {country === "Other" && (
                  <div className="form-group full">
                    <label htmlFor="countryOther">SILA NYATAKAN NEGARA ANDA *</label>
                    <input type="text" id="countryOther" name="countryOther" placeholder="Masukkan negara anda" required />
                  </div>
                )}
                <div className="form-group full">
                  <label htmlFor="email">ALAMAT EMEL *</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" required />
                </div>
                <div className="form-group full">
                  <label htmlFor="phone">NOMBOR TELEFON</label>
                  <input type="tel" id="phone" name="phone" placeholder="+44 7700 000000" />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">TARIKH MULA *</label>
                  <DatePicker id="startDate" name="startDate" value={startDate} onChange={setStartDate} required />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">TARIKH TAMAT *</label>
                  <DatePicker id="endDate" name="endDate" value={endDate} onChange={setEndDate} required />
                </div>
                <div className="form-group full">
                  <label htmlFor="pickup">LOKASI MULA SEWAAN *</label>
                  <select id="pickup" name="pickup" required>
                    <option value="">— Pilih lokasi —</option>
                    <option value="Colombo Airport (BIA)">Colombo Airport (BIA)</option>
                    <option value="Colombo City">Colombo City</option>
                    <option value="Negombo">Negombo</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Sigiriya">Sigiriya</option>
                    <option value="Nuwara Eliya">Nuwara Eliya</option>
                    <option value="Galle">Galle</option>
                    <option value="Other (please specify in notes)">Lain-lain (sila nyatakan dalam nota)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="adults">BILANGAN DEWASA *</label>
                  <select id="adults" name="adults" required>
                    <option value="">Pilih</option>
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                    <option value="7+">7 atau lebih</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="children">BILANGAN KANAK-KANAK</label>
                  <select id="children" name="children">
                    <option value="0">0</option>
                    {[1,2,3].map(n => <option key={n} value={n}>{n}</option>)}
                    <option value="4+">4 atau lebih</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="vehicle">JENIS KENDERAAN *</label>
                  <select id="vehicle" name="vehicle" required>
                    <option value="">— Pilih kenderaan —</option>
                    <option value="Sedan (up to 3 pax)">Sedan (hingga 3 penumpang)</option>
                    <option value="Van (up to 6 pax)">Van (hingga 6 penumpang)</option>
                    <option value="Large Van (up to 10 pax)">Van Besar (hingga 10 penumpang)</option>
                    <option value="Let us recommend">Biarkan kami mencadangkan</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="currency">MATA WANG PILIHAN</label>
                  <select id="currency" name="currency">
                    <option value="">— Pilih mata wang —</option>
                    <option value="GBP">GBP (£ British Pound)</option>
                    <option value="EUR">EUR (€ Euro)</option>
                    <option value="USD">USD ($ US Dollar)</option>
                    <option value="AUD">AUD (A$ Australian Dollar)</option>
                    <option value="MYR">MYR (RM Malaysian Ringgit)</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label htmlFor="notes">DESTINASI / NOTA ITINERARI</label>
                  <textarea id="notes" name="notes" placeholder="Sila senaraikan mana-mana destinasi, tarikan, atau permintaan khas yang anda fikirkan." />
                </div>
              </div>
              {submitError && (
                <div className="form-error" style={{ color: "#e55", marginBottom: "12px", padding: "10px 14px", background: "rgba(220,50,50,0.1)", borderRadius: "6px", border: "1px solid rgba(220,50,50,0.3)" }}>
                  {submitError}
                </div>
              )}
              <p className="form-note" style={{ fontSize: "0.86rem", color: "#8a7b63", marginBottom: "14px" }}>Susulan pertanyaan akan dibuat dalam Bahasa Inggeris oleh kakitangan kami. Pembayaran tunai di Sri Lanka memerlukan pertukaran wang tempatan terlebih dahulu jika diperlukan.</p>
              <button
                type="submit"
                className={`form-submit-btn${isSubmitting ? " loading" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menghantar…" : "Hantar Pertanyaan"}
              </button>
              <p className="form-note">
                Dengan menghantar borang ini, anda bersetuju dengan{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>Polisi Privasi</a>.
                Tiada komitmen diperlukan.
              </p>
            </form>
          </div>

          {/* ── RIGHT: Why SLTCS ──────────────────────────────────────────── */}
          <div id="why">
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
                <span style={{ color: "#c9a84c", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>KENAPA SLTCS</span>
                <div style={{ width: "40px", height: "1px", background: "#c9a84c" }} />
              </div>
              <div style={{ marginBottom: "12px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#c9a84c"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", fontWeight: 700, color: "#1a1a1a", lineHeight: 1.2, margin: 0 }}>
                6 Sebab Kenapa Pelancong<br />Memilih <span style={{ color: "#c9a84c" }}>SLTCS</span>
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

// ─── Concerns ─────────────────────────────────────────────
function Concerns() {
  const concerns = [
    { label: "Halangan bahasa", svgPath: "M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" },
    { label: "Bergerak sendiri", svgPath: "M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" },
    { label: "Dikenakan caj berlebihan", svgPath: "M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" },
    { label: "Kebimbangan keselamatan teksi", svgPath: "M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2zm0 4l6 3.27V12c0 3.79-2.58 7.33-6 8.93-3.42-1.6-6-5.14-6-8.93V9.27L12 6z" },
    { label: "Mencari lokasi yang sesuai", svgPath: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" },
    { label: "Menepati jadual", svgPath: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z" },
    { label: "Melancong dengan kanak-kanak atau warga emas", svgPath: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" },
    { label: "Memahami budaya tempatan", svgPath: "M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" },
  ];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="concerns" style={{ background: "#0d0f13", padding: "100px 0" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "56px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ width: "32px", height: "1px", background: "#c9a84c" }} />
            <span style={{ color: "#c9a84c", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>KEPRIHATINAN ANDA</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, margin: 0 }}>
            Risau Tentang Perjalanan<br />di <span style={{ color: "#c9a84c" }}>Sri Lanka?</span>
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
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: "0 0 8px" }}>SLTCS Menyelesaikan Setiap Keprihatinan Ini</h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, maxWidth: "560px" }}>Pemandu peribadi anda yang berdedikasi menguruskan segalanya — navigasi, komunikasi, penjadualan, dan kepakaran tempatan. Anda cuma perlu duduk dan nikmati perjalanan.</p>
            </div>
          </div>
          <button
            onClick={() => scrollTo("contact")}
            style={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: "10px", background: "#c9a84c", border: "none", color: "#0a0c0f", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "16px 36px", borderRadius: "3px", cursor: "pointer", transition: "opacity 0.2s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.88"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            Pertanyaan Percuma — Ia Percuma
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
        <div className="section-eyebrow">PELAN KAMI</div>
        <h2 className="section-title">Pilih Pelan<br />Yang Paling Sesuai Untuk Anda</h2>
        <p className="section-sub">Sama ada anda melancong dengan bajet yang terhad atau mencari pengalaman premium, kami mempunyai pelan yang disesuaikan untuk keperluan anda.</p>
        <div className="plans-grid">
          <div className="plan-card">
            <div className="plan-tier">BRONZE</div>
            <h3>Pelan Bronze</h3>
            <p>Untuk pengembara yang berjimat cermat dan memerlukan pengangkutan yang boleh dipercayai.</p>
            <ul className="plan-features">
              <li>Susunan pemandu latihan</li>
              <li>Pemindahan lapangan terbang & pemindahan titik ke titik</li>
              <li>Penyelaras tempatan yang bertutur bahasa Inggeris</li>
              <li>Kenderaan bersih dan berhawa dingin</li>
            </ul>
            <a href="#contact" className="plan-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Lihat Butiran</a>
          </div>
          <div className="plan-card featured">
            <div className="plan-badge-popular">Paling Popular</div>
            <div className="plan-tier">SILVER</div>
            <h3>Pelan Silver</h3>
            <p>Gabungan terbaik nilai dan kualiti — pilihan paling popular kami.</p>
            <ul className="plan-features">
              <li>Pemandu Pelancong bertauliah Kerajaan atau lebih tinggi</li>
              <li>Teman dan ulasan di tempat tarikan</li>
              <li>Penyelaras tempatan yang bertutur bahasa Inggeris</li>
              <li>Tempahan safari & aktiviti diuruskan</li>
              <li>Perkhidmatan panduan disertakan tanpa caj tambahan</li>
            </ul>
            <a href="#contact" className="plan-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Lihat Butiran</a>
          </div>
          <div className="plan-card">
            <div className="plan-tier">GOLD</div>
            <h3>Pelan Gold</h3>
            <p>Untuk pengembara yang mahukan pengalaman Sri Lanka terbaik.</p>
            <ul className="plan-features">
              <li>Pemandu Chauffeur Guide bertaraf tinggi dijamin</li>
              <li>Teman sepanjang hari & ulasan pakar</li>
              <li>Penyelaras tempatan yang bertutur bahasa Inggeris</li>
              <li>Struktur sokongan berganda untuk ketenangan fikiran</li>
              <li>Perkhidmatan tahap concierge premium</li>
            </ul>
            <a href="#contact" className="plan-cta" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Lihat Butiran</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing Preview ─────────────────────────────────────────────────────────
type VehicleKeyHP = "sedan" | "van" | "bigvan";
type TierKeyHP = "bronze" | "silver" | "gold";
type CurrencyKeyHP = "USD" | "GBP" | "EUR" | "AUD" | "MYR";

const CURRENCY_SYMBOLS_HP: Record<CurrencyKeyHP, string> = { USD: "$", GBP: "£", EUR: "€", AUD: "A$", MYR: "RM" };

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
  { key: "bronze", label: "Pelan Bronze", color: "#cd7f32" },
  { key: "silver", label: "Pelan Silver", badge: "Paling Popular", color: "#c9a84c" },
  { key: "gold",   label: "Pelan Gold",   color: "#d4af37" },
];

const VEHICLES_HP: { key: VehicleKeyHP; label: string; capacity: string }[] = [
  { key: "sedan",  label: "Sedan",   capacity: "1–3 orang" },
  { key: "van",    label: "Van",     capacity: "3–6 orang" },
  { key: "bigvan", label: "Big Van", capacity: "6–9 orang" },
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
              <th style={{ padding: "8px 14px", textAlign: "left", color: "#888", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: "#f4f0e8" }}>Hari</th>
              <th style={{ padding: "8px 14px", textAlign: "right", color: "#888", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", background: "#f4f0e8" }}>Harga (termasuk cukai)</th>
            </tr>
          </thead>
          <tbody>
            {DAYS_HP.map((day, idx) => (
              <tr key={day} style={{ borderBottom: "1px solid #ede8e0", background: idx % 2 === 0 ? "transparent" : "#faf7f2" }}>
                <td style={{ padding: "8px 14px", color: "#4a4a4a", fontSize: "0.82rem" }}>{day} hari</td>
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
        <div className="section-eyebrow">HARGA TELUS</div>
        <h2 className="section-title">Senarai Harga Tetap</h2>
        <p className="section-sub" style={{ marginBottom: "32px" }}>Semua harga termasuk cukai dan untuk pemandu yang bertutur dalam Bahasa Inggeris. Pilih mata wang dan jenis kenderaan pilihan anda.</p>

        {/* Currency Tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "28px", flexWrap: "wrap" }}>
          {(["USD", "GBP", "EUR", "AUD", "MYR"] as CurrencyKeyHP[]).map((c) => (
            <button key={c} onClick={() => setCurrency(c)} style={{ padding: "8px 20px", background: currency === c ? "rgba(201,168,76,0.15)" : "#ffffff", border: currency === c ? "1.5px solid rgba(201,168,76,0.6)" : "1.5px solid #d1ccc4", borderRadius: "6px", color: currency === c ? "#c9a84c" : "#4a4a4a", fontSize: "0.85rem", fontWeight: currency === c ? 700 : 400, cursor: "pointer", transition: "all 0.2s" }}>
              {CURRENCY_SYMBOLS_HP[c]} {c}
            </button>
          ))}
        </div>

        {/* Note */}
        <div style={{ background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "8px", padding: "12px 18px", marginBottom: "28px" }}>
          <p style={{ color: "#4a4a4a", fontSize: "0.85rem", lineHeight: 1.7, margin: 0 }}>
            <strong style={{ color: "#c9a84c" }}>Nota:</strong> Caj tambahan mungkin dikenakan jika jarak perjalanan melebihi anggaran biasa, atau jika titik ambil/hantar berada di luar kawasan lapangan terbang.
          </p>
        </div>

        {/* Plan Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {TIERS_HP.map((tier) => <PriceCard key={tier.key} tier={tier} currency={currency} />)}
        </div>

        {/* Link to full price page */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a href="/price" className="btn-outline" style={{ display: "inline-block" }}>Lihat Halaman Harga Penuh →</a>
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
    title: "4 Malam / 5 Hari",
    duration: "5 Hari",
    focus: "Sorotan Budaya",
    highlights: "Sigiriya, Kandy, Nuwara Eliya, Galle",
    idealFor: "Pelawat pertama yang ada jadual ketat",
    days: [
      { day: "Hari 1", title: "Ketibaan → Sigiriya", desc: "Tiba di Lapangan Terbang Colombo. Pandu ke Sigiriya melalui Kuil Gua Dambulla (UNESCO). Daftar masuk ke hotel anda di kawasan Sigiriya." },
      { day: "Hari 2", title: "Benteng Batu Sigiriya", desc: "Mendaki awal pagi ke Batu Sigiriya (UNESCO). Petang untuk masa lapang atau safari jeep pilihan di Taman Negara Minneriya." },
      { day: "Hari 3", title: "Kandy — Kuil Gigi", desc: "Pandu ke Kandy melalui kebun rempah di Matale. Lawati Kuil Relik Gigi Suci (UNESCO). Persembahan tarian Kandyan pada waktu malam." },
      { day: "Hari 4", title: "Nuwara Eliya → Galle", desc: "Pemanduan indah melalui ladang teh bergulung. Pengalaman memetik teh. Teruskan ke Kota Galle (UNESCO) di pantai selatan." },
      { day: "Hari 5", title: "Kota Galle → Berlepas", desc: "Eksplorasi pagi Kota Galle dengan benteng kolonial Belanda, kedai butik, dan pemandangan laut. Pemindahan ke Lapangan Terbang Colombo." },
    ],
  },
  {
    id: "5n6d",
    label: "5N/6D",
    title: "5 Malam / 6 Hari",
    duration: "6 Hari",
    focus: "Budaya + Alam",
    highlights: "Sigiriya, Kandy, Ella, Galle",
    idealFor: "Pasangan & kumpulan kecil",
    days: [
      { day: "Hari 1", title: "Ketibaan → Sigiriya", desc: "Tiba di Lapangan Terbang Colombo. Pandu ke Sigiriya melalui Kuil Gua Dambulla. Bermalam di kawasan Sigiriya." },
      { day: "Hari 2", title: "Batu Sigiriya & Safari", desc: "Mendaki Batu Sigiriya pada pagi hari. Safari hidupan liar petang di Taman Negara Minneriya atau Kaudulla." },
      { day: "Hari 3", title: "Lawatan Kandy", desc: "Perjalanan ke Kandy melalui Kebun Rempah Matale. Lawati Kuil Relik Gigi dan Taman Botani Peradeniya." },
      { day: "Hari 4", title: "Nuwara Eliya & Ella", desc: "Pandu melalui dataran tinggi teh yang menakjubkan. Lawatan kilang teh, kemudian ke Ella untuk Jambatan Sembilan Lengkungan yang terkenal." },
      { day: "Hari 5", title: "Safari Taman Negara Yala", desc: "Safari jeep sehari penuh di Taman Negara Yala — rumah kepada harimau bintang, gajah, dan burung eksotik." },
      { day: "Hari 6", title: "Kota Galle → Berlepas", desc: "Lawatan pagi ke Kota Galle (UNESCO). Pemindahan ke Lapangan Terbang Colombo untuk berlepas." },
    ],
  },
  {
    id: "6n7d",
    label: "6N/7D",
    title: "6 Malam / 7 Hari",
    duration: "7 Hari",
    focus: "Pengalaman Pulau Penuh",
    highlights: "Sigiriya, Kandy, Kereta Api Teh, Yala, Galle",
    idealFor: "Keluarga & penjelajah mendalam",
    days: [
      { day: "Hari 1", title: "Ketibaan → Segitiga Budaya", desc: "Tiba di BIA. Pandu ke utara melalui Kuil Gua Dambulla ke kawasan Sigiriya / Kandalama." },
      { day: "Hari 2", title: "Sigiriya & Polonnaruwa", desc: "Mendaki Batu Sigiriya. Lawatan petang ke bandar kuno Polonnaruwa (Warisan Dunia UNESCO)." },
      { day: "Hari 3", title: "Kandy", desc: "Pandu ke Kandy melalui kebun rempah. Lawati Kuil Relik Gigi dan nikmati persembahan tarian tradisional Kandyan." },
      { day: "Hari 4", title: "Nuwara Eliya — Dataran Teh", desc: "Pemanduan indah melalui kawasan teh. Pengalaman memetik teh dan minum teh tinggi di hotel ladang era kolonial." },
      { day: "Hari 5", title: "Ella & Jambatan Sembilan Lengkungan", desc: "Naik kereta api teh ikonik. Lawat Jambatan Sembilan Lengkungan dan Puncak Adam Kecil di Ella." },
      { day: "Hari 6", title: "Taman Negara Yala", desc: "Safari jeep sehari penuh di Yala — rizab hidupan liar utama Sri Lanka. Harimau bintang, gajah, buaya dan banyak lagi." },
      { day: "Hari 7", title: "Kota Galle → Berlepas", desc: "Pagi di Kota Galle (UNESCO). Pemindahan ke Lapangan Terbang Colombo melalui pantai Mirissa (henti pilihan)." },
    ],
  },
  {
    id: "5to7d",
    label: "5–7 Hari Budaya",
    title: "5 hingga 7 Hari\nFokus Segitiga Budaya",
    duration: "5–7 Hari",
    focus: "Tapak Warisan UNESCO & Safari",
    highlights: "Sigiriya, Anuradhapura, Polonnaruwa, Kandy",
    idealFor: "Penggemar sejarah & budaya",
    days: [
      { day: "Hari 1", title: "Lapangan Terbang → Kuil Gua Dambulla → Kawasan Sigiriya", desc: "Berlepas dari Lapangan Terbang Colombo (kira-kira 3–4 jam memandu). Dalam perjalanan, lawati Kuil Gua Dambulla — tapak Warisan Dunia UNESCO yang mengagumkan terukir pada muka batu. Daftar masuk di Heritance Kandalama, karya seni reka bentuk Geoffrey Bawa." },
      { day: "Hari 2", title: "Benteng Batu Sigiriya & Safari Minneriya", desc: "Pendakian awal pagi ke Batu Sigiriya (UNESCO) — ambil masa 2.5–3 jam untuk perjalanan pergi balik. Safari jeep petang di Taman Negara Minneriya, terkenal dengan pertemuan gajahnya. Kembali ke hotel." },
      { day: "Hari 3", title: "Ibu Kota Purba Anuradhapura", desc: "Terokai runtuhan Anuradhapura yang luas dan disenaraikan UNESCO — ibu kota purba pertama Sri Lanka. Lawati Pokok Bodhi suci, Stupa Ruwanwelisaya, dan monumen mengagumkan lain. Luangkan sehari penuh untuk tapak besar ini." },
      { day: "Hari 4", title: "Polonnaruwa & Batu Pidurangala", desc: "Pendakian pilihan pagi ke Batu Pidurangala untuk pemandangan menakjubkan Sigiriya. Kemudian terokai bandar zaman pertengahan Polonnaruwa (UNESCO) — kuil, istana, dan patung Buddha gergasi yang terpelihara dengan baik." },
      { day: "Hari 5", title: "Kandy melalui Kebun Rempah", desc: "Pandu ke Kandy melalui kebun rempah tradisional di Matale. Lawati Kuil Relik Gigi Suci (UNESCO). Nikmati persembahan tarian budaya Kandyan pada waktu malam." },
      { day: "Hari 6", title: "Lawatan Colombo & Ayurveda (Pilihan)", desc: "Terokai seni bina kolonial Colombo, pasar meriah, dan tepi laut. Pilihan: daftar masuk hotel Ayurveda di Negombo untuk berehat sebelum berlepas." },
      { day: "Hari 7", title: "Pemindahan ke Lapangan Terbang", desc: "Pagi terakhir bersantai. Pemindahan ke Lapangan Terbang Colombo (BIA) untuk penerbangan pulang anda." },
    ],
  },
  {
    id: "10to14d",
    label: "10 Hari–2 Minggu",
    title: "10 Hari ke 2 Minggu\nRancangan Klasik Pertama Kali",
    duration: "10–14 Hari",
    focus: "Pengalaman Pulau Lengkap",
    highlights: "Sigiriya, Kandy, Kereta Api Teh, Yala, Galle, Pantai",
    idealFor: "Pelawat pertama yang mahu pengalaman penuh Sri Lanka",
    days: [
      { day: "Hari 1", title: "Lapangan Terbang → Kuil Gua Dambulla → Sigiriya", desc: "Bertolak dari Lapangan Terbang Colombo atau Negombo. Memandu ke Segitiga Budaya (kira-kira 3 jam). Berhenti di Kuil Gua Dambulla untuk makan tengah hari dan bersiar-siar. Daftar masuk di Heritance Kandalama — sebuah hotel terkenal Geoffrey Bawa yang terletak di tengah hutan dan tasik." },
      { day: "Hari 2", title: "Batu Sigiriya & Anuradhapura", desc: "Memanjat Benteng Batu Sigiriya (UNESCO) pada waktu pagi. Pemindahan ke ibu kota kuno Anuradhapura (1.5–2 jam). Terokai Pokok Bodhi yang suci, stupa, dan runtuhan purba. Kembali ke hotel." },
      { day: "Hari 3", title: "Kandy — Kebun Rempah & Kuil", desc: "Memandu ke Kandy melalui kebun rempah di Matale (kira-kira 3 jam). Lawati Kilang Teh Geragama dan Kuil Relik Gigi Buddha (UNESCO). Persembahan tarian Kandyan pada waktu malam." },
      { day: "Hari 4", title: "Nuwara Eliya — Tanah Tinggi Teh", desc: "Pemanduan gunung yang indah ke Nuwara Eliya melalui ladang teh yang bergulung. Pengalaman memetik teh dan minum teh petang di hotel ladang kolonial. Terokai bandar 'Little England' yang menawan." },
      { day: "Hari 5", title: "Kereta Api Teh yang Indah — Jambatan Sembilan Lengkungan", desc: "Naik kereta api negara teh yang ikonik untuk perjalanan yang menakjubkan melalui gunung berkabus. Bergambar di Jambatan Sembilan Lengkungan yang terkenal. Tiba di Ella." },
      { day: "Hari 6", title: "Lawatan Ella → Yala", desc: "Pendakian pagi ke Little Adam's Peak dan Ella Rock untuk pemandangan panoramik. Pemindahan petang ke kawasan Yala (kira-kira 2 jam). Daftar masuk ke pondok safari." },
      { day: "Hari 7", title: "Safari Taman Negara Yala → Pantai Mirissa", desc: "Safari jeep awal pagi di Yala — taman hidupan liar paling terkenal di Sri Lanka, rumah kepada kepadatan harimau kumbang tertinggi di dunia. Pemindahan petang ke resort pantai Mirissa." },
      { day: "Hari 8", title: "Benteng Galle & Hari di Pantai", desc: "Lawatan pagi ke Benteng Galle yang disenaraikan UNESCO — kubu kolonial Belanda, kedai butik, dan pemandangan laut. Petang santai di pantai Mirissa. Pilihan menonton ikan paus (musiman)." },
      { day: "Hari 9", title: "Negombo — Ayurveda & Rehat", desc: "Pemindahan ke Negombo di pantai barat (kira-kira 3–4 jam). Daftar masuk ke hotel Ayurveda untuk rawatan tradisional dan relaksasi sebelum berlepas." },
      { day: "Hari 10", title: "Lawatan Colombo → Lapangan Terbang", desc: "Penjelajahan pagi di Colombo — Kuil Gangaramaya, Pasar Pettah, dan Galle Face Green yang meriah. Pemindahan ke Lapangan Terbang Colombo (BIA) untuk penerbangan pulang." },
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
        <div className="section-eyebrow">CONTOH ITINERARI</div>
        <h2 className="section-title">Itinerari Cadangan</h2>
        <p className="section-sub">Tidak pasti dari mana hendak mula? Semak contoh itinerari terpilih kami dan gunakan sebagai inspirasi untuk perjalanan sempurna anda ke Sri Lanka.</p>
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
              <div className="course-meta-item"><span className="course-meta-label">Tempoh</span><span className="course-meta-value">{active.duration}</span></div>
              <div className="course-meta-item"><span className="course-meta-label">Tumpuan</span><span className="course-meta-value">{active.focus}</span></div>
              <div className="course-meta-item"><span className="course-meta-label">Sorotan</span><span className="course-meta-value">{active.highlights}</span></div>
              <div className="course-meta-item"><span className="course-meta-label">Sesuai Untuk</span><span className="course-meta-value">{active.idealFor}</span></div>
            </div>
            <div className="course-timeline">
              <h4>Gambaran Hari demi Hari</h4>
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
            Lihat Semua Pelan &amp; Dapatkan Sebutharga
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Destinations ─────────────────────────────────────────────────────────────
function Destinations() {
  const dests = [
    { img: IMAGES.hero2, badge: "Tapak Warisan Dunia UNESCO", title: "Benteng Batu Sigiriya", desc: "Istana langit purba yang bertenggek di atas batu gunung berapi setinggi 200m — mercu tanda paling ikonik di Sri Lanka." },
    { img: IMAGES.hero4, badge: "Tapak Warisan Dunia UNESCO", title: "Kandy — Kuil Gigi", desc: "Kuil suci yang menyimpan relik gigi Buddha, terletak di sebelah tasik yang tenang." },
    { img: IMAGES.destNuwara, badge: "Negeri Teh", title: "Nuwara Eliya — Tanah Tinggi Teh", desc: "Ladang teh zamrud yang bergulung di kawasan tinggi. Alami memetik teh, lawatan kilang, dan hotel ladang era kolonial." },
    { img: IMAGES.hero5, badge: "Tapak Warisan Dunia UNESCO", title: "Benteng Galle", desc: "Bandar berkubu kolonial Belanda yang terpelihara sempurna di pantai selatan, penuh dengan butik dan kafe." },
    { img: IMAGES.destYala, badge: "Safari Hidupan Liar", title: "Taman Negara Yala", desc: "Rumah kepada kepadatan harimau kumbang tertinggi di dunia. Juga boleh melihat gajah, buaya, dan beratus-ratus spesies burung." },
    { img: IMAGES.destElla, badge: "Kereta Api Pemandangan", title: "Ella — Jambatan Sembilan Lengkungan", desc: "Viaduk kereta api era kolonial yang ikonik, dikelilingi hutan rimba dan ladang teh. Saat yang wajib dirakam." },
  ];
  return (
    <section id="destinations">
      <div className="container">
        <div className="section-eyebrow">DESTINASI</div>
        <h2 className="section-title">Destinasi Paling Ikonik<br />di Sri Lanka</h2>
        <p className="section-sub">Daripada tapak Warisan Dunia UNESCO ke pantai yang murni, Sri Lanka menawarkan pelbagai pengalaman luar biasa dalam sebuah pulau yang padat.</p>
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
        <span style={{ fontSize: "0.72rem", color: "#888", letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>Keseluruhan</span>
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
        {([{ label: "Pemandu", score: driver }, { label: "Kenderaan", score: vehicle }, { label: "Operator", score: operator }] as { label: string; score: number }[]).map(({ label, score }) => (
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
      name: "Keluarga R",
      pax: "4 penumpang",
      period: "Ogos 2025",
      driver: "Eranga",
      ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
      quote: "Perkhidmatan profesional dari pertanyaan pertama hingga penghantaran akhir — kami berasa tenang sepanjang masa.",
      body: "Daripada tempahan awal hingga hari perjalanan, pasukan bertindak balas dengan pantas dan jelas. Harga dan perancangan itinerari diterangkan dengan cara yang tiada kekeliruan. Pada hari itu, Eranga memandu dengan penuh perhatian dan tenang, mengubah jalan tanpa gangguan untuk memastikan kami sentiasa mengikut jadual. Pengetahuannya yang mendalam tentang Anuradhapura, Dambulla, Sigiriya, dan Polonnaruwa memberi asas sejarah yang kukuh untuk memahami negara yang luar biasa ini. Kami berasa bertuah kerana dia menjadi pemandu dan juga pemandu pelancong kami.",
    },
    {
      photo: "/manus-storage/review_lasith_family_ae2d2464.jpeg",
      name: "Keluarga R",
      pax: "3 penumpang",
      period: "Mac 2026",
      driver: "Lasith",
      ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
      quote: "Lasith sangat sabar dengan anak-anak kami dan menjadikan setiap saat perjalanan sangat mudah.",
      body: "Mempunyai Lasith bersama kami adalah satu tuah sebenar. Sikap mesranya dengan kanak-kanak memberikan ketenangan kepada kami semua, dan Bahasa Inggerisnya yang jelas memastikan tiada yang hilang dalam terjemahan. Tepat masa, penuh cadangan baik tempat menarik dan restoran tempatan, serta sentiasa tenang ketika memandu — dia adalah segala yang kami harapkan. (Mungkin kami akan elakkan jalan antara Passikudah dan Sigiriya pada masa hadapan!) Kami sangat mengesyorkan beliau: penyayang, berpengetahuan, dan boleh dipercayai sepenuhnya. Jika anda berada di Eropah suatu hari nanti, Lasith — minuman pertama atas kami.",
    },
    {
      photo: "/manus-storage/review_ranjana_new_2b654dea.png",
      name: "Pasangan H",
      pax: "2 penumpang",
      period: "November 2025",
      driver: "Ranjana",
      ratings: { driver: 5.0, vehicle: 4.5, operator: 4.5 },
      quote: "Ranjana menjadikan perjalanan Sri Lanka kami sesuatu yang jauh melampaui lawatan biasa.",
      body: "Kami menempah sewa kereta dengan pemandu untuk dua orang dan ditempatkan bersama Ranjana — keputusan yang sangat kami hargai. Dia membawa keyakinan tenang dalam setiap pemanduan, mengendalikan jalan gunung dan pusat bandar yang sibuk dengan mudah. Yang paling menonjol adalah semangat jujurnya: dia mencadangkan pengalaman arung jeram yang tidak kami rancangkan, dan ia menjadi salah satu kemuncak perjalanan. Pengetahuan tempatan tentang tempat pandangan tersembunyi, tempat makan asli, dan adat budaya memperkayakan setiap hari. Ranjana adalah jenis pemandu yang membuat anda rasa seperti tetamu negara ini, bukan hanya pelancong yang lalu.",
    },
    {
      photo: "/manus-storage/review_priyantha_couple_e0a47aaf.png",
      name: "The A&S",
      pax: "2 penumpang",
      period: "Ogos 2025",
      driver: "Priyanth",
      ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
      quote: "Priyanth membuatkan enam hari terasa seperti perjalanan bersama teman dipercayai dan bukan hanya pemandu sewa.",
      body: "Bermula dari Lapangan Terbang Colombo, Priyanth membimbing kami melalui Sigiriya, Kandy, Nuwara Eliya, dan Galle selama enam hari. Dia sentiasa tepat waktu dan memandu dengan berhati-hati, selalu bertanya tentang keadaan kami — sesuatu yang kami hargai terutama pada perjalanan jauh. Syarikatnya yang ceria membuat setiap perjalanan menjadi menyeronokkan, dan pengetahuannya tentang sejarah dan budaya Sri Lanka menambah kedalaman sebenar kepada apa yang kami lihat. Dia juga membawa kami ke tempat pandangan yang memukau yang tidak ada dalam rancangan asal kami, dan memperkenalkan kami kepada restoran tempatan yang luar biasa. Kami sangat ingin melancong bersamanya lagi apabila melawat Sri Lanka akan datang.",
    },
    {
      photo: "/manus-storage/review5_t_couple_indika_519f1510.png",
      name: "The T Couple",
      pax: "2 penumpang",
      period: "Oktober 2025",
      driver: "Indika",
      ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
      quote: "Terima kasih kepada Indika, perjalanan kami bukan sekadar pemandangan — ia menjadi perjalanan berwarna-warni yang tidak dapat dilupakan.",
      body: "Kami melancong sebagai pasangan dari Negombo melalui Sigiriya, Kandy, Nuwara Eliya, dan Mirissa selama lima hari. Pada pagi pertama — yang kebetulan adalah hari jadi — kek tiba ketika sarapan, yang disusun secara diam-diam oleh Indika melalui hotel. Dia juga memberikan kami sefigurine gajah kecil sebagai hadiah. Kami sangat terharu. Sepanjang perjalanan, dia merupakan kehadiran yang mantap dan menenangkan: memberi taklimat sebelum setiap tempat, menghadapi permulaan awal tanpa rungutan, mencadangkan restoran yang sering dia kunjungi (semuanya hebat), dan bahkan menaiki kereta api bersama kami untuk menjaga keselamatan dalam kerumunan. Bila sesuatu kelihatan mahal, dia hanya berkata, 'Mari kita langkau' — kejujuran itu membuat kami percaya sepenuhnya kepadanya. Bertemu Indika tanpa ragu-ragu adalah sebahagian daripada yang menjadikan perjalanan ini sempurna.",
    },
    {
      photo: "/manus-storage/review_dfamily_chamil_9214e24c.png",
      name: "The D Family",
      pax: "5 penumpang",
      period: "Disember 2025",
      driver: "Chamil",
      ratings: { driver: 5.0, vehicle: 5.0, operator: 4.5 },
      quote: "Walaupun terpaksa menyusun semula sepenuhnya itinerari kami selepas taufan, Chamil menjadikan ia perjalanan seumur hidup.",
      body: "Kami melancong sebagai tiga generasi — datuk nenek, ibu bapa, dan seorang kanak-kanak — sejurus selepas taufan mengganggu pulau. Chamil sentiasa mengumpul maklumat terkini mengenai keadaan jalan dan keselamatan, dan selalu mencadangkan laluan terbaik dengan mengambil kira keutamaan kami. Bila kami perlu membatalkan tempahan hotel dan kereta api serta mengatur yang baru pada saat akhir, dia sentiasa membantu setiap langkah. Dia turut menyertai kami dalam pendakian Batu Sigiriya dan safari, yang memberikan kami jaminan besar. Perhatiannya terhadap anak kami sangat menyentuh — ketika keletihan datang pada masa yang tidak sesuai, kami rasa selesa menyerahkan anak kami dalam jagaan dia. Dia juga membawa kami ke restoran tempatan yang hanya diketahui penduduk, dan setiap hidangan adalah penemuan baru. Kehangatan, pemikiran pantas, dan keprihatinan semula jadi Chamil memikat setiap ahli keluarga kami — kanak-kanak dan dewasa sama. Kami sudah tidak sabar untuk perjalanan kami yang seterusnya ke Sri Lanka, dan pasti akan meminta Chamil lagi.",
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
        <div className="section-eyebrow">SUARA PELANGGAN</div>
        <h2 className="section-title">Apa Kata Tetamu Kami</h2>
        <p className="section-sub">Ulasan sebenar daripada pelancong yang telah meneroka Sri Lanka bersama SLTCS.</p>
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
                      <span className="review-tag-item">Pemandu: {r.driver}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="reviews-controls">
            <button className="reviews-nav" onClick={prevSlide} aria-label="Sebelumnya">‹</button>
            <div className="reviews-dots">
              {Array.from({ length: totalSlides }).map((_, i) => (
                <button
                  key={i}
                  className={`reviews-dot${i === slide ? " active" : ""}`}
                  onClick={() => setSlide(i)}
                  aria-label={`Slaid ${i + 1}`}
                />
              ))}
            </div>
            <button className="reviews-nav" onClick={nextSlide} aria-label="Seterusnya">›</button>
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
              Lebih Banyak Ulasan
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
    { icon: "💬", title: "1. Hantar Pertanyaan", desc: "Isikan borang pertanyaan dengan tarikh perjalanan, bilangan kumpulan, dan keutamaan anda." },
    { icon: "📋", title: "2. Terima Cadangan", desc: "Kami akan menghantar contoh itinerari dan harga dalam masa 24 jam." },
    { icon: "💳", title: "3. Sahkan", desc: "Berpuas hati dengan rancangan? Sahkan tempahan anda. Tiada bayaran awal diperlukan — anda hanya bayar setiba di Sri Lanka." },
    { icon: "🕐", title: "4. Taklimat Pra-Perjalanan", desc: "Sebelum berlepas, kami mengesahkan butiran pemandu, tempat bertemu, dan itinerari akhir anda." },
    { icon: "🏝️", title: "5. Nikmati Sri Lanka!", desc: "Pemandu peribadi anda akan bersama anda setiap langkah. Berehat dan jelajah." },
  ];
  return (
    <section id="how">
      <div className="container">
        <div className="section-eyebrow">CARA BERFUNGSI</div>
        <h2 className="section-title">Tempah Pemandu Peribadi Sri Lanka<br />dalam 5 Langkah</h2>
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
        <div className="section-eyebrow">KENDERAAN</div>
        <h2 className="section-title">Kenderaan Kami</h2>
        <p className="section-sub">Semua kenderaan berpenyejuk udara, bersih, dan diselenggara dengan rapi untuk keselesaan dan keselamatan anda.</p>
        <div className="vehicles-grid">
          <div className="vehicle-card">
            <div className="vehicle-img-wrap">
              <img src="/manus-storage/vehicle_sedan_b6b21042.png" alt="Sedan" className="vehicle-img" />
            </div>
            <h3>Sedan</h3>
            <div className="vehicle-capacity">Sehingga 3 penumpang</div>
            <p>Sesuai untuk pelancong solo dan pasangan. Selesa dan ekonomik untuk melawat Sri Lanka.</p>
          </div>
          <div className="vehicle-card featured">
            <div className="vehicle-img-wrap">
              <img src="/manus-storage/vehicle_van_70a807f8.png" alt="Van" className="vehicle-img" />
            </div>
            <h3>Van</h3>
            <div className="vehicle-capacity">Sehingga 6 penumpang</div>
            <p>Pilihan paling popular kami. Luas dan selesa untuk keluarga dan kumpulan kecil.</p>
          </div>
          <div className="vehicle-card">
            <div className="vehicle-img-wrap">
              <img src="/manus-storage/vehicle_large_van_61632670.png" alt="Van Besar" className="vehicle-img" />
            </div>
            <h3>Van Besar</h3>
            <div className="vehicle-capacity">Sehingga 10 penumpang</div>
            <p>Sesuai untuk kumpulan besar dan keluarga. Keselesaan maksimum untuk perjalanan jarak jauh merentasi pulau.</p>
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
        <div className="section-eyebrow">SYARIKAT</div>
        <h2 className="section-title">Mengenai SLTCS</h2>
        <table className="company-table">
          <tbody>
            <tr><th>Nama Perkhidmatan</th><td>SLTCS｜Sri Lanka Sewa Kereta dengan Pemandu Peribadi</td></tr>
            <tr><th>Nama Penuh</th><td>Sri Lanka Taxi Charter Service (SLTCS)<br /><small style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Cap Dagangan Berdaftar No. 7034996</small></td></tr>
            <tr><th>Perkhidmatan</th><td>Perkhidmatan perantara pengangkutan darat dalam talian</td></tr>
            <tr><th>Wilayah Liputan</th><td>Seluruh Sri Lanka — Colombo, Negombo, Kandy, Sigiriya, Nuwara Eliya, Galle, Yala, dan kawasan lain</td></tr>
            <tr><th>Bahasa</th><td>English</td></tr>
            <tr><th>Waktu Operasi</th><td>24/7 — Pertanyaan diterima pada bila-bila masa</td></tr>
            <tr><th>Hubungi</th><td>Sila gunakan borang pertanyaan pada halaman ini</td></tr>
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
            <p>Sri Lanka Car Hire with Private Driver. Perkhidmatan carter peribadi sepenuhnya, fleksibel merangkumi seluruh Sri Lanka — dipercayai oleh pelancong dari Eropah dan UK.</p>
          </div>
          <div className="footer-col">
            <h4>Navigasi</h4>
            <ul>
              <li><a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>Pelan</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>Contoh Itinerari</a></li>
              <li><a href="#vehicles" onClick={(e) => { e.preventDefault(); scrollTo("vehicles"); }}>Kenderaan</a></li>
              <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>Soalan Lazim</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Hubungi</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Itinerari</h4>
            <ul>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>4 Malam / 5 Hari</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5 Malam / 6 Hari</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>6 Malam / 7 Hari</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>5–7 Hari Budaya</a></li>
              <li><a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>10 Hari – 2 Minggu</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Undang-undang</h4>
            <ul>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Polisi Privasi</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Terma &amp; Syarat</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Hak Cipta © SLTCS｜Sri Lanka Car Hire with Private Driver. Semua Hak Terpelihara.</p>
          <div className="footer-bottom-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Polisi Privasi</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Terma &amp; Syarat</a>
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
        <span>💬</span> Pertanyaan Percuma
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

/**
 * SLTCS – Sri Lanka Car Hire with Private Driver
 * Design: Dark luxury travel aesthetic
 * - Playfair Display (serif) for headings
 * - Inter for body text
 * - Gold (#c9a84c) accent on deep dark background
 * - Full-bleed hero slideshow, tabbed itineraries, contact form
 */

import { useState, useEffect, useRef, useCallback } from "react";

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
          SLTCS｜Sri Lanka Car Hire with Private Driver
        </a>
        <ul className="nav-links">
          <li><a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>PLANS</a></li>
          <li className="nav-dropdown" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button>MODEL ITINERARY ▾</button>
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
          <li><a href="#vehicles" onClick={(e) => { e.preventDefault(); scrollTo("vehicles"); }}>VEHICLES</a></li>
          <li><a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a></li>
          <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>CONTACT</a></li>
          <li><a href="#contact" className="btn-nav" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>ENQUIRY</a></li>
        </ul>
        <button className="hamburger" aria-label="Menu" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu open">
          <a href="#plans" onClick={(e) => { e.preventDefault(); scrollTo("plans"); }}>Plans</a>
          <a href="#courses" onClick={(e) => { e.preventDefault(); scrollTo("courses"); }}>Model Itinerary</a>
          <a href="#vehicles" onClick={(e) => { e.preventDefault(); scrollTo("vehicles"); }}>Vehicles</a>
          <a href="#faq" onClick={(e) => { e.preventDefault(); scrollTo("faq"); }}>FAQ</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>Contact</a>
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
        <div className="hero-eyebrow">SRI LANKA PRIVATE CHARTER SERVICE</div>
        <div className="hero-badge">CAR HIRE WITH DRIVER</div>
        <h1>Sri Lanka <em>Car Hire</em><br />with a Private Driver</h1>
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
          <span>💬</span> Free Enquiry
        </a>
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
              charters: Math.floor(1200 * eased),
              satisfaction: parseFloat((4.9 * eased).toFixed(1)),
              drivers: Math.floor(50 * eased),
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

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [country, setCountry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact">
      <div className="container">
        <div className="contact-inner">
          <div className="contact-info">
            <div className="section-eyebrow">CONTACT</div>
            <h2>Start Planning<br />Your Sri Lanka<br />Adventure</h2>
            <p>Tell us your travel dates, group size, and preferences — we'll respond with a tailored itinerary and quote within 24 hours.</p>
            <p>Whether you're planning a 5-day cultural tour or a 2-week island-wide journey, our team is here to help.</p>
            <div className="contact-detail">
              <div className="contact-detail-icon">⏱️</div>
              <div className="contact-detail-text">
                <strong>Response within 24 hours</strong>
                Enquiries accepted 24/7 — we'll get back to you promptly.
              </div>
            </div>
            <div className="contact-detail" style={{ marginTop: "12px" }}>
              <div className="contact-detail-icon">🔒</div>
              <div className="contact-detail-text">
                <strong>No commitment required</strong>
                This is a free, no-obligation enquiry.
              </div>
            </div>
          </div>
          <div className="contact-form-wrap">
            <form onSubmit={handleSubmit}>
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
                  <input type="date" id="startDate" name="startDate" required />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">END DATE *</label>
                  <input type="date" id="endDate" name="endDate" required />
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
              <button
                type="submit"
                className={`form-submit-btn${submitted ? " success" : ""}`}
                disabled={submitted}
              >
                {submitted ? "✓ Enquiry Sent! We'll reply within 24 hours." : "Send Enquiry"}
              </button>
              <p className="form-note">
                By submitting this form, you agree to our{" "}
                <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
                No commitment required.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Why SLTCS ────────────────────────────────────────────────────────────────
function WhySLTCS() {
  const reasons = [
    { icon: "🛡️", title: "Government-Certified Drivers", desc: "All our drivers hold official Sri Lanka Tourist Driver or Chauffeur Guide Driver licences. Professionally trained, safety-focused, and highly rated by past clients." },
    { icon: "💬", title: "Full English Support", desc: "From first enquiry to the final drop-off, our English-speaking team is on hand to assist. No language barriers — just seamless communication throughout your trip." },
    { icon: "🚗", title: "Completely Private Charter", desc: "Unlike group tours, your vehicle and driver are exclusively yours. Set your own schedule, choose your stops, and travel entirely on your own terms." },
    { icon: "🗺️", title: "Expert Local Knowledge", desc: "Our Chauffeur Guide Drivers are passionate about Sri Lanka's history, culture, and cuisine. They'll take you beyond the guidebook to hidden gems and authentic experiences." },
    { icon: "🚌", title: "Right Vehicle for Every Group", desc: "From couples to large family groups of 10, we match the perfect vehicle to your party size — ensuring comfort even on long-distance journeys across the island." },
    { icon: "🌍", title: "Trusted by European Travellers", desc: "With over 1,200 completed charters and a 4.9 average satisfaction rating, SLTCS is the preferred choice for UK and European visitors exploring Sri Lanka." },
  ];
  return (
    <section id="why">
      <div className="container">
        <div className="section-eyebrow">WHY SLTCS</div>
        <h2 className="section-title">5 Reasons Why Travellers<br />Choose SLTCS</h2>
        <div className="why-grid">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-icon">{r.icon}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Concerns ─────────────────────────────────────────────────────────────────
function Concerns() {
  const concerns = [
    "🗣️ Language barriers", "🚌 Getting around independently",
    "💸 Being overcharged", "🚕 Taxi safety concerns",
    "📍 Finding the right places", "⏰ Keeping to a schedule",
    "👨‍👩‍👧 Travelling with children or elderly", "🗺️ Understanding local culture",
  ];
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section id="concerns" className="concerns-section">
      <div className="container">
        <div className="section-eyebrow">YOUR CONCERNS</div>
        <h2 className="section-title">Worried About<br />Travelling in Sri Lanka?</h2>
        <div className="concerns-grid">
          {concerns.map((c, i) => <div key={i} className="concern-tag">{c}</div>)}
        </div>
        <div className="concerns-cta">
          <div>
            <h3>SLTCS Solves Every One of These Concerns</h3>
            <p>Your dedicated private driver handles everything — navigation, communication, scheduling, and local expertise. All you need to do is sit back and enjoy the journey.</p>
          </div>
          <a href="#contact" className="btn-primary" onClick={(e) => { e.preventDefault(); scrollTo("contact"); }}>
            Enquire Now — It's Free
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Plans ────────────────────────────────────────────────────────────────────
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

// ─── Reviews ──────────────────────────────────────────────────────────────────
function Reviews() {
  const reviews = [
    {
      stars: "★★★★★",
      quote: "Every day was a new highlight. We fell completely in love with Sri Lanka!",
      body: "We started in Colombo and spent 6 incredible days visiting Sigiriya, Kandy, the tea country, and Galle. Our driver was knowledgeable, punctual, and genuinely passionate about showing us the best of his country. Absolutely worth every penny.",
      initials: "SC",
      name: "Sarah & Chris",
      meta: "UK · 6-Day Tour",
    },
    {
      stars: "★★★★★",
      quote: "The best way to explore Sri Lanka — completely stress-free.",
      body: "Travelling with two young children, we were nervous about logistics. SLTCS made everything seamless. Our driver was patient, flexible, and brilliant with the kids. The itinerary was perfectly paced and we never felt rushed.",
      initials: "TF",
      name: "Thomas F.",
      meta: "Germany · 10-Day Family Tour",
    },
    {
      stars: "★★★★★",
      quote: "Our driver was more like a friend and guide than just a driver.",
      body: "From the moment we landed to our final drop-off, everything was handled with professionalism and warmth. Our Chauffeur Guide knew every hidden gem and local restaurant. An unforgettable two weeks.",
      initials: "ML",
      name: "Marie & Laurent",
      meta: "France · 14-Day Tour",
    },
  ];
  return (
    <section id="reviews" style={{ background: "var(--dark2)" }}>
      <div className="container">
        <div className="section-eyebrow">CUSTOMER VOICES</div>
        <h2 className="section-title">What Our Guests Say</h2>
        <p className="section-sub">Real reviews from travellers who have experienced Sri Lanka with SLTCS.</p>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-stars">{r.stars}</div>
              <div className="review-quote">"{r.quote}"</div>
              <div className="review-body">{r.body}</div>
              <div className="review-author">
                <div className="review-avatar">{r.initials}</div>
                <div>
                  <div className="review-name">{r.name}</div>
                  <div className="review-meta">{r.meta}</div>
                </div>
              </div>
            </div>
          ))}
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
    { icon: "💳", title: "3. Confirm & Pay", desc: "Happy with the plan? Confirm your booking and arrange payment." },
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
            <div className="vehicle-icon">🚗</div>
            <h3>Sedan</h3>
            <div className="vehicle-capacity">Up to 3 passengers</div>
            <p>Ideal for solo travellers and couples. Comfortable and economical for touring Sri Lanka.</p>
          </div>
          <div className="vehicle-card featured">
            <div className="vehicle-icon">🚐</div>
            <h3>Van</h3>
            <div className="vehicle-capacity">Up to 6 passengers</div>
            <p>Our most popular choice. Spacious and comfortable for families and small groups.</p>
          </div>
          <div className="vehicle-card">
            <div className="vehicle-icon">🚌</div>
            <h3>Large Van</h3>
            <div className="vehicle-capacity">Up to 10 passengers</div>
            <p>Perfect for large groups and families. Maximum comfort for long-distance journeys across the island.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = [
    { q: "Do your drivers speak English?", a: "Yes. All SLTCS drivers are proficient in English and communicate clearly throughout the trip. Our Silver and Gold plan drivers hold official government guiding licences and are experienced in hosting international guests. Our coordination team also provides full English support before and during your journey." },
    { q: "How much does a private driver in Sri Lanka cost?", a: "Pricing depends on the duration of your trip, the number of passengers, the vehicle type, and the plan you choose (Bronze, Silver, or Gold). We provide transparent, all-inclusive quotes with no hidden fees. Contact us for a personalised quote — it's completely free and there's no obligation to book." },
    { q: "Can we change the itinerary during the trip?", a: "Absolutely. One of the great advantages of a private charter is complete flexibility. You can adjust your itinerary, extend time at a particular site, add new destinations, or change the pace entirely — simply discuss it with your driver. We plan everything in advance but always accommodate your wishes on the day." },
    { q: "Is this service suitable for families with children or elderly travellers?", a: "Yes, absolutely. Our private charter service is ideal for families with young children and groups travelling with elderly members. Your driver will adapt the pace and schedule to suit everyone's needs. Child seats can be arranged on request. We have extensive experience hosting multi-generational family groups from across Europe." },
    { q: "What is your cancellation policy?", a: "We understand that travel plans can change. Our cancellation policy is designed to be fair and transparent. Full details are provided at the time of booking. In general, cancellations made well in advance incur no charge. Please contact us directly for the specific terms applicable to your booking." },
    { q: "What currencies do you accept for payment?", a: "We accept payments in GBP (£), EUR (€), USD ($), and AUD (A$). You can indicate your preferred currency in the contact form, and we will provide your quote in that currency. Payment methods will be confirmed at the time of booking." },
  ];
  return (
    <section id="faq">
      <div className="container">
        <div className="section-eyebrow">FAQ</div>
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((f, i) => (
            <div key={i} className={`faq-item${openIdx === i ? " open" : ""}`}>
              <button className="faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {f.q} <span className="faq-icon">+</span>
              </button>
              <div className="faq-answer"><p>{f.a}</p></div>
            </div>
          ))}
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
      <ContactForm />
      <WhySLTCS />
      <Concerns />
      <Plans />
      <Itineraries />
      <Destinations />
      <Reviews />
      <HowItWorks />
      <Vehicles />
      <FAQ />
      <Company />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

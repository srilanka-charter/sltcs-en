/**
 * SLTCS – Halaman Kenderaan (Bahasa Malaysia)
 * Terjemahan dari versi Jepun di https://sltcs.srilanka-charter.com/vehicles
 * Reka bentuk: Estetik perjalanan mewah gelap sesuai dengan laman utama
 */

import { useState, useEffect, useRef } from "react";

// ─── Navbar (gaya dikongsi dengan Halaman Utama) ───────────────────────────────
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
          SLTCS｜Sewa Kereta dengan Pemandu di Sri Lanka
        </a>
        <ul className="nav-links">
          <li><a href="/#plans">PELAN</a></li>
          <li
            className="nav-dropdown"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button>CONTOH ITINERARI</button>
            {dropdownOpen && (
              <div className="nav-dropdown-menu">
                <a href="/#courses">4 Malam / 5 Hari</a>
                <a href="/#courses">5 Malam / 6 Hari</a>
                <a href="/#courses">6 Malam / 7 Hari</a>
                <a href="/#courses">5 hingga 7 Hari – Segi Budaya</a>
                <a href="/#courses">10 Hari hingga 2 Minggu – Pelan Klasik</a>
              </div>
            )}
          </li>
          <li><a href="/vehicles" style={{ color: "#c9a84c" }}>KENDERANAAN</a></li>
          <li><a href="/#faq">SOALAN LAZIM</a></li>
          <li><a href="/price">HARGA</a></li>
          <li><a href="/#contact">HUBUNGI</a></li>
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
          <a href="/#plans">Pelan</a>
          <a href="/#courses">Contoh Itinerari</a>
          <a href="/vehicles">Kenderaan</a>
          <a href="/#faq">Soalan Lazim</a>
          <a href="/price">Harga</a>
          <a href="/#contact">Hubungi</a>
          <a href="/#contact" className="btn-nav-mobile">Pertanyaan Percuma</a>
          <div style={{ borderTop: "1px solid rgba(201,168,76,0.3)", paddingTop: "8px", marginTop: "4px" }}>
            <div style={{ color: "#c9a84c", fontSize: "11px", letterSpacing: "0.1em", marginBottom: "6px", paddingLeft: "4px" }}>BAHASA LAIN</div>
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
    tagline: "Sehingga 3 dewasa",
    maxPassengers: "3 dewasa",
    comfortablePassengers: "2 dewasa + 1 kanak-kanak",
    maxLuggage: "2 beg besar + 1 beg kecil",
    description:
      "Sedan memuatkan sehingga 3 penumpang. Bagaimanapun, but boleh memuatkan maksimum 2 beg besar dan 1 beg kecil, jadi kami mengesyorkan maksimum 2 dewasa dan 1 kanak-kanak. Jika anda bergerak sebagai 3 dewasa dan ingin lebih selesa, kami mengesyorkan Van.",
    idealFor: "Pasangan & kumpulan kecil (2–3 orang)",
    features: [
      "Penyaman udara",
      "Kompak dan mudah dikendalikan",
      "Sesuai untuk perjalanan bandar dan jarak pendek",
      "Air mineral percuma",
    ],
    badge: "★ Kenderaan paling popular",
    image: "/manus-storage/vehicle_sedan_b6b21042.png",
    images: [
      "/manus-storage/vehicle_sedan_b6b21042.png",
    ],
  },
  {
    id: "van",
    name: "Van",
    tagline: "Sehingga 6 dewasa",
    maxPassengers: "6 dewasa",
    comfortablePassengers: "4 dewasa + 2 kanak-kanak",
    maxLuggage: "8 beg besar",
    description:
      "Van memuatkan sehingga 6 penumpang. Namun, dengan konfigurasi 3 tempat duduk × 2 baris, 6 dewasa mungkin rasa sedikit sempit. Untuk keselesaan maksimum, kami mengesyorkan 4 dewasa + 2 kanak-kanak. Jika anda bergerak sebagai kumpulan 5 atau lebih dewasa, sila pertimbangkan Van Besar.",
    idealFor: "Keluarga & perjalanan kumpulan (4–6 orang)",
    features: [
      "Penyaman udara",
      "Ruang dalaman luas",
      "Muatkan bagasi yang banyak",
      "Air mineral percuma",
      "Selesa untuk perjalanan jarak jauh",
    ],
    image: "/manus-storage/vehicle_van_70a807f8.png",
    images: [
      "/manus-storage/vehicle_van_70a807f8.png",
    ],
  },
  {
    id: "bigvan",
    name: "Van Besar",
    tagline: "Sehingga 10 dewasa",
    maxPassengers: "10 dewasa",
    comfortablePassengers: "9 dewasa",
    maxLuggage: "10 beg besar",
    description:
      "Van Besar mempunyai 9 tempat duduk individu, memuatkan dengan selesa sehingga 9 dewasa. Dengan tempat duduk penumpang hadapan, maksimum 10 penumpang boleh dibawa. Untuk kumpulan 10 atau lebih, sila pertimbangkan minibus atau kenderaan lebih besar.",
    idealFor: "Kumpulan besar & perjalanan korporat (7–10 orang)",
    features: [
      "Penyaman udara",
      "9 tempat duduk individu",
      "Ruang bagasi besar",
      "Air mineral percuma",
      "Sesuai untuk perjalanan jarak jauh",
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
                { label: "Kapasiti maksimum",           value: vehicle.maxPassengers },
                { label: "Kapasiti selesa",             value: vehicle.comfortablePassengers },
                { label: "Muatan maksimum bagasi",      value: vehicle.maxLuggage },
              ].map((row) => (
                <tr
                  key={row.label}
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <td
                    style={{
                      padding: "9px 12px 9px 0",
                      color: "rgba(255,255,255,0.5)",
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
              Disyorkan untuk
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
              <span>💬</span> Tempah Kenderaan Ini
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
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.82rem", maxWidth: "280px", lineHeight: 1.6 }}>
              Sri Lanka Sewa Kereta dengan Pemandu Peribadi. Sepenuhnya peribadi, sepenuhnya fleksibel.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#c9a84c", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Navigasi</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                { label: "Plans",           href: "/#plans" },
                { label: "Model Itinerary", href: "/#courses" },
                { label: "Vehicles",        href: "/vehicles" },
                { label: "Soalan Lazim",    href: "/#faq" },
                { label: "Harga",           href: "/price" },
                { label: "Hubungi",         href: "/#contact" },
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
          <span>© 2025 SLTCS – Sri Lanka Sewa Kereta dengan Pemandu Peribadi. Hak cipta terpelihara.</span>
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
      <span>💬</span> Pertanyaan Percuma
    </a>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Vehicles() {
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
          <div className="section-eyebrow">KENDERAAN</div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              color: "#fff",
              margin: "0 0 16px",
            }}
          >
            Senarai Kenderaan
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
            Kami menyediakan kenderaan yang sesuai mengikut saiz kumpulan dan gaya perjalanan anda.
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
              Untuk kumpulan 10 orang atau lebih
            </h3>
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>
              Kami juga boleh mengaturkan bas mini dan bas besar untuk kumpulan lebih ramai. Sila nyatakan bilangan penumpang yang diperlukan di ruangan teks bebas dalam borang pertanyaan percuma.
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
            Tidak pasti kenderaan mana yang sesuai untuk anda?
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
            Beritahu kami saiz kumpulan, bagasi, dan gaya perjalanan anda — kami akan mengesyorkan pilihan terbaik untuk perjalanan anda.
          </p>
          <a href="/#contact" className="btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <span>💬</span> Konsultasi Percuma
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

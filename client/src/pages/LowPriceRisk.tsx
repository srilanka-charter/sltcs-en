import { useEffect } from "react";
import { Link } from "wouter";
import SiteNavbar from "@/components/SiteNavbar";

// ─── SEO ─────────────────────────────────────────────────────────────────────
const PAGE_TITLE =
  "Risiko Sewa Kereta Harga Rendah di Sri Lanka | Mengapa Perkhidmatan Murah Menelan Kos Lebih | SLTCS";
const PAGE_DESC =
  "Temui risiko tersembunyi sewa kereta kos sangat rendah di Sri Lanka: had jarak, jarak yang dibesar-besarkan, pemandu tidak hadir, hentian berulang untuk komisen, dan sokongan yang lemah. Ketahui mengapa SLTCS mengutamakan kualiti berbanding harga.";

// ─── Risk Items ───────────────────────────────────────────────────────────────
const RISKS = [
  {
    id: "mileage-limits",
    icon: "📏",
    title: "Had Jarak Tersembunyi dan Caj Lebihan",
    body: [
      "Perkhidmatan berharga bajet hampir selalu termasuk had jarak yang tersembunyi dalam teks halus. Kadar utama £80 sehari mungkin nampak menarik — sehingga anda perasan had 150 km sehari. Tarikan utama Sri Lanka tersebar di seluruh pulau, dan satu hari melawat boleh melebihi 250 km dengan mudah.",
      "Seorang ahli pasukan kami mengalami sendiri sebagai pelancong: pemindahan Colombo–Sigiriya kira-kira 180 km dicaj sebagai 250 km. Pertikaian yang berlaku selepas itu sangat membebankan dan memakan masa — perkara terakhir yang anda mahukan semasa bercuti.",
      "SLTCS menawarkan satu kadar rata berdasarkan keseluruhan itinerari anda. Tiada caj per kilometer, tiada had jarak, dan tiada tambahan mengejut pada akhir setiap hari.",
    ],
    highlight:
      "Dengan SLTCS, harga anda dipersetujui secara bertulis sebelum bertolak. Apa yang anda lihat adalah apa yang anda bayar.",
  },
  {
    id: "old-vehicles",
    icon: "🚗",
    title: "Kenderaan Berumur dalam Keadaan Buruk",
    body: [
      "Sri Lanka mengenakan tarif import yang tinggi ke atas kenderaan — sebuah kereta berharga £12,000 di Jepun boleh berharga £36,000 setelah diimport. Pemandu yang tidak mampu membeli model lebih baru terus menggunakan kenderaan berumur 20 tahun atau lebih.",
      "Pemandu yang melabur dalam kereta lebih baru perlu membayar pinjaman besar, jadi kadar harian mereka mesti lebih tinggi untuk kekal berdaya saing. Apabila harga kelihatan luar biasa murah, kualiti kenderaan hampir selalu sebabnya.",
      "SLTCS bekerjasama eksklusif dengan pemandu yang mengekalkan kenderaan moden dan diselenggara dengan baik. Setiap kereta dalam rangkaian kami ber-AC, bersih, dan diperiksa secara berkala.",
    ],
    highlight: "Sentiasa ada sebab di sebalik harga rendah — dan biasanya ia menjejaskan keselesaan dan keselamatan anda.",
  },
  {
    id: "no-show",
    icon: "⏰",
    title: "Pemandu yang Tidak Datang",
    body: [
      "Detik permulaan perjalanan — tiba di lapangan terbang atau hotel dan mencari pemandu anda — sudah cukup membuat anda cemas. Operator bajet kadang-kadang langsung tidak muncul, meninggalkan pelancong terperangkap di tempat asing tanpa sokongan tempatan.",
      "Kelewatan besar walaupun di awal hari boleh menyebabkan terlepas waktu masuk, tempat menarik ditutup, dan jadual rosak.",
      "SLTCS menggaji pemandu dengan rekod ketepatan masa yang terbukti. Mana-mana pemandu yang lambat tanpa alasan munasabah menerima maklum balas segera; masalah berulang membawa kepada penamatan kontrak. Sekiranya berlaku masalah tidak dijangka, penyelaras berbahasa Inggeris kami tersedia 24/7 untuk menyelesaikannya.",
    ],
    highlight:
      "Pasukan sokongan berbahasa Inggeris kami yang beroperasi 24/7 memastikan anda tidak pernah ditinggalkan tanpa bantuan.",
  },
  {
    id: "limited-scope",
    icon: "🗺️",
    title: "Pemandu yang Hanya Melakukan Pemindahan Titik-ke-Titik",
    body: [
      "Sewa peribadi sepatutnya mengurus semua pengangkutan darat sepanjang perjalanan anda — bukan hanya leg antara bandar utama. Sesetengah pemandu kos rendah menghantar anda ke hotel dan menganggap tugas selesai, meninggalkan anda mengatur pengangkutan berasingan ke setiap tarikan.",
      "Sebagai contoh, pemandu mungkin membawa anda dari Colombo ke Sigiriya tetapi enggan memandu jarak pendek dari hotel anda ke Batu Sigiriya atau Kuil Gua Dambulla. Berunding tambang dengan pemandu tempatan yang tidak dikenali di setiap hentian menambah kos, tekanan, dan ketidakpastian.",
      "Pemandu SLTCS menemani anda dari pintu ke pintu sepanjang keseluruhan itinerari anda. Jika pemandu gagal memenuhi standard ini, kami akan mengganti kos tambahan yang ditanggung pelanggan dan menamatkan kontrak pemandu itu.",
    ],
    highlight:
      "Pemandu SLTCS anda bertanggungjawab untuk setiap perjalanan dari saat mendarat hingga berlepas.",
  },
  {
    id: "kickbacks",
    icon: "🛍️",
    title: "Hentian Berterusan ke Kedai Bersekutu Komisen",
    body: [
      "Ini adalah kekecewaan yang diketahui ramai pelancong di Selatan dan Asia Tenggara. Pemandu yang beroperasi dengan margin tipis menambah pendapatan dengan membawa penumpang ke restoran, kedai batu permata, dan spa Ayurvedic yang memberi komisen rujukan.",
      "Tempat-tempat ini jarang menjadi pilihan terbaik — harga cenderung melambung dan kualiti tidak konsisten. Lebih teruk, hentian tidak dirancang ini mengurangkan masa hari anda dan boleh menghalang anda menyelesaikan itinerari asal.",
      "Pemandu SLTCS dibayar dengan adil, jadi mereka tiada insentif kewangan untuk membawa anda ke mana-mana tempat yang anda tidak minta lawati. Jika anda mahukan cadangan untuk rawatan Ayurvedic, safari jeep, atau aktiviti menonton paus, pemandu anda boleh atur pilihan dipercayai — hanya apabila anda minta.",
    ],
    highlight:
      "Pemandu SLTCS mencadangkan aktiviti hanya bila diminta. Itinerari anda kekal sepenuhnya di bawah kawalan anda.",
  },
  {
    id: "poor-support",
    icon: "💬",
    title: "Tiada Sokongan Bermakna Sebelum atau Semasa Perjalanan",
    body: [
      "Operator bajet sering kekurangan infrastruktur untuk menyediakan bantuan pra-perjalanan yang tulen. Merancang itinerari Sri Lanka melibatkan banyak aspek — jarak, keadaan jalan, waktu buka, penutupan bermusim — dan panduan pakar membuat perbezaan ketara.",
      "Banyak perkhidmatan bajet hilang komunikasi setelah tempahan disahkan, meninggalkan pelanggan tanpa bantuan jika ada perubahan atau masalah di lapangan.",
      "SLTCS menyediakan sokongan berbahasa Inggeris dari pertanyaan pertama anda hingga penghantaran terakhir. Penyelaras tempatan kami — dengan lebih 20 tahun pengalaman gabungan — sedia membantu perancangan itinerari, perubahan saat akhir, dan sebarang isu yang timbul sepanjang perjalanan anda.",
    ],
    highlight:
      "Dari kontak pertama hingga selamat tinggal terakhir, SLTCS bersama anda di setiap langkah.",
  },
];

// ─── Why Prices Are What They Are ────────────────────────────────────────────
const COST_FACTORS = [
  {
    label: "Tarif Import Kenderaan",
    desc: "Sri Lanka mengenakan cukai import tinggi ke atas automotif. Kereta bernilai £12,000 di Jepun berharga kira-kira £36,000 selepas import. Pemandu harus menetapkan harga sesuai untuk membayar pinjaman kenderaan.",
  },
  {
    label: "Pemandu Bertauliah Kerajaan",
    desc: "SLTCS hanya bekerjasama dengan pemandu yang memegang lesen rasmi dari Sri Lanka Tourism Development Authority (SLTDA). Pemandu berkelayakan mengenakan kadar lebih tinggi — dan memberi pengalaman yang jauh lebih baik.",
  },
  {
    label: "Pemilihan Pemandu yang Ketat",
    desc: "Pengurus tempatan kami, dengan pengalaman lebih 20 tahun, menilai setiap pemandu berdasarkan sikap, kebolehan bahasa, ketepatan masa, dan keadaan kenderaan. Hanya calon terbaik yang diterima.",
  },
  {
    label: "Pengurusan Kualiti Berterusan",
    desc: "Maklum balas pelanggan dikaji selepas setiap perjalanan. Pemandu yang menerima aduan diberi nasihat segera; yang gagal memperbaiki akan dikeluarkan dari rangkaian.",
  },
];

export default function LowPriceRisk() {
  useEffect(() => {
    window.scrollTo(0, 0);

    // Title
    document.title = PAGE_TITLE;

    // Meta description
    let metaDesc = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = PAGE_DESC;

    // JSON-LD: Article schema
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline:
        "Risiko Sewa Kereta Harga Rendah di Sri Lanka: Mengapa Perkhidmatan Murah Sering Menelan Kos Lebih",
      description: PAGE_DESC,
      url: "https://en.srilanka-charter.com/low-price-risk",
      author: {
        "@type": "Organization",
        name: "SLTCS – Sri Lanka Car Hire with Private Driver",
        url: "https://en.srilanka-charter.com",
      },
      publisher: {
        "@type": "Organization",
        name: "SLTCS – Sri Lanka Car Hire with Private Driver",
        url: "https://en.srilanka-charter.com",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://en.srilanka-charter.com/low-price-risk",
      },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "low-price-risk-jsonld";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.title = "SLTCS｜Sri Lanka Car Hire with Private Driver";
      metaDesc!.content = prevDesc;
      document.getElementById("low-price-risk-jsonld")?.remove();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--dark, #0d1117)",
        color: "#fff",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <SiteNavbar mode="page" />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: "120px",
          paddingBottom: "60px",
          textAlign: "center",
          background:
            "linear-gradient(180deg, rgba(201,168,76,0.06) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(201,168,76,0.1)",
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(201,168,76,0.12)",
            border: "1px solid rgba(201,168,76,0.3)",
            color: "#c9a84c",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            padding: "6px 18px",
            borderRadius: "20px",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          KUALITI PERKHIDMATAN
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.8rem, 4.5vw, 3rem)",
            fontWeight: 700,
            lineHeight: 1.25,
            margin: "0 auto 20px",
            maxWidth: "760px",
          }}
        >
          Mengapa{" "}
          <em style={{ color: "#c9a84c", fontStyle: "italic" }}>
            Sewa Kereta Harga Rendah
          </em>{" "}
          di Sri Lanka Memiliki Risiko Sebenar
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: "1.05rem",
            maxWidth: "640px",
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          Kadar utama yang kelihatan terlalu baik untuk dipercayai biasanya memang begitu. Halaman ini menerangkan enam perangkap biasa sewa kereta ultra-bajet di Sri Lanka — dan bagaimana SLTCS menangani setiap satu.
        </p>
      </section>

      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ── Intro ── */}
        <section style={{ padding: "56px 0 0" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.85,
              fontSize: "0.97rem",
            }}
          >
            SLTCS diasaskan berdasarkan satu kepercayaan mudah: percutian di Sri Lanka tidak seharusnya rosak oleh pemandu yang sepatutnya menjadikannya tidak dapat dilupakan. Pada awal perniagaan, kami mencuba susunan pemandu kos rendah untuk mengekalkan harga yang kompetitif. Aduan pelanggan yang diikuti mengajar kami satu pengajaran penting — di bawah paras tertentu, kualiti tidak dapat dikekalkan.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.85,
              fontSize: "0.97rem",
              marginTop: "16px",
            }}
          >
            Hari ini, SLTCS bekerjasama secara eksklusif dengan pemandu yang berlesen kerajaan yang memenuhi piawaian dalaman ketat kami sendiri. Kadar kami ditetapkan pada tahap terendah yang membolehkan kami menegakkan komitmen tersebut. Halaman ini menerangkan apa yang berlaku apabila perkhidmatan ditawarkan di bawah tahap tersebut.
          </p>
        </section>

        {/* ── Risk Cards ── */}
        <section style={{ marginTop: "56px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.6rem",
              color: "#fff",
              marginBottom: "36px",
              textAlign: "center",
            }}
          >
            Enam Risiko Memilih Perkhidmatan Kos Rendah Sangat
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            {RISKS.map((risk, idx) => (
              <div
                key={risk.id}
                id={risk.id}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(201,168,76,0.15)",
                  borderRadius: "14px",
                  padding: "32px",
                }}
              >
                {/* Number + Title */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    marginBottom: "20px",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(201,168,76,0.12)",
                      border: "1px solid rgba(201,168,76,0.3)",
                      color: "#c9a84c",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      color: "#fff",
                      margin: 0,
                      lineHeight: 1.35,
                      paddingTop: "8px",
                    }}
                  >
                    <span style={{ marginRight: "8px" }}>{risk.icon}</span>
                    {risk.title}
                  </h3>
                </div>

                {/* Body paragraphs */}
                {risk.body.map((para, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      color: "rgba(255,255,255,0.72)",
                      lineHeight: 1.8,
                      fontSize: "0.93rem",
                      marginBottom: pIdx < risk.body.length - 1 ? "14px" : "20px",
                      marginTop: 0,
                    }}
                  >
                    {para}
                  </p>
                ))}

                {/* Highlight callout */}
                <div
                  style={{
                    background: "rgba(201,168,76,0.07)",
                    borderLeft: "3px solid #c9a84c",
                    borderRadius: "0 8px 8px 0",
                    padding: "12px 16px",
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.88rem",
                    lineHeight: 1.65,
                    fontStyle: "italic",
                  }}
                >
                  {risk.highlight}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Why Prices Are What They Are ── */}
        <section style={{ marginTop: "64px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
              color: "#fff",
              marginBottom: "12px",
            }}
          >
            Mengapa Harga SLTCS Begitu
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "0.93rem",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            Pasaran sewa kereta di Sri Lanka kelihatan murah berbanding Eropah, tetapi beberapa faktor struktur mendorong kos lebih tinggi daripada yang dijangka oleh ramai pelancong. Memahami faktor-faktor ini membantu menjelaskan mengapa pengusaha bertanggungjawab tidak boleh hanya menyamai kadar terendah yang diiklankan.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
            }}
          >
            {COST_FACTORS.map((factor) => (
              <div
                key={factor.label}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: "10px",
                  padding: "22px 24px",
                }}
              >
                <div
                  style={{
                    color: "#c9a84c",
                    fontSize: "0.78rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  {factor.label}
                </div>
                <p
                  style={{
                    color: "rgba(255,255,255,0.68)",
                    fontSize: "0.88rem",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {factor.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Gold Plan callout ── */}
        <section
          style={{
            marginTop: "64px",
            background: "rgba(201,168,76,0.06)",
            border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: "14px",
            padding: "36px 32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#c9a84c",
              color: "#000",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              padding: "4px 14px",
              borderRadius: "20px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            PELAN EMAS
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.45rem",
              color: "#fff",
              margin: "0 0 16px",
              lineHeight: 1.3,
            }}
          >
            Pelan Emas: Kualiti Lawatan Berpanduan pada Harga Sewaan Peribadi
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.93rem",
              lineHeight: 1.8,
              maxWidth: "640px",
              margin: "0 auto 24px",
            }}
          >
            Pelan Emas kami melantik pemandu yang memegang lesen Chauffeur Guide Driver — kelayakan tertinggi yang dikeluarkan oleh kerajaan Sri Lanka. Berbeza dengan lesen Pemandu Pelancong standard, kelayakan ini membenarkan pemandu menemani anda di dalam tapak pelancongan dan memberikan komen pakar mengenai sejarah dan budaya setiap lokasi.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "0.93rem",
              lineHeight: 1.8,
              maxWidth: "640px",
              margin: "0 auto 28px",
            }}
          >
            Sama ada anda sedang menanjak Batu Sigiriya, meneroka runtuhan purba Anuradhapura, atau melawat Kuil Gigi di Kandy, pemandu Pelan Emas anda sentiasa di sisi — menerangkan, membimbing, dan memperkayakan setiap saat. Cadangan dipercayai untuk lawatan jip safari dan ekspedisi penjejak ikan paus boleh diperoleh atas permintaan.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/price"
              style={{
                display: "inline-block",
                background: "#c9a84c",
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9rem",
                padding: "13px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                letterSpacing: "0.04em",
              }}
            >
              Lihat Harga
            </Link>
            <a
              href="/#contact"
              style={{
                display: "inline-block",
                background: "transparent",
                color: "#c9a84c",
                fontWeight: 600,
                fontSize: "0.9rem",
                padding: "13px 32px",
                borderRadius: "6px",
                textDecoration: "none",
                border: "1px solid rgba(201,168,76,0.5)",
                letterSpacing: "0.04em",
              }}
            >
              Pertanyaan Percuma
            </a>
          </div>
        </section>

        {/* ── Summary ── */}
        <section style={{ marginTop: "56px" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              color: "#fff",
              marginBottom: "16px",
            }}
          >
            Kos Sebenar Perkhidmatan Murah
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              fontSize: "0.95rem",
              marginBottom: "16px",
            }}
          >
            Harga tajuk yang rendah jarang mencerminkan keseluruhan kos perjalanan. Setelah kiraan lebihan jarak, masa perjalanan memutar, pengaturan pengangkutan tempatan pada saat akhir, dan tekanan akibat komunikasi yang lemah diambil kira, perkhidmatan bajet sering kali berakhir dengan kos yang lebih tinggi — dari segi wang, masa, dan ketenangan fikiran — berbanding alternatif yang ditetapkan harga dengan betul.
          </p>
          <p
            style={{
              color: "rgba(255,255,255,0.72)",
              lineHeight: 1.85,
              fontSize: "0.95rem",
            }}
          >
            SLTCS menetapkan harga pada tahap minimum yang membolehkan kami memberikan perkhidmatan yang kami benar-benar banggakan. Kami menjemput anda untuk membandingkan sebut harga kadar tetap kami dan membuat penilaian sendiri.
          </p>
        </section>

        {/* ── Back to Pricing ── */}
        <div style={{ marginTop: "48px", textAlign: "center" }}>
          <Link
            href="/price"
            style={{
              color: "#c9a84c",
              fontSize: "0.9rem",
              textDecoration: "none",
              borderBottom: "1px solid rgba(201,168,76,0.4)",
              paddingBottom: "2px",
            }}
          >
            ← Kembali ke Harga
          </Link>
        </div>

      </div>

      {/* ── Footer ── */}
      <footer
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "32px 24px",
          textAlign: "center",
          color: "rgba(255,255,255,0.35)",
          fontSize: "0.8rem",
        }}
      >
        <p style={{ margin: "0 0 8px" }}>
          © {new Date().getFullYear()} Sri Lanka Taxi Charter Service
          International Limited. Hak cipta terpelihara.
        </p>
        <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Laman Utama</a>
          <a href="/price" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Harga</a>
          <a href="/vehicles" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Kenderaan</a>
          <a href="/faq" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Soalan Lazim</a>
          <a href="/#contact" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>Hubungi</a>
        </div>
      </footer>
    </div>
  );
}

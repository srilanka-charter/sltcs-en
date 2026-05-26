/**
 * Voice – Laman Ulasan Tetamu
 * URL: /voice
 * Semua 8 ulasan pemandu dengan penilaian 5-bintang dalam 3 kategori (Pemandu / Kenderaan / Operator)
 */

import { Link } from "wouter";

// ─── Star Rating Component ─────────────────────────────────────────────────────
function StarRating({ score }: { score: number }) {
  return (
    <span style={{ color: "#c9a84c", fontSize: "1rem", letterSpacing: "1px" }}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (score >= i) return <span key={i} style={{ opacity: 1 }}>★</span>;
        if (score >= i - 0.5) return <span key={i} style={{ opacity: 0.6 }}>★</span>;
        return <span key={i} style={{ opacity: 0.2 }}>★</span>;
      })}
      <span style={{ color: "#6a6a6a", fontSize: "0.8rem", marginLeft: "4px" }}>
        {score.toFixed(1)}
      </span>
    </span>
  );
}

// ─── Category Ratings Display ──────────────────────────────────────────────────
function RatingsBreakdown({ driver, vehicle, operator }: { driver: number; vehicle: number; operator: number }) {
  const total = Math.round(((driver + vehicle + operator) / 3) * 10) / 10;
  return (
    <div className="voice-ratings">
      <div className="voice-total-score">
        <span className="voice-total-label">Keseluruhan</span>
        <span className="voice-total-num">{total.toFixed(1)}</span>
        <span className="voice-total-stars">
          {[1, 2, 3, 4, 5].map((i) => {
            if (total >= i) return <span key={i} style={{ color: "#c9a84c" }}>★</span>;
            if (total >= i - 0.5) return <span key={i} style={{ color: "#c9a84c", opacity: 0.6 }}>★</span>;
            return <span key={i} style={{ color: "#d1ccc4" }}>★</span>;
          })}
        </span>
      </div>
      <div className="voice-breakdown">
        {[
          { label: "Pemandu", score: driver },
          { label: "Kenderaan", score: vehicle },
          { label: "Operator", score: operator },
        ].map(({ label, score }) => (
          <div key={label} className="voice-breakdown-row">
            <span className="voice-breakdown-label">{label}</span>
            <div className="voice-breakdown-bar-wrap">
              <div className="voice-breakdown-bar" style={{ width: `${(score / 5) * 100}%` }} />
            </div>
            <span className="voice-breakdown-score">{score.toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Review Data ────────────────────────────────────────────────────────────────────────────────
// Ulasan dari laman utama (Bahagian Apa Kata Tetamu Kami)
const HOME_REVIEWS = [
  {
    id: "eranga",
    photo: "/manus-storage/review1_r_family_eranga_a3545b4c.png",
    driver: "Eranga",
    name: "Keluarga R",
    pax: "4 penumpang",
    period: "Ogos 2025",
    route: "Anuradhapura – Dambulla – Sigiriya – Polonnaruwa",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
    quote: "Perkhidmatan profesional dari pertanyaan pertama hingga penghantaran akhir — kami berasa sangat selesa sepanjang perjalanan.",
    body: "Dari tempahan awal hingga hari perjalanan, pasukan memberi maklum balas dengan pantas dan jelas. Harga dan perancangan itinerari dijelaskan dengan cara yang tiada ruang untuk keraguan. Pada hari perjalanan, Eranga memandu dengan berhati-hati dan tenang, tanpa masalah mengelakkan kesesakan lalu lintas agar kami tetap mengikut jadual. Pengetahuannya yang mendalam tentang Anuradhapura, Dambulla, Sigiriya, dan Polonnaruwa memberikan kami asas sejarah yang kaya untuk memahami negara yang luar biasa ini. Kami berasa bertuah mempunyai beliau sebagai pemandu dan pemandu pelancong.",
  },
  {
    id: "lasith-home",
    photo: "/manus-storage/review_lasith_family_ae2d2464.jpeg",
    driver: "Lasith",
    name: "Keluarga W",
    pax: "3 penumpang",
    period: "Mac 2026",
    route: "Passikudah – Sigiriya – Colombo",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
    quote: "Lasith sangat sabar dengan anak-anak kami dan menjadikan setiap saat perjalanan sangat mudah.",
    body: "Mempunyai Lasith bersama kami adalah tuah sebenar. Sikap mesranya dengan anak-anak membuatkan kami semua berasa tenang, dan bahasa Inggerisnya yang jelas memastikan tiada apa yang hilang dalam terjemahan. Tepat waktu, penuh dengan cadangan menarik tentang tempat lawatan dan restoran tempatan, dan sentiasa tenang di belakang stereng — dia adalah apa yang kami harapkan. (Kami mungkin akan elak jalan antara Passikudah dan Sigiriya pada masa hadapan!) Kami syorkan beliau tanpa ragu: prihatin, berpengetahuan, dan sangat boleh dipercayai. Jika kamu ke Eropah suatu hari nanti, Lasith — pusingan pertama ditanggung kami.",
  },
  {
    id: "ranjana-home",
    photo: "/manus-storage/review_ranjana_new_2b654dea.png",
    driver: "Ranjana",
    name: "Pasangan H",
    pax: "2 penumpang",
    period: "November 2025",
    route: "Colombo – Kandy – Nuwara Eliya – Galle",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 4.5 },
    quote: "Ranjana mengubah perjalanan Sri Lanka kami menjadi sesuatu yang jauh lebih daripada pemandangan biasa.",
    body: "Kami menempah sewaan peribadi untuk dua orang dan dipasangkan dengan Ranjana — keputusan yang kami sangat gembira. Dia membawa keyakinan tenang setiap kali memandu, mengemudi jalan bukit dan pusat bandar yang sibuk dengan mudah. Apa yang paling menonjol adalah semangat tulennya: beliau mencadangkan pengalaman arung jeram yang tidak kami rancang, dan ia menjadi salah satu momen terbaik perjalanan. Pengetahuannya tentang pandangan tersembunyi, tempat makan asli, dan adat budaya memperkayakan setiap hari perjalanan kami. Ranjana adalah pemandu pelancong yang membuat kamu berasa seperti tetamu negara, bukan sekadar pelancong yang lalu.",
  },
  {
    id: "priyanth",
    photo: "/manus-storage/review_priyantha_couple_e0a47aaf.png",
    photoPosition: "center 40%",
    driver: "Priyanth",
    name: "Pasangan A&S",
    pax: "2 penumpang",
    period: "Ogos 2025",
    route: "Colombo – Sigiriya – Kandy – Nuwara Eliya – Galle",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
    quote: "Priyanth menjadikan enam hari seperti perjalanan dengan sahabat dipercayai, bukan hanya pemandu sewa.",
    body: "Bermula dari Lapangan Terbang Colombo, Priyanth membimbing kami melalui Sigiriya, Kandy, Nuwara Eliya, dan Galle selama enam hari. Dia sentiasa tepat pada masa dan memandu dengan berhati-hati, sentiasa bertanya bagaimana perasaan kami — sesuatu yang kami hargai dalam perjalanan jauh. Syarikatnya yang ceria membuatkan setiap pemindahan menyeronokkan, dan pandangannya tentang sejarah dan budaya Sri Lanka menambah kedalaman kepada apa yang kami lihat. Dia juga membawa kami ke tempat pandangan yang menakjubkan yang bukan dalam rancangan asal, serta memperkenalkan restoran tempatan yang sangat memuaskan. Kami ingin melancong bersamanya lagi pada lawatan kami berikutnya ke Sri Lanka.",
  },
  {
    id: "indika",
    photo: "/manus-storage/review5_t_couple_indika_519f1510.png",
    photoPosition: "center 35%",
    driver: "Indika",
    name: "Pasangan T",
    pax: "2 penumpang",
    period: "Oktober 2025",
    route: "Negombo – Sigiriya – Kandy – Nuwara Eliya – Mirissa",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
    quote: "Terima kasih kepada Indika, perjalanan kami bukan sekadar lawatan — ia menjadi pengalaman berwarna-warni dan tidak dapat dilupakan.",
    body: "Kami melancong sebagai pasangan dari Negombo melalui Sigiriya, Kandy, Nuwara Eliya, dan Mirissa selama lima hari. Pada pagi pertama — yang kebetulan adalah hari jadi — kek muncul semasa sarapan, dikendalikan secara senyap oleh Indika melalui hotel. Dia juga memberi kami figura gajah kecil sebagai hadiah. Kami benar-benar tersentuh. Sepanjang perjalanan dia menjadi pendamping yang stabil dan meyakinkan: memberi taklimat sebelum setiap lokasi, mengurus permulaan awal tanpa rungutan, mencadangkan restoran yang sering dikunjunginya (semuanya sangat bagus), dan turut menaiki kereta api bersama kami untuk memastikan keselamatan di kalangan orang ramai. Apabila sesuatu nampak terlalu mahal, dia hanya berkata, 'Mari kita tidak pergi' — kejujurannya membuatkan kami sangat percaya kepadanya.",
  },
  {
    id: "chamil",
    photo: "/manus-storage/review_dfamily_chamil_9214e24c.png",
    driver: "Chamil",
    name: "Keluarga D",
    pax: "5 penumpang",
    period: "Disember 2025",
    route: "Colombo – Sigiriya – Kandy – Yala – Galle",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 4.5 },
    quote: "Walaupun perlu mengubah sepenuhnya itinerari selepas taufan, Chamil menjadikan ia perjalanan seumur hidup.",
    body: "Kami melancong sebagai tiga generasi — datuk nenek, ibu bapa, dan seorang anak — tepat selepas taufan yang mengganggu pulau. Chamil sentiasa mengumpul maklumat terkini tentang keadaan jalan dan keselamatan, dan sentiasa mencadangkan laluan terbaik mengikut kehendak kami. Apabila kami perlu batalkan tempahan hotel dan kereta api serta buat tempahan baru secara mengejut, dia sentiasa membantu sepanjang perjalanan. Dia turut serta dalam pendakian Batu Sigiriya dan safari, yang memberi kami rasa yakin. Perhatiannya kepada anak kami sangat menyentuh hati. Kehangatan, pemikiran cepat, dan sifat prihatin semula jadi Chamil memenangi hati setiap ahli keluarga kami. Kami sudah tidak sabar untuk perjalanan kami seterusnya ke Sri Lanka, dan pasti akan memilih Chamil lagi.",
  },
];

const VOICE_REVIEWS = [
  {
    id: "aruna",
    photo: "/manus-storage/review_aruna_78705121.jpeg",
    driver: "Aruna",
    name: "Pasangan M",
    pax: "2 penumpang",
    period: "Mac 2025",
    route: "Colombo – Ella – Nuwara Eliya – Kandy",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 4.5 },
    quote: "Aruna menjadikan setiap jalan bukit seperti pengembaraan, bukan cabaran.",
    body: "Kami menyewa Aruna untuk pusingan selama seminggu melalui kawasan bukit, dan dia melebihi setiap jangkaan. Pengetahuannya tentang tempat pandang yang cantik — banyak yang tidak terdapat dalam buku panduan — sangat luar biasa. Dia menyelaraskan ketibaan kami di Ella Rock untuk menangkap kabut pagi, dan cadangannya berhenti di gerai teh tepi jalan kecil menjadi salah satu kenangan paling bermakna. Pemanduannya lancar dan yakin walaupun di laluan sempit bukit, dan sikap tenangnya membuat kami sangat selesa sepanjang masa. Dia sentiasa tepat masa, sentiasa senyum, dan sentiasa berfikir satu langkah ke hadapan. Seorang profesional yang cemerlang dan insan yang sangat mesra.",
  },
  {
    id: "dhammika",
    photo: "/manus-storage/review_dhammika_f371cfdd.jpeg",
    photoPosition: "center 40%",
    driver: "Dhammika",
    name: "Pasangan R",
    pax: "2 penumpang",
    period: "Februari 2025",
    route: "Colombo – Sigiriya – Kandy – Mirissa",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 4.5 },
    quote: "Pengetahuan tempatan Dhammika mengubah perjalanan kami daripada percutian kepada pengalaman budaya yang sebenar.",
    body: "Sejak Dhammika bertemu kami di Lapangan Terbang Colombo, kami tahu kami berada di dalam tangan yang amanah. Dia sangat arif tentang sejarah dan budaya Sri Lanka yang dikongsi dengan penuh semangat — tidak pernah mengajar, sentiasa bersembang. Di Sigiriya dia tahu sudut mana yang terbaik untuk mengambil gambar batu pada waktu emas, dan di Kandy dia membawa kami menonton persembahan tarian Kandyan yang jarang ditemui pelancong. Kenderaannya bersih dan berhawa dingin, dan sentiasa ada air sejuk menanti kami. Dhammika adalah jenis pemandu yang benar-benar mengambil berat sama ada kamu mendapat pengalaman terbaik. Kami sudah mengesyorkannya kepada tiga kumpulan rakan.",
  },
  {
    id: "kushan",
    photo: "/manus-storage/review_kushan_f9478373.jpeg",
    driver: "Kushan",
    name: "Kumpulan B",
    pax: "4 penumpang",
    period: "Januari 2025",
    route: "Colombo – Dambulla – Polonnaruwa – Trincomalee",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
    quote: "Kushan mengurus empat personaliti yang sangat berbeza dengan sabar, jenaka dan kemahiran luar biasa.",
    body: "Kumpulan kami seramai empat orang mempunyai minat yang sangat berbeza — sejarah, hidupan liar, pantai, dan makanan — dan Kushan berjaya menggabungkan semua itu menjadi satu itinerari yang sempurna. Dia sangat sabar apabila kami tidak dapat bersetuju di mana hendak makan, sentiasa mempunyai cadangan, dan tidak pernah membuat kami merasa tergesa-gesa. Pemanduannya di jalan pantai sangat yakin dan selamat, dan dia tahu setiap pintasan untuk mengelakkan kesesakan lalu lintas petang. Kenderaan itu besar, selesa, dan sangat bersih sepanjang perjalanan. Sikap santai Kushan menjadikan perjalanan jauh dengan memandu benar-benar menyeronokkan. Kami meninggalkan Sri Lanka dengan perasaan seperti kami telah membuat seorang kawan.",
  },
  {
    id: "lasith",
    photo: "/manus-storage/review_lasith2_555d5b29.jpeg",
    driver: "Lasith",
    name: "The W Family",
    pax: "3 penumpang",
    period: "April 2025",
    route: "Colombo – Sigiriya – Kandy – Galle",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
    quote: "Lasith sangat sabar dengan anak-anak kami dan menjadikan setiap detik perjalanan terasa mudah.",
    body: "Mempunyai Lasith bersama kami adalah satu tuah sebenar. Sikap mesranya dengan kanak-kanak membuat kami semua rasa tenang, dan Inggerisnya yang jelas memastikan tiada apa yang hilang dalam terjemahan. Tepat pada masanya, penuh dengan cadangan bernas untuk tempat menarik dan restoran tempatan, serta sentiasa tenang di belakang roda — dia adalah segala yang kami inginkan. Kami mengesyorkannya tanpa ragu-ragu: prihatin, berpengetahuan, dan sangat boleh dipercayai. Jika anda pernah di Eropah, Lasith — pusingan pertama atas kami.",
  },
  {
    id: "malinga",
    photo: "/manus-storage/review_malinga_5636b125.jpeg",
    driver: "Malinga",
    name: "The S Couple",
    pax: "2 penumpang",
    period: "Mei 2025",
    route: "Negombo – Wilpattu – Anuradhapura – Trincomalee",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 5.0 },
    quote: "Semangat Malinga untuk hidupan liar Sri Lanka sangat menular — dia membuatkan setiap safari tidak dapat dilupakan.",
    body: "Kami memilih itinerari bertumpu hidupan liar dan Malinga adalah pemandu yang sempurna untuk itu. Pengetahuannya tentang Taman Negara Wilpattu sangat luar biasa — dia ternampak seekor harimau kumbang berehat di atas pokok yang langsung tidak dilihat oleh jip safari rasmi kami. Dia juga mengatur safari bot di Sungai Madu yang tidak berada dalam rancangan asal kami, dan ia ternyata menjadi salah satu kemuncak perjalanan. Malinga memandu dengan sangat berhati-hati di jalan rezab hidupan liar, dan kesabarannya menunggu untuk pemerhatian terbaik sangat mengagumkan. Komen cerianya sepanjang perjalanan membuat setiap kilometer antara taman menjadi menyeronokkan. Pemandu luar biasa untuk sesiapa yang mencintai alam.",
  },
  {
    id: "ravi",
    photo: "/manus-storage/review_ravi_b940edfb.jpeg",
    driver: "Ravi",
    name: "The Y Group",
    pax: "7 penumpang",
    period: "Mac 2025",
    route: "Colombo – Sigiriya – Dambulla – Kandy – Galle",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 4.5 },
    quote: "Ravi memastikan tujuh daripada kami bahagia, mengikut jadual, dan ketawa sepanjang perjalanan — pencapaian yang bukan mudah.",
    body: "Berkelompok besar tujuh orang dewasa muda, kami sedikit risau sama ada sewaan peribadi akan berfungsi untuk kami. Ravi meletakkan semua kebimbangan itu pada tempatnya dalam masa sejam pertama. Dia mempunyai bakat semula jadi untuk menguruskan dinamik kumpulan — mengetahui bila hendak berhenti, bila hendak meneruskan perjalanan, dan bila hendak membiarkan semua orang menikmati pemandangan dalam keheningan. Van beliau luas dan selesa, dan dia menjaga kebersihannya sepanjang perjalanan. Ravi juga mempunyai mata yang tajam untuk peluang bergambar dan sentiasa gembira berhenti untuk mengambil gambar yang sempurna. Dia memperkenalkan kami kepada makanan jalanan tempatan yang kami tidak akan jumpa sendiri, dan setiap cadangan adalah luar biasa. Ravi menjadikan perjalanan kumpulan kami benar-benar istimewa.",
  },
  {
    id: "smith",
    photo: "/manus-storage/review_smith_3ba6750f.jpeg",
    driver: "Smith",
    name: "The K Family",
    pax: "5 penumpang",
    period: "Februari 2025",
    route: "Colombo – Ella – Yala – Mirissa",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 5.0 },
    quote: "Profesionalisme tenang Smith dan kehangatan tulennya menjadikan percutian keluarga kami benar-benar luar biasa.",
    body: "Kami melancong sebagai sebuah keluarga lima orang — termasuk dua kanak-kanak kecil dan seorang nenek — dan Smith mengendalikan setiap cabaran logistik dengan cekap dan senyum sentiasa terukir. Dia sangat teliti mengenai keselamatan, sentiasa memastikan semua orang selesa sebelum memulakan perjalanan, dan pemanduannya di jalan berliku ke Ella sangat licin. Smith mengatur kek hari jadi kejutan untuk nenek kami di sebuah restoran di Mirissa, yang menyentuh perasaan seluruh keluarga. Pengetahuannya tentang Taman Negara Yala sangat luar biasa — kami melihat harimau kumbang, gajah, dan buaya dalam satu pagi sahaja. Smith adalah jenis pemandu yang benar-benar mengambil berat tentang kebahagiaan anda. Kami tidak dapat mengesyorkan beliau dengan cukup tinggi.",
  },
  {
    id: "asanka",
    photo: "/manus-storage/review_asanka_couple_3ef4bb3c.png",
    photoPosition: "center 30%",
    driver: "Asanka",
    name: "The P Couple",
    pax: "2 penumpang",
    period: "Januari 2025",
    route: "Colombo – Anuradhapura – Polonnaruwa – Sigiriya",
    ratings: { driver: 5.0, vehicle: 5.0, operator: 4.5 },
    quote: "Asanka menghidupkan bandar purba itu — pengetahuan dan kehangatannya sungguh luar biasa.",
    body: "Kami meneroka Segitiga Budaya bersama Asanka selama tiga hari, dan ia merupakan pengalaman yang tidak akan kami lupa. Pengetahuannya yang mendalam tentang Anuradhapura dan Polonnaruwa menjadikan apa yang mungkin hanya perjalanan panjang melintasi runtuhan menjadi sebuah perjalanan sejarah yang benar-benar menyentuh hati. Dia tahu dengan tepat tapak mana yang harus diberi keutamaan, bila untuk berehat, dan bila untuk teruskan — sentiasa membaca tenaga kami dengan sempurna. Di Sigiriya dia membimbing kami naik batu itu dengan sabar dan memberi galakan, dan waktu yang dipilihnya membuatkan kami mendapat pemandangan terbaik hampir untuk diri kami sendiri. Asanka hangat, profesional, dan tidak pernah putus semangat untuk berkongsi negaranya. Kami meninggalkan Sri Lanka dengan rasa seperti kami telah mendapat seorang kawan sejati.",
  },
  {
    id: "ranjana",
    photo: "/manus-storage/review_ranjana_50bce7fd.jpeg",
    driver: "Ranjana",
    name: "The H Couple",
    pax: "2 penumpang",
    period: "November 2025",
    route: "Colombo – Kandy – Nuwara Eliya – Galle",
    ratings: { driver: 5.0, vehicle: 4.5, operator: 4.5 },
    quote: "Ranjana menjadikan perjalanan kami di Sri Lanka sesuatu yang jauh melangkaui lawatan biasa.",
    body: "Kami menempah sewaan peribadi untuk dua orang dan dipadankan dengan Ranjana — keputusan yang kami tidak mungkin lebih gembira. Dia membawa keyakinan tenang ke setiap pemanduan, mengemudi jalan gunung dan pusat bandar yang sibuk dengan mudah. Yang paling menonjol adalah semangat sejatinya: dia mencadangkan pengalaman arung jeram yang tidak kami rancang, dan ia menjadi salah satu kemuncak perjalanan. Pengetahuan tempatan tentang tempat pandang tersembunyi, tempat makan asli, dan adat budaya memperkayakan setiap hari. Ranjana adalah jenis pemandu yang membuat anda merasa seperti tetamu negara ini, bukan hanya pelancong yang singgah.",
  },
];

// ─── Voice Review Card ────────────────────────────────────────────────────────────────────────────────
type ReviewItem = (typeof VOICE_REVIEWS[0] | typeof HOME_REVIEWS[0]) & { photoPosition?: string };
function VoiceCard({ review }: { review: ReviewItem }) {
  const overall = Math.round(((review.ratings.driver + review.ratings.vehicle + review.ratings.operator) / 3) * 10) / 10;
  return (
    <article className="voice-card">
      <div className="voice-card-photo-wrap">
        <img src={review.photo} alt={`${review.driver} dengan tetamu`} className="voice-card-photo" style={(review as ReviewItem).photoPosition ? { objectPosition: (review as ReviewItem).photoPosition } : undefined} />
        <div className="voice-card-overall-badge">
          <span className="voice-badge-star">★</span>
          <span className="voice-badge-num">{overall.toFixed(1)}</span>
        </div>
      </div>
      <div className="voice-card-content">
        <div className="voice-card-header">
          <div>
            <div className="voice-card-driver">Pemandu: {review.driver}</div>
            <div className="voice-card-meta">{review.name} · {review.pax} · {review.period}</div>
            <div className="voice-card-route">📍 {review.route}</div>
          </div>
        </div>
        <blockquote className="voice-card-quote">"{review.quote}"</blockquote>
        <p className="voice-card-body">{review.body}</p>
        <RatingsBreakdown
          driver={review.ratings.driver}
          vehicle={review.ratings.vehicle}
          operator={review.ratings.operator}
        />
      </div>
    </article>
  );
}

// ─── Voice Page ────────────────────────────────────────────────────────────────
export default function Voice() {
  const ALL_REVIEWS = [...VOICE_REVIEWS, ...HOME_REVIEWS];
  const avgOverall = (
    ALL_REVIEWS.reduce((sum, r) => sum + (r.ratings.driver + r.ratings.vehicle + r.ratings.operator) / 3, 0) /
    ALL_REVIEWS.length
  ).toFixed(1);

  return (
    <div className="voice-page">
      {/* Navbar placeholder – reuse site nav via layout */}
      <header className="voice-header">
        <div className="voice-header-inner">
          <Link href="/" className="voice-back-link">← Kembali ke Laman Utama</Link>
          <a href="/" className="voice-site-title">SLTCS｜Sri Lanka Sewa Kereta dengan Pemandu Peribadi</a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="voice-hero">
          <div className="voice-hero-eyebrow">— SUARA —</div>
          <h1 className="voice-hero-title">Apa Kata Tetamu Kami</h1>
          <p className="voice-hero-sub">
            Ulasan sebenar daripada pelancong yang telah meneroka Sri Lanka dengan pemandu peribadi SLTCS.
          </p>
          <div className="voice-summary-bar">
            <div className="voice-summary-item">
              <span className="voice-summary-num">{ALL_REVIEWS.length}</span>
              <span className="voice-summary-label">Ulasan</span>
            </div>
            <div className="voice-summary-divider" />
            <div className="voice-summary-item">
              <span className="voice-summary-num">{avgOverall}</span>
              <span className="voice-summary-label">Penilaian Keseluruhan</span>
            </div>
            <div className="voice-summary-divider" />
            <div className="voice-summary-item">
              <span className="voice-summary-num">14</span>
              <span className="voice-summary-label">Pemandu</span>
            </div>
          </div>
        </section>

        {/* Reviews Grid */}
        <section className="voice-reviews-section">
          <div className="voice-reviews-grid">
            {ALL_REVIEWS.map((r) => (
              <VoiceCard key={r.id} review={r} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="voice-cta-section">
          <h2 className="voice-cta-title">Bersedia untuk Membuat Cerita Anda Sendiri?</h2>
          <p className="voice-cta-sub">Sertailah ratusan pelancong yang telah meneroka Sri Lanka dengan pemandu peribadi kami.</p>
          <a href="/#contact" className="voice-cta-btn">Pertanyaan Percuma</a>
        </section>
      </main>

      <footer className="voice-footer">
        <p>© 2025 SLTCS – Sri Lanka Sewa Kereta dengan Pemandu Peribadi · <a href="/">en.srilanka-charter.com</a></p>
      </footer>
    </div>
  );
}

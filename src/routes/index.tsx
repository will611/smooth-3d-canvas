import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ChevronDown, ExternalLink, Layers3, Menu, MessageCircle, Ruler, Sparkles, X, Zap } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";

const WA = "https://wa.me/6282174234184";
const wa = (message: string) => `${WA}?text=${encodeURIComponent(message)}`;

// Immutable CDN paths keep every supplied image stable across previews and publishes.
const media = {
  logo: "/__l5e/assets-v1/f91357c5-f8e0-4510-8a9a-51b92a6f9051/ChatGPT_Image_30_Sep_2026_22.38.16.png",
  store: "/__l5e/assets-v1/776fa1a3-3ad9-47ff-a486-be83955459e6/IMG-20260930-WA0110.jpg",
  interior: "/__l5e/assets-v1/0de69be1-1bf2-4083-b573-a1cbd7811f26/IMG-20260930-WA0111.jpg",
  samsung: "/__l5e/assets-v1/034a2b6e-99dd-4738-a6ea-8f4d7f631661/IMG-20260930-WA0112.jpg",
  lettering: "/__l5e/assets-v1/d4723a8f-17ae-4b4f-8fb3-599e9dfb94bd/IMG-20260930-WA0107.jpg",
  display: "/__l5e/assets-v1/809efa4e-feb7-4abb-9272-045ee7c33207/IMG-20260930-WA0089.jpg",
  acp: "/__l5e/assets-v1/793c2307-34f9-4e13-ab0e-2811c286a3f1/IMG-20260930-WA0064.jpg",
} as const;

const projects = [
  { src: media.store, title: "Storefront & Signage", category: "ACP · Signage", alt: "Pemasangan storefront dan signage komersial Erafone" },
  { src: media.interior, title: "Retail Display", category: "Custom Display", alt: "Interior retail dengan illuminated display Samsung" },
  { src: media.samsung, title: "Illuminated Wall", category: "Neon Box", alt: "Display dinding menyala Samsung di area retail" },
  { src: media.lettering, title: "M Store Lettering", category: "3D Lettering", alt: "Proses fabrikasi lettering tiga dimensi M Store" },
  { src: media.display, title: "Premium Product Display", category: "Custom Branding", alt: "Display produk iPhone di interior toko" },
  { src: media.acp, title: "Commercial Facade", category: "ACP · Lettering", alt: "Fasad ACP merah dengan lettering tiga dimensi" },
];

const services = [
  { n: "01", title: "Neon Box", text: "Papan identitas menyala untuk toko, restoran, kafe, kantor, dan ruang komersial.", icon: Zap },
  { n: "02", title: "Signage", text: "Signage indoor dan outdoor yang dibangun sesuai kebutuhan identitas bisnis.", icon: Sparkles },
  { n: "03", title: "ACP", text: "Fasad, storefront, cladding, backdrop, dan finishing area komersial yang rapi.", icon: Layers3 },
  { n: "04", title: "Lettering", text: "Lettering acrylic, PVC, stainless, LED, non-illuminated, dan logo tiga dimensi.", icon: Ruler },
  { n: "05", title: "Advertising", text: "Produksi visual promosi dan struktur advertising untuk kebutuhan bisnis.", icon: ExternalLink },
  { n: "06", title: "Custom Branding", text: "Integrasi ACP, signage, lettering, dan neon box dalam satu eksekusi.", icon: MessageCircle },
];

const faqs = [
  ["Apakah bisa custom ukuran?", "Bisa. Ukuran dan bentuk disesuaikan dengan kebutuhan visual serta kondisi area pemasangan."],
  ["Apakah Mahaka Kreatif mengerjakan dan memasang ACP?", "Ya. Layanan ACP mencakup pengukuran, desain, persiapan material, fabrikasi, pemasangan, dan finishing sesuai kebutuhan proyek."],
  ["Apakah ACP bisa dikombinasikan dengan neon box?", "Bisa. ACP dapat dikombinasikan dengan neon box, signage, lettering, atau LED untuk membentuk identitas storefront yang utuh."],
  ["Apakah bisa membuat signage dari logo sendiri?", "Bisa. Kirim logo atau referensi Anda melalui WhatsApp agar kebutuhan visual dan penerapannya dapat didiskusikan."],
  ["Bagaimana cara mendapatkan estimasi harga?", "Sampaikan jenis layanan, perkiraan ukuran, lokasi proyek, dan referensi. Tim Mahaka Kreatif akan membantu membahas kebutuhannya."],
  ["Berapa lama proses pengerjaan?", "Durasi menyesuaikan lingkup, ukuran, desain, material, dan kondisi pemasangan. Estimasi dibicarakan setelah kebutuhan proyek dipahami."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahaka Kreatif | Neon Box, Signage & ACP Medan" },
      { name: "description", content: "Jasa neon box, signage, ACP, lettering, dan advertising untuk toko dan bisnis. Dari ide, fabrikasi, hingga pemasangan." },
      { property: "og:title", content: "Mahaka Kreatif | Dari Ide Hingga Terpasang" },
      { property: "og:description", content: "Solusi signage, ACP, neon box, lettering, dan advertising untuk identitas bisnis yang lebih kuat." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const selectedProject = lightbox === null ? undefined : projects[lightbox];

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.target.setAttribute("data-visible", String(entry.isIntersecting))), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setLightbox(null);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const nav = useMemo(() => [["Layanan", "#layanan"], ["ACP", "#acp"], ["Portofolio", "#portofolio"], ["Proses", "#proses"], ["FAQ", "#faq"]], []);

  return (
    <main>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="section-shell flex h-18 items-center justify-between">
          <a href="#top" className="relative z-10" aria-label="Mahaka Kreatif - kembali ke atas"><img src={media.logo} alt="Mahaka Kreatif" className="h-10 w-auto max-w-46 object-contain brightness-0 invert" /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
            {nav.map(([label, href]) => <a key={href} href={href} className="font-display text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          </nav>
          <div className="hidden lg:block"><a className="btn-primary !min-h-11" href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi dan booking order.")} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Booking order</a></div>
          <button className="icon-btn lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navigasi mobile">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center border-b border-border font-display text-sm font-semibold uppercase text-foreground">{label}</a>)}</nav>}
      </header>

      <section id="top" className="grid-lines relative min-h-[94svh] overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_55%,var(--background)_100%)]" />
        <div className="section-shell relative grid min-h-[calc(94svh-6rem)] items-center gap-10 py-10 lg:grid-cols-[.94fr_1.06fr] lg:py-14">
          <div className="relative z-10 max-w-2xl reveal" data-visible="true">
            <p className="eyebrow">From idea to installation</p>
            <h1 className="display-title mt-6 text-balance text-[clamp(2.7rem,8vw,6.7rem)]">Neon box,<br /><span className="text-primary neon-text">signage & ACP</span><br />untuk bisnis.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">Mahaka Kreatif membantu bisnis menghadirkan tampilan visual yang profesional, presisi, dan sesuai karakter brand—dari konsep hingga pemasangan.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-primary" href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi dan booking order untuk kebutuhan signage/ACP/neon box.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Booking order</a><a className="btn-secondary" href="#portofolio">Lihat portofolio <ArrowDown size={17} /></a></div>
            <div className="mt-10 flex items-center gap-3 text-xs font-medium uppercase text-muted-foreground"><span className="h-px w-10 bg-primary" /> Design · Fabrication · Installation</div>
          </div>
          <div className="hero-stage relative reveal" data-visible="true">
            <div className="hero-frame relative aspect-[4/5] max-h-[70svh] overflow-hidden border border-border bg-card lg:aspect-[5/6]">
              <img src={media.store} alt="Proyek storefront, ACP, dan signage Mahaka Kreatif" className="h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_55%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7"><div><p className="font-display text-xs uppercase tracking-[.18em] text-primary">Complete storefront</p><p className="mt-2 text-lg font-semibold">ACP + Signage + Lettering</p></div><span className="depth-number font-display text-5xl font-bold text-foreground/25">01</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground" aria-label="Nilai Mahaka Kreatif"><div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[.14em]">{[...Array(2)].flatMap(() => ["Kreatif — Ide tanpa batas", "Presisi — Detail yang berarti", "Profesional — Hasil berkualitas", "Tepat waktu — Komitmen kami", "Terpercaya — Mitra jangka panjang"]).map((x, i) => <span key={i}>{x}</span>)}</div></section>

      <section id="layanan" className="section-pad">
        <div className="section-shell">
          <div className="reveal grid gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="eyebrow">Layanan utama</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Satu partner.<br />Satu eksekusi.</h2></div><p className="max-w-xl text-base leading-7 text-muted-foreground md:justify-self-end">Solusi produksi visual yang dibangun untuk kebutuhan toko, restoran, kafe, kantor, retail, dan bangunan komersial.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ n, title, text, icon: Icon }) => <article key={title} className="group relative bg-card p-6 transition-colors hover:bg-panel-raised md:p-8 reveal"><div className="flex items-start justify-between"><Icon className="text-primary" size={24} /><span className="font-display text-xs text-muted-foreground">{n}</span></div><h3 className="font-display mt-12 text-2xl font-bold uppercase">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{text}</p><a href={wa(`Hallo Mahaka Kreatif, saya ingin konsultasi ${title.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase text-primary">Konsultasi <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a></article>)}
          </div>
        </div>
      </section>

      <section id="acp" className="section-pad border-y border-border bg-panel">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="project-card relative aspect-[4/5] overflow-hidden border border-border reveal md:aspect-[4/3]"><img src={media.acp} alt="Proyek fasad ACP Mahaka Kreatif" className="h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_65%)]" /><p className="absolute bottom-5 left-5 font-display text-sm font-semibold uppercase text-primary">ACP commercial facade</p></div>
          <div className="reveal"><p className="eyebrow">Core service</p><h2 className="display-title mt-5 text-4xl md:text-6xl">ACP untuk fasad yang lebih rapi.</h2><p className="mt-6 text-base leading-7 text-muted-foreground">Bangun tampilan storefront dan area komersial dengan kombinasi panel ACP, signage, dan visual branding.</p><div className="mt-8 divide-y divide-border border-y border-border">{["Survey & measurement", "Design", "Fabrication", "Installation", "Finishing"].map((step, i) => <div key={step} className="flex items-center gap-5 py-4"><span className="font-display text-sm font-bold text-primary">0{i + 1}</span><span className="font-display text-sm font-semibold uppercase">{step}</span></div>)}</div><a className="btn-primary mt-8" href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi proyek ACP untuk kebutuhan toko/bisnis saya.")} target="_blank" rel="noreferrer">Konsultasi proyek ACP <ArrowRight size={17} /></a></div>
        </div>
      </section>

      <section id="portofolio" className="section-pad">
        <div className="section-shell">
          <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">Pekerjaan nyata</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Hasil yang berbicara.</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Dokumentasi produksi dan pemasangan untuk kebutuhan retail, storefront, lettering, dan display komersial.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => <button key={project.title} onClick={() => setLightbox(index)} className={`project-card group relative overflow-hidden border border-border bg-card text-left reveal ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`} aria-label={`Lihat ${project.title}`}><div className={index === 0 ? "aspect-[16/9]" : "aspect-square"}><img src={project.src} alt={project.alt} loading="lazy" className="h-full w-full object-cover" /></div><div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_62%)]" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"><div><p className="font-display text-xs font-semibold uppercase text-primary">{project.category}</p><h3 className="mt-1 text-lg font-semibold">{project.title}</h3></div><span className="icon-btn !h-10 !min-h-10 !w-10"><ExternalLink size={16} /></span></div></button>)}</div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-card"><div className="section-shell reveal"><p className="eyebrow">Integrated solutions</p><h2 className="display-title mt-5 max-w-4xl text-4xl md:text-7xl">Satu identitas.<br /><span className="text-primary">Satu eksekusi.</span></h2><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["ACP + Neon Box", "ACP + 3D Lettering", "ACP + Signage", "Signage + Advertising"].map((item, i) => <div key={item} className="border border-border bg-background p-6"><span className="font-display text-xs text-primary">0{i + 1}</span><p className="font-display mt-8 text-lg font-bold uppercase">{item}</p></div>)}</div></div></section>

      <section id="proses" className="section-pad"><div className="section-shell"><div className="reveal"><p className="eyebrow">Cara kami bekerja</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Dari ide hingga terpasang.</h2></div><div className="relative mt-12 grid gap-px border border-border bg-border md:grid-cols-3">{[["01","Konsultasi","Ceritakan kebutuhan dan referensi proyek Anda."],["02","Survey / measurement","Dimensi, lokasi, dan kebutuhan proyek ditentukan bila diperlukan."],["03","Konsep & design","Arah visual dikembangkan sesuai kebutuhan proyek."],["04","Fabrication","Produksi dan fabrikasi mengikuti konsep yang disepakati."],["05","Quality check","Hasil diperiksa sebelum masuk ke tahap pemasangan."],["06","Installation","Produk dipasang di lokasi yang telah disepakati."]].map(([n,t,d]) => <article key={n} className="bg-background p-6 md:p-8 reveal"><span className="depth-number font-display text-5xl font-bold text-foreground/15">{n}</span><h3 className="font-display mt-10 text-lg font-bold uppercase">{t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</div></div></section>

      <section id="faq" className="section-pad border-y border-border bg-panel"><div className="section-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div className="reveal"><p className="eyebrow">FAQ</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Yang sering ditanyakan.</h2></div><div className="divide-y divide-border border-y border-border reveal">{faqs.map(([q,a]) => <details key={q} className="group"><summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-sm font-semibold uppercase"><span>{q}</span><ChevronDown className="shrink-0 text-primary transition-transform group-open:rotate-180" size={19} /></summary><p className="max-w-2xl pb-6 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></div></section>

      <QuoteSection />

      <footer className="border-t border-border pb-28 pt-12 md:pb-12"><div className="section-shell grid gap-10 md:grid-cols-3"><div><img src={media.logo} alt="Mahaka Kreatif" className="h-12 w-auto max-w-56 object-contain brightness-0 invert" /><p className="mt-4 text-sm uppercase text-muted-foreground">Neon Box · Signage · ACP · Advertising</p></div><div><p className="font-display text-xs font-semibold uppercase text-primary">Hubungi kami</p><a href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi mengenai proyek saya.")} target="_blank" rel="noreferrer" className="mt-4 block text-xl font-semibold">0821 7423 4184</a></div><div className="md:text-right"><p className="text-xs uppercase text-muted-foreground">© Mahaka Kreatif<br />All rights reserved.</p></div></div></footer>

      <a href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi dan booking order.")} target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 z-40 hidden h-14 items-center gap-2 rounded-full bg-whatsapp px-5 font-display text-xs font-bold uppercase text-primary-foreground shadow-2xl md:flex"><MessageCircle size={20} /> WhatsApp</a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 p-2 backdrop-blur-xl md:hidden"><a href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi dan booking order.")} target="_blank" rel="noreferrer" className="btn-primary w-full !bg-whatsapp !border-whatsapp"><MessageCircle size={19} /> WhatsApp — Booking order</a></div>

      {selectedProject && <div className="fixed inset-0 z-[80] grid place-items-center bg-background/95 p-3 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setLightbox(null)}><button className="icon-btn absolute right-4 top-4 z-10" onClick={() => setLightbox(null)} aria-label="Tutup gambar"><X /></button><figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}><img src={selectedProject.src} alt={selectedProject.alt} className="max-h-[78vh] w-auto max-w-full object-contain" /><figcaption className="mt-4 flex justify-between gap-4"><span className="font-semibold">{selectedProject.title}</span><span className="font-display text-xs uppercase text-primary">{selectedProject.category}</span></figcaption></figure></div>}
    </main>
  );
}

function QuoteSection() {
  const [error, setError] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const service = String(data.get("service") || "").trim();
    if (!name || !phone || !service) { setError("Lengkapi nama, nomor WhatsApp, dan jenis layanan."); return; }
    setError("");
    const message = [`Hallo Mahaka Kreatif, saya ingin meminta estimasi proyek.`, ``, `Nama: ${name}`, `Nama bisnis: ${data.get("business") || "-"}`, `Nomor WhatsApp: ${phone}`, `Layanan: ${service}`, `Ukuran perkiraan: ${data.get("size") || "-"}`, `Lokasi proyek: ${data.get("location") || "-"}`, `Kebutuhan: ${data.get("description") || "-"}`].join("\n");
    window.open(wa(message), "_blank", "noopener,noreferrer");
  };
  return <section id="contact" className="section-pad"><div className="section-shell grid overflow-hidden border border-border bg-card lg:grid-cols-[.8fr_1.2fr]"><div className="grid-lines relative p-7 md:p-12"><p className="eyebrow">Quick quotation</p><h2 className="display-title mt-6 text-4xl md:text-6xl">Sudah punya ide?</h2><p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Kirim kebutuhan Anda. Diskusikan konsep, ukuran, dan kebutuhan proyek bersama Mahaka Kreatif.</p><a className="mt-8 inline-flex items-center gap-2 text-primary" href={wa("Hallo Mahaka Kreatif, saya ingin konsultasi mengenai proyek saya.")} target="_blank" rel="noreferrer"><MessageCircle size={20} /><span className="font-display text-sm font-semibold">0821 7423 4184</span></a></div><form onSubmit={submit} className="grid gap-4 bg-panel p-7 md:grid-cols-2 md:p-12"><label className="text-xs font-medium uppercase text-muted-foreground">Nama *<input className="field mt-2" name="name" autoComplete="name" placeholder="Nama Anda" /></label><label className="text-xs font-medium uppercase text-muted-foreground">Nama bisnis<input className="field mt-2" name="business" placeholder="Nama usaha" /></label><label className="text-xs font-medium uppercase text-muted-foreground">Nomor WhatsApp *<input className="field mt-2" name="phone" inputMode="tel" autoComplete="tel" placeholder="08..." /></label><label className="text-xs font-medium uppercase text-muted-foreground">Jenis layanan *<select className="field mt-2" name="service" defaultValue=""><option value="" disabled>Pilih layanan</option>{["Neon Box","Signage","ACP","Lettering","Advertising","Custom Branding","Lainnya"].map(x => <option key={x}>{x}</option>)}</select></label><label className="text-xs font-medium uppercase text-muted-foreground">Ukuran perkiraan<input className="field mt-2" name="size" placeholder="Contoh: 3 × 1 meter" /></label><label className="text-xs font-medium uppercase text-muted-foreground">Lokasi proyek<input className="field mt-2" name="location" placeholder="Kota / area" /></label><label className="text-xs font-medium uppercase text-muted-foreground md:col-span-2">Deskripsi kebutuhan<textarea className="field mt-2 min-h-28 resize-y" name="description" placeholder="Ceritakan kebutuhan proyek Anda" /></label>{error && <p className="text-sm text-primary md:col-span-2" role="alert">{error}</p>}<button className="btn-primary md:col-span-2" type="submit">Kirim permintaan via WhatsApp <ArrowRight size={18} /></button></form></div></section>;
}
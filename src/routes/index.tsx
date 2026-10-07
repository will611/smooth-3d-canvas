import { FallingParticles } from "@/components/falling-particles";
import { Button } from "@/components/ui/button";
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
  { src: media.store, title: "Depan Toko & Papan Nama", category: "ACP · Signage", alt: "Pemasangan storefront dan signage komersial Erafone" },
  { src: media.interior, title: "Display Toko", category: "Display Custom", alt: "Interior retail dengan illuminated display Samsung" },
  { src: media.samsung, title: "Display Dinding Menyala", category: "Neon Box", alt: "Display dinding menyala Samsung di area retail" },
  { src: media.lettering, title: "Huruf Timbul M Store", category: "Huruf Timbul", alt: "Proses fabrikasi lettering tiga dimensi M Store" },
  { src: media.display, title: "Display Produk", category: "Tampilan Custom", alt: "Display produk iPhone di interior toko" },
  { src: media.acp, title: "Tampilan Depan Toko", category: "ACP · Huruf Timbul", alt: "Fasad ACP merah dengan lettering tiga dimensi" },
];

const services = [
  { n: "01", title: "Neon Box", text: "Bikin nama usaha lebih terlihat, siang maupun malam. Cocok buat toko, kafe, restoran, dan kantor.", icon: Zap },
  { n: "02", title: "Signage", text: "Papan nama untuk dalam atau luar ruangan, dibuat sesuai gaya dan kebutuhan usaha kamu.", icon: Sparkles },
  { n: "03", title: "ACP", text: "Rapikan tampilan depan toko, dinding, atau backdrop dengan panel ACP yang pas.", icon: Layers3 },
  { n: "04", title: "Lettering", text: "Huruf timbul dan logo 3D dari acrylic, PVC, atau stainless. Bisa pakai lampu LED atau tanpa lampu.", icon: Ruler },
  { n: "05", title: "Advertising", text: "Bikin materi promosi dan papan iklan yang membantu usaha kamu lebih dikenal.", icon: ExternalLink },
  { n: "06", title: "Tampilan Custom", text: "Gabungkan ACP, papan nama, huruf timbul, dan neon box biar tampilan usaha kamu makin serasi.", icon: MessageCircle },
];

const faqs = [
  ["Bisa pesan ukuran sendiri?", "Bisa banget. Kita sesuaikan ukuran dan bentuknya dengan kebutuhan kamu serta tempat pemasangannya."],
  ["ACP-nya sekalian dipasang?", "Iya, kita bantu dari ukur lokasi, desain, siapkan bahan, produksi, sampai pasang dan rapikan hasilnya."],
  ["ACP bisa digabung dengan neon box?", "Bisa. ACP cocok dipadukan dengan neon box, papan nama, huruf timbul, atau LED supaya tampilan depan toko makin serasi."],
  ["Sudah punya logo, bisa dipakai?", "Tentu. Kirim logo atau contoh yang kamu suka lewat WhatsApp, lalu kita ngobrolin bentuk dan bahan yang cocok."],
  ["Mau tahu perkiraan harganya?", "Ceritakan apa yang mau dibuat, perkiraan ukuran, lokasi, dan contoh yang kamu suka. Nanti kita bantu bahas kebutuhannya."],
  ["Pengerjaannya berapa lama?", "Tergantung ukuran, desain, bahan, dan lokasi pemasangan. Kita bahas perkiraan waktunya setelah tahu kebutuhan kamu."],
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mahaka Kreatif | Neon Box, Signage & ACP Medan" },
      { name: "description", content: "Bikin neon box, papan nama, ACP, dan huruf timbul untuk usaha kamu. Mahaka Kreatif bantu dari ngobrol ide sampai terpasang." },
      { property: "og:title", content: "Mahaka Kreatif | Dari Ngobrol Ide Sampai Terpasang" },
      { property: "og:description", content: "Punya ide untuk tampilan usaha kamu? Yuk, bikin neon box, papan nama, ACP, atau huruf timbul bersama Mahaka Kreatif." },
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
    <main className="site-shell">
      <FallingParticles />
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="section-shell flex h-18 items-center justify-between">
          <a href="#top" className="relative z-10" aria-label="Mahaka Kreatif - kembali ke atas"><img src={media.logo} alt="Mahaka Kreatif" className="h-10 w-auto max-w-46 object-contain brightness-0 invert" /></a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
            {nav.map(([label, href]) => <a key={href} href={href} className="font-display text-xs font-semibold uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-primary">{label}</a>)}
          </nav>
          <div className="hidden lg:block"><a className="btn-primary !min-h-11" href={wa("Halo Mahaka Kreatif, saya ingin konsultasi dan bahas pesanan.")} target="_blank" rel="noreferrer"><MessageCircle size={17} /> Yuk, ngobrol</a></div>
          <Button className="icon-btn lg:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label={menuOpen ? "Tutup menu" : "Buka menu"}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="border-t border-border bg-background px-5 py-5 lg:hidden" aria-label="Navigasi mobile">{nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center border-b border-border font-display text-sm font-semibold uppercase text-foreground">{label}</a>)}</nav>}
      </header>

      <section id="top" className="grid-lines relative min-h-[94svh] overflow-hidden pt-24">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,var(--background)_0%,transparent_55%,var(--background)_100%)]" />
        <div className="section-shell relative grid min-h-[calc(94svh-6rem)] items-center gap-10 py-10 lg:grid-cols-[.94fr_1.06fr] lg:py-14">
          <div className="relative z-10 max-w-2xl reveal" data-visible="true">
            <p className="eyebrow">Dari ngobrol ide sampai terpasang</p>
            <h1 className="display-title mt-6 text-balance text-[clamp(2.7rem,8vw,6.7rem)]">Neon box,<br /><span className="text-primary neon-text">signage & ACP</span><br />untuk bisnis.</h1>
            <p className="mt-7 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">Punya ide buat tampilan usaha kamu? Mahaka Kreatif bantu bikin jadi nyata—dari pilih desain dan bahan sampai rapi terpasang.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a className="btn-primary" href={wa("Halo Mahaka Kreatif, saya ingin konsultasi dan bahas pesanan untuk kebutuhan signage/ACP/neon box.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Yuk, ngobrol</a><a className="btn-secondary" href="#portofolio">Lihat portofolio <ArrowDown size={17} /></a></div>
            <div className="mt-10 flex items-center gap-3 text-xs font-medium uppercase text-muted-foreground"><span className="h-px w-10 bg-primary" /> Desain · Bikin · Pasang</div>
          </div>
          <div className="hero-stage relative reveal" data-visible="true">
            <div className="hero-frame relative aspect-[4/5] max-h-[70svh] overflow-hidden border border-border bg-card lg:aspect-[5/6]">
              <img src={media.store} alt="Proyek storefront, ACP, dan signage Mahaka Kreatif" className="h-full w-full object-cover" fetchPriority="high" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_55%)]" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-7"><div><p className="font-display text-xs uppercase tracking-[.18em] text-primary">Tampilan depan toko</p><p className="mt-2 text-lg font-semibold">ACP + Papan nama + Huruf timbul</p></div><span className="depth-number font-display text-5xl font-bold text-foreground/25">01</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-border bg-primary py-3 text-primary-foreground" aria-label="Nilai Mahaka Kreatif"><div className="marquee-track flex w-max gap-12 whitespace-nowrap font-display text-sm font-bold uppercase tracking-[.14em]">{[...Array(2)].flatMap(() => ["Punya ide? Yuk, ceritakan", "Detailnya kita perhatikan", "Dibikin dengan sepenuh hati", "Jadwal kita sepakati bersama", "Dari ngobrol sampai terpasang"]).map((x, i) => <span key={i}>{x}</span>)}</div></section>

      <section id="layanan" className="section-pad">
        <div className="section-shell">
          <div className="reveal grid gap-5 md:grid-cols-[.8fr_1.2fr] md:items-end"><div><p className="eyebrow">Mau bikin apa?</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Kamu punya ide.<br />Kita bantu bikin.</h2></div><p className="max-w-xl text-base leading-7 text-muted-foreground md:justify-self-end">Buat toko, kafe, restoran, atau kantor—kita bantu pilih tampilan yang cocok, lalu bikin dan pasang sampai rapi.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ n, title, text, icon: Icon }) => <article key={title} className="group relative bg-card p-6 transition-colors hover:bg-panel-raised md:p-8 reveal"><div className="flex items-start justify-between"><Icon className="text-primary" size={24} /><span className="font-display text-xs text-muted-foreground">{n}</span></div><h3 className="font-display mt-12 text-2xl font-bold uppercase">{title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{text}</p><a href={wa(`Halo Mahaka Kreatif, saya ingin konsultasi ${title.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 font-display text-xs font-semibold uppercase text-primary">Tanya dulu <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a></article>)}
          </div>
        </div>
      </section>

      <section id="acp" className="section-pad border-y border-border bg-panel">
        <div className="section-shell grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div className="project-card relative aspect-[4/5] overflow-hidden border border-border reveal md:aspect-[4/3]"><img src={media.acp} alt="Proyek fasad ACP Mahaka Kreatif" className="h-full w-full object-cover" loading="lazy" /><div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_65%)]" /><p className="absolute bottom-5 left-5 font-display text-sm font-semibold uppercase text-primary">Tampilan depan dengan ACP</p></div>
          <div className="reveal"><p className="eyebrow">Bikin tampilan makin rapi</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Depan toko rapi pakai ACP.</h2><p className="mt-6 text-base leading-7 text-muted-foreground">Mau ganti suasana depan toko? Padukan panel ACP dengan papan nama atau huruf timbul yang sesuai gaya usaha kamu.</p><div className="mt-8 divide-y divide-border border-y border-border">{["Cek lokasi & ukur", "Pilih desain", "Mulai produksi", "Pasang di lokasi", "Rapikan hasilnya"].map((step, i) => <div key={step} className="flex items-center gap-5 py-4"><span className="font-display text-sm font-bold text-primary">0{i + 1}</span><span className="font-display text-sm font-semibold uppercase">{step}</span></div>)}</div><a className="btn-primary mt-8" href={wa("Halo Mahaka Kreatif, saya ingin konsultasi proyek ACP untuk kebutuhan toko/bisnis saya.")} target="_blank" rel="noreferrer">Ngobrol soal ACP <ArrowRight size={17} /></a></div>
        </div>
      </section>

      <section id="portofolio" className="section-pad">
        <div className="section-shell">
          <div className="reveal flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="eyebrow">Yang sudah kita kerjakan</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Dari ide jadi nyata.</h2></div><p className="max-w-md text-sm leading-6 text-muted-foreground">Ini beberapa hasil yang sudah kita bikin dan pasang: tampilan toko, huruf timbul, sampai display produk.</p></div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{projects.map((project, index) => <Button key={project.title} onClick={() => setLightbox(index)} className={`project-card group relative overflow-hidden border border-border bg-card text-left reveal ${index === 0 ? "md:col-span-2 lg:col-span-2" : ""}`} aria-label={`Lihat ${project.title}`}><div className={index === 0 ? "aspect-[16/9]" : "aspect-square"}><img src={project.src} alt={project.alt} loading="lazy" className="h-full w-full object-cover" /></div><div className="absolute inset-0 bg-[linear-gradient(to_top,var(--background),transparent_62%)]" /><div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5"><div><p className="font-display text-xs font-semibold uppercase text-primary">{project.category}</p><h3 className="mt-1 text-lg font-semibold">{project.title}</h3></div><span className="icon-btn !h-10 !min-h-10 !w-10"><ExternalLink size={16} /></span></div></Button>)}</div>
        </div>
      </section>

      <section className="section-pad border-y border-border bg-card"><div className="section-shell reveal"><p className="eyebrow">Bisa digabung juga</p><h2 className="display-title mt-5 max-w-4xl text-4xl md:text-7xl">Biar serasi.<br /><span className="text-primary">Kita bikin bareng.</span></h2><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{["ACP + Neon Box", "ACP + Huruf Timbul", "ACP + Papan Nama", "Papan Nama + Iklan"].map((item, i) => <div key={item} className="border border-border bg-background p-6"><span className="font-display text-xs text-primary">0{i + 1}</span><p className="font-display mt-8 text-lg font-bold uppercase">{item}</p></div>)}</div></div></section>

      <section id="proses" className="section-pad"><div className="section-shell"><div className="reveal"><p className="eyebrow">Gimana prosesnya?</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Ngobrol dulu, lalu kita bikin.</h2></div><div className="relative mt-12 grid gap-px border border-border bg-border md:grid-cols-3">{[["01","Ngobrol dulu","Ceritakan mau bikin apa dan contoh yang kamu suka."],["02","Cek & ukur lokasi","Kalau perlu, kita cek tempat dan ukur area pemasangannya."],["03","Pilih desain","Kita cari bentuk, warna, dan bahan yang cocok buat kamu."],["04","Mulai produksi","Setelah desain disepakati, pesanan kamu mulai kita buat."],["05","Cek hasilnya","Kita periksa dulu supaya hasilnya siap dipasang."],["06","Pasang di lokasi","Kita pasang di tempat yang disepakati, lalu rapikan."]].map(([n,t,d]) => <article key={n} className="bg-background p-6 md:p-8 reveal"><span className="depth-number font-display text-5xl font-bold text-foreground/15">{n}</span><h3 className="font-display mt-10 text-lg font-bold uppercase">{t}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{d}</p></article>)}</div></div></section>

      <section id="faq" className="section-pad border-y border-border bg-panel"><div className="section-shell grid gap-10 lg:grid-cols-[.7fr_1.3fr]"><div className="reveal"><p className="eyebrow">FAQ</p><h2 className="display-title mt-5 text-4xl md:text-6xl">Masih penasaran?</h2></div><div className="divide-y divide-border border-y border-border reveal">{faqs.map(([q,a]) => <details key={q} className="group"><summary className="flex min-h-18 cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-sm font-semibold uppercase"><span>{q}</span><ChevronDown className="shrink-0 text-primary transition-transform group-open:rotate-180" size={19} /></summary><p className="max-w-2xl pb-6 text-sm leading-6 text-muted-foreground">{a}</p></details>)}</div></div></section>

      <QuoteSection />

      <footer className="border-t border-border pb-28 pt-12 md:pb-12"><div className="section-shell grid gap-10 md:grid-cols-3"><div><img src={media.logo} alt="Mahaka Kreatif" className="h-12 w-auto max-w-56 object-contain brightness-0 invert" /><p className="mt-4 text-sm uppercase text-muted-foreground">Neon Box · Signage · ACP · Advertising</p></div><div><p className="font-display text-xs font-semibold uppercase text-primary">Ngobrol sama kita</p><a href={wa("Halo Mahaka Kreatif, saya ingin konsultasi mengenai proyek saya.")} target="_blank" rel="noreferrer" className="mt-4 block text-xl font-semibold">0821 7423 4184</a></div><div className="md:text-right"><p className="text-xs uppercase text-muted-foreground">© Mahaka Kreatif<br />Hak cipta dilindungi.</p></div></div></footer>

      <a href={wa("Halo Mahaka Kreatif, saya ingin konsultasi dan bahas pesanan.")} target="_blank" rel="noreferrer" className="fixed bottom-4 right-4 z-40 hidden h-14 items-center gap-2 rounded-full bg-whatsapp px-5 font-display text-xs font-bold uppercase text-primary-foreground shadow-2xl md:flex"><MessageCircle size={20} /> WhatsApp</a>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/92 p-2 backdrop-blur-xl md:hidden"><a href={wa("Halo Mahaka Kreatif, saya ingin konsultasi dan bahas pesanan.")} target="_blank" rel="noreferrer" className="btn-primary w-full !bg-whatsapp !border-whatsapp"><MessageCircle size={19} /> WhatsApp — Yuk, ngobrol</a></div>

      {selectedProject && <div className="fixed inset-0 z-[80] grid place-items-center bg-background/95 p-3 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label={selectedProject.title} onClick={() => setLightbox(null)}><Button className="icon-btn absolute right-4 top-4 z-10" onClick={() => setLightbox(null)} aria-label="Tutup gambar"><X /></Button><figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}><img src={selectedProject.src} alt={selectedProject.alt} className="max-h-[78vh] w-auto max-w-full object-contain" /><figcaption className="mt-4 flex justify-between gap-4"><span className="font-semibold">{selectedProject.title}</span><span className="font-display text-xs uppercase text-primary">{selectedProject.category}</span></figcaption></figure></div>}
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
    if (!name || !phone || !service) { setError("Isi nama, nomor WhatsApp, dan mau bikin apa dulu, ya."); return; }
    setError("");
    const message = [`Halo Mahaka Kreatif, saya mau ngobrol soal pesanan dan perkiraan biayanya.`, ``, `Nama: ${name}`, `Nama usaha: ${data.get("business") || "-"}`, `Nomor WhatsApp: ${phone}`, `Layanan: ${service}`, `Ukuran perkiraan: ${data.get("size") || "-"}`, `Lokasi pemasangan: ${data.get("location") || "-"}`, `Kebutuhan: ${data.get("description") || "-"}`].join("\n");
    window.open(wa(message), "_blank", "noopener,noreferrer");
  };
  return <section id="contact" className="section-pad"><div className="section-shell grid overflow-hidden border border-border bg-card lg:grid-cols-[.8fr_1.2fr]"><div className="grid-lines relative p-7 md:p-12"><p className="eyebrow">Yuk, ceritakan</p><h2 className="display-title mt-6 text-4xl md:text-6xl">Sudah punya ide?</h2><p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">Mau bikin apa? Isi sedikit cerita di sini, lalu kita lanjut ngobrol di WhatsApp soal desain, ukuran, dan perkiraan biaya.</p><a className="mt-8 inline-flex items-center gap-2 text-primary" href={wa("Halo Mahaka Kreatif, saya ingin konsultasi mengenai proyek saya.")} target="_blank" rel="noreferrer"><MessageCircle size={20} /><span className="font-display text-sm font-semibold">0821 7423 4184</span></a></div><form onSubmit={submit} className="grid gap-4 bg-panel p-7 md:grid-cols-2 md:p-12"><label className="text-xs font-medium uppercase text-muted-foreground">Nama *<input className="field mt-2" name="name" autoComplete="name" placeholder="Nama kamu" /></label><label className="text-xs font-medium uppercase text-muted-foreground">Nama usaha<input className="field mt-2" name="business" placeholder="Nama usaha" /></label><label className="text-xs font-medium uppercase text-muted-foreground">Nomor WhatsApp *<input className="field mt-2" name="phone" inputMode="tel" autoComplete="tel" placeholder="08..." /></label><label className="text-xs font-medium uppercase text-muted-foreground">Mau bikin apa? *<select className="field mt-2" name="service" defaultValue=""><option value="" disabled>Pilih yang kamu butuhkan</option>{["Neon Box","Signage","ACP","Lettering","Advertising","Tampilan Custom","Lainnya"].map(x => <option key={x}>{x}</option>)}</select></label><label className="text-xs font-medium uppercase text-muted-foreground">Ukuran perkiraan<input className="field mt-2" name="size" placeholder="Contoh: 3 × 1 meter" /></label><label className="text-xs font-medium uppercase text-muted-foreground">Lokasi pemasangan<input className="field mt-2" name="location" placeholder="Kota / area" /></label><label className="text-xs font-medium uppercase text-muted-foreground md:col-span-2">Ceritain kebutuhan kamu<textarea className="field mt-2 min-h-28 resize-y" name="description" placeholder="Mau bikin seperti apa? Boleh ceritakan di sini" /></label>{error && <p className="text-sm text-primary md:col-span-2" role="alert">{error}</p>}<Button className="btn-primary md:col-span-2" type="submit">Lanjut ngobrol di WhatsApp <ArrowRight size={18} /></Button></form></div></section>;
}
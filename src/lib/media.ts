import logo from "@/assets/ChatGPT_Image_30_Sep_2026_22.38.16-400.webp.asset.json";
import store640 from "@/assets/IMG-20260930-WA0110-640.webp.asset.json";
import store1280 from "@/assets/IMG-20260930-WA0110-1280.webp.asset.json";
import storeOriginal from "@/assets/IMG-20260930-WA0110.jpg.asset.json";
import interior640 from "@/assets/IMG-20260930-WA0111-640.webp.asset.json";
import interior1280 from "@/assets/IMG-20260930-WA0111-1280.webp.asset.json";
import interiorOriginal from "@/assets/IMG-20260930-WA0111.jpg.asset.json";
import samsung640 from "@/assets/IMG-20260930-WA0112-640.webp.asset.json";
import samsung1280 from "@/assets/IMG-20260930-WA0112-1280.webp.asset.json";
import samsungOriginal from "@/assets/IMG-20260930-WA0112.jpg.asset.json";
import lettering640 from "@/assets/IMG-20260930-WA0107-640.webp.asset.json";
import lettering1280 from "@/assets/IMG-20260930-WA0107-1280.webp.asset.json";
import letteringOriginal from "@/assets/IMG-20260930-WA0107.jpg.asset.json";
import display640 from "@/assets/IMG-20260930-WA0089-640.webp.asset.json";
import display1280 from "@/assets/IMG-20260930-WA0089-1280.webp.asset.json";
import displayOriginal from "@/assets/IMG-20260930-WA0089.jpg.asset.json";
import acp640 from "@/assets/IMG-20260930-WA0064-640.webp.asset.json";
import acp1280 from "@/assets/IMG-20260930-WA0064-1280.webp.asset.json";
import acpOriginal from "@/assets/IMG-20260930-WA0064.jpg.asset.json";

// Immutable CDN pointers preserve originals and responsive optimized copies.
export const media = {
  logo: logo.url,
  store: { src: store640.url, srcSet: `${store640.url} 640w, ${store1280.url} 1280w`, original: storeOriginal.url },
  interior: { src: interior640.url, srcSet: `${interior640.url} 640w, ${interior1280.url} 1280w`, original: interiorOriginal.url },
  samsung: { src: samsung640.url, srcSet: `${samsung640.url} 640w, ${samsung1280.url} 1280w`, original: samsungOriginal.url },
  lettering: { src: lettering640.url, srcSet: `${lettering640.url} 640w, ${lettering1280.url} 1280w`, original: letteringOriginal.url },
  display: { src: display640.url, srcSet: `${display640.url} 640w, ${display1280.url} 1280w`, original: displayOriginal.url },
  acp: { src: acp640.url, srcSet: `${acp640.url} 640w, ${acp1280.url} 864w`, original: acpOriginal.url },
} as const;

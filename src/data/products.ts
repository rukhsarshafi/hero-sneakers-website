import type { Product } from "../types/product";

const IMG = {
  core: "/bbd4e6f9-0431-4b09-8f7f-b61874bcbdb9.jpg",
  pulse: "/c6d0a0db-9037-4467-b158-64f1083d660d.jpg",
  velocity: "/90d9b35b-579a-47c7-a9dd-19246ac7ab7c.jpg",
  velocityTop: "/4c13a83e-38e2-42ba-a500-ed3397717659.jpg",
  velocityDetail: "/1f3e393f-17d9-4cf3-902b-b0424507d413.jpg",
  velocitySole: "/1dbbb7ac-3665-4f76-b82a-f8f9e95640b6.jpg",
  apex: "/9555a80e-23c7-4748-b766-9a749876589e.jpg",
  stride: "/59a90379-d279-4fb7-9634-1b23084010ec.jpg",
  nova: "/bdab87de-49d8-4b49-9a74-92768bdbfcbb.jpg",
  rush: "/f22bd682-10cb-4e66-ab05-85dc003c7860.jpg",
  shadow: "/a00ca05a-5d8f-451e-b6cb-a3c1757cc98d.jpg"
};

const SIZES = [40, 41, 42, 43, 44, 45];

export const products: Product[] = [
{
  id: "hero-core",
  slug: "hero-core",
  name: "HERO CORE",
  price: 7999,
  shortDescription: "Everyday lifestyle sneaker with lightweight comfort and a clean streetwear silhouette.",
  description: "A clean, low-profile everyday sneaker with a smooth upper, lightweight cupsole and red heel details. Designed to go with everything you already own.",
  category: "Lifestyle",
  isNew: false,
  releasedAt: "2026-03-10",
  color: "Black / Red / White",
  colorFamilies: ["Black", "Red", "White"],
  colorways: [{ name: "Black / Red / White", swatches: ["#0B0B0D", "#E63946", "#FFFFFF"], available: true }],
  rating: 4.6,
  reviewCount: 214,
  sizes: SIZES,
  soldOutSizes: [45],
  image: { src: IMG.core, alt: "HERO CORE sneaker in black with white sole and red heel tab, side profile" },
  gallery: [{ src: IMG.core, alt: "HERO CORE sneaker in black with white sole and red heel tab, side profile" }]
},
{
  id: "hero-pulse",
  slug: "hero-pulse",
  name: "HERO PULSE",
  price: 9499,
  shortDescription: "Sport-inspired lifestyle sneaker designed for everyday movement and active urban life.",
  description: "Breathable mesh, silver support overlays and a sculpted two-tone midsole. A sport-inspired shape tuned for long days on the move.",
  category: "Lifestyle",
  isNew: false,
  releasedAt: "2026-05-02",
  color: "Black / Silver / Red",
  colorFamilies: ["Black", "Silver", "Red"],
  colorways: [{ name: "Black / Silver / Red", swatches: ["#0B0B0D", "#C7CBD1", "#E63946"], available: true }],
  rating: 4.5,
  reviewCount: 162,
  sizes: SIZES,
  soldOutSizes: [],
  image: { src: IMG.pulse, alt: "HERO PULSE sneaker in black mesh with silver overlays and red accents, side profile" },
  gallery: [{ src: IMG.pulse, alt: "HERO PULSE sneaker in black mesh with silver overlays and red accents, side profile" }]
},
{
  id: "hero-velocity",
  slug: "hero-velocity",
  name: "HERO VELOCITY",
  price: 10999,
  shortDescription: "Performance-inspired sneaker combining responsive comfort with a bold modern silhouette.",
  description: "Performance-inspired lifestyle sneaker designed for everyday movement, comfort, and modern streetwear styling.",
  category: "Performance Inspired",
  isNew: true,
  releasedAt: "2026-09-12",
  color: "Black / Silver",
  colorFamilies: ["Black", "Silver"],
  colorways: [
  { name: "Black / Silver", swatches: ["#0B0B0D", "#C7CBD1"], available: true },
  { name: "Black / Red", swatches: ["#0B0B0D", "#E63946"], available: false }],

  rating: 4.8,
  reviewCount: 96,
  sizes: SIZES,
  soldOutSizes: [40],
  badge: "New",
  image: { src: IMG.velocity, alt: "HERO VELOCITY sneaker in black mesh with silver support panels, side profile" },
  gallery: [
  { src: IMG.velocity, alt: "HERO VELOCITY side profile in black and silver" },
  { src: IMG.velocityTop, alt: "HERO VELOCITY top view showing the black mesh upper and laces" },
  { src: IMG.velocityDetail, alt: "Close-up of the HERO VELOCITY silver reflective heel and mesh texture" },
  { src: IMG.velocitySole, alt: "HERO VELOCITY durable rubber outsole traction pattern" }]

},
{
  id: "hero-apex",
  slug: "hero-apex",
  name: "HERO APEX",
  price: 12999,
  shortDescription: "Premium flagship sneaker featuring advanced cushioning, premium materials, and an elevated streetwear aesthetic.",
  description: "Our flagship. Suede and smooth leather upper, silver hardware and a dual-density cushioned midsole for an elevated everyday feel.",
  category: "Premium",
  isNew: false,
  releasedAt: "2026-06-20",
  color: "Black / Red / Silver",
  colorFamilies: ["Black", "Red", "Silver"],
  colorways: [{ name: "Black / Red / Silver", swatches: ["#0B0B0D", "#E63946", "#C7CBD1"], available: true }],
  rating: 4.9,
  reviewCount: 71,
  sizes: SIZES,
  soldOutSizes: [41],
  badge: "Flagship",
  image: { src: IMG.apex, alt: "HERO APEX premium black suede sneaker with silver eyelets and red heel pull, side profile" },
  gallery: [{ src: IMG.apex, alt: "HERO APEX premium black suede sneaker with silver eyelets and red heel pull, side profile" }]
},
{
  id: "hero-rush",
  slug: "hero-rush",
  name: "HERO RUSH",
  price: 9999,
  shortDescription: "Angular sport-runner styling with a smoky translucent outsole and quick, light feel.",
  description: "Angular silver overlays, a red heel stripe and a smoky translucent outsole. Built light for fast-paced days.",
  category: "Performance Inspired",
  isNew: true,
  releasedAt: "2026-09-20",
  color: "Black / Silver / Red",
  colorFamilies: ["Black", "Silver", "Red"],
  colorways: [{ name: "Black / Silver / Red", swatches: ["#0B0B0D", "#C7CBD1", "#E63946"], available: true }],
  rating: 4.7,
  reviewCount: 23,
  sizes: SIZES,
  soldOutSizes: [],
  badge: "Just dropped",
  image: { src: IMG.rush, alt: "HERO RUSH sneaker in black with angular silver overlays and red heel stripe, side profile" },
  gallery: [{ src: IMG.rush, alt: "HERO RUSH sneaker in black with angular silver overlays and red heel stripe, side profile" }]
},
{
  id: "hero-stride",
  slug: "hero-stride",
  name: "HERO STRIDE",
  price: 8499,
  shortDescription: "Minimal knit everyday sneaker with a soft white midsole and an easy, flexible feel.",
  description: "A soft knit upper on a clean white midsole. Minimal, flexible and made to be worn every day.",
  category: "Lifestyle",
  isNew: true,
  releasedAt: "2026-09-01",
  color: "Black / White",
  colorFamilies: ["Black", "White"],
  colorways: [{ name: "Black / White", swatches: ["#0B0B0D", "#FFFFFF"], available: true }],
  rating: 4.4,
  reviewCount: 38,
  sizes: SIZES,
  soldOutSizes: [44],
  badge: "New",
  image: { src: IMG.stride, alt: "HERO STRIDE black knit sneaker with white midsole, side profile" },
  gallery: [{ src: IMG.stride, alt: "HERO STRIDE black knit sneaker with white midsole, side profile" }]
},
{
  id: "hero-nova",
  slug: "hero-nova",
  name: "HERO NOVA",
  price: 11499,
  shortDescription: "Performance-inspired runner with a bold red cushioned midsole and breathable mesh.",
  description: "Breathable black mesh on a bold red cushioned midsole. A runner-inspired shape that brings colour to everyday movement.",
  category: "Performance Inspired",
  isNew: true,
  releasedAt: "2026-08-22",
  color: "Black / Red",
  colorFamilies: ["Black", "Red"],
  colorways: [{ name: "Black / Red", swatches: ["#0B0B0D", "#E63946"], available: true }],
  rating: 4.6,
  reviewCount: 54,
  sizes: SIZES,
  soldOutSizes: [],
  badge: "New",
  image: { src: IMG.nova, alt: "HERO NOVA black mesh runner with red midsole and red laces, side profile" },
  gallery: [{ src: IMG.nova, alt: "HERO NOVA black mesh runner with red midsole and red laces, side profile" }]
},
{
  id: "hero-shadow",
  slug: "hero-shadow",
  name: "HERO SHADOW",
  price: 11999,
  shortDescription: "Tonal all-black premium nubuck sneaker with understated silver hardware.",
  description: "Matte black nubuck, tonal from toe to heel, finished with small silver hardware. Quiet, premium and easy to wear.",
  category: "Premium",
  isNew: false,
  releasedAt: "2026-04-15",
  color: "Black / Silver",
  colorFamilies: ["Black", "Silver"],
  colorways: [{ name: "Black / Silver", swatches: ["#0B0B0D", "#C7CBD1"], available: true }],
  rating: 4.7,
  reviewCount: 88,
  sizes: SIZES,
  soldOutSizes: [40, 45],
  image: { src: IMG.shadow, alt: "HERO SHADOW tonal black nubuck sneaker with silver eyelets, side profile" },
  gallery: [{ src: IMG.shadow, alt: "HERO SHADOW tonal black nubuck sneaker with silver eyelets, side profile" }]
}];


export const featuredProductIds = ["hero-core", "hero-pulse", "hero-velocity", "hero-apex"];

export const shopCategories = [
"All Sneakers",
"Lifestyle",
"New Arrivals",
"Performance Inspired",
"Premium"] as
const;

export const priceRanges = [
{ id: "under-9000", label: "Under Rs. 9,000", min: 0, max: 8999 },
{ id: "9000-11000", label: "Rs. 9,000 – 11,000", min: 9000, max: 11000 },
{ id: "over-11000", label: "Over Rs. 11,000", min: 11001, max: Infinity }] as
const;

export const colorOptions = [
{ name: "Black", hex: "#0B0B0D" },
{ name: "Red", hex: "#E63946" },
{ name: "Silver", hex: "#C7CBD1" },
{ name: "White", hex: "#FFFFFF" }] as
const;
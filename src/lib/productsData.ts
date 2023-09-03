import { Product } from "@/app/(dashboard)/products/column";

export type PaginationType = {
  limit: number;
  skip: number;
  total: number;
};

type ProductListTypes = {
  products: Product[];
} & PaginationType;

export async function getAllProducts(searchParams: {
  [key: string]: string | string[] | undefined;
}): Promise<ProductListTypes> {
  const skipQuery =
    typeof searchParams.skip === "string" ? searchParams.skip : "0";
  const limitQuery =
    typeof searchParams.limit === "string" ? searchParams.limit : "10";
  const searchQuery =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const url = new URL(
    searchQuery === undefined
      ? "https://dummyjson.com/products"
      : "https://dummyjson.com/products/search"
  );
  searchQuery !== undefined && url.searchParams.append("q", searchQuery);
  url.searchParams.append("skip", skipQuery);
  url.searchParams.append("limit", limitQuery);

  const res = await fetch(url.toString(), { cache: "no-store" });
  const json = await res.json();

  return json;
}

export const formatCurrency = (value: string) => {
  const amount = parseFloat(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

export const categoryColumnValues = [
  { value: "smartphones", label: "smartphones" },
  { value: "laptops", label: "laptops" },
  { value: "fragrances", label: "fragrances" },
  { value: "skincare", label: "skincare" },
  { value: "groceries", label: "groceries" },
  { value: "home-decoration", label: "home-decoration" },
  { value: "furniture", label: "furniture" },
  { value: "tops", label: "tops" },
  { value: "womens-dresses", label: "womens-dresses" },
  { value: "womens-shoes", label: "womens-shoes" },
  { value: "mens-shirts", label: "mens-shirts" },
  { value: "mens-shoes", label: "mens-shoes" },
  { value: "mens-watches", label: "mens-watches" },
  { value: "womens-watches", label: "womens-watches" },
  { value: "womens-bags", label: "womens-bags" },
  { value: "womens-jewellery", label: "womens-jewellery" },
  { value: "sunglasses", label: "sunglasses" },
  { value: "automotive", label: "automotive" },
  { value: "motorcycle", label: "motorcycle" },
  { value: "lighting", label: "lighting" },
];

export const brandColumnValues = [
  {
    value: "Apple",
    label: "Apple",
  },
  {
    value: "Samsung",
    label: "Samsung",
  },
  {
    value: "OPPO",
    label: "OPPO",
  },
  {
    value: "Huawei",
    label: "Huawei",
  },
  {
    value: "Microsoft Surface",
    label: "Microsoft Surface",
  },
  {
    value: "Infinix",
    label: "Infinix",
  },
  {
    value: "HP Pavilion",
    label: "HP Pavilion",
  },
  {
    value: "Impression of Acqua Di Gio",
    label: "Impression of Acqua Di Gio",
  },
  {
    value: "Royal_Mirage",
    label: "Royal_Mirage",
  },
  {
    value: "Fog Scent Xpressio",
    label: "Fog Scent Xpressio",
  },
  {
    value: "Al Munakh",
    label: "Al Munakh",
  },
  {
    value: "Lord - Al-Rehab",
    label: "Lord - Al-Rehab",
  },
  {
    value: "L'Oreal Paris",
    label: "L'Oreal Paris",
  },
  {
    value: "Hemani Tea",
    label: "Hemani Tea",
  },
  {
    value: "Dermive",
    label: "Dermive",
  },
  {
    value: "ROREC White Rice",
    label: "ROREC White Rice",
  },
  {
    value: "Fair & Clear",
    label: "Fair & Clear",
  },
  {
    value: "Saaf & Khaas",
    label: "Saaf & Khaas",
  },
  {
    value: "Bake Parlor Big",
    label: "Bake Parlor Big",
  },
  {
    value: "Baking Food Items",
    label: "Baking Food Items",
  },
  {
    value: "fauji",
    label: "fauji",
  },
  {
    value: "Dry Rose",
    label: "Dry Rose",
  },
  {
    value: "Boho Decor",
    label: "Boho Decor",
  },
  {
    value: "Flying Wooden",
    label: "Flying Wooden",
  },
  {
    value: "LED Lights",
    label: "LED Lights",
  },
  {
    value: "luxury palace",
    label: "luxury palace",
  },
  {
    value: "Golden",
    label: "Golden",
  },
  {
    value: "Furniture Bed Set",
    label: "Furniture Bed Set",
  },
  {
    value: "Ratttan Outdoor",
    label: "Ratttan Outdoor",
  },
  {
    value: "Kitchen Shelf",
    label: "Kitchen Shelf",
  },
  {
    value: "Multi Purpose",
    label: "Multi Purpose",
  },
  {
    value: "AmnaMart",
    label: "AmnaMart",
  },
  {
    value: "Professional Wear",
    label: "Professional Wear",
  },
  {
    value: "Soft Cotton",
    label: "Soft Cotton",
  },
  {
    value: "Top Sweater",
    label: "Top Sweater",
  },
  {
    value: "RED MICKY MOUSE..",
    label: "RED MICKY MOUSE..",
  },
  {
    value: "Digital Printed",
    label: "Digital Printed",
  },
  {
    value: "Ghazi Fabric",
    label: "Ghazi Fabric",
  },
  {
    value: "IELGY",
    label: "IELGY",
  },
  {
    value: "IELGY fashion",
    label: "IELGY fashion",
  },
  {
    value: "Synthetic Leather",
    label: "Synthetic Leather",
  },
  {
    value: "Sandals Flip Flops",
    label: "Sandals Flip Flops",
  },
  {
    value: "Maasai Sandals",
    label: "Maasai Sandals",
  },
  {
    value: "Arrivals Genuine",
    label: "Arrivals Genuine",
  },
  {
    value: "Vintage Apparel",
    label: "Vintage Apparel",
  },
  {
    value: "FREE FIRE",
    label: "FREE FIRE",
  },
  {
    value: "The Warehouse",
    label: "The Warehouse",
  },
  {
    value: "Sneakers",
    label: "Sneakers",
  },
  {
    value: "Rubber",
    label: "Rubber",
  },
  {
    value: "Naviforce",
    label: "Naviforce",
  },
  {
    value: "SKMEI 9117",
    label: "SKMEI 9117",
  },
  {
    value: "Strap Skeleton",
    label: "Strap Skeleton",
  },
  {
    value: "Stainless",
    label: "Stainless",
  },
  {
    value: "Eastern Watches",
    label: "Eastern Watches",
  },
  {
    value: "Luxury Digital",
    label: "Luxury Digital",
  },
  {
    value: "Watch Pearls",
    label: "Watch Pearls",
  },
  {
    value: "Bracelet",
    label: "Bracelet",
  },
  {
    value: "LouisWill",
    label: "LouisWill",
  },
  {
    value: "Copenhagen Luxe",
    label: "Copenhagen Luxe",
  },
  {
    value: "Steal Frame",
    label: "Steal Frame",
  },
  {
    value: "Darojay",
    label: "Darojay",
  },
  {
    value: "Fashion Jewellery",
    label: "Fashion Jewellery",
  },
  {
    value: "Cuff Butterfly",
    label: "Cuff Butterfly",
  },
  {
    value: "Designer Sun Glasses",
    label: "Designer Sun Glasses",
  },
  {
    value: "mastar watch",
    label: "mastar watch",
  },
  {
    value: "Car Aux",
    label: "Car Aux",
  },
  {
    value: "W1209 DC12V",
    label: "W1209 DC12V",
  },
  {
    value: "TC Reusable",
    label: "TC Reusable",
  },
  {
    value: "Neon LED Light",
    label: "Neon LED Light",
  },
  {
    value: "METRO 70cc Motorcycle - MR70",
    label: "METRO 70cc Motorcycle - MR70",
  },
  {
    value: "BRAVE BULL",
    label: "BRAVE BULL",
  },
  {
    value: "shock absorber",
    label: "shock absorber",
  },
  {
    value: "JIEPOLLY",
    label: "JIEPOLLY",
  },
  {
    value: "Xiangle",
    label: "Xiangle",
  },
  {
    value: "lightingbrilliance",
    label: "lightingbrilliance",
  },
  {
    value: "Ifei Home",
    label: "Ifei Home",
  },
  {
    value: "DADAWU",
    label: "DADAWU",
  },
  {
    value: "YIOSI",
    label: "YIOSI",
  },
];

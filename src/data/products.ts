import heroImage from "@/assets/hero-living-room.jpg";
import lampImage from "@/assets/product-lamp.jpg";
import pillowImage from "@/assets/product-pillow.jpg";
import vaseImage from "@/assets/product-vase.jpg";
import artworkImage from "@/assets/product-artwork.jpg";
import officeDeskLampImage from "@/assets/office-desk-lamp.jpg";
import officeOrganizerImage from "@/assets/office-organizer.jpg";
import bedroomBeddingImage from "@/assets/bedroom-bedding.jpg";
import bedroomLampImage from "@/assets/bedroom-lamp.jpg";
import kitchenCanistersImage from "@/assets/kitchen-canisters.jpg";
import kitchenCuttingBoardImage from "@/assets/kitchen-cutting-board.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  room: string;
  style: string[];
  description: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Modern Ceramic Table Lamp",
    price: 89.99,
    originalPrice: 129.99,
    image: lampImage,
    category: "Lighting",
    room: "Living Room",
    style: ["Modern", "Scandinavian"],
    description: "Elegant ceramic table lamp with warm brass accents and linen shade. Perfect for creating ambient lighting in any modern space.",
    rating: 4.8,
    reviews: 127,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "2",
    name: "Textured Throw Pillow",
    price: 34.99,
    image: pillowImage,
    category: "Textiles",
    room: "Living Room",
    style: ["Boho", "Scandinavian"],
    description: "Soft textured throw pillow in cream with subtle geometric patterns. Made from premium cotton blend for ultimate comfort.",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    isNew: true,
  },
  {
    id: "3",
    name: "Organic Ceramic Vase",
    price: 56.99,
    image: vaseImage,
    category: "Decor",
    room: "Living Room",
    style: ["Modern", "Minimalist"],
    description: "Handcrafted ceramic vase with organic curves and warm beige finish. Perfect for fresh or dried floral arrangements.",
    rating: 4.7,
    reviews: 203,
    inStock: true,
  },
  {
    id: "4",
    name: "Abstract Wall Art Print",
    price: 79.99,
    originalPrice: 99.99,
    image: artworkImage,
    category: "Wall Art",
    room: "Living Room",
    style: ["Modern", "Abstract"],
    description: "Contemporary abstract print in warm neutral tones. Museum-quality printing on premium paper, ready to frame.",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    isBestseller: true,
  },
  // Office Products
  {
    id: "5",
    name: "Modern Adjustable Desk Lamp",
    price: 124.99,
    originalPrice: 149.99,
    image: officeDeskLampImage,
    category: "Lighting",
    room: "Office",
    style: ["Modern", "Minimalist"],
    description: "Sleek adjustable desk lamp with LED technology and USB charging port. Perfect for focused work and modern office aesthetics.",
    rating: 4.7,
    reviews: 94,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "6",
    name: "Bamboo Desk Organizer",
    price: 49.99,
    image: officeOrganizerImage,
    category: "Organization",
    room: "Office",
    style: ["Natural", "Minimalist"],
    description: "Sustainable bamboo desk organizer with multiple compartments. Keep your workspace tidy while adding natural warmth.",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    isNew: true,
  },
  // Bedroom Products  
  {
    id: "7",
    name: "Luxury Cotton Bedding Set",
    price: 189.99,
    originalPrice: 249.99,
    image: bedroomBeddingImage,
    category: "Bedding",
    room: "Bedroom",
    style: ["Elegant", "Modern"],
    description: "Premium 100% organic cotton bedding set with silky smooth finish. Includes fitted sheet, flat sheet, and pillowcases.",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    isBestseller: true,
  },
  {
    id: "8", 
    name: "Ceramic Bedside Lamp",
    price: 67.99,
    image: bedroomLampImage,
    category: "Lighting",
    room: "Bedroom",
    style: ["Scandinavian", "Modern"],
    description: "Elegant ceramic table lamp with soft warm light. Perfect for bedside reading and creating a cozy bedroom atmosphere.",
    rating: 4.6,
    reviews: 112,
    inStock: true,
  },
  // Kitchen Products
  {
    id: "9",
    name: "Ceramic Storage Canisters Set",
    price: 89.99,
    image: kitchenCanistersImage,
    category: "Storage",
    room: "Kitchen",
    style: ["Natural", "Scandinavian"],
    description: "Beautiful ceramic canister set with airtight bamboo lids. Perfect for storing coffee, tea, sugar, and pantry essentials.",
    rating: 4.7,
    reviews: 143,
    inStock: true,
    isNew: true,
  },
  {
    id: "10",
    name: "Handcrafted Wooden Cutting Board",
    price: 45.99,
    image: kitchenCuttingBoardImage,
    category: "Kitchen Tools",
    room: "Kitchen", 
    style: ["Natural", "Rustic"],
    description: "Premium acacia wood cutting board with natural grain patterns. Food-safe finish and perfect for both prep and serving.",
    rating: 4.9,
    reviews: 89,
    inStock: true,
  },
];

export const collections = [
  {
    name: "Living Room Essentials",
    description: "Curated pieces to transform your living space",
    productIds: ["1", "2", "3", "4"],
    image: heroImage,
  },
  {
    name: "New Arrivals",
    description: "Fresh finds for the modern home",
    productIds: ["2", "4"],
    image: heroImage,
  },
  {
    name: "Bestsellers",
    description: "Customer favorites that never go out of style",
    productIds: ["1", "4"],
    image: heroImage,
  },
];

export const styleQuizOptions = {
  question1: {
    question: "What's your ideal weekend at home?",
    options: [
      { id: "a", text: "Reading with a cozy blanket", styles: ["Scandinavian", "Cozy"] },
      { id: "b", text: "Hosting a dinner party", styles: ["Modern", "Elegant"] },
      { id: "c", text: "Creative projects and crafting", styles: ["Boho", "Eclectic"] },
      { id: "d", text: "Minimal meditation and calm", styles: ["Minimalist", "Zen"] },
    ],
  },
  question2: {
    question: "Pick your dream color palette:",
    options: [
      { id: "a", text: "Warm creams and soft browns", styles: ["Scandinavian", "Minimalist"] },
      { id: "b", text: "Bold jewel tones", styles: ["Boho", "Eclectic"] },
      { id: "c", text: "Classic black and white", styles: ["Modern", "Contemporary"] },
      { id: "d", text: "Earthy greens and terracotta", styles: ["Boho", "Natural"] },
    ],
  },
  question3: {
    question: "Your furniture style preference:",
    options: [
      { id: "a", text: "Clean lines and geometric shapes", styles: ["Modern", "Minimalist"] },
      { id: "b", text: "Vintage with character and history", styles: ["Boho", "Vintage"] },
      { id: "c", text: "Natural wood and organic forms", styles: ["Scandinavian", "Natural"] },
      { id: "d", text: "Luxurious and statement pieces", styles: ["Elegant", "Contemporary"] },
    ],
  },
};

export const getProductsByStyle = (styles: string[]): Product[] => {
  return products.filter(product => 
    product.style.some(style => styles.includes(style))
  );
};
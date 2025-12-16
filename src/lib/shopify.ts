import { toast } from "sonner";
import { productImageMap } from "@/data/products";

const SHOPIFY_API_VERSION = '2025-07';
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-m5qu5.myshopify.com';
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = '17ee754a632e2bc2c4b4f4d7162b3d7e';

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
    productType: string;
    vendor: string;
    tags: string[];
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          description
          handle
          productType
          vendor
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

async function storefrontApiRequest(query: string, variables: any = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_TOKEN
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan. Your store needs to be upgraded to a paid plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  
  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: any) => e.message).join(', ')}`);
  }

  return data;
}

export async function fetchShopifyProducts(limit: number = 50): Promise<ShopifyProduct[]> {
  try {
    const data = await storefrontApiRequest(STOREFRONT_QUERY, { first: limit });
    
    if (!data || !data.data) {
      return [];
    }

    return data.data.products.edges || [];
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    toast.error('Failed to fetch products from Shopify');
    return [];
  }
}

// Convert Shopify product to our Product interface
export function convertShopifyProduct(shopifyProduct: ShopifyProduct, category: string = "Body Care") {
  const { node } = shopifyProduct;
  
  // Extract numeric ID from GraphQL ID
  const id = node.id.split('/').pop() || node.handle;
  
  // Get the first available variant ID for checkout
  const firstVariant = node.variants.edges[0]?.node;
  const variantId = firstVariant?.id || null;
  
  const price = parseFloat(node.priceRange.minVariantPrice.amount);
  
  // Get all images from Shopify or use mapped image as fallback
  const allImages = node.images.edges.map(edge => edge.node.url);
  const productImage = allImages.length > 0 
    ? allImages[0] 
    : productImageMap[node.handle] || "/placeholder.svg";
  
  // Determine room based on product type
  let room = "Bath & Body";
  if (node.productType.toLowerCase().includes("hair")) {
    room = "Hair Care";
  } else if (node.productType.toLowerCase().includes("skin")) {
    room = "Skincare";
  } else if (node.productType.toLowerCase().includes("wellness")) {
    room = "Wellness";
  }
  
  // Determine styles based on tags
  const styles: string[] = [];
  node.tags.forEach((tag: string) => {
    const normalizedTag = tag.toLowerCase();
    if (normalizedTag.includes("natural") || normalizedTag.includes("herbal")) {
      styles.push("Natural");
    }
    if (normalizedTag.includes("ayurvedic")) {
      styles.push("Relaxing");
    }
    if (normalizedTag.includes("anti-aging") || normalizedTag.includes("repair")) {
      styles.push("Clinical");
    }
  });
  
  if (styles.length === 0) {
    styles.push("Effective");
  }
  
  return {
    id,
    variantId,
    name: node.title,
    price,
    image: productImage,
    images: allImages.length > 0 ? allImages : [productImage],
    category: node.productType || category,
    room,
    style: styles,
    description: node.description || "",
    rating: 5.0, // Default rating
    reviews: 2, // Default review count
    inStock: node.variants.edges.some(v => v.node.availableForSale),
    isNew: node.tags.includes("new"),
    isBestseller: node.tags.includes("bestseller"),
  };
}

// Cart creation mutation for checkout
const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

export async function createShopifyCheckout(lines: CartLineInput[]): Promise<string | null> {
  try {
    const data = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: { lines },
    });

    if (!data || !data.data) {
      return null;
    }

    const { cart, userErrors } = data.data.cartCreate;

    if (userErrors && userErrors.length > 0) {
      console.error('Shopify cart errors:', userErrors);
      toast.error('Failed to create checkout', {
        description: userErrors.map((e: any) => e.message).join(', '),
      });
      return null;
    }

    if (!cart?.checkoutUrl) {
      toast.error('Failed to create checkout URL');
      return null;
    }

    // Add channel parameter for proper checkout access
    const url = new URL(cart.checkoutUrl);
    url.searchParams.set('channel', 'online_store');
    return url.toString();
  } catch (error) {
    console.error('Error creating Shopify checkout:', error);
    toast.error('Failed to create checkout');
    return null;
  }
}

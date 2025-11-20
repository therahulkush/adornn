import { Product } from "@/data/products";
import DOMPurify from 'dompurify';

// Calculate similarity score between two strings
export const calculateSimilarity = (str1: string, str2: string): number => {
  const s1 = str1.toLowerCase();
  const s2 = str2.toLowerCase();
  
  // Exact match gets highest score
  if (s1 === s2) return 1;
  
  // Check if one string starts with the other
  if (s1.startsWith(s2) || s2.startsWith(s1)) return 0.9;
  
  // Check if one string includes the other
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;
  
  // Levenshtein distance for fuzzy matching
  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  
  if (maxLength === 0) return 1;
  
  return Math.max(0, 1 - distance / maxLength);
};

// Levenshtein distance implementation
const levenshteinDistance = (str1: string, str2: string): number => {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  
  return matrix[str2.length][str1.length];
};

// Enhanced search function with fuzzy matching
export const searchProducts = (query: string, products: Product[]): Product[] => {
  if (!query.trim()) return products;
  
  const searchTerms = query.toLowerCase().trim().split(/\s+/);
  
  return products
    .map(product => {
      let score = 0;
      let matches = 0;
      
      // Search in different fields with different weights
      const searchFields = [
        { field: product.name, weight: 3 },
        { field: product.category, weight: 2 },
        { field: product.description, weight: 1 },
        { field: product.style.join(' '), weight: 2 },
        { field: product.room, weight: 1.5 }
      ];
      
      searchTerms.forEach(term => {
        searchFields.forEach(({ field, weight }) => {
          const similarity = calculateSimilarity(field, term);
          if (similarity > 0.3) { // Threshold for relevance
            score += similarity * weight;
            matches++;
          }
        });
      });
      
      return { product, score, matches };
    })
    .filter(item => item.matches > 0)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);
};

// Get search suggestions for autocomplete
export const getSearchSuggestions = (query: string, products: Product[]) => {
  if (!query.trim() || query.length < 2) {
    return { products: [], categories: [], styles: [] };
  }
  
  const searchTerms = query.toLowerCase().trim();
  
  // Get matching products
  const matchingProducts = products.filter(product => {
    return (
      product.name.toLowerCase().includes(searchTerms) ||
      product.category.toLowerCase().includes(searchTerms) ||
      product.description.toLowerCase().includes(searchTerms) ||
      product.style.some(style => style.toLowerCase().includes(searchTerms))
    );
  });
  
  // Get matching categories
  const allCategories = [...new Set(products.map(p => p.category))];
  const matchingCategories = allCategories.filter(category =>
    category.toLowerCase().includes(searchTerms)
  );
  
  // Get matching styles
  const allStyles = [...new Set(products.flatMap(p => p.style))];
  const matchingStyles = allStyles.filter(style =>
    style.toLowerCase().includes(searchTerms)
  );
  
  return {
    products: matchingProducts.slice(0, 5),
    categories: matchingCategories.slice(0, 3),
    styles: matchingStyles.slice(0, 4)
  };
};

// Highlight matching text in search results with XSS protection
export const highlightMatch = (text: string, query: string): string => {
  if (!query.trim()) return DOMPurify.sanitize(text);
  
  // Sanitize both text and query to prevent XSS
  const safeText = DOMPurify.sanitize(text);
  const safeQuery = DOMPurify.sanitize(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  
  const regex = new RegExp(`(${safeQuery})`, 'gi');
  const highlighted = safeText.replace(regex, '<mark class="bg-primary/20 text-primary font-medium rounded px-1">$1</mark>');
  
  // Sanitize the final output, only allowing mark tags with class attribute
  return DOMPurify.sanitize(highlighted, { 
    ALLOWED_TAGS: ['mark'],
    ALLOWED_ATTR: ['class']
  });
};

// Get search result stats
export const getSearchStats = (query: string, products: Product[], filteredProducts: Product[]) => {
  if (!query.trim()) {
    return {
      total: products.length,
      filtered: filteredProducts.length,
      query: null
    };
  }
  
  return {
    total: products.length,
    filtered: filteredProducts.length,
    query: query.trim()
  };
};
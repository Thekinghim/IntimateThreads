// Import all product images
import burgundyLace from './IMG_2335_1754760267758.jpg';
import burgundyLaceBack from './IMG_2336_1754760267759.jpg';
import militaryGreen from './IMG_2337_1754760267759.jpg';
import militaryGreenBack from './IMG_2338_1754760267759.jpg';
import leopardLace from './IMG_2341_1754760267760.jpg';
import leopardLaceBack from './IMG_2342_1754760267760.jpg';
import pinkLace from './IMG_2347_1754760267761.jpg';
import pinkLaceBack from './IMG_2348_1754760267761.jpg';

// Export image mapping
export const productImages = {
  'IMG_2335_1754760267758.jpg': burgundyLace,
  'IMG_2336_1754760267759.jpg': burgundyLaceBack,
  'IMG_2337_1754760267759.jpg': militaryGreen,
  'IMG_2338_1754760267759.jpg': militaryGreenBack,
  'IMG_2341_1754760267760.jpg': leopardLace,
  'IMG_2342_1754760267760.jpg': leopardLaceBack,
  'IMG_2347_1754760267761.jpg': pinkLace,
  'IMG_2348_1754760267761.jpg': pinkLaceBack,
};

// Helper function to get image URL
export function getProductImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // Extract filename from path
  const filename = imagePath.split('/').pop() || '';
  
  // Debug logging
  console.log('Looking for image:', filename);
  console.log('Available images:', Object.keys(productImages));
  
  // Return the imported image URL or fallback
  const imageUrl = productImages[filename as keyof typeof productImages];
  console.log('Found image URL:', imageUrl);
  
  return imageUrl || '';
}
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

// Image pairs mapping (front to back)
export const imagePairs = {
  'IMG_2335_1754760267758.jpg': 'IMG_2336_1754760267759.jpg', // Burgundy front to back
  'IMG_2337_1754760267759.jpg': 'IMG_2338_1754760267759.jpg', // Military green front to back
  'IMG_2341_1754760267760.jpg': 'IMG_2342_1754760267760.jpg', // Leopard front to back
  'IMG_2348_1754760267761.jpg': 'IMG_2347_1754760267761.jpg', // Pink front to back (corrected order)
};

// Helper function to get image URL
export function getProductImageUrl(imagePath: string): string {
  if (!imagePath) return '';
  
  // Extract filename from path
  const filename = imagePath.split('/').pop() || '';
  
  // Return the imported image URL or fallback
  const imageUrl = productImages[filename as keyof typeof productImages];
  
  return imageUrl || '';
}

// Helper function to get back image URL for hover effect
export function getBackImageUrl(frontImagePath: string): string {
  if (!frontImagePath) return '';
  
  // Extract filename from path
  const filename = frontImagePath.split('/').pop() || '';
  
  // Get the back image filename
  const backFilename = imagePairs[filename as keyof typeof imagePairs];
  
  if (backFilename) {
    return productImages[backFilename as keyof typeof productImages] || '';
  }
  
  return '';
}
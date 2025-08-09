// Import new generated intimate product images
import burgundyLace from './Red_lace_panties_product_da6c36cf.png';
import burgundyLaceBack from './IMG_2336_1754760267759.jpg'; // Keep original back view
import militaryGreen from './Green_crossover_thong_front_212fc008.png';
import militaryGreenBack from './IMG_2338_1754760267759.jpg'; // Keep original back view
import leopardLace from './Leopard_lace_panties_front_f8316566.png';
import leopardLaceBack from './IMG_2342_1754760267760.jpg'; // Keep original back view
import pinkLace from './Pink_lace_panties_front_f5c63a60.png';
import pinkLaceBack from './IMG_2348_1754760267761.jpg'; // Keep original back view

// Export image mapping - Updated with new generated images
export const productImages = {
  'IMG_2335_1754760267758.jpg': burgundyLace,
  'IMG_2336_1754760267759.jpg': burgundyLaceBack,
  'IMG_2337_1754760267759.jpg': militaryGreen,
  'IMG_2338_1754760267759.jpg': militaryGreenBack,
  'IMG_2341_1754760267760.jpg': leopardLace,
  'IMG_2342_1754760267760.jpg': leopardLaceBack,
  'IMG_2347_1754760267761.jpg': pinkLace,
  'IMG_2348_1754760267761.jpg': pinkLaceBack,
  // New generated images
  'generated_images/Red_lace_panties_product_da6c36cf.png': burgundyLace,
  'generated_images/Green_crossover_thong_front_212fc008.png': militaryGreen,
  'generated_images/Leopard_lace_panties_front_f8316566.png': leopardLace,
  'generated_images/Pink_lace_panties_front_f5c63a60.png': pinkLace,
};

// Image pairs mapping (front to back) - Updated with new generated images
export const imagePairs = {
  'IMG_2335_1754760267758.jpg': 'IMG_2336_1754760267759.jpg', // Burgundy lace panty front to bh set
  'IMG_2337_1754760267759.jpg': 'IMG_2338_1754760267759.jpg', // Military green crossover string front to back
  'IMG_2341_1754760267760.jpg': 'IMG_2342_1754760267760.jpg', // Leopard front to back
  'IMG_2347_1754760267761.jpg': 'IMG_2348_1754760267761.jpg', // Pink front to back
  // New generated images with original backs
  'generated_images/Red_lace_panties_product_da6c36cf.png': 'IMG_2336_1754760267759.jpg',
  'generated_images/Green_crossover_thong_front_212fc008.png': 'IMG_2338_1754760267759.jpg',
  'generated_images/Leopard_lace_panties_front_f8316566.png': 'IMG_2342_1754760267760.jpg',
  'generated_images/Pink_lace_panties_front_f5c63a60.png': 'IMG_2348_1754760267761.jpg',
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
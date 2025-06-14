import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Black Tee',
    description: 'Our signature classic tee in sleek black. Made from 100% organic cotton for ultimate comfort and durability. Features a relaxed fit and soft-touch finish.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', value: '#000000' },
      { name: 'White', value: '#FFFFFF' },
      { name: 'Gray', value: '#808080' },
    ],
    category: 'basics',
    featured: true,
  },
  {
    id: '2',
    name: 'AI Future Graphic Tee',
    description: 'Express your love for technology with our AI Future graphic tee. Features a unique AI-inspired design on premium cotton fabric.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', value: '#000080' },
      { name: 'Maroon', value: '#800000' },
    ],
    category: 'graphic',
    featured: true,
  },
  {
    id: '3',
    name: 'Minimalist Logo Tee',
    description: 'Clean, simple, elegant. Our minimalist logo tee speaks volumes with its understated design and premium quality construction.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', value: '#FFFFFF' },
      { name: 'Sky Blue', value: '#87CEEB' },
      { name: 'Mint Green', value: '#98FB98' },
    ],
    category: 'essentials',
    featured: true,
  },
  {
    id: '4',
    name: 'Gradient Wave Pattern',
    description: 'Make a statement with our eye-catching gradient wave pattern tee. Features a modern design with vibrant color transitions.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['M', 'L', 'XL'],
    colors: [
      { name: 'Ocean Blue', value: '#4B9CD3' },
      { name: 'Sunset Orange', value: '#FD5E53' },
    ],
    category: 'graphic',
    featured: true,
  },
  {
    id: '5',
    name: 'Vintage Wash',
    description: 'Our vintage wash crew neck offers that perfectly broken-in feel from day one. Garment dyed and washed for a unique, lived-in appearance.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Faded Olive', value: '#6B8E23' },
      { name: 'Washed Black', value: '#333333' },
      { name: 'Vintage Red', value: '#B22222' },
    ],
    category: 'vintage',
    featured: true,
  },
  {
    id: '6',
    name: 'Tech Mesh ',
    description: 'Engineered for movement and comfort, our Tech Mesh tee features breathable fabric and moisture-wicking technology for your active lifestyle.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Electric Blue', value: '#0892D0' },
      { name: 'Neon Green', value: '#39FF14' },
    ],
    category: 'performance',
    featured: true,
  },
  {
    id: '7',
    name: 'Urban Street  Tee',
    description: 'Contemporary streetwear with an oversized silhouette. Features dropped shoulders and an extended hem for a modern urban look.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', value: '#36454F' },
      { name: 'Sand', value: '#C2B280' },
    ],
    category: 'streetwear',
    featured: true,
  },
  {
    id: '8',
    name: 'Avant-Garde Cut Tee',
    description: 'Push boundaries with our avant-garde cut tee. Features asymmetrical hemlines and innovative fabric combinations.',
    price: 500,
    images: [
      '/images/1.png',
      '/images/2.png',
      '/images/3.png',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Slate', value: '#708090' },
      { name: 'Ivory', value: '#FFFFF0' },
    ],
    category: 'designer',
    featured: true,
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};
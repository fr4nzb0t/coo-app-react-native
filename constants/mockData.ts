export interface Asset {
  id: string;
  name: string;
  artist: string;
  category: string;
  description: string;
  medium: string;
  dimensions: string;
  year: number;
  totalValue: number;
  sharePrice: number;
  totalShares: number;
  availableShares: number;
  coOwnerCount: number;
  currency: string;
  imageUrl: string;
}

export const MOCK_ASSETS: Asset[] = [
  {
    id: 'asset-1',
    name: 'Sunset over Oslo',
    artist: 'Edvard Munch',
    category: 'Painting',
    description:
      'A breathtaking capture of the Oslo sunset reflecting off the fjord waters, painted in bold impressionist strokes that evoke the melancholy beauty of Norwegian evenings.',
    medium: 'Oil on canvas',
    dimensions: '80 × 60 cm',
    year: 2024,
    totalValue: 25000,
    sharePrice: 250,
    totalShares: 100,
    availableShares: 45,
    coOwnerCount: 23,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable1/800/600',
  },
  {
    id: 'asset-2',
    name: 'Northern Lights Dance',
    artist: 'Astrid Berg',
    category: 'Photography',
    description:
      'A long-exposure photograph capturing the aurora borealis dancing above a frozen Norwegian lake. The colors shift from deep violet to vivid green across the frame.',
    medium: 'Fine art print',
    dimensions: '90 × 60 cm',
    year: 2023,
    totalValue: 15000,
    sharePrice: 150,
    totalShares: 100,
    availableShares: 72,
    coOwnerCount: 12,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable2/800/600',
  },
  {
    id: 'asset-3',
    name: 'Fjord Reflections',
    artist: 'Lars Eriksen',
    category: 'Oil Painting',
    description:
      'Still water mirrors the towering cliffs of the Nærøyfjord in this meditative oil painting. The artist spent three summers on site refining the composition.',
    medium: 'Oil on canvas',
    dimensions: '120 × 90 cm',
    year: 2022,
    totalValue: 50000,
    sharePrice: 500,
    totalShares: 100,
    availableShares: 15,
    coOwnerCount: 67,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable3/800/600',
  },
  {
    id: 'asset-4',
    name: 'Abstract Composition #7',
    artist: 'Nina Thorvaldsen',
    category: 'Mixed Media',
    description:
      'Bold geometric forms collide and coexist in this large-format mixed media work. Layers of acrylic, ink, and tissue paper create unexpected depth.',
    medium: 'Mixed media',
    dimensions: '100 × 100 cm',
    year: 2024,
    totalValue: 8000,
    sharePrice: 80,
    totalShares: 100,
    availableShares: 91,
    coOwnerCount: 4,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable4/800/600',
  },
  {
    id: 'asset-5',
    name: "The Fisherman's Wife",
    artist: 'Ragnhild Olsen',
    category: 'Sculpture',
    description:
      'Cast in bronze, this figure captures the enduring strength and solitude of a woman gazing toward the sea. Inspired by coastal communities in northern Norway.',
    medium: 'Bronze',
    dimensions: '45 × 20 × 20 cm',
    year: 2021,
    totalValue: 120000,
    sharePrice: 1200,
    totalShares: 100,
    availableShares: 33,
    coOwnerCount: 41,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable5/800/600',
  },
  {
    id: 'asset-6',
    name: 'Digital Dreams',
    artist: 'Morten Haug',
    category: 'Digital Art',
    description:
      'A generative artwork produced through a custom algorithm trained on Scandinavian folk patterns. Each viewing reveals new details in the intricate, luminous forms.',
    medium: 'Digital print on aluminium',
    dimensions: '70 × 70 cm',
    year: 2024,
    totalValue: 5000,
    sharePrice: 50,
    totalShares: 100,
    availableShares: 88,
    coOwnerCount: 6,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable6/800/600',
  },
  {
    id: 'asset-7',
    name: 'Winter Solitude',
    artist: 'Ingrid Dahl',
    category: 'Watercolor',
    description:
      'Spare and hushed, this watercolor evokes the silence of a Norwegian winter forest. Pale blues and greys build a world of stillness and inner reflection.',
    medium: 'Watercolor on paper',
    dimensions: '60 × 45 cm',
    year: 2023,
    totalValue: 18000,
    sharePrice: 180,
    totalShares: 100,
    availableShares: 28,
    coOwnerCount: 52,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable7/800/600',
  },
  {
    id: 'asset-8',
    name: 'Coastal Erosion',
    artist: 'Eirik Strand',
    category: 'Photography',
    description:
      'Documentary and fine art merge in this striking image of sea-carved rock formations along the Lofoten archipelago. Printed with archival pigment inks.',
    medium: 'Archival pigment print',
    dimensions: '80 × 60 cm',
    year: 2023,
    totalValue: 12000,
    sharePrice: 120,
    totalShares: 100,
    availableShares: 60,
    coOwnerCount: 19,
    currency: 'NOK',
    imageUrl: 'https://picsum.photos/seed/coownable8/800/600',
  },
];

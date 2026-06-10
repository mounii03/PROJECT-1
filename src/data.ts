import { MenuItem, Review, Offer, BlogArticle } from './types';

export const MENU_ITEMS: MenuItem[] = [
  // Cakes & Pastries
  {
    id: 'cake-truffle',
    name: 'Signature Chocolate Truffle Cake',
    category: 'cakes',
    price: 299,
    description: 'Rich layers of dark chocolate ganache and soft chocolate sponge, finished with fine Dutch cocoa and premium gold foil flakes.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'cake-redvelvet',
    name: 'Red Velvet Dream Cake',
    category: 'cakes',
    price: 329,
    description: 'Crimson-hued velvet sponge paired with a velvety smooth vanilla cream cheese frosting and rich white chocolate curls.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1586985289688-ca9cf499368a?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cake-mousse',
    name: 'Belgian Chocolate Mousse Cake',
    category: 'cakes',
    price: 349,
    description: 'An airy, melt-in-the-mouth Belgian chocolate mousse layered over a dark sponge base with glossy chocolate glaze.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cake-hazelnut',
    name: 'Nutella Hazelnut Cake',
    category: 'cakes',
    price: 359,
    description: 'A luxurious chocolate sponge layered with smooth Nutella cream and roasted caramelized hazelnut crumbles.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cake-tiramisu',
    name: 'Tiramisu Cake',
    category: 'cakes',
    price: 399,
    description: 'Espresso-soaked sponge cake layers infused with a light mascarpone cream mousse and dusted with dark cocoa.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'cake-biscoff',
    name: 'Lotus Biscoff Cake',
    category: 'cakes',
    price: 429,
    description: 'A spiced sponge loaded with melted Lotus Biscoff spread, caramel pieces, and topped with crunchy Biscoff cookies.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13636?q=80&w=600&auto=format&fit=crop'
  },

  // Cheesecakes
  {
    id: 'cc-ny',
    name: 'New York Cheesecake',
    category: 'cheesecakes',
    price: 349,
    description: 'Dense, rich, and ultra-creamy classic baked cheesecake on a golden graham cracker crust, finished with a fresh berry gel.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'cc-blue',
    name: 'Blueberry Cheesecake',
    category: 'cheesecakes',
    price: 379,
    description: 'The classic baked delight adorned with an abundant mound of glossy, sweet-tart handpicked wild blueberry compote.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1524351199679-46cddf530c04?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cc-straw',
    name: 'Strawberry Cheesecake',
    category: 'cheesecakes',
    price: 389,
    description: 'Velvety cream cheese filling topped with glazed fresh Mahabaleshwar garden-fresh sweet strawberries.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1508737804141-4c3b688e2546?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cc-biscoff',
    name: 'Lotus Biscoff Cheesecake',
    category: 'cheesecakes',
    price: 429,
    description: 'Creamy cheesecake infused with speculoos, drizzled with warm cookie butter, and set on a Biscoff cookie base.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cc-oreo',
    name: 'Oreo Cheesecake',
    category: 'cheesecakes',
    price: 399,
    description: 'An immersive cookies-and-cream baked cheesecake packed with crushed Oreos inside a dark cocoa shell.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop'
  },

  // Brownies
  {
    id: 'br-fudge',
    name: 'Classic Fudge Brownie',
    category: 'brownies',
    price: 199,
    description: 'Intensly dense, dark chocolate brownie with a crisp crinkle top and a highly gooey, fudgy center.',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'br-walnut',
    name: 'Walnut Brownie',
    category: 'brownies',
    price: 229,
    description: 'Our classic fudge brownie loaded with healthy, crunchy, toasted English walnuts for a premium nutty texture.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'br-lava',
    name: 'Choco Lava Brownie',
    category: 'brownies',
    price: 249,
    description: 'Fudgy brownie outer crust hiding a dynamic heart of flowing warm liquid chocolate lava.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'br-nutella',
    name: 'Nutella Brownie',
    category: 'brownies',
    price: 269,
    description: 'A decadent brownie baked with ribbons of premium hazelnut Nutella spread and hazelnut flakes.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?q=80&w=600&auto=format&fit=crop'
  },

  // Premium Desserts
  {
    id: 'pd-tiramisu',
    name: 'Tiramisu',
    category: 'desserts',
    price: 299,
    description: 'The golden traditional standard: espresso-dipped ladyfingers nestled in rich whipped Italian mascarpone cream.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'pd-creme',
    name: 'Crème Brûlée',
    category: 'desserts',
    price: 329,
    description: 'Rich custard base baked with real Madagascar vanilla bean speckles, torched to order with a crunchy caramelized sugar crust.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1516685018646-549198525c1b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pd-mousse',
    name: 'Chocolate Mousse',
    category: 'desserts',
    price: 249,
    description: 'Light, fluffy chocolate mousse made from single-origin dark cocoa, elegantly piped and topped with chocolate curls.',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pd-waffle-delight',
    name: 'Belgian Waffle Delight',
    category: 'desserts',
    price: 299,
    description: 'Crisp golden Belgian waffle paired with dynamic scoops of vanilla ice cream, berry compote, and rich maple syrup cascades.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pd-molten',
    name: 'Molten Lava Cake',
    category: 'desserts',
    price: 279,
    description: 'Warm chocolate cake with a liquid cocoa core that collapses into sweet delight on the first spoonful.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'pd-jar',
    name: 'Biscoff Dessert Jar',
    category: 'desserts',
    price: 249,
    description: 'Gourmet dessert layer glass jar packed with creamy cheese pudding, caramel fudge, and crushed Biscoff biscuit crust.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=600&auto=format&fit=crop'
  },

  // Ice Cream Specials
  {
    id: 'ic-chocolate',
    name: 'Belgian Chocolate Ice Cream',
    category: 'ice-cream',
    price: 199,
    description: 'Gourmet churned craft ice cream using premium imported dark Belgian cacao block shavings.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ic-caramel',
    name: 'Salted Caramel Ice Cream',
    category: 'ice-cream',
    price: 219,
    description: 'A rich balance of salty and sweet featuring ribbons of dark sea salt craft caramel embedded in vanilla base.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ic-straw-cc',
    name: 'Strawberry Cheesecake Ice Cream',
    category: 'ice-cream',
    price: 229,
    description: 'Luxurious cream cheese base ice cream swirled with candied strawberries and graham crust pieces.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ic-cookie',
    name: 'Cookie Dough Ice Cream',
    category: 'ice-cream',
    price: 239,
    description: 'Thick dynamic scoops loaded with miniature chocolate chips and chunks of brown sugar cookie dough.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'ic-mango',
    name: 'Mango Gelato',
    category: 'ice-cream',
    price: 249,
    description: 'Creamy, intensely soft and fresh mango gelato churned with fresh organic Alphonso mango puree.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=600&auto=format&fit=crop'
  },

  // Gourmet Waffles
  {
    id: 'wf-nutella',
    name: 'Nutella Waffle',
    category: 'waffles',
    price: 279,
    description: 'Crisply toasted classic grid waffle smothered in thick warm hazelnut Nutella spread and cocoa powder.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wf-overload',
    name: 'Chocolate Overload Waffle',
    category: 'waffles',
    price: 299,
    description: 'Our cocoa waffle batter loaded with white, milk, and dark chocolate chips, topped with Belgian dark chocolate drizzle.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wf-straw',
    name: 'Strawberry Cream Waffle',
    category: 'waffles',
    price: 319,
    description: 'Warm waffle crowned with fresh cream chantilly, freshly sliced active strawberries, and strawberry reduction.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wf-biscoff',
    name: 'Biscoff Crunch Waffle',
    category: 'waffles',
    price: 339,
    description: 'Light waffle loaded with speculoos cream, drizzled with white chocolate, and dusted with cookie crumbles.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600&auto=format&fit=crop'
  },

  // Artisan Coffee
  {
    id: 'cf-espresso',
    name: 'Espresso',
    category: 'coffee',
    price: 149,
    description: 'A concentrated shot of roasted single-origin Arabica coffee beans boasting a dense, velvety hazelnut crema.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1510972527409-cef19039728b?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cf-cappuccino',
    name: 'Cappuccino',
    category: 'coffee',
    price: 179,
    description: 'Equal parts robust espresso, steamed milk, and a luxurious cloud of micro-foam on top.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cf-latte',
    name: 'Latte',
    category: 'coffee',
    price: 199,
    description: 'A mild and comforting blend of rich espresso shots and silkily textured steamed milk topped with fine art.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cf-caramel',
    name: 'Caramel Latte',
    category: 'coffee',
    price: 229,
    description: 'Our high-quality cafe latte sweet-infused with gourmet butter caramel syrup and a gold caramel drizzle.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cf-mocha',
    name: 'Mocha',
    category: 'coffee',
    price: 239,
    description: 'Elegant integration of dark chocolate sauce, rich espresso shots, steamed velvet milk, and warm chocolate sprinkles.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'cf-affogato',
    name: 'Affogato',
    category: 'coffee',
    price: 249,
    description: 'A scoop of premium cold vanilla bean ice cream literally drowned in a double hot shot of dark espresso.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1594911774802-8822a707caff?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'cf-coldbrew',
    name: 'Cold Brew',
    category: 'coffee',
    price: 219,
    description: 'Artisanal single-origin coffee grounds steeped in ice-cold water for 16 long hours for a smooth, sweet, acid-free taste.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop'
  },

  // Signature Mocktails
  {
    id: 'mc-berry',
    name: 'Berry Bliss',
    category: 'mocktails',
    price: 249,
    description: 'A premium sparkling blend of wild blackberry, raspberry, sweet cranberry juice, fresh mint leaves, and club soda.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mc-mango',
    name: 'Mango Mojito',
    category: 'mocktails',
    price: 229,
    description: 'Crushed sweet lime, refreshing mint sprigs, fresh golden mango nectar, club soda, and dynamic sugarcane sweetener.',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mc-blue',
    name: 'Blue Lagoon',
    category: 'mocktails',
    price: 239,
    description: 'A cooling oceanic blend of sweet blue curaçao syrup, hand-squeezed fresh lime, carbonated sprite, and crushed ice.',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'mc-passion',
    name: 'Passion Fruit Sparkler',
    category: 'mocktails',
    price: 259,
    description: 'Intense, aromatic tropical passion fruit pulpy syrup shaken with lemon extract, sparkling water, and customized mint.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'mc-sunset',
    name: 'Sunset Cooler',
    category: 'mocktails',
    price: 269,
    description: 'A dual-layered premium beverage: fresh blood orange juice cascaded over ice sweet grenadine syrup and soda.',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=600&auto=format&fit=crop'
  },

  // Platters
  {
    id: 'pl-couple',
    name: "Couple's Sweet Escape",
    category: 'platters',
    price: 799,
    description: 'An intimate dual collection of 1 custom mini truffle cake, 2 french macarons, 1 mini cheesecake cup, and 2 craft lattes.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  },
  {
    id: 'pl-family',
    name: 'Family Dessert Feast',
    category: 'platters',
    price: 1499,
    description: 'A shared board featuring chocolate lava brownie, New York cheesecake slice, Belgian waffle delight, 4 assorted scoop gelatos, and 4 premium drinks of choice.',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'pl-celebration',
    name: 'Celebration Dessert Board',
    category: 'platters',
    price: 1999,
    description: 'The ultimate culinary curation of 6 signature cake slices, 4 brownies, strawberry cream waffle slices, warm churros, 3 sweet dessert jars, and specialty coffee pots.',
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop',
    isSignature: true
  }
];

export const GALLERY_ITEMS = [
  { id: 'g1', title: 'Signature Cakes', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop', category: 'cakes' },
  { id: 'g2', title: 'Warm Velvet Ambiance', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop', category: 'interior' },
  { id: 'g3', title: 'Creamy Cheesecakes', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop', category: 'cheesecakes' },
  { id: 'g4', title: 'Artisanal Coffee Steeps', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop', category: 'coffee' },
  { id: 'g5', title: 'Gourmet Belgian Waffles', image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?q=80&w=600&auto=format&fit=crop', category: 'waffles' },
  { id: 'g6', title: 'Enchanted Date Evenings', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop', category: 'interior' },
  { id: 'g7', title: 'Signature Mocktails', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop', category: 'mocktails' },
  { id: 'g8', title: 'Smiles & Sweet Memories', image: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=600&auto=format&fit=crop', category: 'customers' }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Aanya Sharma',
    rating: 5,
    comment: "The signature chocolate truffle cake is absolutely divine. It has the perfect richness, and the cozy candlelight ambiance made my date night unforgettable.",
    date: '2026-05-18',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'rev-2',
    name: 'Rohan Malhotra',
    rating: 5,
    comment: "Undeniably the best baked New York Cheesecake in town. Perfectly firm crust, delicious fresh compote, and incredible barista-crafted espresso art.",
    date: '2026-06-01',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
  },
  {
    id: 'rev-3',
    name: 'Priyanka Sen',
    rating: 5,
    comment: "An absolute Instagram-worthy spot with a warm Parisian vibe. The Couple's Platter offered a brilliant blend. The customer service is incredibly rapid and hygienic.",
    date: '2026-06-08',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop'
  }
];

export const SPECIAL_OFFERS: Offer[] = [
  {
    id: 'offer-happy-hour',
    title: 'Happy Dessert Hour',
    subtitle: '6:00 PM – 8:00 PM Daily',
    discount: 'Buy 1, Get 20% Off on Coffee',
    description: 'Celebrate late twilight with any elegant cake or premium dessert slice and activate 20% discount on artisan warm coffee pourings.'
  },
  {
    id: 'offer-couple',
    title: 'Couple Combo',
    subtitle: 'Perfect Evening Out',
    price: 699,
    description: 'Enjoy two premium signature desserts paired beautifully with two artisanal cappuccinos or lattes of choice at an exclusive price.'
  },
  {
    id: 'offer-weekend',
    title: 'Weekend Dessert Festival',
    subtitle: 'Friday – Sunday Evening',
    discount: 'Flat 15% Off Total Bill',
    description: 'Celebrate weekends. Secure a flat 15% discount on all cakes, gourmet waffle towers, and ice cream tubs above ₹1000.'
  }
];

export const REASONS_TO_CHOOSE = [
  { title: 'Handmade Daily', description: 'Freshly baked by skilled pastry chefs using traditional methods every afternoon.' },
  { title: 'Premium Ingredients', description: 'Made exclusively with real cream, pure butter, Madagascan vanilla, and single-origin cacao.' },
  { title: 'Instagram-Worthy', description: 'Visually exquisite presentations with elegant custom glass structures and gold dust decorations.' },
  { title: 'Specialty Coffee Pairings', description: 'Micro-lot ethically sourced Arabica beans roasted locally for custom dessert pairings.' },
  { title: 'Cozy Evening Ambiance', description: 'Warm candlelight, elegant marble tables, and relaxing jazz instrumentals for deep talks.' },
  { title: 'Hygienic Preparation', description: 'Strict clean-room grade food hygiene regulations from kitchen prep to luxury service.' },
  { title: 'Fast Service', description: 'Immediate hospitality and table service designed to make your evening relaxing.' },
  { title: 'Luxury Dining Experience', description: 'Bespoke custom tableware, customized lounge couches, and highly premium sensory delight.' }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    title: 'The Ultimate Dessert & Coffee Pairings Guide',
    excerpt: 'Unlock rich flavor elevations by matching single-origin espressos with the right chocolate or fruit notes.',
    content: 'Stepping into a dessert lounge is a sensory adventure. But did you know that the acidity in a Kenyan Cold Brew can drastically clash with white chocolate, yet beautifully cut through a thick caramel ganache? In this rich guide, our master baristas map out how to pair creamy New York Cheesecakes with smooth medium-bodied lattes, and how dark single-origin hot chocolate beautifully elevates our molten lava cake core.',
    date: '2026-06-02',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'blog-2',
    title: 'A Century of Cream: The Secret History of Cheesecake',
    excerpt: 'Trace the baked delicacy from pre-historic Greek athletic banquets to the luxurious New York dessert lounge.',
    content: 'Cheesecake feels like a modern American luxury, but its culinary roots trace straight to ancient Greece where athletes were served simple honey-crust cheese structures during the Olympic games. Discover how cream cheese was accidentally discovered in modern New York in the late 19th century, transforming the simple baked recipe into the dense, rich, buttery graham cracker luxury we plate up fresh tonight.',
    date: '2026-05-24',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'blog-3',
    title: 'Top 5 Desserts for a Memorable Romantic Date Night',
    excerpt: 'Create sweet sparks with shareable gourmet platters and molten volcanic sugar cores in cozy ambient booths.',
    content: 'When planning a special romantic evening, where you go after dinner is often more important than the dinner itself. Our evening dessert café has been host to hundreds of engagements and sweet anniversaries. We compile five desserts specifically crafted to inspire connection—from the shareable and intimate Couple’s Sweet Escape platter to the theatrical crackle of a caramelized Vanilla Crème Brûlée.',
    date: '2026-06-07',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop'
  }
];

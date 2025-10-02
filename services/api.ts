
import { VehicleType, type Trip, type Vendor, type Destination, type Product, type Vehicle } from '../types';

const VENDORS: Vendor[] = [
  { id: 'v1', name: 'Nile Voyagers', logo: 'https://picsum.photos/seed/v1/100', description: 'Experts in luxury Nile cruises and historical tours.', rating: 4.8, contactInfo: { phone: '123-456-7890', email: 'contact@nilevoyagers.com', address: '123 Nile St, Luxor' } },
  { id: 'v2', name: 'Sinai Sun Tours', logo: 'https://picsum.photos/seed/v2/100', description: 'Adventure and relaxation in the Sinai Peninsula.', rating: 4.6, contactInfo: { phone: '123-456-7891', email: 'info@sinaisun.com', address: '456 Beach Rd, Sharm El Sheikh' } },
  { id: 'v3', name: 'Cairo Connections', logo: 'https://picsum.photos/seed/v3/100', description: 'Your guide to the vibrant heart of Egypt.', rating: 4.9, contactInfo: { phone: '123-456-7892', email: 'booking@cairoconnect.com', address: '789 Tahrir Sq, Cairo' } },
];

const DESTINATIONS: Destination[] = [
  { id: 'd1', name: 'Cairo', image: 'https://picsum.photos/seed/cairo/800/600', description: 'The bustling capital, home to the Pyramids of Giza and the Egyptian Museum.' },
  { id: 'd2', name: 'Luxor & Aswan', image: 'https://picsum.photos/seed/luxor/800/600', description: 'Ancient temples and tombs along the majestic Nile River.' },
  { id: 'd3', name: 'Sharm El Sheikh', image: 'https://picsum.photos/seed/sharm/800/600', description: 'World-class diving, sandy beaches, and vibrant nightlife on the Red Sea.' },
  { id: 'd4', name: 'Siwa Oasis', image: 'https://picsum.photos/seed/siwa/800/600', description: 'A serene escape in the Western Desert, known for its salt lakes and ancient oracle.' },
];

const VEHICLES: Vehicle[] = [
    { id: 'veh1', type: VehicleType.CAR, capacity: 4, pricePerSeat: 500, fullVehiclePrice: 1800, amenities: ['A/C', 'Private Driver'] },
    { id: 'veh2', type: VehicleType.MICROBUS, capacity: 14, pricePerSeat: 250, fullVehiclePrice: 3200, amenities: ['A/C', 'Spacious Seating'] },
    { id: 'veh3', type: VehicleType.BUS, capacity: 50, pricePerSeat: 150, fullVehiclePrice: 7000, amenities: ['A/C', 'Restroom', 'Onboard Entertainment'] },
];

const TRIPS: Trip[] = [
  {
    id: 't1', title: 'Grand Pyramids & Sphinx Tour', vendorId: 'v3', destinationId: 'd1', durationDays: 1, basePrice: 800, rating: 4.9,
    images: ['https://picsum.photos/seed/t1_1/800/600', 'https://picsum.photos/seed/t1_2/800/600'],
    description: 'A full-day immersive experience visiting the Great Pyramids of Giza, the Sphinx, and the ancient capital of Memphis.',
    itinerary: [{ day: 1, activity: 'Morning visit to Giza Plateau, afternoon tour of Saqqara and Memphis.' }],
    availableBatches: [
      { id: 'b1', date: '2024-08-15', vehicleId: 'veh2', bookedSeats: [1, 2, 5, 8, 10] },
      { id: 'b2', date: '2024-08-22', vehicleId: 'veh2', bookedSeats: [3, 4] },
    ],
  },
  {
    id: 't2', title: '4-Day Nile Cruise from Luxor to Aswan', vendorId: 'v1', destinationId: 'd2', durationDays: 4, basePrice: 4500, rating: 4.8,
    images: ['https://picsum.photos/seed/t2_1/800/600', 'https://picsum.photos/seed/t2_2/800/600'],
    description: 'Sail the Nile in luxury. Visit Karnak Temple, Valley of the Kings, Edfu, Kom Ombo, and the High Dam in Aswan.',
    itinerary: [
      { day: 1, activity: 'Embark in Luxor, visit East Bank (Karnak & Luxor Temples).' },
      { day: 2, activity: 'Visit West Bank (Valley of the Kings), sail to Edfu.' },
      { day: 3, activity: 'Visit Edfu & Kom Ombo temples, sail to Aswan.' },
      { day: 4, activity: 'Visit High Dam, Philae Temple. Disembark.' },
    ],
    availableBatches: [
      { id: 'b3', date: '2024-09-01', vehicleId: 'veh3', bookedSeats: [1, 2, 5, 8, 10, 15, 20, 22, 25, 30] },
      { id: 'b4', date: '2024-09-08', vehicleId: 'veh3', bookedSeats: [3, 4] },
    ],
  },
  {
    id: 't3', title: 'Red Sea Diving Adventure', vendorId: 'v2', destinationId: 'd3', durationDays: 3, basePrice: 3200, rating: 4.7,
    images: ['https://picsum.photos/seed/t3_1/800/600', 'https://picsum.photos/seed/t3_2/800/600'],
    description: 'Explore the vibrant coral reefs of Ras Muhammad National Park. Includes 5 guided dives and full equipment rental.',
    itinerary: [
      { day: 1, activity: 'Two dives at Shark and Yolanda Reefs.' },
      { day: 2, activity: 'Two dives at the SS Thistlegorm wreck.' },
      { day: 3, activity: 'One morning dive and relaxation.' },
    ],
    availableBatches: [
      { id: 'b5', date: '2024-08-18', vehicleId: 'veh1', bookedSeats: [1] },
      { id: 'b6', date: '2024-08-25', vehicleId: 'veh2', bookedSeats: [] },
    ],
  },
  {
    id: 't4', title: 'Mystical Siwa Oasis Escape', vendorId: 'v1', destinationId: 'd4', durationDays: 5, basePrice: 5500, rating: 4.9,
    images: ['https://picsum.photos/seed/t4_1/800/600', 'https://picsum.photos/seed/t4_2/800/600'],
    description: 'Discover the tranquility of the desert. Swim in salt lakes, explore Shali Fortress, and enjoy a traditional Bedouin dinner under the stars.',
    itinerary: [
      { day: 1, activity: 'Travel to Siwa, check into eco-lodge.' },
      { day: 2, activity: 'Visit Oracle Temple and Cleopatra\'s Bath.' },
      { day: 3, activity: 'Explore Shali Fortress and swim in salt pools.' },
      { day: 4, activity: '4x4 desert safari and sandboarding at Great Sand Sea.' },
      { day: 5, activity: 'Return journey.' },
    ],
    availableBatches: [
      { id: 'b7', date: '2024-10-10', vehicleId: 'veh2', bookedSeats: [1,2,3,4,5,6] },
      { id: 'b8', date: '2024-10-20', vehicleId: 'veh2', bookedSeats: [] },
    ],
  },
];

const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Waterproof Dry Bag', price: 150, image: 'https://picsum.photos/seed/p1/400', description: 'Keep your valuables safe and dry during water activities. 10L capacity.', category: 'Beach' },
  { id: 'p2', name: 'High-Performance Snorkel Set', price: 400, image: 'https://picsum.photos/seed/p2/400', description: 'Crystal clear vision with an anti-fog mask and easy-breath snorkel.', category: 'Beach' },
  { id: 'p3', name: 'Desert Scarf (Shemagh)', price: 120, image: 'https://picsum.photos/seed/p3/400', description: 'Protect yourself from sun and sand with this traditional, breathable cotton scarf.', category: 'Safari' },
  { id: 'p4', name: 'Portable Power Bank 20000mAh', price: 500, image: 'https://picsum.photos/seed/p4/400', description: 'Never run out of battery. Charges a smartphone up to 4 times.', category: 'Travel Gear' },
  { id: 'p5', name: 'Compact Travel Towel', price: 180, image: 'https://picsum.photos/seed/p5/400', description: 'Quick-drying and super absorbent microfiber towel, perfect for any trip.', category: 'Travel Gear' },
  { id: 'p6', name: 'Durable Hiking Backpack', price: 750, image: 'https://picsum.photos/seed/p6/400', description: 'A 30L backpack with multiple compartments and comfortable straps for day hikes.', category: 'Safari' },
];


const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const api = {
  getTrips: async (): Promise<Trip[]> => {
    await delay(500);
    return TRIPS;
  },
  getTripById: async (id: string): Promise<Trip | undefined> => {
    await delay(500);
    return TRIPS.find(trip => trip.id === id);
  },
  getTripsByVendorId: async (vendorId: string): Promise<Trip[]> => {
    await delay(500);
    return TRIPS.filter(trip => trip.vendorId === vendorId);
  },
  getTripsByDestinationId: async (destinationId: string): Promise<Trip[]> => {
    await delay(500);
    return TRIPS.filter(trip => trip.destinationId === destinationId);
  },
  getVendors: async (): Promise<Vendor[]> => {
    await delay(500);
    return VENDORS;
  },
  getVendorById: async (id: string): Promise<Vendor | undefined> => {
    await delay(500);
    return VENDORS.find(vendor => vendor.id === id);
  },
  getDestinations: async (): Promise<Destination[]> => {
    await delay(500);
    return DESTINATIONS;
  },
  getDestinationById: async (id: string): Promise<Destination | undefined> => {
    await delay(500);
    return DESTINATIONS.find(dest => dest.id === id);
  },
  getVehicles: async (): Promise<Vehicle[]> => {
    await delay(500);
    return VEHICLES;
  },
  getVehicleById: async (id: string): Promise<Vehicle | undefined> => {
    await delay(500);
    return VEHICLES.find(v => v.id === id);
  },
  getProducts: async (): Promise<Product[]> => {
    await delay(500);
    return PRODUCTS;
  },
  submitBooking: async (bookingData: any): Promise<{ success: boolean; bookingId: string }> => {
    await delay(1000);
    console.log("Booking Submitted:", bookingData);
    // In a real app, this would update the backend inventory.
    return { success: true, bookingId: `BK-${Date.now()}` };
  },
};


export enum VehicleType {
  CAR = 'Private Car',
  MICROBUS = 'Microbus',
  BUS = 'Bus',
}

export interface Vehicle {
  id: string;
  type: VehicleType;
  capacity: number;
  pricePerSeat: number;
  fullVehiclePrice: number;
  amenities: string[];
}

export interface TripBatch {
  id: string;
  date: string;
  vehicleId: string;
  bookedSeats: number[];
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  destinationId: string;
  vendorId: string;
  durationDays: number;
  basePrice: number;
  images: string[];
  itinerary: { day: number; activity: string }[];
  availableBatches: TripBatch[];
  rating: number;
}

export interface Vendor {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface Destination {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

export interface Booking {
  trip: Trip;
  batch: TripBatch;
  passengers: number;
  isFullVehicle: boolean;
  selectedSeats: number[];
  totalPrice: number;
}

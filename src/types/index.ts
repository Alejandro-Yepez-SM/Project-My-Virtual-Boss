export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  licensePlate: string;
  category: 'economy' | 'compact' | 'premium' | 'luxury' | 'suv';
  hourlyRate: number;
  dailyRate: number;
  kmRate: number;
  fuelType: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  seats: number;
  transmission: 'manual' | 'automatic';
  features: string[];
  status: 'available' | 'rented' | 'maintenance';
  image?: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  email: string;
  licenseNumber: string;
  experience: number;
  hourlyRate: number;
  status: 'available' | 'busy' | 'offline';
  rating: number;
  languages: string[];
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  address: string;
  dateOfBirth: string;
  totalBookings: number;
  status: 'active' | 'inactive' | 'blocked';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'insurance' | 'equipment' | 'service';
  isActive: boolean;
}

export interface Booking {
  id: string;
  customerId: string;
  carId: string;
  driverId?: string;
  startTime: string;
  endTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  estimatedKm: number;
  actualKm?: number;
  services: string[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: string;
}

export interface PriceCalculation {
  basePrice: number;
  hourlyPrice: number;
  kmPrice: number;
  driverPrice: number;
  servicesPrice: number;
  total: number;
  breakdown: {
    hours: number;
    km: number;
    hasDriver: boolean;
    services: Service[];
  };
}
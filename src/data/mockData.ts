import { Car, Driver, Customer, Service, Booking } from '../types';

export const cars: Car[] = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Camry',
    year: 2023,
    licensePlate: 'ABC-123',
    category: 'compact',
    hourlyRate: 25,
    dailyRate: 180,
    kmRate: 0.5,
    fuelType: 'gasoline',
    seats: 5,
    transmission: 'automatic',
    features: ['GPS', 'Bluetooth', 'AC'],
    status: 'available',
    image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg'
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'X5',
    year: 2024,
    licensePlate: 'XYZ-789',
    category: 'luxury',
    hourlyRate: 75,
    dailyRate: 500,
    kmRate: 1.2,
    fuelType: 'gasoline',
    seats: 7,
    transmission: 'automatic',
    features: ['GPS', 'Leather Seats', 'Sunroof', 'Premium Audio'],
    status: 'available',
    image: 'https://images.pexels.com/photos/977003/pexels-photo-977003.jpeg'
  },
  {
    id: '3',
    brand: 'Tesla',
    model: 'Model 3',
    year: 2024,
    licensePlate: 'ELC-456',
    category: 'premium',
    hourlyRate: 45,
    dailyRate: 320,
    kmRate: 0.3,
    fuelType: 'electric',
    seats: 5,
    transmission: 'automatic',
    features: ['Autopilot', 'Premium Audio', 'Supercharger Access'],
    status: 'rented',
    image: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg'
  }
];

export const drivers: Driver[] = [
  { 
    id: '1',
    name: 'John Smith',
    phone: '+1-555-0101',
    email: 'john@example.com',
    licenseNumber: 'DL123456789',
    experience: 8,
    hourlyRate: 20,
    status: 'available',
    rating: 4.8,
    languages: ['English', 'Spanish']
  },
  {
    id: '2',
    name: 'Maria Garcia',
    phone: '+1-555-0102',
    email: 'maria@example.com',
    licenseNumber: 'DL987654321',
    experience: 12,
    hourlyRate: 25,
    status: 'busy',
    rating: 4.9,
    languages: ['English', 'Spanish', 'French']
  },
  {
    id: '3',
    name: 'David Chen',
    phone: '+1-555-0103',
    email: 'david@example.com',
    licenseNumber: 'DL456789123',
    experience: 5,
    hourlyRate: 18,
    status: 'available',
    rating: 4.6,
    languages: ['English', 'Mandarin']
  }
];

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    phone: '+1-555-0201',
    licenseNumber: 'DL111222333',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '1985-06-15',
    totalBookings: 15,
    status: 'active'
  },
  {
    id: '2',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    phone: '+1-555-0202',
    licenseNumber: 'DL444555666',
    address: '456 Oak Ave, City, State 12345',
    dateOfBirth: '1978-03-22',
    totalBookings: 8,
    status: 'active'
  },
  {
    id: '3',
    name: 'Carol Brown',
    email: 'carol@example.com',
    phone: '+1-555-0203',
    licenseNumber: 'DL777888999',
    address: '789 Pine Rd, City, State 12345',
    dateOfBirth: '1990-11-08',
    totalBookings: 3,
    status: 'active'
  }
];

export const services: Service[] = [
  {
    id: '1',
    name: 'Comprehensive Insurance',
    description: 'Full coverage insurance for the rental period',
    price: 15,
    category: 'insurance',
    isActive: true
  },
  {
    id: '2',
    name: 'GPS Navigation',
    description: 'Professional GPS navigation system',
    price: 8,
    category: 'equipment',
    isActive: true
  },
  {
    id: '3',
    name: 'Child Car Seat',
    description: 'Safety car seat for children',
    price: 12,
    category: 'equipment',
    isActive: true
  },
  {
    id: '4',
    name: 'Airport Pickup',
    description: 'Pick up service from airport',
    price: 25,
    category: 'service',
    isActive: true
  },
  {
    id: '5',
    name: 'Fuel Service',
    description: 'We handle refueling at return',
    price: 20,
    category: 'service',
    isActive: true
  }
];

export const bookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    carId: '3',
    driverId: '2',
    startTime: '2025-01-15T09:00:00',
    endTime: '2025-01-15T17:00:00',
    pickupLocation: 'Downtown Office',
    dropoffLocation: 'Airport',
    estimatedKm: 45,
    services: ['1', '4'],
    totalPrice: 425,
    status: 'ongoing',
    notes: 'VIP client',
    createdAt: '2025-01-10T14:30:00'
  },
  {
    id: '2',
    customerId: '2',
    carId: '1',
    startTime: '2025-01-16T08:00:00',
    endTime: '2025-01-18T08:00:00',
    pickupLocation: 'Hotel Plaza',
    dropoffLocation: 'Hotel Plaza',
    estimatedKm: 200,
    services: ['1', '2'],
    totalPrice: 483,
    status: 'confirmed',
    createdAt: '2025-01-12T10:15:00'
  },
  {
    id: '3',
    customerId: '3',
    carId: '2',
    driverId: '1',
    startTime: '2025-01-17T10:00:00',
    endTime: '2025-01-17T14:00:00',
    pickupLocation: 'Business District',
    dropoffLocation: 'Conference Center',
    estimatedKm: 25,
    services: ['1'],
    totalPrice: 345,
    status: 'pending',
    createdAt: '2025-01-13T16:45:00'
  }
];
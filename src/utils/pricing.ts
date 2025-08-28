import { Car, Driver, Service, PriceCalculation } from "../types";
import { differenceInHours } from "date-fns";

export function calculatePrice(
  car: Car,
  driver: Driver | null,
  services: Service[],
  startTime: string,
  endTime: string,
  estimatedKm: number
): PriceCalculation {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const hours = differenceInHours(end, start);

  // Base pricing logic - use daily rate if rental is >= 24 hours
  let basePrice = 0;
  let hourlyPrice = 0;

  if (hours >= 24) {
    const fullDays = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    basePrice = fullDays * car.dailyRate;
    hourlyPrice = remainingHours * car.hourlyRate;
  } else {
    hourlyPrice = hours * car.hourlyRate;
  }

  // Kilometer pricing
  const kmPrice = estimatedKm * car.kmRate;

  // Driver pricing
  const driverPrice = driver ? hours * driver.hourlyRate : 0;

  // Services pricing
  const servicesPrice = services.reduce(
    (total, service) => total + service.price,
    0
  );

  // Apply category multipliers
  const categoryMultipliers = {
    economy: 1.0,
    compact: 1.1,
    premium: 1.3,
    luxury: 1.6,
    suv: 1.2,
  };

  const categoryMultiplier = categoryMultipliers[car.category];
  const subtotal = (basePrice + hourlyPrice + kmPrice) * categoryMultiplier;

  const total = subtotal + driverPrice + servicesPrice;

  return {
    basePrice,
    hourlyPrice,
    kmPrice,
    driverPrice,
    servicesPrice,
    total,
    breakdown: {
      hours,
      km: estimatedKm,
      hasDriver: !!driver,
      services,
    },
  };
}

export function checkAvailability(
  startTime: string,
  endTime: string,
  bookings: any[],
  excludeBookingId?: string
): boolean {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return !bookings.some((booking) => {
    if (excludeBookingId && booking.id === excludeBookingId) return false;
    if (booking.status === "cancelled") return false;

    const bookingStart = new Date(booking.startTime);
    const bookingEnd = new Date(booking.endTime);

    // Check for overlap
    return start < bookingEnd && end > bookingStart;
  });
}

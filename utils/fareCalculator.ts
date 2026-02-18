/**
 * Thai Taxi Fare Calculator
 *
 * Fare Calculation Logic:
 * - Base Fare: 35 Baht (covers the first 1 km)
 * - Distance Charge (Tiered): Only applies after the first km
 *   - Km 2 – 10: 6.50 Baht/km
 *   - Km 11 – 20: 7.00 Baht/km
 *   - Km 21 – 40: 8.00 Baht/km
 *   - Km 41 – 60: 8.50 Baht/km
 *   - Km 61 – 80: 9.00 Baht/km
 *   - Over 80 km: 10.50 Baht/km
 * - Time Charge (Traffic): 3.00 Baht per minute of wait time
 */

export interface FareResult {
  totalFare: number;
  distanceCharge: number;
  timeCharge: number;
  baseFare: number;
}

/**
 * Calculates the distance charge based on tiered pricing
 * Only applies after the first 1 km (which is covered by base fare)
 *
 * @param distanceKm - Total distance in kilometers
 * @returns Distance charge in Baht
 */
const calculateDistanceCharge = (distanceKm: number): number => {
  // If distance is <= 1 km, no additional distance charge (covered by base fare)
  if (distanceKm <= 1) {
    return 0;
  }

  // Distance beyond the first km
  const chargeableDistance = distanceKm - 1;
  let charge = 0;

  // Tiered pricing calculation
  if (chargeableDistance <= 10) {
    // Km 2 - 10: 6.50 Baht/km
    charge = chargeableDistance * 6.5;
  } else if (chargeableDistance <= 20) {
    // First 10 km at 6.50, rest at 7.00
    // Km 11 - 20: 7.00 Baht/km
    charge = 10 * 6.5 + (chargeableDistance - 10) * 7.0;
  } else if (chargeableDistance <= 40) {
    // Km 21 - 40: 8.00 Baht/km
    charge = 10 * 6.5 + 10 * 7.0 + (chargeableDistance - 20) * 8.0;
  } else if (chargeableDistance <= 60) {
    // Km 41 - 60: 8.50 Baht/km
    charge = 10 * 6.5 + 10 * 7.0 + 20 * 8.0 + (chargeableDistance - 40) * 8.5;
  } else if (chargeableDistance <= 80) {
    // Km 61 - 80: 9.00 Baht/km
    charge =
      10 * 6.5 +
      10 * 7.0 +
      20 * 8.0 +
      20 * 8.5 +
      (chargeableDistance - 60) * 9.0;
  } else {
    // Over 80 km: 10.50 Baht/km
    charge =
      10 * 6.5 +
      10 * 7.0 +
      20 * 8.0 +
      20 * 8.5 +
      20 * 9.0 +
      (chargeableDistance - 80) * 10.5;
  }

  return charge;
};

/**
 * Calculates the time charge for traffic wait time
 *
 * @param waitTimeMinutes - Wait time in minutes
 * @returns Time charge in Baht
 */
const calculateTimeCharge = (waitTimeMinutes: number): number => {
  // Time charge: 3.00 Baht per minute
  return waitTimeMinutes * 3.0;
};

/**
 * Main fare calculation function
 *
 * @param distance - Distance in kilometers
 * @param waitTime - Traffic wait time in minutes
 * @returns FareResult object containing breakdown of charges
 */
export const calculateFare = (
  distance: number,
  waitTime: number,
): FareResult => {
  // Base fare covers the first 1 km
  const baseFare = 35.0;

  // Calculate distance charge (tiered pricing)
  const distanceCharge = calculateDistanceCharge(distance);

  // Calculate time charge for traffic
  const timeCharge = calculateTimeCharge(waitTime);

  // Total fare
  const totalFare = baseFare + distanceCharge + timeCharge;

  return {
    totalFare: Math.round(totalFare * 100) / 100, // Round to 2 decimal places
    distanceCharge: Math.round(distanceCharge * 100) / 100,
    timeCharge: Math.round(timeCharge * 100) / 100,
    baseFare: baseFare,
  };
};

export default calculateFare;

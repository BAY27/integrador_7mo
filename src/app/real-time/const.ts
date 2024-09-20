export const waypoints = [
    { location: { lat: -1.2454, lng: -78.6168 }, stopover: false }, // Av. Bolivariana
    { location: { lat: -1.2483, lng: -78.6211 }, stopover: false }, // Mercado Mayorista
    { location: { lat: -1.2496, lng: -78.6234 }, stopover: false }, // Av. Julio Jaramillo
    { location: { lat: -1.2609, lng: -78.6231 }, stopover: false }, // Red. Huachi Chico
    { location: { lat: -1.2642, lng: -78.6293 }, stopover: false }, // Av. Atahualpa
    { location: { lat: -1.2681, lng: -78.6247 }, stopover: false }, // Mall de los Andes
    { location: { lat: -1.2587, lng: -78.6342 }, stopover: false }, // Av. Víctor Hugo
    { location: { lat: -1.2629, lng: -78.6297 }, stopover: false }, // Av. Manuelita Sáenz
    { location: { lat: -1.2592, lng: -78.6365 }, stopover: false }, // Hospital del IESS
    { location: { lat: -1.2660, lng: -78.6450 }, stopover: false }, // Av. Los Guaytambos
    { location: { lat: -1.2675, lng: -78.6478 }, stopover: false }, // Rompecorazones
    { location: { lat: -1.2590, lng: -78.6467 }, stopover: false }, // Plaza de toros
    { location: { lat: -1.2560, lng: -78.6373 }, stopover: false }, // Av. Quiz Quiz
    { location: { lat: -1.2629, lng: -78.6297 }, stopover: false }, // Av. Atahualpa
    { location: { lat: -1.2681, lng: -78.6247 }, stopover: false }, // Mall de los Andes
    { location: { lat: -1.2609, lng: -78.6231 }, stopover: false }, // Red. Huachi Chico
    { location: { lat: -1.2496, lng: -78.6234 }, stopover: false }, // Av. Julio Jaramillo
    { location: { lat: -1.2492, lng: -78.6215 }, stopover: false }, // Av. Carlos A. Ortiz
    { location: { lat: -1.2454, lng: -78.6168 }, stopover: false }, // Av. Bolivariana
  ];

 export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const toRad = (value: number) => value * Math.PI / 180;
  
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c; // Distance in kilometers
  }

export function estimateTime(distance: number, speed: number): number {
    // Speed in kilometers per hour, convert to kilometers per minute
    const speedPerMinute = speed / 60;
    // Time in minutes
    return distance / speedPerMinute;
  }
  
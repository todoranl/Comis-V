export function getDistanceFromCoords(pointACoords, pointBCoords) {
  const lat1 = pointACoords[1];
  const lon1 = pointACoords[0];
  const lat2 = pointBCoords[1];
  const lon2 = pointBCoords[0];

  const R = 6371e3; // metres
  const pi = 0.017453292519943295; // Math.PI / 180

  const theta1 = lat1 * pi;
  const theta2 = lat2 * pi;
  const deltaTheta = (lat2 - lat1) * pi;
  const deltaYamcha = (lon2 - lon1) * pi;

  const a = Math.sin(deltaTheta / 2) * Math.sin(deltaTheta / 2)
    + Math.cos(theta1) * Math.cos(theta2) * Math.sin(deltaYamcha / 2) * Math.sin(deltaYamcha / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return (R * c) / 1000;
}

export function computeCost() {
  // Implementare...
}

export function getInsertionCost() {
  // Implementare...
}

export function totalPathCost(path) {
  let totalCost = 0;

  path.forEach((point, index) => {
    if (index < path.length - 1 && point.geometry && point.geometry.coordinates) {
      const currentPoint = point.geometry.coordinates;
      const nextPoint = path[index + 1].geometry.coordinates;
      totalCost += getDistanceFromCoords(currentPoint, nextPoint);
    }
  });

  // Adaugă distanța de întoarcere la punctul de start
  if (path.length > 1 && path[0].geometry && path[0].geometry.coordinates && path[path.length - 1].geometry && path[path.length - 1].geometry.coordinates) {
    const startPoint = path[0].geometry.coordinates;
    const endPoint = path[path.length - 1].geometry.coordinates;
    totalCost += getDistanceFromCoords(endPoint, startPoint);
  }

  return totalCost;
}

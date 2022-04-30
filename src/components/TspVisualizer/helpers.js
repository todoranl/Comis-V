/* eslint-disable import/prefer-default-export */

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

  // const lat1 = Math.abs(pointACoords[1]);
  // const lon1 = Math.abs(pointACoords[0]);
  // const lat2 = Math.abs(pointBCoords[1]);
  // const lon2 = Math.abs(pointBCoords[0]);

  // const a = 0.5
  //   - Math.cos((lat2 - lat1) * pi) / 2
  //   + (Math.cos(lat1 * pi)
  //     * Math.cos(lat2 * pi)
  //     * (1 - Math.cos((lon2 - lon1) * pi)))
  //     / 2;

  // return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

import { getDistanceFromCoords } from './helpers';

const clasicEuclidian = (capitals) => {
  const points = [...capitals.features];

  // Selectează un punct de start aleatoriu
  const randomIndex = Math.floor(Math.random() * points.length);
  const randomItem = points[randomIndex];
  points.splice(randomIndex, 1);

  // Inițializează traseul cu punctul de start
  const path = [randomItem];
  const pathsAnimation = [[...path]];

  // Iterează până când toate punctele sunt vizitate
  while (points.length > 0) {
    // Sortează punctele în funcție de distanța față de ultimul punct din traseu
    points.sort(
      (a, b) => getDistanceFromCoords(
        path[path.length - 1].geometry.coordinates,
        b.geometry.coordinates,
      )
        - getDistanceFromCoords(
          path[path.length - 1].geometry.coordinates,
          a.geometry.coordinates,
        ),
    );

    // Adaugă cel mai apropiat punct la traseu și elimină-l din lista de puncte disponibile
    path.push(points.pop());
    pathsAnimation.push([...path]);
  }

  // Închide traseul prin întoarcerea la punctul de start
  path.push(path[0]);
  pathsAnimation.push([...path]);

  // Returnează traseul complet și animația traseului
  return pathsAnimation;
};

export default clasicEuclidian;

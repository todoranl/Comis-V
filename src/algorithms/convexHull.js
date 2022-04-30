import { getDistanceFromCoords } from 'components/TspVisualizer/helpers';

export const convexHull = (capitals) => {
  const points = [...capitals.features];

  let leftmostPoint = points[0];

  // Find the leftmost point
  points.forEach((point) => {
    if (point.geometry.coordinates[1] < leftmostPoint.geometry.coordinates[1]
      || (point.geometry.coordinates[1] === leftmostPoint.geometry.coordinates[1]
          && point.geometry.coordinates[0] < leftmostPoint.geometry.coordinates[0])) {
      leftmostPoint = point;
    }
  });

  // Compute the Graham angle between the leftmost point and every other point
  points.forEach((point) => {
    // eslint-disable-next-line no-param-reassign
    point.grahamAngle = Math.atan2(
      point.geometry.coordinates[1] - leftmostPoint.geometry.coordinates[1],
      point.geometry.coordinates[0] - leftmostPoint.geometry.coordinates[0],
    );
  });

  // Sort the points based on the graham angle
  points.sort((a, b) => (a.grahamAngle === b.grahamAngle
    ? a.geometry.coordinates[0] - b.geometry.coordinates[0]
    : a.grahamAngle - b.grahamAngle));

  const path = [leftmostPoint];
  let len = 1;

  const pathAnimation = [[...path]];

  // Find the convex hull

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < points.length; i++) {
    let a = path[len - 2];
    let b = path[len - 1];
    const c = points[i];

    while
    // (
    //   (len === 1 && b.geometry.coordinates[0] === c.geometry.coordinates[0])
    //     || (len > 1
    //       && (b.geometry.coordinates[0] - a.geometry.coordinates[0])
    //           * (c.geometry.coordinates[1] - a.geometry.coordinates[1])
    //       <= (b.geometry.coordinates[1] - a.geometry.coordinates[1])
    //           * (c.geometry.coordinates[0] - a.geometry.coordinates[0]))
    // )
    ((len === 1
      && b.geometry.coordinates[0] === c.geometry.coordinates[0]
      && b.geometry.coordinates[1] === c.geometry.coordinates[1])
    || (len > 1
      && (b.geometry.coordinates[0] - a.geometry.coordinates[0])
      * (c.geometry.coordinates[1] - a.geometry.coordinates[1])
      <= (b.geometry.coordinates[1] - a.geometry.coordinates[1])
      * (c.geometry.coordinates[0] - a.geometry.coordinates[0]))) {
      // eslint-disable-next-line no-plusplus
      len--;
      b = a;
      a = path[len - 2];
    }

    // eslint-disable-next-line no-plusplus
    path[len++] = c;
    pathAnimation.push([...path]);
  }

  path.push(path[0]);
  pathAnimation.push([...path]);

  while (points.length > 0) {
    let [bestRatio, bestPointIndex, insertIndex] = [Infinity, null, 0];

    points.forEach((basicPoint, basicPointIndex) => {
      let [bestCost, bestCostIndex] = [Infinity, 0];

      path.forEach((pathPoint, pathPointIndex) => {
        const nextPathPoint = path[(pathPointIndex + 1) % path.length];

        const evalCost = getDistanceFromCoords(
          pathPoint.geometry.coordinates,
          basicPoint.geometry.coordinates,
        )
          + getDistanceFromCoords(
            basicPoint.geometry.coordinates,
            nextPathPoint.geometry.coordinates,
          )
          - getDistanceFromCoords(
            pathPoint.geometry.coordinates,
            nextPathPoint.geometry.coordinates,
          );

        if (evalCost < bestCost) {
          [bestCost, bestCostIndex] = [evalCost, pathPointIndex];
        }
      });

      const nextPoint = path[(bestCostIndex + 1) % path.length];
      const prevCost = getDistanceFromCoords(
        path[bestCostIndex].geometry.coordinates,
        nextPoint.geometry.coordinates,
      );
      const newCost = getDistanceFromCoords(
        path[bestCostIndex].geometry.coordinates,
        basicPoint.geometry.coordinates,
      )
        + getDistanceFromCoords(
          basicPoint.geometry.coordinates,
          nextPoint.geometry.coordinates,
        );

      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIndex, insertIndex] = [
          ratio,
          basicPointIndex,
          bestCostIndex + 1,
        ];
      }
    });

    const [nextPoint] = points.splice(bestPointIndex, 1);
    path.splice(insertIndex, 0, nextPoint);
    pathAnimation.push([...path]);
  }

  pathAnimation.push([...path]);

  return pathAnimation;
};

export default convexHull;

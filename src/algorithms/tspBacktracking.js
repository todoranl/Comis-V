const tspBacktracking = (capitals) => {
  const points = capitals.features.map(feature => feature.geometry.coordinates);
  const n = points.length;
  let bestPath = [];
  let minCost = Infinity;

  // Funcția pentru calcularea distanței euclidiene dintre două puncte
  const calculateEuclideanDistance = (pointA, pointB) => {
    const [x1, y1] = pointA;
    const [x2, y2] = pointB;
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
  };

  // Funcția pentru calcularea costului unui traseu dat
  const calculatePathCost = (path) => {
    let totalCost = 0;
    for (let i = 0; i < path.length - 1; i++) {
      totalCost += calculateEuclideanDistance(path[i], path[i + 1]);
    }
    totalCost += calculateEuclideanDistance(path[path.length - 1], path[0]); // Întoarcerea la punctul de start
    return totalCost;
  };

  // Funcția recursivă de backtracking
  const backtrack = (currentPath, visited) => {
    if (currentPath.length === n) {
      const currentCost = calculatePathCost(currentPath);
      if (currentCost < minCost) {
        minCost = currentCost;
        bestPath = [...currentPath];
      }
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        visited[i] = true;
        currentPath.push(points[i]);
        backtrack(currentPath, visited);
        currentPath.pop();
        visited[i] = false;
      }
    }
  };

  const visited = Array(n).fill(false);
  backtrack([], visited);

  bestPath.push(bestPath[0]); // Închide traseul

  // Returnează traseul optim și costul minim
  return { bestPath, minCost };
};

export default tspBacktracking;

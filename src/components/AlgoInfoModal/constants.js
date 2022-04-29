import { TSP } from 'algorithms/constants';
import { nanoid } from 'nanoid';

const algorithmDescription = {
  [TSP.NEAREST_NEIGHBOUR]: [
    {
      id: nanoid(),
      text: 'The Nearest Neighbour algorithm starts at a random city and repeatedly visits the nearest city until all have been visited. The algorithm yields a short route, but seldom the shortest path.',
    },
    {
      id: nanoid(),
      text: 'The nearest neighbour algorithm is easy to implement and executes quickly, but it can sometimes miss shorter routes. This is due to it being a greedy algorithm which always picks what looks best in the short run, even if it might not be the best approach in the long run.',
    },
  ],
  [TSP.NEAREST_INSERTION]: [
    {
      id: nanoid(),
      text: 'The Nearest Insertion algorithm starts with 2 close cities and repeatedly finds the city not already in the tour closest to any city in the tour; then it adds said city to the tour by placing it between the two closest cities to it, so as to minimize the total distance.',
    },
    {
      id: nanoid(),
      text: 'Due to it being a greedy algorithm, the result is a short route but not guarenteed to be the optimal path.',
    },
  ],
  [TSP.FARTHEST_INSERTION]: [
    {
      id: nanoid(),
      text: 'The Farthest Insertion algorithm starts at a random city and finds the city farthest away from it, drawing an edge between them. From here, it repeatedly identifies the city that is the farthest away from any other city on the tour and places it between whichever two cities will result in the shortest tour feasible.',
    },
    {
      id: nanoid(),
      text: 'Usually, Farthest Insertion produces better tours than Nearest or Cheapest Insertion.',
    },
  ],
  [TSP.CHEAPEST_INSERTION]: [
    {
      id: nanoid(),
      text: 'The Cheapest Insertion algorithm determines which city to add to the tour by calculating the cost of adding each remaining city. This is accomplished by computing the extra distance that the edges leading to the city under consideration would add. The city with the lowest cost is then chosen.',
    },
  ],
  [TSP.RANDOM_INSERTION]: [
    {
      id: nanoid(),
      text: 'The Random Insertion algorithm randomly chooses a city out of the remaining ones and computes which insertion place in the current tour would yield the lowest final distance.',
    },
  ],
  [TSP.CONVEX_HULL]: [
    {
      id: nanoid(),
      text: 'The Convex Hull Insertion algorithm first creates the convex hull of the current cities (the smallest convex polygon completely enclosing all cities), then computes the best city to add to the current tour by finding the addition costs for every city and choosing the best one.',
    },
  ],
  [TSP.TWO_OPT]: [
    {
      id: nanoid(),
      text: 'This implementation of the 2-Opt Inversion algorithm randomly connects cities (encouraging connections between distant cities, in order to get more edge crosses) and then beggins the optimisation process.',
    },
    {
      id: nanoid(),
      text: 'The goal is to find points and edges that cross over each other and then "reverse" the crossover. This continues until there are no more crossings. This algorithm has the guarantee that no crossings are left when it finishes running.',
    },
  ],
};

export default algorithmDescription;

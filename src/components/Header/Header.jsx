import { Flex } from '@chakra-ui/layout';
import { Select, Button, Image } from '@chakra-ui/react';
import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faPlayCircle,
  faRedoAlt,
  faInfo,
} from '@fortawesome/free-solid-svg-icons';

import {
  nearestNeighbour,
  nearestInsertion,
  randomInsertion,
  farthestInsertion,
  cheapestInsertion,
  twoOpt,
  convexHull,
} from 'algorithms';
import { TSP } from 'algorithms/constants';
import githubLogo from 'images/githubLogo.svg';

function Header({
  algo, distance, delay, setters, pathAnimation,
}) {
  const {
    setPathLayer,
    setDelay,
    setTimestamp,
    setDistance,
    setPathAnimation,
    setAlgo,
    onOpen,
  } = setters;

  return (
    <Flex
      justify="center"
      align="center"
      style={{ position: 'absolute', width: '100vw', top: 0 }}
      backgroundColor="#F0F0F0"
    >
      <Flex
        gap="15px"
        justify="center"
        align="center"
        width="1080px"
        padding="10px"
      >
        <a href="https://github.com/razvanborsan" target="_blank" rel="noreferrer">
          <Image
            src={githubLogo}
            alt="Github icon"
            boxSize="60px"
          />
        </a>
        <Select
          value={algo}
          width="400px"
          backgroundColor="#FFF"
          onChange={(e) => {
            setPathLayer();
            setDelay();
            setTimestamp(0);
            setDistance(0);
            setAlgo(e.target.value);
            switch (e.target.value) {
              case TSP.NEAREST_NEIGHBOUR:
                setPathAnimation(nearestNeighbour());
                break;
              case TSP.NEAREST_INSERTION:
                setPathAnimation(nearestInsertion());
                break;
              case TSP.CHEAPEST_INSERTION:
                setPathAnimation(cheapestInsertion());
                break;
              case TSP.FARTHEST_INSERTION:
                setPathAnimation(farthestInsertion());
                break;
              case TSP.RANDOM_INSERTION:
                setPathAnimation(randomInsertion());
                break;
              case TSP.CONVEX_HULL:
                setPathAnimation(convexHull());
                break;
              case TSP.TWO_OPT:
                setPathAnimation(twoOpt());
                break;
              default:
                break;
            }
          }}
        >
          <option value={TSP.NEAREST_NEIGHBOUR}>Nearest Neighbour</option>
          <option value={TSP.NEAREST_INSERTION}>Nearest Insertion</option>
          <option value={TSP.FARTHEST_INSERTION}>Farthest Insertion</option>
          <option value={TSP.CHEAPEST_INSERTION}>Cheapest Insertion</option>
          <option value={TSP.RANDOM_INSERTION}>Random Insertion</option>
          <option value={TSP.CONVEX_HULL}>Convex Hull</option>
          <option value={TSP.TWO_OPT}>2-Opt Inversion</option>
        </Select>

        <Button onClick={onOpen} colorScheme="teal" variant="outline">
          <FontAwesomeIcon icon={faInfo} />
        </Button>

        <Button
          colorScheme="teal"
          onClick={() => {
            setDelay(75);
          }}
        >
          <FontAwesomeIcon icon={faPlayCircle} />
        </Button>

        <Button
          colorScheme="teal"
          disabled={!delay}
          onClick={() => {
            setDelay();
          }}
        >
          <FontAwesomeIcon icon={faPause} />
        </Button>

        <Button
          colorScheme="teal"
          onClick={() => {
            setPathLayer();
            setDelay();
            setTimestamp(0);
            setDistance(0);

            switch (algo) {
              case TSP.NEAREST_NEIGHBOUR:
                setPathAnimation(nearestNeighbour());
                break;
              case TSP.NEAREST_INSERTION:
                setPathAnimation(nearestInsertion());
                break;
              case TSP.CHEAPEST_INSERTION:
                setPathAnimation(cheapestInsertion());
                break;
              case TSP.FARTHEST_INSERTION:
                setPathAnimation(farthestInsertion());
                break;
              case TSP.RANDOM_INSERTION:
                setPathAnimation(randomInsertion());
                break;
              case TSP.CONVEX_HULL:
                setPathAnimation(convexHull());
                break;
              case TSP.TWO_OPT:
                setPathAnimation(twoOpt());
                break;
              default:
                break;
            }
          }}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>

        <Flex justify="center" align="center" style={{ width: 400 }}>
          Distance:
          {' '}
          {Math.floor(distance)}
          {' '}
          km
        </Flex>

        <Flex justify="center" align="center" style={{ width: 650 }}>
          Start location:
          {' '}
          {pathAnimation?.[0]?.[0]?.properties?.name}
          ,
          {' '}
          {pathAnimation?.[0]?.[0]?.properties?.state}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;

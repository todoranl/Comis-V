import { Box, Flex } from '@chakra-ui/layout';
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
  africaViewport,
  asianViewport,
  europeViewport,
  romeViewport,
  southAmericaViewport,
  usaViewport,
} from 'components/TspVisualizer/viewports';
import { TSP } from 'algorithms/constants';

import romanProvinces from 'shared/jsons/romanProvinces';
import africanCapitals from 'shared/jsons/africanCapitals';
import europeanCapitals from 'shared/jsons/europeanCapitals';
import usaCapitals from 'shared/jsons/usaCapitals';
import southAmericanCapitals from 'shared/jsons/southAmericanCapitals';
import asianCapitals from 'shared/jsons/asianCapitals';

import githubLogo from 'images/githubLogo.svg';

function Header({
  algo, capitals, distance, delay, setters, pathAnimation,
}) {
  const {
    setPathLayer,
    setViewport,
    setCapitals,
    setDelay,
    setTimestamp,
    setDistance,
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
        gap="10px"
        justify="center"
        align="center"
        maxWidth="1440px"
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
          width="500px"
          backgroundColor="#FFF"
          onChange={(e) => {
            setPathLayer();
            setDelay();
            setTimestamp(0);
            setDistance(0);
            setAlgo(e.target.value);
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
            setDelay(80);
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
          }}
        >
          <FontAwesomeIcon icon={faRedoAlt} />
        </Button>

        <Flex
          justify="center"
          align="center"
          style={{ width: 600 }}
          gap="30px"
        >
          <Box>
            Total places:
            {' '}
            {capitals?.features?.length}
          </Box>
          <Box width="150px">
            Distance:
            {' '}
            {Math.floor(distance)}
            {' '}
            km
          </Box>
        </Flex>

        <Select
          backgroundColor="#FFF"
          width="500px"
          onChange={(e) => {
            setPathLayer();
            setDelay();
            setTimestamp(0);
            setDistance(0);
            switch (e.target.value) {
              case 'ROME':
                setViewport(romeViewport);
                setCapitals(romanProvinces);
                break;
              case 'AFRICA':
                setViewport(africaViewport);
                setCapitals(africanCapitals);
                break;
              case 'EUROPE':
                setViewport(europeViewport);
                setCapitals(europeanCapitals);
                break;
              case 'SOUTH_AMERICA':
                setViewport(southAmericaViewport);
                setCapitals(southAmericanCapitals);
                break;
              case 'ASIA':
                setViewport(asianViewport);
                setCapitals(asianCapitals);
                break;
              case 'USA':
              default:
                setViewport(usaViewport);
                setCapitals(usaCapitals);
                break;
            }
          }}
        >
          <option value="USA">United States of America</option>
          <option value="ROME">The Roman Empire</option>
          <option value="EUROPE">Europe</option>
          <option value="AFRICA">Africa</option>
          <option value="SOUTH_AMERICA">South America</option>
          <option value="ASIA">Asia</option>
        </Select>

        <Flex justify="center" align="center" style={{ width: 650 }}>
          Start location:
          {' '}
          {pathAnimation?.[0]?.[0]?.properties?.capital}
          {(pathAnimation?.[0]?.[0]?.properties?.state
          || pathAnimation?.[0]?.[0]?.properties?.country) && ','}
          {' '}
          {pathAnimation?.[0]?.[0]?.properties?.state
          || pathAnimation?.[0]?.[0]?.properties?.country}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Header;

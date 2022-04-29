import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import StaticMap from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import { Box } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';

import { Header } from 'components/Header';
import { nearestNeighbour } from 'algorithms';
import { TSP } from 'algorithms/constants';
import { totalPathCost } from 'algorithms/helpers';
import useInterval from 'hooks/useInterval';

import 'mapbox-gl/dist/mapbox-gl.css';

import { getUSACapitals, usaViewport } from './constants';
import AlgoInfoModal from '../AlgoInfoModal/AlgoInfoModal';

function TspVisualiser() {
  const [viewport] = useState(usaViewport);
  const [pathLayer, setPathLayer] = useState();
  const [capitals, setCapitals] = useState();
  const [delay, setDelay] = useState();
  const [timestamp, setTimestamp] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pathAnimation, setPathAnimation] = useState(nearestNeighbour());
  const [algo, setAlgo] = useState(TSP.NEAREST_NEIGHBOUR);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setters = {
    setPathLayer,
    setDelay,
    setTimestamp,
    setDistance,
    setPathAnimation,
    setAlgo,
    onOpen,
  };

  useEffect(() => {
    setCapitals(getUSACapitals());
  }, []);

  useInterval(() => {
    if (!pathAnimation[timestamp]) {
      setDelay();
      setTimestamp(0);
    } else {
      setPathLayer(
        new PathLayer({
          id: 'path-layer',
          data: [
            {
              name: 'random',
              color: [101, 147, 245],
              path: pathAnimation[timestamp].reduce(
                (accumulator, currentValue) => {
                  accumulator?.push(currentValue.geometry.coordinates);
                  return accumulator;
                },
                [],
              ),
            },
          ],
          getWidth: () => 2,
          getColor: (data) => data.color,
          getPath: (data) => data.path,
          currentTime: 0,
          widthMinPixels: 4,
          transitions: {
            getColor: {
              duration: 10,
            },
          },
        }),
      );

      const myDistance = totalPathCost(pathAnimation[timestamp]);

      setTimestamp(timestamp + 1);
      setDistance(myDistance);
    }
  }, delay || null);

  return (
    <Box as="section">
      <DeckGL
        initialViewState={viewport}
        width="100vw"
        height="100vh"
        controller
        style={{ position: 'relative' }}
        layers={[pathLayer, capitals]}
      >
        <StaticMap
          mapStyle="mapbox://styles/mapbox/dark-v10"
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
        />
      </DeckGL>

      <AlgoInfoModal
        isOpen={isOpen}
        onClose={onClose}
        algo={algo}
      />

      <Header
        algo={algo}
        distance={distance}
        delay={delay}
        pathAnimation={pathAnimation}
        setters={setters}
      />
    </Box>
  );
}

export default TspVisualiser;

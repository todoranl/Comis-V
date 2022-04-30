import React, { useState, useEffect } from 'react';
import DeckGL from 'deck.gl';
import StaticMap from 'react-map-gl';
import { PathLayer } from '@deck.gl/layers';
import { Box } from '@chakra-ui/layout';
import { useDisclosure } from '@chakra-ui/react';

import { Header } from 'components/Header';
import { TSP } from 'algorithms/constants';
import { totalPathCost } from 'algorithms/helpers';
import useInterval from 'hooks/useInterval';

import 'mapbox-gl/dist/mapbox-gl.css';

import {
  nearestNeighbour,
  nearestInsertion,
  randomInsertion,
  farthestInsertion,
  cheapestInsertion,
  twoOpt,
  convexHull,
} from 'algorithms';

import usaCapitals from 'shared/jsons/usaCapitals';
import { getCapitalsGeoJSON, getStartingPointLayer } from './constants';
import { usaViewport } from './viewports';
import AlgoInfoModal from '../AlgoInfoModal/AlgoInfoModal';

function TspVisualiser() {
  const [viewport, setViewport] = useState(usaViewport);
  const [capitals, setCapitals] = useState(usaCapitals);
  const [pathLayer, setPathLayer] = useState();
  const [capitalsGeoJsonLayer, setCapitalsGeoJsonLayer] = useState();
  const [delay, setDelay] = useState();
  const [timestamp, setTimestamp] = useState(0);
  const [distance, setDistance] = useState(0);
  const [pathAnimation, setPathAnimation] = useState(nearestNeighbour(capitals));
  const [algo, setAlgo] = useState(TSP.NEAREST_NEIGHBOUR);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const setters = {
    setPathLayer,
    setViewport,
    setCapitals,
    setDelay,
    setTimestamp,
    setDistance,
    setPathAnimation,
    setAlgo,
    onOpen,
  };

  useEffect(() => {
    switch (algo) {
      case TSP.NEAREST_NEIGHBOUR:
        setPathAnimation(nearestNeighbour(capitals));
        break;
      case TSP.NEAREST_INSERTION:
        setPathAnimation(nearestInsertion(capitals));
        break;
      case TSP.CHEAPEST_INSERTION:
        setPathAnimation(cheapestInsertion(capitals));
        break;
      case TSP.FARTHEST_INSERTION:
        setPathAnimation(farthestInsertion(capitals));
        break;
      case TSP.RANDOM_INSERTION:
        setPathAnimation(randomInsertion(capitals));
        break;
      case TSP.CONVEX_HULL:
        setPathAnimation(convexHull(capitals));
        break;
      case TSP.TWO_OPT:
        setPathAnimation(twoOpt(capitals));
        break;
      default:
        break;
    }
  }, [algo, capitals]);

  useEffect(() => {
    const layer = getCapitalsGeoJSON({
      ...capitals,
      features: capitals.features.filter(
        (city) => city.properties.capital !== pathAnimation?.[0]?.[0].properties.capital,
      ),
    });

    setCapitalsGeoJsonLayer(layer);
  }, [capitals, pathAnimation]);

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

  const startingPointLayer = getStartingPointLayer({
    type: 'FeatureCollection',
    features: [pathAnimation?.[0]?.[0]],
  });

  return (
    <Box as="section">
      <DeckGL
        initialViewState={viewport}
        width="100vw"
        height="100vh"
        controller
        style={{ position: 'relative' }}
        layers={[startingPointLayer, capitalsGeoJsonLayer, pathLayer]}
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
        capitals={capitals}
        distance={distance}
        delay={delay}
        pathAnimation={pathAnimation}
        setters={setters}
      />
    </Box>
  );
}

export default TspVisualiser;

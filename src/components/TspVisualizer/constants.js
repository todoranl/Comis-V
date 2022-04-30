import { GeoJsonLayer } from '@deck.gl/layers';

export const getCapitalsGeoJSON = (data) => new GeoJsonLayer({
  id: 'geojson-layer',
  data,
  filled: true,
  pointRadiusMinPixels: 5,
  pointRadiusMaxPixels: 200,
  opacity: 1,
  pointRadiusScale: 0.3,
  getPointRadius: 10 ** 3,
  getFillColor: [255, 70, 30, 180],
  autoHighlight: true,
  transitions: {
    getRadius: {
      type: 'spring',
      stiffness: 0.1,
      damping: 0.15,
      enter: [0], // grow from size 0,
      duration: 10000,
    },
  },
});

export const getStartingPointLayer = (point) => new GeoJsonLayer({
  id: 'starting-point-layer',
  data: point,
  filled: true,
  pointRadiusMinPixels: 5,
  pointRadiusMaxPixels: 200,
  opacity: 1,
  pointRadiusScale: 0.3,
  getPointRadius: 10 ** 3,
  getFillColor: [255, 255, 0, 255],
  autoHighlight: true,
  transitions: {
    getRadius: {
      type: 'spring',
      stiffness: 0.1,
      damping: 0.15,
      enter: [0], // grow from size 0,
      duration: 10000,
    },
  },
});

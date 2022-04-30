import { FlyToInterpolator } from 'deck.gl';

export const usaViewport = {
  latitude: 39.8283,
  longitude: -98.5795,
  bearing: 0,
  pitch: 0,
  zoom: 3.5,
  transitionDuration: 1000,
  transitionInterpolator: new FlyToInterpolator(),
};

export const europeViewport = {
  latitude: 50.5260,
  longitude: 15.2551,
  bearing: 0,
  pitch: 0,
  zoom: 3.3,
  transitionDuration: 1500,
  transitionInterpolator: new FlyToInterpolator(),
};

export const romeViewport = {
  latitude: 43.5260,
  longitude: 15.2551,
  bearing: 0,
  pitch: 0,
  zoom: 3.6,
  transitionDuration: 1500,
  transitionInterpolator: new FlyToInterpolator(),
};

export const africaViewport = {
  latitude: 5.7832,
  longitude: 10.0085,
  bearing: 0,
  pitch: 0,
  zoom: 2.5,
  transitionDuration: 1500,
  transitionInterpolator: new FlyToInterpolator(),
};

export const southAmericaViewport = {
  latitude: -23.7832,
  longitude: -55.4915,
  bearing: 0,
  pitch: 0,
  zoom: 2.5,
  transitionDuration: 1500,
  transitionInterpolator: new FlyToInterpolator(),
};

export const asianViewport = {
  latitude: 30.0479,
  longitude: 85.6197,
  bearing: 0,
  pitch: 0,
  zoom: 2.5,
  transitionDuration: 1500,
  transitionInterpolator: new FlyToInterpolator(),
};

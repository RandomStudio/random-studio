import { Vector3 } from 'babylonjs';

const camera = {
  position: new Vector3(50, 30, -120),
  target: new Vector3(-10, 0, 100),
};

const filename = 'sofaisland.glb';

const mirrors = [
  {
    width: 48,
    height: 48,
    position: new Vector3(3, 26, 43.2),
    rotation: new Vector3(0, 0, 0),
  },
];

const model = {
  position: new Vector3(25, -8, 80),
  rotation: new Vector3(0, 0, 0),
};

const sun = {
  direction: {
    left: new Vector3(1, -0.5, -0.8),
    centre: new Vector3(0, -0.4, -0.848),
    right: new Vector3(-1, -0.5, -0.8),
  },
  position: {
    left: new Vector3(-50, 0, 120),
    centre: new Vector3(30, 30, 150),
    right: new Vector3(50, 0, 120),
  },
  shadows: [30, 150],
};

export default {
  camera,
  filename,
  mirrors,
  model,
  sun,
};

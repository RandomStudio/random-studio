import { Vector3 } from 'babylonjs';

const camera = {
  position: new Vector3(-1, 3, -40),
  target: new Vector3(0, 0, 0),
};

const filename = 'mirrorisland.glb';

const light = {
  direction: [
    {
      frame: 0,
      value: new Vector3(1, -0.5, -0.8),
    },
    {
      frame: 3000,
      value: new Vector3(-1, -0.5, -0.8),
    },
  ],
  position: [
    {
      frame: 0,
      value: new Vector3(-15, 0, 14),
    },
    {
      frame: 750,
      value: new Vector3(-5, 8, 14),
    },
    {
      frame: 1500,
      value: new Vector3(0, 10, 14),
    },
    {
      frame: 2250,
      value: new Vector3(5, 8, 14),
    },
    {
      frame: 3000,
      value: new Vector3(15, 0, 14),
    },
  ],
};

const sun = {
  direction: {
    left: new Vector3(1, -0.5, -0.8),
    centre: new Vector3(0, -0.2, -0.95),
    right: new Vector3(-1, -0.5, -0.8),
  },
  position: {
    left: new Vector3(-50, 0, 120),
    centre: new Vector3(6, 6, 30),
    right: new Vector3(50, 0, 120),
  },
  shadows: [25, 40],
};

const model = {
  identifier: 'Default',
  position: new Vector3(-5, -4, -10),
  rotation: new Vector3(0, -3, 0),
};

const mirrors = [
  {
    width: 4.2,
    height: 6.45,
    position: new Vector3(-3.53, 4.5, -6.25),
    rotation: new Vector3(0, -0.31, 0),
  },
  {
    width: 1,
    height: 6.45,
    position: new Vector3(-5.7, 4.5, -6.5),
    rotation: new Vector3(0, 89.23, 0),
  },
];

export default {
  camera,
  filename,
  model,
  sun,
  mirrors,
};

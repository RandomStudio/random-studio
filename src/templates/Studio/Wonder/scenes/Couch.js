import { Vector3, Color3 } from 'babylonjs';

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
  color: [
    {
      frame: 0,
      value: new Color3.FromHexString('#FF82E9'),
    },
    {
      frame: 20,
      value: new Color3.FromHexString('#F2B49A'),
    },
    {
      frame: 50,
      value: new Color3.FromHexString('#FFEF76'),
    },
    {
      frame: 90,
      value: new Color3.FromHexString('#F99000'),
    },
    {
      frame: 100,
      value: new Color3.FromHexString('#6130BC'),
    },
  ],
  direction: [
    {
      frame: 0,
      value: new Vector3(1, -0.5, -0.8),
    },
    {
      frame: 50,
      value: new Vector3(0, -0.4, -0.848),
    },
    {
      frame: 100,
      value: new Vector3(-1, -0.5, -0.8),
    },
  ],
  position: new Vector3(30, 30, 150),
  shadows: [30, 150],
};

export default {
  camera,
  filename,
  mirrors,
  model,
  sun,
};

import { Vector3 } from 'babylonjs';

const cameraRotationVectors = [
  {
    frame: 0,
    value: new Vector3(-1, 3, -5),
  },
  {
    frame: 1000,
    value: new Vector3(-3.5, 5, -5.5),
  },
  {
    frame: 2000,
    value: new Vector3(-1, 5, -6),
  },
];

const cameraTargetVectors = [
  {
    frame: 0,
    value: new Vector3(-2, 2, 0),
  },
  {
    frame: 1000,
    value: new Vector3(-0.15, 2, 0),
  },
  {
    frame: 2000,
    value: new Vector3(-2, 2, 0),
  },
];

const filename = 'test-island.obj';

const modelVectors = [
  {
    frame: 0,
    value: new Vector3(0, 0, 0),
  },
  {
    frame: 3000,
    value: new Vector3(0, -2, 0),
  },
];

const mirrors = [
  {
    width: 1.4,
    height: 2.3,
    position: new Vector3(-0.92, 1.58, 3.65),
    rotation: new Vector3(0, -0.31, 0),
  },
  {
    width: 0.45,
    height: 2.3,
    position: new Vector3(-1.654, 1.58, 3.65),
    rotation: new Vector3(0, 89.23, 0),
  },
];

export default [
  cameraRotationVectors,
  cameraTargetVectors,
  filename,
  modelVectors,
  mirrors,
];

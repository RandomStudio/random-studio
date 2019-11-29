import { Vector3 } from 'babylonjs';

const cameraRotationVectors = [
  {
    frame: 0,
    value: new Vector3(-1, 5, -30),
  },
  {
    frame: 2000,
    value: new Vector3(-19, 20, -20),
  },
];

const cameraTargetVectors = [
  {
    frame: 0,
    value: new Vector3(-2, 2, 0),
  },
];

const filename = 'test-couch.obj';

const modelVectors = [
  {
    frame: 0,
    value: new Vector3(0, 0, 0),
  },
];

const mirrors = [
  {
    width: 14,
    height: 14,
    position: new Vector3(0.5, 7, 9.5),
    rotation: new Vector3(0, 0, 0),
  },
];

export default [
  cameraRotationVectors,
  cameraTargetVectors,
  filename,
  modelVectors,
  mirrors,
];

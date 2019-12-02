import { Vector3 } from 'babylonjs';

const cameraRotationVectors = [
  {
    frame: 0,
    value: new Vector3(-1, 5, -30),
  },
  {
    frame: 3000,
    value: new Vector3(19, 20, -20),
  },
];

const cameraTargetVectors = [
  {
    frame: 0,
    value: new Vector3(-2, 2, 0),
  },
];

const filename = 'test-couch.obj';

const lightDirectionVectors = [
  {
    frame: 0,
    value: new Vector3(1, -0.5, -0.8),
  },
  {
    frame: 3000,
    value: new Vector3(-1, -0.5, -0.8),
  },
];

const lightPositionVectors = [
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
];

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
  lightDirectionVectors,
  lightPositionVectors,
  modelVectors,
  mirrors,
];

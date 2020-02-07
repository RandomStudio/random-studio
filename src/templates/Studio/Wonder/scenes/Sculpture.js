import { Vector3, Color3 } from 'babylonjs';

const camera = {
  position: new Vector3(0, 0, 0),
  target: new Vector3(0, 0, 20),
};

const filename = {
  path: '/models/sculpture/sculptureV2/',
  file: 'movingRock.glb',
  path2: '/models/sculpture/backup/',
  file2: 'movingRockBackup.gltf',
};

const hdr = {
  url: 'models/sculpture/hdr/studio.env',
};

const model = {
  position: new Vector3(-10, -7, 80),
  rotation: new Vector3(0, 0, 0),
};

const sun = {
  color: [
    {
      frame: 0,
      value: new Color3.FromHexString('#FF82E9'),
    },
    {
      frame: 17,
      value: new Color3.FromHexString('#F2B49A'),
    },
    {
      frame: 50,
      value: new Color3.FromHexString('#FFEF76'),
    },
    {
      frame: 75,
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
      value: new Vector3(-1, -0.5, -0.8),
    },
    {
      frame: 50,
      value: new Vector3(0, -0.4, -0.848),
    },
    {
      frame: 100,
      value: new Vector3(1, -0.5, -0.8),
    },
  ],
  position: new Vector3(30, 30, 200),
  shadows: [30, 150],
};

export default {
  camera,
  hdr,
  filename,
  model,
  sun,
};

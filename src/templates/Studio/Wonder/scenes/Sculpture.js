import { Vector3 } from 'babylonjs';

const camera = {
  position: new Vector3(0, 0, 0),
  target: new Vector3(0, 0, 50),
};

const filename = {
  path: '/models/sculpture/',
  file: 'sculpture01.gltf',
};

const hdr = {
  url: '/models/sculpture/environment.dds',
};

const model = {
  position: new Vector3(0, 0, 80),
  rotation: new Vector3(0, 0, 0),
};

export default {
  camera,
  hdr,
  filename,
  model,
};

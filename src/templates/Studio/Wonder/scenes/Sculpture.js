import { Vector3 } from 'babylonjs';

const camera = {
  position: new Vector3(0, 0, 0),
  target: new Vector3(0, 0, 50),
};

const filename = {
  path: '/models/sculpture/sculptureCompressed/',
  file: 'sculptureCompressed.gltf',
};

const hdr = {
  url: 'models/sculpture/hdr/environment.dds',
};

const model = {
  position: new Vector3(10, -7, 100),
  rotation: new Vector3(0, 0, 0),
};

export default {
  camera,
  hdr,
  filename,
  model,
};

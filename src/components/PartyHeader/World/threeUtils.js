import {
  LinearFilter,
  LinearMipmapLinearFilter,
  PlaneGeometry,
  Mesh,
  MeshBasicMaterial,
  CanvasTexture,
  Points,
  PointsMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  SpotLight,
  Scene,
} from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

export const setupRenderer = targetRef => {
  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetRef.current.appendChild(renderer.domElement);

  return renderer;
};

export const setupScene = () => {
  const scene = new Scene();

  const light = new SpotLight();
  light.position.set(20, 20, 20);
  scene.add(light);

  return scene;
};

export const createCamera = () => {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = -0;
  camera.position.x = 20;
  camera.rotation.y = 0.4;

  return camera;
};

export const loadModel = () =>
  new Promise((resolve, reject) => {
    const loader = new PLYLoader();

    loader.load(
      'models/evolution-party.ply',
      geometry => {
        geometry.scale(20, 20, 20);

        const material = new PointsMaterial({
          size: 0.01,
          transparent: true,
        });

        material.vertexColors = geometry.hasAttribute('color');

        const object = new Points(geometry, material);
        object.rotateY(Math.PI * -0.1);
        object.position.setX(-40);
        object.position.setZ(-120);
        resolve([object, material]);
      },
      null,
      error => {
        console.error(error);
        reject(error);
      },
    );
  });

export const createCanvas = () => {
  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const texture = new CanvasTexture(canvas);
  texture.minFilter = LinearMipmapLinearFilter;
  texture.maxFilter = LinearFilter;

  const material = new MeshBasicMaterial({
    map: texture,
    transparent: true,
  });

  // need to flag the map as needing updating.
  material.map.needsUpdate = true;

  const geometry = new PlaneGeometry(80, 80 * (1080 / 1920));
  geometry.rotateZ(Math.PI);
  const plane = new Mesh(geometry, material);
  plane.position.x = -20;
  plane.position.z = -174;
  plane.rotation.x = -0.01;
  plane.rotation.y = -0.3;
  plane.rotation.z = -0;

  return [plane, canvas, material];
};

export const resizeRendererToDisplaySize = (renderer, camera, points) => {
  const aspect = window.innerWidth / window.innerHeight;

  camera.aspect = aspect;

  const DISTANCE = 20;
  const DIAMETER = 20;

  if (aspect > 1.0) {
    points.opacity = 1;
    camera.fov = 2 * Math.atan(DIAMETER / (2 * DISTANCE)) * (180 / Math.PI);
  } else {
    points.opacity = 0.3;

    camera.fov =
      2 * Math.atan(DIAMETER / aspect / (2 * DISTANCE)) * (180 / Math.PI); // in degrees
  }

  renderer.setSize(window.innerWidth, window.innerHeight);
  // Don't forget this
  camera.updateProjectionMatrix();
};

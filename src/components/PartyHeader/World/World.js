import React, { useEffect, useRef, useState } from 'react';
import {
  Points,
  PointsMaterial,
  WebGLRenderer,
  PerspectiveCamera,
  SpotLight,
  Scene,
} from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import styles from './World.module.scss';

const setupRenderer = targetRef => {
  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetRef.current.appendChild(renderer.domElement);

  return renderer;
};

const setupScene = () => {
  const scene = new Scene();

  const light = new SpotLight();
  light.position.set(20, 20, 20);
  scene.add(light);

  return scene;
};

const createCamera = () => {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  return camera;
};

const loadModel = () =>
  new Promise((resolve, reject) => {
    const loader = new PLYLoader();

    loader.load(
      'models/evolution-party.ply',
      geometry => {
        geometry.scale(20, 20, 20);
        const material = new PointsMaterial({ size: 0.01 });
        material.vertexColors = geometry.hasAttribute('color');

        const object = new Points(geometry, material);
        object.rotateY(Math.PI / 1.8);
        object.position.setX(-10);
        object.position.setZ(-80);
        resolve(object);
      },
      null,
      error => {
        console.error(error);
        reject(error);
      },
    );
  });

const handleLoad = async targetRef => {
  const renderer = setupRenderer(targetRef);
  const scene = setupScene();
  const camera = createCamera();

  const model = await loadModel();
  scene.add(model);

  const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  };

  animate();
};

const World = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const targetRef = useRef();

  useEffect(() => {
    handleLoad(targetRef).then(() => setIsLoaded(true));
  }, []);

  return (
    <div
      className={`${styles.target} ${isLoaded ? styles.isLoaded : ''}`}
      ref={targetRef}
    />
  );
};

export default World;

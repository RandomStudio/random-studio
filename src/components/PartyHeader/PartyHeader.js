import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import styles from './PartyHeader.module.scss';

const handleLoad = targetRef => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xbfe3dd);

  scene.add(new THREE.AxesHelper(5));

  const light = new THREE.SpotLight();
  light.position.set(20, 20, 20);
  scene.add(light);

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(window.innerWidth, window.innerHeight);
  targetRef.current.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  const loader = new PLYLoader();

  loader.load(
    'models/evolution-party.ply',
    function (geometry) {
      geometry.scale(20, 20, 20);
      const material = new THREE.PointsMaterial({ size: 0.01 });
      material.vertexColors = geometry.hasAttribute('color');

      const object = new THREE.Points(geometry, material);
      object.rotateY(Math.PI / 1.8);
      object.position.setX(-10);
      object.position.setZ(-80);
      scene.add(object);
    },
    xhr => {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },
    error => {
      console.log(error);
    },
  );

  function render() {
    renderer.render(scene, camera);
  }

  function animate() {
    requestAnimationFrame(animate);

    controls.update();

    render();
    // stats.update();
  }

  animate();
};

const PartyHeader = () => {
  const targetRef = useRef();

  useEffect(() => {
    handleLoad(targetRef);
  }, []);

  return <div className={styles.frame} ref={targetRef} />;
};

export default PartyHeader;

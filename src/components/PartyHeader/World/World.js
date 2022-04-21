/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Vector3, Group } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import {
  createCamera,
  createCanvas,
  loadModel,
  resizeRendererToDisplaySize,
  setupRenderer,
  setupScene,
} from './threeUtils';
import styles from './World.module.scss';

const drawShapes = (ctx, frameCount, shapes) => {
  for (const { color, coords, id, end, start } of shapes) {
    if (frameCount < start) {
      continue;
    }

    const alpha = frameCount < end ? 1 : 1 - (frameCount - end) / 100;

    if (alpha <= 0) {
      continue;
    }

    // ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    ctx.moveTo(coords[0].x, coords[0].y);

    const lifespan = end - start;

    const visibleCoords = Math.min(
      coords.length,
      (coords.length / lifespan) * (frameCount - start),
    );

    for (let i = 1; i < visibleCoords; i++) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }

    ctx.stroke();
    ctx.closePath();
  }
};

let frame = 0;
let raf;

const animate = ({ camera, canvasMaterial, ctx, renderer, scene, shapes }) => {
  frame += 1;
  // if (resizeRendererToDisplaySize(renderer)) {
  //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //   camera.updateProjectionMatrix();
  // }
  drawShapes(ctx, frame, shapes);
  canvasMaterial.map.needsUpdate = true;

  renderer.render(scene, camera);

  raf = requestAnimationFrame(() =>
    animate({
      camera,
      canvasMaterial,
      ctx,
      renderer,
      scene,
      shapes,
    }),
  );
};

let camera;
let canvasEl;
let canvasMaterial;
let ctx;
let renderer;
let scene;

const World = ({ isLive, shapes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const targetRef = useRef();

  useEffect(() => {
    const handleLoad = async () => {
      renderer = setupRenderer(targetRef);
      scene = setupScene();
      camera = createCamera();

      const [plane, canvas, material] = createCanvas();
      canvasMaterial = material;
      canvasEl = canvas;
      ctx = canvasEl.getContext('2d');
      const model = await loadModel();
      const group = new Group();
      group.add(model);
      group.add(plane);

      //      camera.position.x = 40;
      //      camera.position.z = -150;
      //      camera.rotation.y = 1.2;
      //
      window.updateCamera = (x, y, z, rotateX, rotateY, rotateZ) => {
        camera.position.x = x;
        camera.position.y = y;
        camera.position.z = z;
        camera.rotation.x = rotateX;
        camera.rotation.y = rotateY;
        camera.rotation.z = rotateZ;
      };

      scene.add(group);

      setIsLoaded(true);
    };

    handleLoad();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const resize = () => resizeRendererToDisplaySize(renderer, camera);

    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    window.cancelAnimationFrame(raf);

    const adjustedShapes = shapes.map(shape =>
      shape.hasAdjustedForLive || !isLive
        ? shape
        : {
          ...shape,
          end: frame + (shape.end - shape.start),
          hasAdjustedForLive: true,
          start: frame,
        },
    );

    const transformedShapes = adjustedShapes.map(shape =>
      shape.hasTransformed
        ? shape
        : {
          ...shape,
          coords: shape.coords.map(({ x, y }) => ({
            x: canvasEl.clientWidth - x * canvasEl.clientWidth,
            y: canvasEl.clientHeight - y * canvasEl.clientHeight,
          })),
          hasTransformed: true,
        },
    );

    animate({
      camera,
      canvasMaterial,
      ctx,
      renderer,
      scene,
      shapes: transformedShapes,
    });
  }, [shapes, isLoaded, isLive]);

  return (
    <div
      className={`${styles.target} ${isLoaded ? styles.isLoaded : ''}`}
      ref={targetRef}
    />
  );
};

export default World;

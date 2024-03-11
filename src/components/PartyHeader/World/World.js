/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { use, useEffect, useRef, useState } from 'react';
import { Group } from 'three';
import {
  createCamera,
  createCanvas,
  loadModel,
  resizeRendererToDisplaySize,
  setupRenderer,
  setupScene,
} from './threeUtils';
import styles from './World.module.scss';
import { recordCanvas } from './recorderUtils';

const drawShapes = (ctx, frameCount, shapes, onDeleteShape) => {
  for (const { color, coords, end, id, start } of shapes) {
    if (frameCount < start) {
      continue;
    }

    const alpha = frameCount < end ? 1 : 1 - (frameCount - end) / 100;

    if (alpha <= 0) {
      onDeleteShape(id);
      continue;
    }

    // ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
    ctx.beginPath();
    const rgba = color.replace('rgb', 'rgba').replace(')', '');
    ctx.strokeStyle = `${rgba}, ${alpha})`;

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

let raf;
let camera;
let canvasEl;
let canvasMaterial;
let ctx;
let points;
let renderer;
let scene;

const World = ({ frameRef, isLive, onDeleteShape, shapes }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef();
  const textureCanvasRef = useRef();

  useEffect(() => {
    const handleLoad = async () => {
      renderer = setupRenderer(canvasRef.current);
      scene = setupScene();
      camera = createCamera();

      const [plane, canvas, material] = createCanvas(textureCanvasRef.current);
      canvasMaterial = material;
      canvasEl = canvas;
      ctx = canvasEl.getContext('2d');
      const [model, pointsMaterial] = await loadModel();
      points = pointsMaterial;
      const group = new Group();
      group.add(model);
      group.add(plane);

      scene.add(group);
      resizeRendererToDisplaySize(renderer, camera, points);
      setIsLoaded(true);
    };

    handleLoad();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return undefined;
    }

    const transformedShapes = shapes.map(shape =>
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

    const animate = () => {
      frameRef.current += 1;
      // if (resizeRendererToDisplaySize(renderer)) {
      //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
      //   camera.updateProjectionMatrix();
      // }
      ctx.clearRect(0, 0, 1920, 1080);
      drawShapes(ctx, frameRef.current, transformedShapes, onDeleteShape);
      canvasMaterial.map.needsUpdate = true;

      renderer.render(scene, camera);

      raf = requestAnimationFrame(animate);
    };

    raf = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [frameRef, isLive, isLoaded, onDeleteShape, shapes]);

  useEffect(() => {
    window.recordVideo = (time = 4000) => {
      frameRef.current += 0;
      recordCanvas(canvasEl, time);
    };
  }, [frameRef, isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return undefined;
    }

    const resize = () => resizeRendererToDisplaySize(renderer, camera, points);
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, [isLoaded]);

  return (
    <div className={`${styles.target} ${isLoaded ? styles.isLoaded : ''}`}>
      <canvas ref={canvasRef} />

      <canvas ref={textureCanvasRef} />
    </div>
  );
};

export default World;

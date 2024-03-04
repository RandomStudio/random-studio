/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { useEffect, useMemo, useRef, useState } from 'react';
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

let raf;
let camera;
let canvasEl;
let canvasMaterial;
let points;
let renderer;
let scene;

const drawShapes = (ctx, frameCount, shapes, onDeleteShape) => {
  for (const { color, coords, end, id, start } of shapes) {
    if (frameCount < start || frameCount > end + 100) {
      continue;
    }

    const alpha = frameCount < end ? 1 : 1 - (frameCount - end) / 100;

    if (alpha <= 0) {
      continue;
    }

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

    for (let i = 1; i < visibleCoords; i += 1) {
      ctx.lineTo(coords[i].x, coords[i].y);
    }

    ctx.stroke();
    ctx.closePath();
  }
};

const World = ({ frameRef, onDeleteShape, shapes }) => {
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

  const [isOffscreen, setIsOffscreen] = useState(false);

  useEffect(() => {
    if (!isLoaded || shapes.length < 1) {
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

    const animate3D = () => {
      canvasMaterial.map.needsUpdate = true;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate3D);
    };

    raf = window.requestAnimationFrame(animate3D);

    if (
      typeof textureCanvasRef.current.transferControlToOffscreen === 'function'
    ) {
      if (isOffscreen) {
        return;
      }

      const offscreen = textureCanvasRef.current.transferControlToOffscreen();

      const worker = new Worker('/workers/drawing.worker.js');

      worker.postMessage(
        {
          canvas: offscreen,
          shapes: transformedShapes,
        },
        [offscreen],
      );

      setIsOffscreen(true);
    } else {
      const startRendering = async () => {
        const ctx = canvasEl.getContext('2d');

        console.log('start');

        const animate = () => {
          frameRef.current += 5;

          ctx.clearRect(0, 0, 1920, 1080);
          drawShapes(ctx, frameRef.current, transformedShapes);

          raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);
      };

      startRendering();
    }

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [frameRef, isLoaded, isOffscreen, shapes]);

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

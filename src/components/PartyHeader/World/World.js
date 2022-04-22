/* eslint-disable no-restricted-syntax */
/* eslint-disable no-param-reassign */
import React, { useEffect, useRef, useState } from 'react';
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
    ctx.strokeStyle = `rgba(0,0,0,${alpha})`;
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

const animate = ({
  camera,
  canvasMaterial,
  ctx,
  onDeleteShape,
  renderer,
  scene,
  shapes,
}) => {
  frame += 1;
  // if (resizeRendererToDisplaySize(renderer)) {
  //   camera.aspect = canvas.clientWidth / canvas.clientHeight;
  //   camera.updateProjectionMatrix();
  // }
  ctx.clearRect(0, 0, 1920, 1080);

  drawShapes(ctx, frame, shapes, onDeleteShape);
  canvasMaterial.map.needsUpdate = true;

  renderer.render(scene, camera);

  raf = requestAnimationFrame(() =>
    animate({
      camera,
      canvasMaterial,
      ctx,
      onDeleteShape,
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
let points;
let renderer;
let scene;

const World = ({ isLive, onDeleteShape, shapes }) => {
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
      return;
    }

    const resize = () => resizeRendererToDisplaySize(renderer, camera, points);
    window.addEventListener('resize', resize, false);
    window.addEventListener('orientationchange', resize, false);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!isLoaded) {
      return undefined;
    }

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
      onDeleteShape,
      renderer,
      scene,
      shapes: transformedShapes,
    });

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [shapes, isLoaded, isLive, onDeleteShape]);

  return (
    <div className={`${styles.target} ${isLoaded ? styles.isLoaded : ''}`}>
      <canvas ref={canvasRef} />

      <canvas ref={textureCanvasRef} />
    </div>
  );
};

export default World;

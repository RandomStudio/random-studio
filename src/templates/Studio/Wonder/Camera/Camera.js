import React, { useEffect } from 'react';
import { ArcRotateCamera } from 'babylonjs';

const Camera = ({ canvasRef, layout, scene }) => {
  useEffect(() => {
    let camera;
    const canvas = canvasRef.current;

    const onClick = () => {
      camera.fov = (camera.fov === 0.8) ? 0.5 : 0.8;
      return true;
    };

    if (scene) {
      camera = new ArcRotateCamera('camera', 0, 0, 0, layout.target, scene, true);
      camera.setPosition(layout.position);
      camera.setTarget(layout.target);
      camera.attachControl(canvas, true);
      camera.inputs.clear();
      camera.minZ = 0;
      camera.fov = 0.8;
      canvas.addEventListener('pointerdown', onClick);
    }

    return () => {
      canvas.removeEventListener('pointerdown', onClick);
    };
  }, [scene]);
  return null;
};

export default Camera;

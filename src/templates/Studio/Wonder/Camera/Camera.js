import React, { useEffect } from 'react';
import { ArcRotateCamera } from 'babylonjs';

const Camera = ({ canvasRef, layout, onCreateCamera, scene }) => {
  useEffect(() => {
    if (!scene) {
      return undefined;
    }
    const canvas = canvasRef.current;

    const camera = new ArcRotateCamera(
      'camera',
      0,
      0,
      0,
      layout.target,
      scene,
      true
    );
    camera.setPosition(layout.position);
    camera.setTarget(layout.target);
    camera.attachControl(canvas, true);
    camera.inputs.clear();
    camera.minZ = 0;
    camera.fov = 1;
    onCreateCamera(camera);

    return () => {
      camera.dispose();
      onCreateCamera(null);
    };
  }, [canvasRef, layout, onCreateCamera, scene]);

  return null;
};

export default Camera;

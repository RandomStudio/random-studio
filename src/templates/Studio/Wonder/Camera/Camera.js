import React, { useEffect } from 'react';
import { ArcRotateCamera } from 'babylonjs';

const Camera = ({ canvasRef, layout, scene }) => {
  useEffect(() => {
    if (scene) {
      const camera = new ArcRotateCamera('camera', 0, 0, 0, layout.target, scene, true);
      camera.setPosition(layout.position);
      camera.setTarget(layout.target);
      camera.attachControl(canvasRef.current, true);
      camera.minZ = 0;
    }
  }, [scene]);
  return null;
};

export default Camera;

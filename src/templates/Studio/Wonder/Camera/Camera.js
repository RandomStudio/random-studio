import React, { useEffect } from 'react';
import { ArcRotateCamera, PointerEventTypes } from 'babylonjs';

const Camera = ({ canvasRef, layout, scene }) => {
  useEffect(() => {
    let camera;
    const onClick = (e)=> {
      camera.fov *= 0.8;
    }

    const onRelease = () => {
      camera.fov *= 1.25;
    }

    if (scene) {
      camera = new ArcRotateCamera('camera', 0, 0, 0, layout.target, scene, true);
      camera.setPosition(layout.position);
      camera.setTarget(layout.target);
      camera.attachControl(canvasRef.current, true);
      camera.inputs.clear();
      camera.minZ = 0;
      canvasRef.current.addEventListener('pointerup', onClick);
      canvasRef.current.addEventListener('pointerdown', onRelease);
    }

    return () => {
      canvasRef.current.removeEventListener('pointerup', onClick);
      canvasRef.current.removeEventListener('pointerdown', onRelease);
    }
  }, [scene]);
  return null;
};

export default Camera;

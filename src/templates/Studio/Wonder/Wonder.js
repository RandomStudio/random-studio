import './Wonder.scss';
import React, { useRef, useEffect, useState } from 'react';
import {
  UniversalCamera,
  Engine,
  PointLight,
  Scene,
  Vector3,
  SceneLoader,
  Color3,
  ArcRotateCamera,
} from 'babylonjs';
import 'babylonjs-loaders';


const Wonder = () => {
  const canvasRef = useRef();
  const rotationRef = useRef([0, 0]);
  const windowSizeRef = useRef([window.innerWidth, window.innerHeight]);

  const cameraRef = useRef();
  const [cameraPos, setCameraPos] = useState({
    x: -1,
    y: 5,
    radius: -6,
    tX: -2,
    tY: 2,
    tZ: 0,
  });
  const to = {
    x: -3.5,
    y: 5,
    radius: -5.5,
    tX: -0.15,
    tY: 2,
    tZ: 0,
  };
  const setCameraXPos = (value) => setCameraPos(c => ({...c, x: parseFloat(value)}))
  const setCameraYPos = (value) => setCameraPos(c => ({...c, y: parseFloat(value)}))
  const setCameraRPos = (value) => setCameraPos(c => ({...c, radius: parseFloat(value)}))
  const setCameraTXPos = (value) => setCameraPos(c => ({...c, tX: parseFloat(value)}))
  const setCameraTYPos = (value) => setCameraPos(c => ({...c, tY: parseFloat(value)}))
  const setCameraTZPos = (value) => setCameraPos(c => ({...c, tZ: parseFloat(value)}))

  useEffect(() => {
    if (canvasRef.current) {
      const engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });

      const scene = new Scene(engine);
      scene.createDefaultLight();

      let { x, y, radius, tX, tY, tZ } = cameraPos;
      const camera = new ArcRotateCamera('Camera', x, y, radius, new Vector3(tX, tY, tZ), scene, true);
      camera.attachControl(canvasRef.current, true);
      camera.minZ = 0;
      cameraRef.current = camera
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);
      SceneLoader.ShowLoadingScreen = false;
      SceneLoader.Append('/models/', 'test-island.obj', scene);

      const cameraMap = Object.values(cameraPos);
      const steps = Object.keys(cameraPos).map(x => (to[x] - cameraPos[x]) / 2000);
      let step = 0;
      let direction = 1;
      engine.runRenderLoop(() => {
        const newValue = i => cameraMap[i] + (steps[i] * step);
        cameraRef.current.setPosition(new Vector3(newValue(0), newValue(1), newValue(2)));
        cameraRef.current.setTarget(new Vector3(newValue(3), newValue(4), newValue(5)));
        step += direction;
        if (step > 2000 || step < -2000) {
          direction *= -1;
        }
        scene.render();
      });

      window.addEventListener('resize', () => {
        engine.resize();
        windowSizeRef.current = [window.innerWidth, window.innerHeight];
      });

      window.addEventListener('mousemove', e => {
        const [width, height] = windowSizeRef.current;
        const hDirection = e.clientX > width / 2 ? 1 : -1;
        const vDirection = e.clientY > height / 2 ? 1 : -1;
        rotationRef.current = [hDirection, vDirection];
      });
    }
  }, [canvasRef]);

  useEffect(() => {
    console.log(cameraPos, cameraRef.current)
    if (cameraRef.current) {
      console.log('set post')
      cameraRef.current.setPosition(new Vector3(cameraPos.x, cameraPos.y, cameraPos.radius));
      cameraRef.current.setTarget(new Vector3(cameraPos.tX, cameraPos.tY, cameraPos.tZ));
    }
  }, [cameraPos]);

  return (
    <>
      <canvas ref={canvasRef} className="canvas" />
      <div className="admin">
        <div>
          Rotate
          <input type="number" step="0.01" value={cameraPos.x} onChange={e => setCameraXPos(e.target.value)} />
          <input type="number" step="0.01" value={cameraPos.y} onChange={e => setCameraYPos(e.target.value)} />
          <input type="number" step="0.01" value={cameraPos.radius} onChange={e => setCameraRPos(e.target.value)} />
        </div>
        <div>
          Target
          <input type="number" step="0.01" value={cameraPos.tX} onChange={e => setCameraTXPos(e.target.value)} />
          <input type="number" step="0.01" value={cameraPos.tY} onChange={e => setCameraTYPos(e.target.value)} />
          <input type="number" step="0.01" value={cameraPos.tZ} onChange={e => setCameraTZPos(e.target.value)} />
        </div>
      </div>
    </>
  );
};

export default Wonder;

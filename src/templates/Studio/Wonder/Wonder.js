import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene, Color3 } from 'babylonjs';
import 'babylonjs-loaders';
import styles from './Wonder.module.scss';

// Scenes
import Couch from '../Wonder/scenes/Couch';
import Island from '../Wonder/scenes/Island';
import Lighting from './Lighting/Lighting';
import Camera from './Camera/Camera';
import World from './World/World';
import MouseAnimation from './MouseAnimation/MouseAnimation';
import Mirrors from './Mirrors/Mirrors';

const Wonder = () => {
  const canvasRef = useRef();
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [currentScene, setCurrentScene] = useState(null);
  const [world, setWorld] = useState(null);

  useEffect(() => {
    let engine;
    let scene;

    const createEngine = () => {
      engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
    };

    const createScene = () => {
      scene = new Scene(engine);
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);
      scene.debugLayer.show();
      return scene;
    };

    if (canvasRef.current) {
      createEngine();
      createScene();

      scene.executeWhenReady(() => {
        engine.runRenderLoop(() => {
          scene.render();
        });
        setCurrentScene(scene);
        setCanvasVisible(true);
      });

      window.addEventListener('resize', engine.resize);
    }

    return () => {
      window.removeEventListener('resize', engine.resize);
      engine.dispose();
    };
  }, [canvasRef]);

  return (
    <>
      <canvas ref={canvasRef} className={`${styles.canvas} ${canvasVisible && styles.isVisible}`} />
      <Camera canvasRef={canvasRef} layout={Couch.camera} scene={currentScene} />
      <Lighting layout={Couch.light} scene={currentScene} />
      <World filename={Couch.filename} layout={Couch.model} onImportWorld={setWorld} scene={currentScene} />
      <MouseAnimation target={world} />
      {Couch.mirrors && Couch.mirrors.length > 0 && <Mirrors layout={Couch.mirrors} scene={currentScene} world={world} />}
    </>
  );
};

export default Wonder;

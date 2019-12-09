import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene, Color3 } from 'babylonjs';
import styles from './Wonder.module.scss';

// Scenes
import Couch from './scenes/Couch';
// import Island from '../Wonder/scenes/Island';
import Lighting from './Lighting/Lighting';
import Camera from './Camera/Camera';
import World from './World/World';
import MouseAnimation from './MouseAnimation/MouseAnimation';
import Mirrors from './Mirrors/Mirrors';
import Shadows from './Shadows/Shadows';
import Sun from './Sun/Sun';

const Wonder = () => {
  const canvasRef = useRef();
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [currentScene, setCurrentScene] = useState(null);
  const [sun, setSun] = useState(null);
  const [world, setWorld] = useState(null);
  // const layout = useMemo(() => [Couch, Island][Math.round(Math.random())], []);
  const layout = Couch;

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
      setCurrentScene(null);
      setCanvasVisible(false);
      window.removeEventListener('resize', engine.resize);
      engine.dispose();
    };
  }, [canvasRef, layout]);

  return (
    <>
      <canvas draggable="true" ref={canvasRef} className={`${styles.canvas} ${canvasVisible && styles.isVisible}`} />
      {currentScene && !currentScene.isDisposed && (
        <>
          <Camera canvasRef={canvasRef} layout={layout.camera} scene={currentScene} />
          <Lighting layout={layout.light} scene={currentScene} />
          <World filename={layout.filename} layout={layout.model} onImportWorld={setWorld} scene={currentScene} />
          <Sun layout={layout.sun} onAddSun={setSun} scene={currentScene} world={world} />
          <Shadows scene={currentScene} sun={sun} world={world} />
          <MouseAnimation layout={layout.model} target={world} />
          <Mirrors layout={layout.mirrors} scene={currentScene} world={world} />
        </>
      )}
    </>
  );
};

export default Wonder;

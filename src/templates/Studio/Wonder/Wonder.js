import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene, Color3 } from 'babylonjs';
import styles from './Wonder.module.scss';

// Scenes
import Sculpture from './scenes/Sculpture';
import Lighting from './Lighting/Lighting';
import Camera from './Camera/Camera';
import World from './World/World';
import MouseAnimation from './MouseAnimation/MouseAnimation';
// import Sofa from './scenes/Sofa';
// import Mirrors from './Mirrors/Mirrors';
// import Shadows from './Shadows/Shadows';
// import Sun from './Sun/Sun';

const Wonder = () => {
  const canvasRef = useRef();
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [currentEngine, setCurrentEngine] = useState(null);
  const [currentScene, setCurrentScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [sun, setSun] = useState(null);
  const [world, setWorld] = useState(null);
  // const layout = useMemo(() => [Sofa, Island][Math.round(Math.random())], []);
  const layout = Sculpture;

  const getWidth = () => document.body.clientWidth;

  useEffect(() => {
    if (camera && currentScene && world) {
      // code for resizing the model according to screensize (looks better without resizing)
      // currentScene.getEngine().onResizeObservable.add(() => {
      //   if (
      //     currentScene.getEngine().getRenderHeight() >
      //     currentScene.getEngine().getRenderWidth()
      //   ) {
      //     camera.fovMode = Camera.FOVMODE_HORIZONTAL_FIXED;
      //   } else {
      //     camera.fovMode = Camera.FOVMODE_VERTICAL_FIXED;
      //   }
      // });
      setCanvasVisible(true);
      // }
    }

    return () => {
      setCanvasVisible(false);
    };
  }, [camera, currentEngine, currentScene, world]);

  useEffect(() => {
    let engine;
    let scene;

    const createEngine = () => {
      engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      setCurrentEngine(engine);
    };
    const createScene = () => {
      scene = new Scene(engine);
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);
      // Code Used for showing a babylon GUI for easier tweaking
      // scene.debugLayer.show();
    };

    const onResize = () => {
      canvasRef.current.width = getWidth();
      engine.resize();
    };

    if (canvasRef.current) {
      createEngine();
      createScene();

      scene.executeWhenReady(() => {
        setCurrentScene(scene);
      });

      window.addEventListener('resize', onResize);
    }

    return () => {
      setCurrentScene(null);
      window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  }, [canvasRef, layout]);

  useEffect(() => {
    if (camera && currentEngine && currentScene) {
      currentEngine.runRenderLoop(() => {
        currentScene.render();
      });
    }
  }, [camera, currentEngine, currentScene]);
  return (
    <>
      <canvas
        draggable="true"
        ref={canvasRef}
        className={`${styles.canvas} ${canvasVisible && styles.isVisible}`}
      />
      {currentScene && !currentScene.isDisposed && (
        <>
          <Camera
            canvasRef={canvasRef}
            layout={layout.camera}
            onCreateCamera={setCamera}
            scene={currentScene}
          />
          <Lighting hdr={layout.hdr} scene={currentScene} />
          <World
            filename={layout.filename}
            layout={layout.model}
            onImportWorld={setWorld}
            scene={currentScene}
          />
          <MouseAnimation layout={layout.model} target={world} />
          {/* <Sun
            layout={layout.sun}
            onAddSun={setSun}
            scene={currentScene}
            world={world}
          /> */}
          {/* <Shadows scene={currentScene} sun={sun} world={world} /> */}
          {/* <Mirrors layout={layout.mirrors} scene={currentScene} world={world} /> */}
        </>
      )}
    </>
  );
};

export default Wonder;

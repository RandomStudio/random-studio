import React, { useRef, useEffect, useState } from 'react';
import { Engine, Scene, Color3, CubeTexture } from 'babylonjs';
import styles from './Wonder.module.scss';

// Scenes
import Sculpture from './scenes/Sculpture';
import Sofa from './scenes/Sofa';
// import Island from '../Wonder/scenes/Island';
import Lighting from './Lighting/Lighting';
import Camera from './Camera/Camera';
import World from './World/World';
import MouseAnimation from './MouseAnimation/MouseAnimation';
import Mirrors from './Mirrors/Mirrors';
import Shadows from './Shadows/Shadows';
import Sun from './Sun/Sun';

const Wonder = ({ introRef }) => {
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
      // In the future remove this hard coded model name
      const model = currentScene.meshes.find(
        mesh => mesh.id === 'node0_primitive1'
      );
      // if (model) {
      // const radius = model.getBoundingInfo().boundingSphere.radiusWorld;
      // const aspectRatio = currentEngine.getAspectRatio(camera);
      // const halfMinFov =
      //   aspectRatio < 1
      //     ? Math.atan(aspectRatio * Math.tan(camera.fov / 2))
      //     : camera.fov / 2;
      // const viewRadius = Math.abs(radius / Math.sin(halfMinFov));
      // camera.radius = viewRadius;
      setCanvasVisible(true);
      // }
    }

    return () => {
      setCanvasVisible(false);
    };
  }, [camera, currentEngine, currentScene, world]);
  const handleResize = () => {
    console.log('ran resize');
    currentEngine.resize;
  };
  useEffect(() => {
    let engine;
    let scene;

    const createEngine = () => {
      engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      // console.log('engine:', engine.getRenderingCanvasClientRect);
      setCurrentEngine(engine);
    };
    const createScene = () => {
      scene = new Scene(engine);
      const hdrTexture = new CubeTexture.CreateFromPrefilteredData(
        'hdr/environment.dds',
        scene
      );
      hdrTexture.gammaSpace = false;
      scene.environmentTexture = hdrTexture;
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);

      // scene.debugLayer.show();
    };

    const onResize = () => {
      canvasRef.current.width = getWidth();
      console.log('called');
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
      window.removeEventListener('resize', engine.resize);
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
          <Lighting scene={currentScene} />
          <World
            filename={layout.filename}
            layout={layout.model}
            onImportWorld={setWorld}
            scene={currentScene}
          />
          {/* <Sun
            layout={layout.sun}
            onAddSun={setSun}
            scene={currentScene}
            world={world}
          /> */}
          {/* <Shadows scene={currentScene} sun={sun} world={world} /> */}
          <MouseAnimation layout={layout.model} target={world} />
          {/* <Mirrors layout={layout.mirrors} scene={currentScene} world={world} /> */}
        </>
      )}
    </>
  );
};

export default Wonder;

import React, { useRef, useEffect, useState } from 'react';
import {
  Animation,
  DirectionalLight,
  HemisphericLight,
  StandardMaterial,
  MirrorTexture,
  Engine,
  MeshBuilder,
  Mesh,
  Scene,
  Vector3,
  SceneLoader,
  Color3,
  ArcRotateCamera,
  Plane,
  ShadowGenerator,
} from 'babylonjs';
import 'babylonjs-loaders';
import styles from './Wonder.module.scss';

// Scenes
import Couch from './scenes/Couch';
import Island from './scenes/Island';
import Admin from './Admin/Admin';

const Wonder = () => {
  const mirrorRef = useRef();
  const canvasRef = useRef();
  const [canvasVisible, setCanvasVisible] = useState(false);
  const [manualValues, setManualValues] = useState([0, 0, 0, 0, 0, 0]);
  const [cameraRotationVectors, cameraTargetVectors, filename, modelVectors, mirrors] = [Island, Couch][Math.round(Math.random())];

  useEffect(() => {
    let engine;

    const createEngine = () => {
      engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      // engine.doNotHandleContextLost = true;
    };

    const createScene = () => {
      const scene = new Scene(engine);
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);
      // scene.clearColor = new Color3(0.4, 0.972549, 0.972549);
      return scene;
    };

    const addCamera = scene => {
      const camera = new ArcRotateCamera('camera', 0, 0, 0, cameraTargetVectors[0].value, scene, true);
      camera.setPosition(cameraRotationVectors[0].value);
      camera.setTarget(cameraTargetVectors[0].value);
      camera.attachControl(canvasRef.current, true);
      camera.minZ = 0;
      return camera;
    };

    const addLighting = scene => {
      const light = new DirectionalLight("dir01", new Vector3(-1, -2, -1), scene);
      light.position = new Vector3(20, 40, 20);
      light.intensity = 0.5;
      //const generalLight = new HemisphericLight('hemi', new Vector3(0, 10, -5), scene);
      //generalLight.specular = new Color3(0, 0, 0);
      //generalLight.specularPower = 0;
      //generalLight.intensity = 0.5;
      return light;
    };

    const addShadows = (light, model) => {
      const shadows = new ShadowGenerator(1024, light);
      shadows.addShadowCaster(model);
      shadows.useExponentialShadowMap = true;
      model.receiveShadows = true;
    };

    const addModel = async scene => {
      SceneLoader.ShowLoadingScreen = false;
      await SceneLoader.AppendAsync('/models/', filename, scene);
      // Cleanup unneeded meshes
      return scene.meshes.find(mesh => mesh.id === 'Default');
    };

    const addMirrors = (model, scene) => {
      mirrors.forEach(mirrorState => {
        const mirror = MeshBuilder.CreatePlane('glass', {
          width: mirrorState.width,
          height: mirrorState.height,
        }, scene);
        mirror.parent = model;
        mirror.position = mirrorState.position;
        mirror.rotation = mirrorState.rotation;
        mirror.computeWorldMatrix(true);
        mirrorRef.current = mirror;
        const mirrorWorldMatrix = mirror.getWorldMatrix();
        const mirrorVertexData = mirror.getVerticesData('normal');
        let mirrorNormal = new Vector3(mirrorVertexData[0], mirrorVertexData[1], mirrorVertexData[2]);
        mirrorNormal = new Vector3.TransformNormal(mirrorNormal, mirrorWorldMatrix);

        const reflector = new Plane.FromPositionAndNormal(mirror.position, mirrorNormal.scale(-1));
        const mirrorMaterial = new StandardMaterial('MirrorMat', scene);
        mirrorMaterial.diffuseColor = new Color3(0.1, 0.1, 0.1);
        mirrorMaterial.reflectionTexture = new MirrorTexture('mirror', 1024, scene, true);
        mirrorMaterial.reflectionTexture.mirrorPlane = reflector;
        mirrorMaterial.reflectionTexture.renderList = [model];
        mirror.material = mirrorMaterial;
      });
    };

    const setupRenderLoop = scene => {
      engine.runRenderLoop(() => {
        // We don't use physics etc so can safely clear this
        // scene.clearCachedVertexData();
        // scene.cleanCachedTextureBuffer();
        scene.render();
      });
    };

    const setupCameraAnimation = (scene, camera) => {
      const targetAnim = new Animation('targetAnim', 'target', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      const rotAnim = new Animation('rotationAnim', 'position', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      targetAnim.setKeys(cameraTargetVectors);
      rotAnim.setKeys(cameraRotationVectors);
      camera.animations.push(targetAnim);
      camera.animations.push(rotAnim);
      scene.beginAnimation(camera, 0, 2000, true);
    };

    const setupModelAnimation = (scene, model) => {
      const rotAnim = new Animation('rotationAnim', 'rotation', 15, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      rotAnim.setKeys(modelVectors);
      model.animations.push(rotAnim);
      scene.beginAnimation(model, 0, 3000, true);
    };

    const onResize = () => engine.resize();

    const createGLScene = async () => {
      createEngine();
      const scene = createScene();
      const camera = addCamera(scene);
      const light = addLighting(scene);
      const lightSphere = Mesh.CreateSphere("sphere", 10, 2, scene);
      lightSphere.position = light.position;
      lightSphere.material = new StandardMaterial("light", scene);
      lightSphere.material.emissiveColor = new Color3(1, 1, 0);
      scene.meshes = [await addModel(scene), lightSphere];
      const model = scene.meshes[0];
      addMirrors(model, scene);
      addShadows(light, model);

      scene.executeWhenReady(() => {
        setupRenderLoop(scene, camera);
        // setupCameraAnimation(scene, camera);
        setupModelAnimation(scene, model);
        setCanvasVisible(true);
      });

      window.addEventListener('resize', onResize);
    };

    if (canvasRef.current) {
      createGLScene();
    }

    return () => {
      window.removeEventListener('resize', onResize);
      engine.dispose();
    };
  }, [canvasRef]);

  return (
    <>
      <canvas ref={canvasRef} className={`${styles.canvas} ${canvasVisible && styles.isVisible}`} />
      <Admin values={manualValues} setValues={setManualValues} />
    </>
  );
};

export default Wonder;

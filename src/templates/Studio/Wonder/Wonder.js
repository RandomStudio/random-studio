import './Wonder.scss';
import React, { useRef, useEffect } from 'react';
import {
  Animation,
  HemisphericLight,
  StandardMaterial,
  MirrorTexture,
  Engine,
  MeshBuilder,
  Scene,
  Vector3,
  SceneLoader,
  Color3,
  ArcRotateCamera,
  Plane,
} from 'babylonjs';
import 'babylonjs-loaders';


const Wonder = () => {
  const canvasRef = useRef();

  const cameraRotationVectors = [
    {
      frame: 0,
      value: new Vector3(-1, 5, -5),
    },
    {
      frame: 1000,
      value: new Vector3(-3.5, 5, -5.5),
    },
    {
      frame: 2000,
      value: new Vector3(-1, 5, -6),
    },
  ];

  const cameraTargetVectors = [
    {
      frame: 0,
      value: new Vector3(-2, 2, 0),
    },
    {
      frame: 1000,
      value: new Vector3(-0.15, 2, 0),
    },
    {
      frame: 2000,
      value: new Vector3(-2, 2, 0),
    },
  ];

  const mirrors = [
    {
      width: 1.4,
      height: 2.3,
      position: new Vector3(-0.92, 1.58, 3.65),
      rotation: new Vector3(0, -0.31, 0),
    },
    {
      width: 0.45,
      height: 2.3,
      position: new Vector3(-1.654, 1.58, 3.65),
      rotation: new Vector3(0, 89.23, 0),
    },
  ];

  useEffect(() => {
    let engine;

    const createEngine = () => {
      engine = new Engine(canvasRef.current, true, {
        preserveDrawingBuffer: true,
        stencil: true,
      });
      engine.doNotHandleContextLost = true;
    };

    const createScene = () => {
      const scene = new Scene(engine);
      scene.clearColor = new Color3(0.972549, 0.972549, 0.972549);
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
      const light = new HemisphericLight('hemi', new Vector3(0, 10, -5), scene);
      light.specular = new Color3(0, 0, 0);
      light.specularPower = 0;
      light.intensity = 2;
      return light;
    };

    const addModel = async scene => {
      SceneLoader.ShowLoadingScreen = false;
      await SceneLoader.AppendAsync('/models/', 'test-island.obj', scene);
    };

    const addMirrors = scene => {
      mirrors.forEach(mirrorState => {
        const mirror = MeshBuilder.CreatePlane('glass', {
          width: mirrorState.width,
          height: mirrorState.height,
        }, scene);
        mirror.position = mirrorState.position;
        mirror.rotation = mirrorState.rotation;
        mirror.computeWorldMatrix(true);
        const mirrorWorldMatrix = mirror.getWorldMatrix();
        const mirrorVertexData = mirror.getVerticesData('normal');
        let mirrorNormal = new Vector3(mirrorVertexData[0], mirrorVertexData[1], mirrorVertexData[2]);
        mirrorNormal = new Vector3.TransformNormal(mirrorNormal, mirrorWorldMatrix);

        const reflector = new Plane.FromPositionAndNormal(mirror.position, mirrorNormal.scale(-1));
        const mirrorMaterial = new StandardMaterial('MirrorMat', scene);
        mirrorMaterial.diffuseColor = new Color3(0.1, 0.1, 0.1);
        mirrorMaterial.reflectionTexture = new MirrorTexture('mirror', 1024, scene, true);
        mirrorMaterial.reflectionTexture.mirrorPlane = reflector;
        mirrorMaterial.reflectionTexture.renderList = [scene.meshes.find(mesh => mesh.id === 'Default')];
        mirror.material = mirrorMaterial;
      });
    };

    const setupRenderLoop = scene => {
      engine.runRenderLoop(() => {
        // We don't use physics etc so can safely clear this
        scene.clearCachedVertexData();
        scene.cleanCachedTextureBuffer();
        scene.render();
      });
    };

    const setupCameraAnimation = (scene, camera) => {
      const targetAnim = new Animation('targetAnim', 'target', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      const rotAnim = new Animation('rotationAnim', 'rotation', 60, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CYCLE);
      targetAnim.setKeys(cameraTargetVectors);
      rotAnim.setKeys(cameraRotationVectors);
      camera.animations.push(rotAnim);
      camera.animations.push(targetAnim);
      scene.beginAnimation(camera, 0, 2000, true);
    };

    const onResize = () => engine.resize();

    const createGLScene = async () => {
      createEngine();
      const scene = createScene();
      const camera = addCamera(scene);
      const light = addLighting(scene);
      await addModel(scene);
      addMirrors(scene);
      setupRenderLoop(scene, camera);
      setupCameraAnimation(scene, camera);

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

  return <canvas ref={canvasRef} className="canvas" />;
};

export default Wonder;

import { Group, Mesh, MeshStandardMaterial } from 'three';
import { GLTF } from 'three-stdlib';
import React, { ForwardedRef, forwardRef, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
  nodes: {
    plan1: Mesh;
    plant3: Mesh;
    plant2: Mesh;
    plant4: Mesh;
  };
  materials: {
    main: MeshStandardMaterial;
    ['main.001']: MeshStandardMaterial;
    ['main.002']: MeshStandardMaterial;
    ['main.003']: MeshStandardMaterial;
  };
};

type PlantsProps = JSX.IntrinsicElements['group'] & {
  opacity: number;
  plant: 0 | 1 | 2 | 3;
};

const Plants = forwardRef(
  ({ opacity, plant, ...props }: PlantsProps, ref: ForwardedRef<Group>) => {
    const { nodes, materials } = useGLTF(
      '/models/Plants/plants.gltf',
    ) as GLTFResult;

    const geometry = useMemo(() => {
      if (plant === 0) {
        return nodes.plant2.geometry;
      }

      if (plant === 1) {
        return nodes.plant4.geometry;
      }

      if (plant === 2) {
        return nodes.plan1.geometry;
      }

      return nodes.plant3.geometry;
    }, [
      nodes.plan1.geometry,
      nodes.plant2.geometry,
      nodes.plant3.geometry,
      nodes.plant4.geometry,
      plant,
    ]);

    const material = useMemo(() => {
      if (plant === 0) {
        return materials['main.002'];
      }

      if (plant === 1) {
        return materials['main.003'];
      }

      if (plant === 2) {
        return materials.main;
      }

      return materials['main.001'];
    }, [materials, plant]);

    const modifiedMaterial = useMemo(() => {
      const newMaterial = material.clone();
      newMaterial.opacity = opacity;
      newMaterial.transparent = newMaterial.opacity < 1;

      return newMaterial;
    }, [material, opacity]);

    return (
      <group {...props} dispose={null} ref={ref} scale={1.8}>
        <mesh
          geometry={geometry}
          material={modifiedMaterial}
          rotation={[Math.PI / 2, 0, 0]}
        />
      </group>
    );
  },
);

Plants.displayName = 'Plants';

useGLTF.preload('/models/Plants/plants.gltf');
export default Plants;

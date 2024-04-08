import { Mesh, MeshBasicMaterial, MeshStandardMaterial } from 'three';
import React, { useMemo } from 'react';
import { GLTF } from 'three-stdlib';
import { useGLTF } from '@react-three/drei';

type GLTFResult = GLTF & {
  nodes: {
    PlantBanjoFig001001: Mesh;
  };
  materials: {
    PlantBanjoFig001_4K: MeshStandardMaterial;
  };
};

type PlantProps = JSX.IntrinsicElements['group'] & {
  isWireFrame?: boolean;
};

const Plant = ({ isWireFrame, ...props }: PlantProps) => {
  const { nodes, materials } = useGLTF(
    '/models/Plant/plant.gltf',
  ) as GLTFResult;

  const plantMaterial = useMemo(() => {
    if (!isWireFrame) {
      const material = materials.PlantBanjoFig001_4K.clone();
      material.roughness = 0;
      material.metalness = 0;

      return material;
    }

    return new MeshBasicMaterial({
      color: 'green',
      wireframe: true,
    });
  }, [isWireFrame, materials.PlantBanjoFig001_4K]);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.PlantBanjoFig001001.geometry}
        material={plantMaterial}
        position={[-0.059, -1.267, 0.024]}
      />
    </group>
  );
};

useGLTF.preload('/models/Plant/plant.gltf');
export default Plant;

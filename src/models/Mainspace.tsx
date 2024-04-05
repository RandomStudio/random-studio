import { GLTF } from 'three-stdlib';
import React from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshStandardMaterial } from 'three';
import Camera from '../components/Wonder2/InnerWorld/Camera/Camera';

type GLTFResult = GLTF & {
  nodes: {
    Cube032: Mesh;
    ['Metal_H-Beam001']: Mesh;
    Desk_Studio007: Mesh;
    HMI_Aeron_Chair_B_Size_Fully_Adjustable_Arms029: Mesh;
    Runway_Wood005: Mesh;
    Plant_pots: Mesh;
    ID549002: Mesh;
    ID549002_1: Mesh;
    GILLIS250: Mesh;
  };
  materials: {
    ['default']: MeshStandardMaterial;
    Gray: MeshStandardMaterial;
    ['MDF Gray']: MeshStandardMaterial;
    SEAT_FABRIC: MeshStandardMaterial;
    ['Wood Fine Veneer Oak']: MeshStandardMaterial;
    ['Plaster Lime']: MeshStandardMaterial;
    ['Aluminium Brushed']: MeshStandardMaterial;
    ['Cork Surface']: MeshStandardMaterial;
  };
};

const Mainspace = ({
  isExpanded,
  ...props
}: JSX.IntrinsicElements['group'] & { isExpanded: boolean }) => {
  const { nodes, materials } = useGLTF(
    '/models/Mainspace/mainspace.gltf',
  ) as GLTFResult;

  materials['Cork Surface'].roughness = 0;
  materials['Cork Surface'].metalness = 0;

  useFrame(() => {
    if (!materials['Wood Fine Veneer Oak'].map) {
      return;
    }

    materials['Wood Fine Veneer Oak'].map.offset.x += 0.001;
  });

  return (
    <group {...props} dispose={null}>
      <Camera isExpanded={isExpanded} />

      <mesh
        geometry={nodes.Cube032.geometry}
        material={materials.default}
        position={[1.648, -1.746, 3.553]}
      />

      <mesh
        geometry={nodes['Metal_H-Beam001'].geometry}
        material={materials.Gray}
        position={[2.499, 0.085, 2]}
      />

      <mesh
        geometry={nodes.Desk_Studio007.geometry}
        material={materials['MDF Gray']}
        position={[4.07, -1.419, -0.558]}
        rotation={[0, 1.571, 0]}
      />

      <mesh
        geometry={
          nodes.HMI_Aeron_Chair_B_Size_Fully_Adjustable_Arms029.geometry
        }
        material={materials.SEAT_FABRIC}
        position={[3.797, -1.676, 0.263]}
        rotation={[Math.PI / 2, 0, -1.082]}
        scale={0.025}
      />

      <mesh
        geometry={nodes.Runway_Wood005.geometry}
        material={materials['Wood Fine Veneer Oak']}
        position={[-0.424, -1.972, -5.057]}
        rotation={[0, -0.262, 0]}
      />

      <mesh
        geometry={nodes.Plant_pots.geometry}
        material={materials['Plaster Lime']}
        position={[0.068, -1.588, 0.45]}
      />

      <group position={[-0.051, -1.131, 5.531]}>
        <mesh
          geometry={nodes.ID549002.geometry}
          material={materials['Cork Surface']}
        />

        <mesh
          geometry={nodes.ID549002_1.geometry}
          material={materials['Aluminium Brushed']}
        />
      </group>

      <instancedMesh
        args={[nodes.GILLIS250.geometry, materials['Wood Fine Veneer Oak'], 5]}
        instanceMatrix={nodes.GILLIS250.instanceMatrix}
      />
    </group>
  );
};

useGLTF.preload('/models/Mainspace/mainspace.gltf');
export default Mainspace;

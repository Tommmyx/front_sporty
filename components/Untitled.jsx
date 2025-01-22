import React from 'react';
import { useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { SkeletonUtils } from 'three-stdlib';
import { TextureLoader } from 'three';

export function Model(props) {
  const group = React.useRef();
  const { scene, animations } = useGLTF(require('../assets/3D/animation.glb'));
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  // Charger la texture
  const texture = React.useMemo(
    () => new TextureLoader().load(require('../assets/3D/Image_0.jpg')),
    []
  );

  // Appliquer la texture au matériau
  React.useEffect(() => {
    if (materials.Material_0) {
      materials.Material_0.map = texture;
      materials.Material_0.needsUpdate = true; // Nécessaire pour rafraîchir le rendu
    }
  }, [materials, texture]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh
            name="Mesh_0"
            geometry={nodes.Mesh_0.geometry}
            material={materials.Material_0}
            skeleton={nodes.Mesh_0.skeleton}
          />
        </group>
      </group>
    </group>
  );
}

// Préchargement du modèle
useGLTF.preload(require('../assets/3D/animation.glb'));

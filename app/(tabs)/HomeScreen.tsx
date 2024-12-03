import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import Profile from './Profile';

const AnimatedMesh = () => {
  const meshRef = useRef();
  const { scene, animations } = useGLTF('../../assets/3D/avatar.glb'); 
  const { actions } = useAnimations(animations, scene); 

  useEffect(() => {
    if (actions && actions['curl']) {
      actions['curl'].reset().fadeIn(0.5).play();
    }
    return () => {
      if (actions && actions['curl']) {
        actions['curl'].fadeOut(0.5);
      }
    };
  }, [actions]);

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <primitive object={scene} />
    </mesh>
  );
};

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f3f3' }}>
      <Profile navigation={navigation} />
      <Canvas style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={60} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <AnimatedMesh />
        <OrbitControls />
      </Canvas>
    </View>
  );
}

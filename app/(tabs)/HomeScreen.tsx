import React, { useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF } from '@react-three/drei';
import Profile from './Profile';

export default function HomeScreen({ navigation }) {
  const { scene } = useGLTF('../../assets/3D/Totoro.glb'); // Remplace par l'URL ou le chemin local du modèle
  const meshRef = useRef();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Profile navigation={navigation} />
      <Canvas style={{ width: '100%', height: '100%', zIndex: -1}}>
      <PerspectiveCamera makeDefault position={[0, 0, 50]} fov={60} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        
        {/* Chargement du modèle 3D */}
        <mesh position={[0, 0, 0]}>
          <primitive object={scene} />
        </mesh>

        <OrbitControls />
      </Canvas>
    </View>
  );
}

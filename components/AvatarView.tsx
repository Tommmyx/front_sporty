import React, { useState, Suspense } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Canvas } from "@react-three/fiber";
import Multi from "./Multi.jsx"
import { OrbitControls } from "@react-three/drei";
export default function AvatarView({ animation }) {
    return (
        <Canvas camera={{ position: [0, 1, 13], fov: 50 }}>
            <OrbitControls />
            <ambientLight intensity={0.6} />
            <directionalLight intensity={0.5} />
            <Suspense fallback={null}>
                <Multi animation={animation} position={[0, -2, 0]} />
            </Suspense>
            
        </Canvas>
      );
}
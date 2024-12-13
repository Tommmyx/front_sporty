import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet  } from 'react-native';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, OrbitControls, useGLTF, useAnimations } from '@react-three/drei';
import Profile from './Profile';
import BackgroundHomeScreen from '../../components/BackgroundHomeScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';

const AnimatedMesh = () => {
  const meshRef = useRef();
  const modelPath = require('../../assets/3D/testsporty.glb');
  const { scene, animations } = useGLTF(modelPath); 
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
  const handleButtonPress = () => {
    console.log('Bouton de cintre pressé');
  };
  const openBattlePass = () => {

  };

  return (
    <View style={{ flex: 1 }}>
      <Profile navigation={navigation} />
      <BackgroundHomeScreen />
      <Canvas style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 100]} fov={80} />
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <AnimatedMesh />
        <OrbitControls />
      </Canvas>
      <TouchableOpacity
        style={styles.hangerButton}
        onPress={handleButtonPress}
      >
        <FontAwesomeIcon icon={faShirt} /> 
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.battlePass}
        onPress={openBattlePass}
      >
        <Text>Battle Pass</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  hangerButton: {
    position: 'absolute',
    left: '35%', // Ajuste la position horizontale
    top: '60%', // Centre verticalement
    transform: [{ translateY: -15 }], // Centrage de l'icône (moitié de la taille)
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 10,
    elevation: 5, // Ombre pour Android
    shadowColor: '#000', // Ombre pour iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  battlePass: {
    position: 'absolute',
    right: '20%', 
    bottom: '15%', 
    transform: [{ translateY: -15 }], 
    backgroundColor: 'white',
    padding: 10,
    elevation: 5, 
    

  },
});

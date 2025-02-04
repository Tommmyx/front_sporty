import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';

const BackgroundHomeScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/images/fond.png')} // Remplacez par l'URL de votre GIF
      style={styles.background}
      resizeMode="cover"
    >
      {/* Ajoutez ici des enfants si nécessaire */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
});

export default BackgroundHomeScreen;

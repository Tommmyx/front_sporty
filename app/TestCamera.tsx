import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { Camera } from '@scottjgilroy/react-native-vision-camera-v4-pose-detection';

// Fonction pour calculer un angle entre trois points
const calculateAngle = (p1, p2, p3) => {
  const a = [p1.x, p1.y];
  const b = [p2.x, p2.y];
  const c = [p3.x, p3.y];

  const ba = [a[0] - b[0], a[1] - b[1]];
  const bc = [c[0] - b[0], c[1] - b[1]];

  const cosineAngle = 
    (ba[0] * bc[0] + ba[1] * bc[1]) / 
    (Math.sqrt(ba[0] ** 2 + ba[1] ** 2) * Math.sqrt(bc[0] ** 2 + bc[1] ** 2));
  return Math.acos(cosineAngle) * (180 / Math.PI);
};

// Fonction pour calculer la distance entre deux points
const calculateDistance = (p1, p2) => Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);


const CameraScreen = () => {
  const device = useCameraDevice('front');
  const { hasPermission } = useCameraPermission();
  const [pose, setPose] = useState(null);
  const [curlCount, setCurlCount] = useState(0);
  const [squatCount, setSquatCount] = useState(0);
  const [moveStateCurl, setMoveStateCurl] = useState(-1); // -1: Init, 0: Down, 1: Up
  const [moveStateSquat, setMoveStateSquat] = useState(-1); // -1: Down, 1: Up
  const [initialHeight, setInitialHeight] = useState(0);

  const checkCurlBiceps = (pose) => {
    if (!pose) return;

    const { rightWristPosition, rightElbowPosition, rightShoulderPosition, leftWristPosition, leftElbowPosition, leftShoulderPosition } = pose;

    if (!rightWristPosition || !rightElbowPosition || !rightShoulderPosition || !leftWristPosition || !leftElbowPosition || !leftShoulderPosition) return;

    const angleRight = calculateAngle(rightWristPosition, rightElbowPosition, rightShoulderPosition);
    const angleLeft = calculateAngle(leftWristPosition, leftElbowPosition, leftShoulderPosition);

    if (moveStateCurl === -1 && angleRight > 150 && angleLeft > 150) {
      setMoveStateCurl(0);
      return;
    }

    if (moveStateCurl === 0 && angleRight < 30 && angleLeft < 30) {
      setMoveStateCurl(1);
      return;
    }

    if (moveStateCurl === 1 && angleRight > 150 && angleLeft > 150) {
      setCurlCount((prev) => prev + 1);
      setMoveStateCurl(0);
    }
  };

  const checkSquat = (pose) => {
    if (!pose) return;

    const { rightHipPosition, rightKneePosition, rightAnklePosition } = pose;

    if (!rightHipPosition || !rightKneePosition || !rightAnklePosition) return;

    const height = calculateDistance(rightHipPosition, rightKneePosition) + calculateDistance(rightKneePosition, rightAnklePosition);

    if (initialHeight === 0) {
      setInitialHeight(height);
      return;
    }

    const heightPercentage = (height / initialHeight) * 100;

    if (moveStateSquat === -1 && heightPercentage < 65) {
      setMoveStateSquat(1);
      return;
    }

    if (moveStateSquat === 1 && heightPercentage > 95) {
      setSquatCount((prev) => prev + 1);
      setMoveStateSquat(-1);
    }
  };

  useEffect(() => {
    if (pose) {
      checkCurlBiceps(pose);
      checkSquat(pose);
    }
  }, [pose]);

  if (!hasPermission) return <View />;
  if (!device) return <View />;

  return (
    <View style={styles.container}>
      <Camera
        options={{
          mode: "stream",
          performanceMode: "max",
        }}
        style={StyleSheet.absoluteFill}
        device={device}
        callback={(data) => setPose(data)}
        isActive
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Curls Detected: {curlCount}</Text>
        <Text style={styles.text}>Squats Detected: {squatCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default CameraScreen;

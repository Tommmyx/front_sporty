import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
import { Camera } from '@scottjgilroy/react-native-vision-camera-v4-pose-detection';
import AvatarView from "@/components/AvatarView";
import socket from '@/utils/socket';

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

const CameraScreen = ( {username} ) => {
  const device = useCameraDevice('front');
  const { hasPermission } = useCameraPermission();
  const [pose, setPose] = useState(null);
  const [curlCount, setCurlCount] = useState(0);
  const [frameCount, setFrameCount] = useState(0);
  const [moveStateCurl, setMoveStateCurl] = useState(-1); // -1: Init, 0: Down, 1: Up
  const lastProcessedTime = useRef(0);

  const [selectedEmote, setSelectedEmote] = useState("idle2");
  
  const emitAnimation = (animationName) => {
    setSelectedEmote("");
    setTimeout(() => setSelectedEmote(animationName), 50);
    console.log("emit anim")
    socket.emit('animation/' + animationName, {username});
  };

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
      if (frameCount >= 15) {
        setCurlCount((prev) => prev + 1);
        setFrameCount(0); // Réinitialisation du compteur de frames
        emitAnimation("squatt");
        setMoveStateCurl(0);
      } else {
        setMoveStateCurl(-1);
        setFrameCount(0);
      }
    }
  };

  useEffect(() => {
    const now = Date.now();
    if (pose && now - lastProcessedTime.current > 100) {  // 100ms interval
      lastProcessedTime.current = now;
      setFrameCount(prev => prev + 1);
      checkCurlBiceps(pose);
    }
  }, [pose]);

  if (!hasPermission) return <View />;
  if (!device) return <View />;

  return (
    <View style={styles.container}>
      <AvatarView animation={selectedEmote} />
      
      <Camera
        options={{
          mode: "stream",
          performanceMode: "max",
        }}
        
        device={device}
        callback={(data) => setPose(data)}
        isActive
      />
      
      <View style={styles.overlay}>
        <Text style={styles.text}>Curls Detected: {curlCount}</Text>
        <Text style={styles.text}>Frames Processed: {frameCount}</Text>
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
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const intervalRef = useRef(null);
  const isFocused = useIsFocused();
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    if (permission && permission.granted && isFocused) {
      intervalRef.current = setInterval(() => {
        captureFrame();
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [permission, isFocused]);

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };
  const handleCameraReady = () => {
    setIsCameraReady(true);
  };

  const captureFrame = async () => {
    if (cameraRef.current && isCameraReady) {
      const photo = await cameraRef.current.takePictureAsync();
      const frame = photo.uri;
      console.log("Frame captured:", frame);
      await sendFrameToBackend(frame);
    } else {
      console.log("Camera ref is null");
    }
  };

  const base64ToBlob = (base64Data, contentType) => {
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  };

  const sendFrameToBackend = async (frameUri) => {
    const blob = base64ToBlob(frameUri, 'image/png');
    const formData = new FormData();
    const uniqueName = `frame_${Date.now()}.png`;
    formData.append('frame', blob, uniqueName);
    console.log("FormData entries:", [...formData]);
    formData.append('frame', {
      uri: frameUri,
      name: uniqueName,
      type: 'image/jpeg',
    });
    try {
      await fetch('http://127.0.0.1:5000/frame-analysis', {
        method: 'POST',
        body: formData,
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (!permission) {
    return <View />; 
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef} onCameraReady={handleCameraReady}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={captureFrame}>
              <Text style={styles.text}>Capture Frame</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

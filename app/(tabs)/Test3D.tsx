import { Canvas } from "@react-three/fiber/native";
import { StatusBar } from "expo-status-bar";
import { Suspense } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useLoader } from "@react-three/fiber/native";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


import { OrbitControls, GridHelper, AxesHelper, Gltf } from "@react-three/drei";
import { Avatar } from "../../components/Avatar";

import usePromise from "react-promise-suspense";
import { Asset } from "expo-asset";

const getUrl = async () => {
  const asset = Asset.fromModule(require("../../assets/3D/Truc.glb"));
  await asset.downloadAsync();

  return asset.localUri;
};

export default function Test3D() {
  const url = usePromise(getUrl, []);
  const { nodes } = useLoader(GLTFLoader, url);
  console.log(url);
  return (
    <View style={styles.container}>
      <Canvas camera={{ position: [-2, 2.5, 5], fov: 30 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />

          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
          <Suspense>
          <group><Gltf src={url} /></group>
          </Suspense>
          
          
   
        <OrbitControls />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />
      </Canvas>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

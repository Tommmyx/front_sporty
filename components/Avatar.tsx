import { ContactShadows } from "@react-three/drei";
import { useGLTF } from "@react-three/drei/native";

import { Asset } from "expo-asset";

const TrucAsset = Asset.fromModule(require("../assets/3D/Fries_Slice_Fries_0.glb")).uri;

export const Avatar = () => {
  const { scene } = useGLTF(TrucAsset);

  console.log("GLTF Scene:", scene);

  return (
    <group>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </group>
  );
};

useGLTF.preload(TrucAsset);

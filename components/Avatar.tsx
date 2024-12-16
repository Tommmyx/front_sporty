import { Gltf } from "@react-three/drei/native";
import AvatarModel from '../assets/3D/newAvatar.glb';

export const Avatar = () => {
    return (
        <Gltf src={AvatarModel} />
    );
};
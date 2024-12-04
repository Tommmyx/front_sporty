import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // Pour gérer les images
import { useNavigation } from '@react-navigation/native'; // Pour naviguer
import Icon from 'react-native-vector-icons/MaterialIcons'; // Icône

export default function ProfileScreen() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState('Noura'); // Remplace par le pseudo utilisateur
  const navigation = useNavigation();

  // Fonction pour sélectionner une image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission requise pour accéder à votre galerie !");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      {/* Image de profil */}
      <View style={styles.imageContainer}>
        <Image
          source={profileImage ? { uri: profileImage } : require('../../assets/images/default-avatar.png')}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
          <Text style={styles.editText}>✏️</Text>
        </TouchableOpacity>
      </View>

      {/* Pseudo de l'utilisateur */}
      <Text style={styles.username}>{username}</Text>

      {/* Icône pour accéder aux statistiques */}
      <TouchableOpacity
        style={styles.statsIconContainer}
        onPress={() => navigation.navigate('Statistics')} // Redirige vers la page des statistiques
      >
        <Icon name="bar-chart" size={40} color="#7B5BF2" />
        <Text style={styles.statsText}>Statistiques</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EDF2FA',
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#7B5BF2',
  },
  editIcon: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    backgroundColor: '#7B5BF2',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EDF2FA',
  },
  editText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginVertical: 10,
  },
  statsIconContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  statsText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7B5BF2',
  },
});

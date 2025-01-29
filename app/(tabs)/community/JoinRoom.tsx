import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { SERVER_ADDRESS } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function JoinRoom() {
  const [roomCode, setRoomCode] = useState('');
  const router = useRouter();

  const handleJoinRoom = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (!savedProfile) {
        throw new Error("Aucune donnée d'utilisateur trouvée");
      }

      const userProfile = JSON.parse(savedProfile);

      if (!roomCode.trim()) {
        Alert.alert('Erreur', 'Veuillez entrer un code de room valide.');
        return;
      }
      console.log(userProfile.username);

      const response = await fetch(`${SERVER_ADDRESS}/is-room-joinable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            username: userProfile.username,
            roomCode: roomCode,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Code de room invalide ou problème de connexion.');
      }

      const data = await response.json();

      if (data.success) {
        router.push({
          pathname: '/community/LoadingMultiplayer',
          params: { item: JSON.stringify({ roomCode: roomCode }) },
        });
      } else {
        Alert.alert('Erreur', 'Impossible de rejoindre la room. Vérifiez le code et réessayez.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer plus tard.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rejoindre une Room</Text>
      <TextInput
        style={styles.input}
        placeholder="Entrez le code de la room"
        value={roomCode}
        onChangeText={setRoomCode}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
        <Text style={styles.buttonText}>Rejoindre</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#6200ea',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

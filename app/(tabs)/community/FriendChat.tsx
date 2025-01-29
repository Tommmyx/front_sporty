import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal, Pressable } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import InputWithIcons from '../../../components/InputWithIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SERVER_ADDRESS } from '@env';

export default function FriendChatPage() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;

  const [modalVisible, setModalVisible] = useState(false);

  const handleCreateRoom = async () => {
    try {
      const savedProfile = await AsyncStorage.getItem('userProfile');
      if (!savedProfile) {
        throw new Error("Aucune donnée d'utilisateur trouvée");
      }

      const userProfile = JSON.parse(savedProfile);
      const response = await fetch(SERVER_ADDRESS + '/create-room', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userProfile.username,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const data = await response.json();

      if (data && data.roomCode) {
        router.push({
          pathname: '/community/LoadingMultiplayer',
          params: { item: JSON.stringify({ ...parsedItem, roomCode: data.roomCode }) },
        });
      } else {
        Alert.alert('Erreur', 'Aucune room créée. Veuillez réessayer.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', 'Impossible de créer la room. Veuillez réessayer plus tard.');
    }
  };

  const handleJoinRoom = () => {
    router.push('/community/JoinRoom');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.back} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>⟵</Text>
          </TouchableOpacity>
          <Image source={{ uri: parsedItem?.avatar }} style={styles.avatar} />
          <Text style={styles.headerText}>{parsedItem?.name}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <FontAwesomeIcon icon={faDumbbell} size={24} color="#6200ea" />
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.chatPlaceholder}>Start a conversation...</Text>
      </View>

      <InputWithIcons />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Pressable style={styles.modalButton} onPress={handleCreateRoom}>
              <Text style={styles.modalButtonText}>Créer une room</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={handleJoinRoom}>
              <Text style={styles.modalButtonText}>Rejoindre une room</Text>
            </Pressable>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Annuler</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  back: {
    marginRight: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    padding: 20,
  },
  chatPlaceholder: {
    fontSize: 16,
    color: '#aaa',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButton: {
    backgroundColor: '#6200ea',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#6200ea',
    fontSize: 16,
  },
});

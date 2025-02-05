import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Image, Text, Alert, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import socket from '@/utils/socket';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoadingMultiplayer() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;
  //const [socket, setSocket] = useState(null);
  const [players, setPlayers] = useState([]);
  const [canStartTraining, setCanStartTraining] = useState(false);

  const [hasJoinedRoom, setHasJoinedRoom] = useState(false);

  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    const initializeSocket = async () => {
      
      socket.on('connect', () => {
        console.log('Connecté au serveur socket');
      });

      socket.onAny((event, ...args) => {
        console.log(`Événement reçu : ${event}`, args);
      });

      socket.on('player-joined', ({ username }) => {
        Alert.alert('Nouveau joueur', `${username} a rejoint la room !`);
        setPlayers((prevPlayers) => [...prevPlayers, username]);
      });

      socket.on('player-left', ({ username }) => {
        Alert.alert('Déconnexion', `${username} a quitté la room.`);
        setPlayers((prevPlayers) => prevPlayers.filter((player) => player !== username));
      });

      socket.on('update-players', ({ players }) => {
        setPlayers(players);
      });

      socket.on('ready-to-choose-training', () => {
        setCanStartTraining(true);
      });

      return () => {
        socket.off('player-joined');
        socket.off('player-left');
        socket.off('update-players');
        socket.off('ready-to-choose-training');
        socket.offAny();
      };
    };
    initializeSocket();
  }, []);

  useEffect(() => {
    const handleJoinRoom = async (roomCode) => {
      if (!socket || hasJoinedRoom) return; // Empêche de rejoindre si déjà fait
  
      const userProfile = await AsyncStorage.getItem('userProfile');
      if (!userProfile) {
        throw new Error("Aucune donnée d'utilisateur trouvée");
      }
  
      const { username } = JSON.parse(userProfile);
  
      socket.emit('join-room', { username, roomCode });
      socket.emit('check-players', { roomCode });
  
      setHasJoinedRoom(true); // Marque comme ayant rejoint la room
    };
  
    if (socket && parsedItem?.roomCode) {
      handleJoinRoom(parsedItem.roomCode);
    }
  }, [socket, parsedItem, hasJoinedRoom]);

  useEffect(() => {
    const handleLeaveRoom = async () => {
      if (!socket) return;
  
      const userProfile = await AsyncStorage.getItem('userProfile');
      if (!userProfile) return;
  
      const { username } = JSON.parse(userProfile);
      socket.emit('leave-room', { username, roomCode: parsedItem?.roomCode });
    };
  
    return () => {
      handleLeaveRoom(); // S'exécutera uniquement quand le composant est démonté
    };
  }, []);

  const startTraining = () => {
    router.push({
      pathname: '/training',
      params: { multiplayer: 'true', roomCode: parsedItem?.roomCode }

    });
  };

  return (
    <View style={styles.container}>
      {parsedItem?.roomCode && (
        <Text style={styles.roomCodeText}>Room : {parsedItem.roomCode}</Text>
      )}

      <Animated.Image
        source={require('../../../assets/images/loading/haltere.png')}
        style={[styles.image, { transform: [{ rotate }] }]}
      />

      <Text style={styles.text}>En attente de la connexion de votre ami...</Text>

      <View style={styles.playersContainer}>
        <Text style={styles.playersTitle}>Joueurs dans la room :</Text>
        {players.map((player, index) => (
          <Text key={index} style={styles.player}>
            {player}
          </Text>
        ))}
      </View>

      {canStartTraining && (
      <View style={styles.buttonContainer}>
        <Button
          title="Choisir l'entraînement"
          onPress={startTraining}
          color="#6200ea" 
        />
      </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9fb', // Couleur d'arrière-plan claire
    padding: 20,
  },
  roomCodeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a4a8a', // Couleur douce pour le titre
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#e8eaf6', // Couleur d'arrière-plan légère pour la mise en valeur
    padding: 10,
    borderRadius: 8,
  },
  image: {
    width: 120, // Taille légèrement augmentée
    height: 120,
    marginBottom: 30, // Plus d'espace en dessous
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    color: '#555', // Gris doux pour le texte secondaire
    textAlign: 'center',
  },
  playersContainer: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#ffffff', // Conserve un fond neutre
    borderRadius: 12,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3, // Pour Android
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  player: {
    fontSize: 16,
    color: '#4a4a8a',
    paddingVertical: 5,
  },
  buttonContainer: {
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#6200ea', // Violet pour le bouton
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});


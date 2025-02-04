import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import CameraScreen from '../../TestCamera';
import AvatarView from '@/components/AvatarView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from '@/utils/socket';

export default function MultiplayerScreen() {
  const { roomCode } = useLocalSearchParams();
  const [players, setPlayers] = useState([]);
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const savedProfile = await AsyncStorage.getItem('userProfile');
        if (!savedProfile) {
          throw new Error("Aucune donnée d'utilisateur trouvée");
        }
        const userProfile = JSON.parse(savedProfile);


        setUsername(userProfile.username);
      } catch (error) {
        console.error(error);
        Alert.alert('Erreur', 'Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    };
    fetchUserProfile();
  }, []);

  useEffect(() => {
    
    socket.emit('get-players', { roomCode });
    socket.on('update-players', ({ players }) => {
      setPlayers(players);
      console.log(players);
    });

      return () => {
        socket.off('update-players');
        socket.offAny();
      };
  }, [roomCode]);

  const changePlayerAvatarAnimation = () => {
    /*setSelectedEmote("");
    setTimeout(() => setSelectedEmote(item), 50); 
    setEmoteWheelVisible(false);*/
  }
  //TODO : Faire coté socket pour recevoir le fait qu'un exo a été realisé par un joueur X et lancer l'animation de l'avatar de ce joueur en conséquence 
  // faire en sorte qu'il y ait un tabeau de joueur + animation
  return (
    <View style={styles.container}>
      
      <View style={styles.playersContent}>
        {players.map((player, index) => (
          <View key={index} style={styles.playerContainer}>
            <AvatarView animation={"idle2"} />
            <Text style={styles.pseudo}>{player}</Text>
          </View>
        ))}
      </View>
      <CameraScreen username={username} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    position: "relative" 
  },
  playersContent: {
    flex: 0.5, 
    flexDirection: "row",
    
  },
  playerContainer: { 
    flex: 0.5, 
    alignItems: 'center',
  },
  pseudo: { 
    marginTop: 10, 
    fontSize: 18, 
    fontWeight: 'bold' 
  }
});

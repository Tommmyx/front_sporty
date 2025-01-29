import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import io from 'socket.io-client';
import { SERVER_ADDRESS } from '@env';

export default function MultiplayerScreen() {
  const { roomCode } = useLocalSearchParams();
  const [players, setPlayers] = useState([]);
  const [exercise, setExercise] = useState({ name: 'Squat', reps: 0, time: 0 });
  const [totalTime, setTotalTime] = useState(0);
  const [socket, setSocket] = useState(null);

  /*useEffect(() => {
    const socketConnection = io(SERVER_ADDRESS);
    setSocket(socketConnection);

    socketConnection.emit('get-players', { roomCode });
    socketConnection.on('update-players', ({ players }) => {
      setPlayers(players);
    });

    return () => socketConnection.disconnect();
  }, [roomCode]);*/

  const nextExercise = () => {
    setExercise(prev => ({ ...prev, reps: prev.reps + 10, time: prev.time + 30 }));
    setTotalTime(prev => prev + 30);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Room: {roomCode}</Text>
      <Text style={styles.timer}>Temps total: {totalTime}s</Text>

      <View style={styles.playersContainer}>
        {players.map((player, index) => (
          <View key={index} style={styles.avatarContainer}>
            <Image source={require('../../../assets/images/profile_icons/totoro.png')} style={styles.avatar} />
            <Text style={styles.playerName}>Player</Text>
          </View>
        ))}
      </View>

      <View style={styles.exerciseContainer}>
        <Text style={styles.exerciseTitle}>{exercise.name}</Text>
        <Text>{exercise.reps} répétitions - {exercise.time}s</Text>
      </View>

      <Button title="Exercice suivant" onPress={nextExercise} color="#6200ea" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f4f4f8' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 10 },
  timer: { fontSize: 18, color: '#666', marginBottom: 20 },
  playersContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20 },
  avatarContainer: { alignItems: 'center', marginHorizontal: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  playerName: { marginTop: 5, fontSize: 14, color: '#444' },
  exerciseContainer: { padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center', marginBottom: 20 },
  exerciseTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
});

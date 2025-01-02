import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import InputWithIcons from '../../../components/InputWithIcons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function FriendChatPage() {
  const router = useRouter();
  const { item } = useLocalSearchParams();
  const parsedItem = item ? JSON.parse(item) : null;

  
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
        <TouchableOpacity>
          <FontAwesomeIcon icon={faDumbbell} size={24} color="#6200ea" />
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.chatPlaceholder}>Start a conversation...</Text>
      </View>

      <InputWithIcons />
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
});

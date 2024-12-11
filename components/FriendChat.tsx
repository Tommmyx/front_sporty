import React, { useEffect }from 'react';
import InputWithIcons from './InputWithIcons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

export default function FriendChatModal({ visible, onClose, item, navigation }) {
  useEffect(() => {
    if (visible) {
        navigation.setOptions({ tabBarStyle: { display: 'none' } }); // Cacher la barre
    } else {
        navigation.setOptions({ 
          tabBarStyle: {
            width: '80%',
            left: '10%',
            borderRadius: 15,
            backgroundColor: '#6200ea',
            height: 60,
            position: 'absolute',
            bottom: 20,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
          }
        }); 
    }
  }, [visible]);


        if (!visible) return null;
  return (
    <View style={visible ? styles.modalContainer : styles.hidden}>
      <View style={styles.header}>
        <View style={styles.rightHeader}>
          <TouchableOpacity style={styles.back} onPress={onClose}>
                  <Text style={styles.backButtonText}>⟵</Text>
          </TouchableOpacity>
          <Image source={{ uri: item?.avatar }} style={styles.avatar} />
          <Text style={styles.headerText}>{item?.name}</Text>
        </View>
        <TouchableOpacity>
          <FontAwesomeIcon icon={faDumbbell} size={24} color="#6200ea" />
        </TouchableOpacity>
      </View>

      <View style={styles.chatContainer}>
        <Text style={styles.chatPlaceholder}>Start a conversation...</Text>
      </View>

      <InputWithIcons/>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  hidden: {
    display: 'none',
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
  back : {
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
  input: {
    height: 50,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    marginBottom: 20,
    margin: 5,
    borderRadius: 20
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';

const Chatbot = () => {
  const [messages, setMessages] = useState([{ id: '1', text: 'Bonjour ! Posez-moi une question sur le sport.', sender: 'bot' }]);
  const [inputText, setInputText] = useState('');
  const router = useRouter();

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now().toString(), text: inputText, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setTimeout(() => {
      const botMessage = { id: (Date.now() + 1).toString(), text: `Je ne suis pas sûr, mais voici ce que je sais sur "${inputText}" !`, sender: 'bot' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    setInputText('');
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageBubble, item.sender === 'bot' ? styles.botMessage : styles.userMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  const handleBackToHome = () => {
    router.push({ pathname: "/(tabs)" });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      
      {/* Haut de page */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>ChatBot</Text>
      </View>

      <FlatList data={messages} keyExtractor={(item) => item.id} renderItem={renderMessage} contentContainerStyle={styles.messagesContainer} />
      
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Écrivez votre message..." value={inputText} onChangeText={setInputText} />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  messagesContainer: { padding: 10 },
  messageBubble: { padding: 10, borderRadius: 10, marginBottom: 10, maxWidth: '80%' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#e1f5fe' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#c8e6c9' },
  messageText: { fontSize: 16 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 10, borderTopWidth: 1, borderTopColor: '#ddd', backgroundColor: '#fff' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 15, height: 40, marginRight: 10, backgroundColor: '#fff' },
  sendButton: { backgroundColor: '#007BFF', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 20 },
  sendButtonText: { color: '#fff', fontSize: 16 },
});

export default Chatbot;

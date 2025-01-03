import { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    setErrorMessage('');

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        navigation.navigate('Home');
      } else {
        setErrorMessage('Identifiant ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Erreur réseau : impossible de se connecter au serveur.');
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-gray-100">
      <View className="flex-1 justify-center items-center px-4 sm:px-6 py-6">
        <Text className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
          Connectez-vous
        </Text>

        <TextInput
          placeholder="Adresse email ou identifiant"
          className="w-[90%] max-w-sm bg-white px-4 py-3 rounded-lg mb-3 sm:mb-4 border border-gray-300 shadow-sm"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Mot de passe"
          className="w-[90%] max-w-sm bg-white px-4 py-3 rounded-lg mb-3 sm:mb-4 border border-gray-300 shadow-sm"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage ? (
          <Text className="text-red-500 text-sm sm:text-base text-center mb-3 sm:mb-4">
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          className="w-[90%] max-w-sm bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-full text-center py-3 mb-3 sm:mb-4 shadow-md"
          onPress={handleLogin}
        >
          <Text className="text-white text-base sm:text-lg text-center font-semibold">
            Je me connecte
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-[90%] max-w-sm bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-center py-3 mb-3 shadow-md"
          onPress={() => console.log('Connexion avec Google')}
        >
          <Text className="text-white text-base sm:text-lg text-center font-semibold">
            Se connecter avec Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-[90%] max-w-sm bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-full text-center py-3 mb-4 shadow-md"
          onPress={() => console.log('Connexion avec Facebook')}
        >
          <Text className="text-white text-base sm:text-lg text-center font-semibold">
            Se connecter avec Facebook
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Test')}>
          <Text className="text-gray-500 text-sm sm:text-base italic underline text-center">
            Pas de compte ? Je m'inscris !
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

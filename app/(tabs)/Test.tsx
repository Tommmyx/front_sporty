import { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native';


export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignup = () => {
    setErrorMessage('');

    if (!agreeToTerms) {
      setErrorMessage('Vous devez accepter les termes et conditions.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return; 
    }

    console.log('Signup successful:', { email, password });
    navigation.navigate('CreateProfil');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-gray-100">
      <View className="flex-1 justify-center items-center px-4 sm:px-6 py-6">
        <Text className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center">
          Inscription
        </Text>

        <TextInput
          placeholder="Adresse email"
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

        <TextInput
          placeholder="Confirmer le mot de passe"
          className="w-[90%] max-w-sm bg-white px-4 py-3 rounded-lg mb-3 sm:mb-4 border border-gray-300 shadow-sm"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {errorMessage ? (
          <Text className="text-red-500 text-sm sm:text-base text-center mb-3 sm:mb-4">
            {errorMessage}
          </Text>
        ) : null}

        <TouchableOpacity
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          className="w-[90%] max-w-sm flex-row items-center mb-3 sm:mb-4"
        >
          <View
            className={`w-5 h-5 border-2 rounded-sm mr-2 ${
              agreeToTerms ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
            }`}
          />
          <Text className="text-gray-600 text-sm sm:text-base">
            J'accepte les{' '}
            <Text
              className="text-blue-600 underline"
              onPress={() => console.log('Open Terms of Service')}
            >
              Conditions d'utilisation
            </Text>{' '}
            et la{' '}
            <Text
              className="text-blue-600 underline"
              onPress={() => console.log('Open Privacy Policy')}
            >
              Politique de confidentialité
            </Text>
            .
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`w-[90%] max-w-sm ${
            agreeToTerms ? 'bg-[#FF9119]' : 'bg-gray-300'
          } focus:ring-4 focus:outline-none font-medium rounded-full text-center py-3 mb-3 sm:mb-4 shadow-md`}
          onPress={handleSignup}
          disabled={!agreeToTerms}
        >
          <Text
            className={`${
              agreeToTerms ? 'text-white' : 'text-gray-500'
            } text-base sm:text-lg text-center font-semibold`}
          >
            Je m'inscris
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

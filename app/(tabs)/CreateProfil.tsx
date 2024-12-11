import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';

export default function CreateProfil({ navigation }) {
    const [step, setStep] = useState(1);
    const [openDatePicker, setOpenDatePicker] = useState(false);
    const [userData, setUserData] = useState({
        username: '',
        genre: null,
        dateNaissance: '',
        poids: '',
        taille: '',
        goals: [],
        level: null,
    });

    const nextStep = () => setStep(step + 1);

    const selectGenre = (genre) => {
        setUserData({ ...userData, genre });
        nextStep();
    };

    const toggleGoal = (goal) => {
        setUserData((prevData) => {
            const isGoalSelected = prevData.goals.includes(goal);
            return {
                ...prevData,
                goals: isGoalSelected
                    ? prevData.goals.filter((g) => g !== goal)
                    : [...prevData.goals, goal],
            };
        });
    };

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('userProfile', JSON.stringify(userData));
            navigation.navigate('Home');
        } catch (error) {
            console.error('Failed to save data', error);
        }
    };

    return (
        <View className="flex-1 justify-center items-center bg-gray-100 space-y-6 p-4">
            {step === 1 && (
                <>
                    <Text className="text-black text-center font-semibold text-3xl mb-6">
                        Choisis un pseudo
                    </Text>
                    <TextInput
                        className="bg-white rounded-lg p-4 shadow-md text-2xl w-64 text-center"
                        placeholder="Saisissez votre pseudo"
                        value={userData.username}
                        onChangeText={(value) => setUserData({ ...userData, username: value })}
                    />
                    <TouchableOpacity onPress={nextStep} className="bg-blue-500 rounded-full p-4 mt-4">
                        <Text className="text-white text-center font-semibold text-2xl">Suivant</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 2 && (
                <>
                    <Text className="text-black text-center font-semibold text-5xl mb-6">
                        Quel est ton genre ?
                    </Text>
                    <TouchableOpacity
                        onPress={() => selectGenre('Homme')}
                        className="w-64 h-64 bg-[#FF9119] font-medium rounded-full flex justify-center items-center shadow-md mb-4"
                    >
                        <Icon name="male" size={120} color="#fff" />
                        <Text className="text-white text-center font-semibold">Homme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => selectGenre('Femme')}
                        className="w-64 h-64 bg-[#008000] font-medium rounded-full flex justify-center items-center shadow-md mb-4"
                    >
                        <Icon name="female" size={120} color="#fff" />
                        <Text className="text-white text-center font-semibold">Femme</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => selectGenre('Ne pas spécifier')}
                        className="bg-white rounded-full p-4 shadow-md mt-4"
                    >
                        <Text className="text-black text-center font-semibold text-4xl">
                            Ne pas spécifier
                        </Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 3 && (
                <>
                    <Text style={styles.title}>Quelle est ta date de naissance ?</Text>
                    <DateTimePicker
                        mode="single"
                        date={userData.dateNaissance ? dayjs(userData.dateNaissance) : dayjs()}
                        onChange={({ date }) => {
                            setUserData({ ...userData, dateNaissance: date.toISOString() });
                        }}
                        minDate={dayjs().subtract(100, 'years')}
                        maxDate={dayjs()}
                        height={350} // Adjust to your UI
                        selectedTextStyle={{ color: '#0047FF' }}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={nextStep}
                    >
                        <Text style={styles.buttonText}>Suivant</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 4 && (
                <>
                    <Text className="text-black text-center font-semibold text-3xl mb-6">
                        Quel est ton poids ?
                    </Text>
                    <TextInput
                        className="bg-white rounded-lg p-4 shadow-md text-2xl w-64 text-center"
                        placeholder="Saisissez votre poids (kg)"
                        keyboardType="numeric"
                        value={userData.poids}
                        onChangeText={(value) => setUserData({ ...userData, poids: value })}
                    />
                    <TouchableOpacity onPress={nextStep} className="bg-blue-500 rounded-full p-4 mt-4">
                        <Text className="text-white text-center font-semibold text-2xl">Suivant</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 5 && (
                <>
                    <Text className="text-black text-center font-semibold text-3xl mb-6">
                        Quelle est ta taille ?
                    </Text>
                    <TextInput
                        className="bg-white rounded-lg p-4 shadow-md text-2xl w-64 text-center"
                        placeholder="Saisissez votre taille (cm)"
                        keyboardType="numeric"
                        value={userData.taille}
                        onChangeText={(value) => setUserData({ ...userData, taille: value })}
                    />
                    <TouchableOpacity onPress={nextStep} className="bg-blue-500 rounded-full p-4 mt-4">
                        <Text className="text-white text-center font-semibold text-2xl">Suivant</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 6 && (
                <>
                    <Text className="text-black text-center font-semibold text-3xl mb-6">
                        Quel est ton goal ?
                    </Text>
                    {['Etre en forme', 'Gagner du muscle', 'Perdre du poids', 'Augmenter l\'endurance', 'Améliorer la santé générale', 'Autres'].map((goal) => (
                        <TouchableOpacity
                            key={goal}
                            onPress={() => toggleGoal(goal)}
                            className={`w-64 p-4 my-2 rounded-full flex justify-center items-center shadow-md ${
                                userData.goals.includes(goal) ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                        >
                            <Text
                                className={`text-center font-semibold text-2xl ${
                                    userData.goals.includes(goal) ? 'text-white' : 'text-black'
                                }`}
                            >
                                {goal}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={nextStep} className="bg-green-500 rounded-full p-4 mt-4">
                        <Text className="text-white text-center font-semibold text-2xl">Suivant</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 7 && (
                <>
                    <Text className="text-black text-center font-semibold text-3xl mb-6">
                        Quel est ton niveau ?
                    </Text>
                    {['Débutant', 'Intermédiaire', 'Avancé'].map((level) => (
                        <TouchableOpacity
                            key={level}
                            onPress={() => setUserData({ ...userData, level })}
                            className={`w-64 p-4 my-2 rounded-full flex justify-center items-center shadow-md ${
                                userData.level === level ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                        >
                            <Text
                                className={`text-center font-semibold text-2xl ${
                                    userData.level === level ? 'text-white' : 'text-black'
                                }`}
                            >
                                {level}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity onPress={saveData} className="bg-green-500 rounded-full p-4 mt-4">
                        <Text className="text-white text-center font-semibold text-2xl">Terminer</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        textAlign: 'center',
    },
});


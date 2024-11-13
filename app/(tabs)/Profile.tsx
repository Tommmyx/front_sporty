import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Modal, Text, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

export default function ProfileIcon({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState(require('../../assets/images/profile_icons/woman.png'));
    const [userData, setUserData] = useState(null);
    const isFocused = useIsFocused(); // Détecte si l'écran est en focus

    const iconLibrary = [
        require('../../assets/images/profile_icons/woman.png'),
        require('../../assets/images/profile_icons/man.png'),
        require('../../assets/images/profile_icons/totoro.png')
    ];

    const loadData = async () => {
        try {
            const savedData = await AsyncStorage.getItem('userProfile');
            if (savedData) setUserData(JSON.parse(savedData));
        } catch (error) {
            console.error("Erreur de chargement des données", error);
        }
    };

    useEffect(() => {
        if (isFocused) {
            loadData(); 
        }
    }, [isFocused]);

    const openProfile = () => setModalVisible(true);
    const closeProfile = () => setModalVisible(false);

    return (
        <View style={{ position: 'absolute', top: 40, right: 20 }}>
            <TouchableOpacity onPress={openProfile}>
                <Image source={selectedIcon} style={{ width: 50, height: 50, borderRadius: 30, backgroundColor: "white" }} />
            </TouchableOpacity>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={closeProfile}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
                            Profil Utilisateur
                        </Text>
                        {userData ? (
                            <>
                                <Text>Pseudo: {userData.username}</Text>
                                <Text>Genre: {userData.genre}</Text>
                                <Text>Âge: {userData.age}</Text>
                                <Text>Poids: {userData.poids} kg</Text>
                                <Text>Taille: {userData.taille} cm</Text>
                                <Text>Objectifs: {userData.goals.join(', ')}</Text>
                                <Text>Niveau: {userData.level}</Text>
                            </>
                        ) : (
                            <Text>Aucun profil trouvé</Text>
                        )}
                        <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
                            {iconLibrary.map((icon, index) => (
                                <TouchableOpacity key={index} onPress={() => setSelectedIcon(icon)} style={{ margin: 10 }}>
                                    <Image source={icon} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity onPress={closeProfile} style={{ marginTop: 20, alignSelf: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'blue' }}>Annuler</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Modal,
    ScrollView,
    Dimensions,
    ImageBackground,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faX, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function StartTraining() {
    const router = useRouter();
    const [routines, setRoutines] = useState([]);
    const [communityRoutines, setCommunityRoutines] = useState([]);
    const [selectedRoutine, setSelectedRoutine] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('personal');
    const [isMultiplayer, setIsMultiplayer] = useState(false);
    const { multiplayer, roomCode } = useLocalSearchParams();
    
    
    useEffect(() => {
        if (multiplayer !== undefined) {
            setIsMultiplayer(true);
        }
    }, [multiplayer]);
    const loadRoutines = async () => {
        try {
            const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
            const sessionFiles = files.filter(file => file.endsWith('.json'));

            const loadedRoutines = await Promise.all(
                sessionFiles.map(async (file) => {
                    try {
                        const content = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${file}`);
                        const parsedContent = JSON.parse(content);

                        if (parsedContent.name && parsedContent.exercises) {
                            return { ...parsedContent, fileName: file };
                        }
                    } catch (error) {
                        console.warn(`Fichier ignoré (non valide) : ${file}`);
                    }
                    return null;
                })
            );

            setRoutines(loadedRoutines.filter(routine => routine !== null));
        } catch (error) {
            console.error('Erreur lors du chargement des séances :', error);
        }
    };

    const loadCommunityRoutines = async () => {
        try {
            // Exemple statique : remplacer cela par un fetch vers une API ou une base de données
            const exampleCommunityRoutines = [
                {
                    name: 'Cardio Express',
                    image: 'cardio',
                    description: 'Entraînement rapide pour booster votre cardio',
                    exercises: [
                        { name: 'Jumping Jacks', time: 30, rest: 10 },
                        { name: 'Burpees', time: 20, rest: 15 },
                    ],
                },
                {
                    name: 'Renforcement musculaire',
                    image: 'renforcement',
                    description: 'Idéal pour se muscler en peu de temps',
                    exercises: [
                        { name: 'Pompes', time: 30, rest: 10 },
                        { name: 'Squats', time: 40, rest: 15 },
                    ],
                },
            ];

            setCommunityRoutines(exampleCommunityRoutines);
        } catch (error) {
            console.error('Erreur lors du chargement des séances de la communauté :', error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadRoutines();
            loadCommunityRoutines(); // Charger les routines de la communauté
        }, [])
    );

    const deleteRoutine = async (fileName) => {
        try {
            await FileSystem.deleteAsync(`${FileSystem.documentDirectory}${fileName}`);
            loadRoutines();
        } catch (error) {
            console.error('Erreur lors de la suppression de la séance :', error);
        }
    };

    const openModal = (routine) => {
        setSelectedRoutine(routine);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        setSelectedRoutine(null);
        setIsModalVisible(false);
    };

    const startActivity = () => {
        closeModal();
        router.push({ pathname: '/(tabs)/training/TrainingScreen', params: { routine: JSON.stringify(selectedRoutine) } });
    };

    const addRoutine = () => {
        router.push('/(tabs)/training/ExploreRoutine');
    };

    const imageMap = {
        'cardio': require('../../../assets/images/training/cardio.jpeg'),
        'renforcement': require('../../../assets/images/training/renforcement.jpg'),

    };

    
    const renderTabContent = () => {
        const data = activeTab === 'personal' ? routines : communityRoutines;

        return (
            <FlatList
    data={data}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item }) => (
        <TouchableOpacity style={styles.cardButton} onPress={() => openModal(item)}>
            {/* Image en arrière-plan */}
            <ImageBackground
                source={
                    imageMap[item.image] || require("../../../assets/images/training/cardio.jpeg") // Placeholder
                }
                style={styles.cardBackground}
                imageStyle={styles.cardImage}>
                {/* Texte de la routine */}
                <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
            </ImageBackground>
            {/* Bouton de suppression pour l'onglet "personal" */}
            {activeTab === 'personal' && (
                <TouchableOpacity style={styles.deleteButton} onPress={() => deleteRoutine(item.fileName)}>
                    <FontAwesomeIcon icon={faX} color="#fff" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    )}
    contentContainerStyle={styles.listContainer}
/>

        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Séances d'entraînement</Text>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'personal' && styles.activeTab]}
                    onPress={() => setActiveTab('personal')}
                >
                    <Text style={[styles.tabText, activeTab === 'personal' && styles.activeTabText]}>
                        Mes séances
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tabButton, activeTab === 'community' && styles.activeTab]}
                    onPress={() => setActiveTab('community')}
                >
                    <Text style={[styles.tabText, activeTab === 'community' && styles.activeTabText]}>
                        Communauté
                    </Text>
                </TouchableOpacity>
                {isMultiplayer && (
                    <TouchableOpacity    
                    onPress={() => 
                        router.push({
                            pathname: '/(tabs)/community/MultiplayerScreen',
                            params: { roomCode: roomCode }
                      
                        })}
                    ><Text>Test Multi</Text></TouchableOpacity>

                )}
            </View>

            {/* Liste des séances */}
            {renderTabContent()}

            {selectedRoutine && (
                <Modal
                    visible={isModalVisible}
                    animationType="slide"
                    transparent
                    onRequestClose={closeModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>{selectedRoutine.name}</Text>

                            <ScrollView style={styles.scrollContainer}>
                                <Text style={styles.modalDescription}>
                                    {selectedRoutine.description}
                                </Text>

                                <Text style={styles.modalSectionTitle}>Exercices :</Text>
                                {selectedRoutine.exercises.map((exercise, index) => (
                                    <View key={index} style={styles.exerciseItem}>
                                        <Text style={styles.exerciseText}>
                                            {index + 1}. {exercise.name} - {exercise.time}s, Repos: {exercise.rest}s
                                        </Text>
                                    </View>
                                ))}
                            </ScrollView>

                            <View style={styles.modalButtonsContainer}>
                                <TouchableOpacity style={[styles.modalButton, styles.closeButton]} onPress={closeModal}>
                                    <Text style={styles.modalButtonText}>Fermer</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalButton, styles.startButton]} onPress={startActivity}>
                                    <Text style={styles.modalButtonText}>Démarrer</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Bouton ajouter */}
            {activeTab === 'personal' && (
                <TouchableOpacity style={styles.addRoutineButton} onPress={addRoutine}>
                    <FontAwesomeIcon icon={faPlus} size={25} />
                </TouchableOpacity>
            )}
        </View>
    );
}

const { width } = Dimensions.get('window');
const buttonSize = width * 0.15;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    tabsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    tabButton: {
        padding: 10,
        marginHorizontal: 10,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#007bff',
    },
    tabText: {
        fontSize: 16,
        color: '#555',
    },
    activeTabText: {
        color: '#007bff',
        fontWeight: 'bold',
    },
    cardButton: {
        marginBottom: 20,
        borderRadius: 15,
        overflow: 'hidden',
        position: 'relative', // Nécessaire pour positionner le bouton de suppression
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    cardBackground: {
        width: '100%',
        height: 150, // Taille de la carte
        justifyContent: 'flex-end',
    },
    cardImage: {
        borderRadius: 15,
    },
    cardContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Overlay sombre
        padding: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 14,
        color: '#ccc',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 8,
        borderRadius: 20,
    },
    listContainer: {
        width: '100%',
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#e5e7eb',
        paddingVertical: 16,
        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 10,
    },
    listItemContent: {
        flex: 1,
    },
    listItemText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    listDescription: {
        fontSize: 14,
        color: '#555',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    scrollContainer: {
        marginBottom: 20,
    },
    modalDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exerciseItem: {
        marginBottom: 10,
    },
    exerciseText: {
        fontSize: 16,
        color: '#333',
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    closeButton: {
        backgroundColor: '#dc3545',
    },
    startButton: {
        backgroundColor: '#28a745',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addRoutineButton: {
        backgroundColor: '#ececec',
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 100,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
});

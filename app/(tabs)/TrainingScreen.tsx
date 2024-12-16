import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';

export default function TrainingScreen({ route, navigation }) {
    const { routine } = route.params;

    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [globalTime, setGlobalTime] = useState(0); // Timer global
    const [exerciseTime, setExerciseTime] = useState(0); // Timer pour chaque exercice
    const [isPaused, setIsPaused] = useState(false);
    const [repetitions, setRepetitions] = useState(0);

    const currentExercise = routine.exercises[currentExerciseIndex];


    useEffect(() => {
        let timer;
        if (!isPaused) {
            timer = setInterval(() => {
                setGlobalTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isPaused]);


    useEffect(() => {
        let exerciseTimer;
        if (!isPaused) {
            exerciseTimer = setInterval(() => {
                setExerciseTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(exerciseTimer);
    }, [isPaused, currentExerciseIndex]);

    const handleNextExercise = () => {
        if (currentExerciseIndex < routine.exercises.length - 1) {
            setCurrentExerciseIndex((prev) => prev + 1);
            setExerciseTime(0); 
            setRepetitions(0); 
        } else {
            alert('Entraînement terminé !');
            navigation.goBack();
        }
    };

    const handlePreviousExercise = () => {
        if (currentExerciseIndex > 0) {
            setCurrentExerciseIndex((prev) => prev - 1);
            setExerciseTime(0); 
            setRepetitions(0); 
        }
    };

    const togglePause = () => {
        setIsPaused((prev) => !prev);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.exerciseInfo}>
                    Exercice {currentExerciseIndex + 1}/{routine.exercises.length}
                </Text>
                <Text style={styles.globalTimer}>
                    Temps total : {Math.floor(globalTime / 60)}:{(globalTime % 60).toString().padStart(2, '0')}
                </Text>
            </View>

 
            <View style={styles.visualContainer}>
                <Image
                    source={{ uri: currentExercise.image || 'https://via.placeholder.com/300' }}
                    style={styles.visual}
                />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.exerciseName}>{currentExercise.name}</Text>
                <Text style={styles.exerciseTimer}>
                    Timer : {Math.floor(exerciseTime / 60)}:{(exerciseTime % 60).toString().padStart(2, '0')}
                </Text>
                <Text style={styles.repetitions}>Répétitions : {repetitions}</Text>
            </View>


            <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
                <Text style={styles.pauseButtonText}>{isPaused ? 'Reprendre' : 'Pause'}</Text>
            </TouchableOpacity>

      
            <View style={styles.navigationButtons}>
                <TouchableOpacity
                    style={[styles.navButton, styles.previousButton]}
                    onPress={handlePreviousExercise}
                >
                    <Text style={styles.navButtonText}>Précédent</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.navButton, styles.nextButton]}
                    onPress={handleNextExercise}
                >
                    <Text style={styles.navButtonText}>Passer</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    exerciseInfo: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    globalTimer: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    visualContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    visual: {
        width: 300,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#dcdcdc',
    },
    infoContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    exerciseName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    exerciseTimer: {
        fontSize: 20,
        marginTop: 10,
    },
    repetitions: {
        fontSize: 18,
        marginTop: 10,
    },
    pauseButton: {
        backgroundColor: '#28a745',
        padding: 15,
        marginHorizontal: 50,
        borderRadius: 10,
        alignItems: 'center',
    },
    pauseButtonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    navButton: {
        flex: 1,
        padding: 15,
        marginHorizontal: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    previousButton: {
        backgroundColor: '#6c757d',
    },
    nextButton: {
        backgroundColor: '#007bff',
    },
    navButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

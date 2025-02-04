import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  StyleProp,
  ViewStyle,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // ✅ Import du dégradé

interface QuestSliderProps {
  style?: StyleProp<ViewStyle>;
}

const QuestSlider: React.FC<QuestSliderProps> = ({ style }) => {
  const [sliderPosition] = useState(new Animated.Value(-250)); 
  const [isSliderOpen, setIsSliderOpen] = useState(false); 

  const handleSlide = () => {
    Animated.timing(sliderPosition, {
      toValue: isSliderOpen ? -250 : 0, 
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsSliderOpen(!isSliderOpen);
  };

  return (
    <Animated.View
      style={[
        styles.slider,
        style,
        {
          transform: [{ translateX: sliderPosition }],
        },
      ]}
    >
       {/* ✅ Dégradé en fond pour correspondre à la page d'accueil */}
       <LinearGradient
        colors={[
          "rgba(163, 228, 215, 0.85)", 
          "rgba(212, 239, 223, 0.85)", 
          "rgba(250, 215, 160, 0.85)", 
          "rgba(245, 183, 177, 0.85)"
        ]}
        style={styles.gradientBackground}
      />
      
      {/* Bouton pour faire glisser le slider */}
      <TouchableOpacity style={styles.slideButton} onPress={handleSlide}>
        <View style={styles.roundedSquareButton}>
          <MaterialCommunityIcons
            name={isSliderOpen ? "chevron-left" : "chevron-right"} 
            size={20}
            color="black"
          />
        </View>
      </TouchableOpacity>

      {/* Contenu du slider : Liste de quêtes */}
      <View style={styles.questTab}>
        <Text style={styles.questHeader}>Quêtes</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.questItem}>
            <Text style={styles.questTitle}>Séance quotidienne</Text>
            <Text style={styles.questDescription}>
              Terminez une séance pour obtenir 500 XP
            </Text>
          </View>

          <View style={styles.questItem}>
            <Text style={styles.questTitle}>Séance à plusieurs</Text>
            <Text style={styles.questDescription}>
              Terminez une séance avec un ami pour obtenir 700 XP
            </Text>
          </View>

          <View style={styles.questItem}>
            <Text style={styles.questTitle}>🔥 Semaine squat</Text>
            <Text style={styles.questDescription}>
              Réalisez 100 squats pour obtenir 1000 XP (14/100)
            </Text>
          </View>

          <View style={styles.questItem}>
            <Text style={styles.questTitle}>🔥 Partage l'application</Text>
            <Text style={styles.questDescription}>
              Partagez l'application avec un ami pour obtenir 100 XP
            </Text>
          </View>

        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slider: {
    position: "absolute",
    top: "25%", 
    right: -250, 
    width: 250,
    height: 330, 
    borderRadius: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    flexDirection: "column",
    alignItems: "center",
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20, // 🔥 S'assure que le dégradé suit bien l'arrondi
  },
  questTab: {
    flex: 1,
    padding: 10,
    width: "100%",
  },
  questHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333", 
  },
  questItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    
  },
  questTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  questDescription: {
    fontSize: 14,
    color: "#666",
  },
  slideButton: {
    position: "absolute",
    top: 20,
    left: -40, 
    
  },
  roundedSquareButton: {
    width: 40, 
    height: 40,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 0, 
    borderBottomRightRadius: 0, 
  },
});

export default QuestSlider;

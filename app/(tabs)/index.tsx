import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import BattlePassButton from "../../components/BattlePassButton";
import QuestSlider from "../../components/QuestSlider"; 


const MainPage: React.FC = () => {
  const router = useRouter();

  return (
    <ImageBackground source={require("../../assets/images/main_page/salle.webp")} style={styles.background}>
      <View style={styles.container}>
        {/* Image de fond */}
        <Image source={require("../../assets/images/main_page/bonhomme.png")} style={styles.image} />

        {/* Bouton paramètres en haut à droite */}
        <TouchableOpacity style={styles.settingsButton}>
          <View style={styles.circleButtonLarge}>
            <MaterialCommunityIcons name="cog" size={28} color="black" />
          </View>
        </TouchableOpacity>

        {/* Bouton chat en bas à droite */}
        <TouchableOpacity style={styles.chatButton} onPress={() => router.push("/Chatbot")}>
          <View style={styles.circleButtonSmall}>
            <MaterialCommunityIcons name="chat" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {/* Bouton cintre en bas à droite */}
        <TouchableOpacity style={styles.hangerButton}>
          <View style={styles.circleButtonSmall}>
            <MaterialCommunityIcons name="hanger" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {/* Bouton Battle Pass */}
        <BattlePassButton xpCurrent={356} xpMax={1000}/>

        {/* Slider de quêtes */}
        <QuestSlider />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  image: {
    flex: 1,
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  settingsButton: {
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
  },
  chatButton: {
    position: "absolute",
    bottom: 140,
    right: 20,
    zIndex: 10,
  },
  hangerButton: {
    position: "absolute",
    bottom: 70,
    right: 20,
    zIndex: 10,
  },
  circleButtonSmall: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  circleButtonLarge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default MainPage;

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, ImageBackground, Modal, FlatList, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AvatarView from "@/components/AvatarView";
import BattlePassButton from "../../components/BattlePassButton";
import QuestSlider from "../../components/QuestSlider";

const emotes = ["idle2", "squatt", "dance", "clap", "point"];

const MainPage: React.FC = () => {
  const router = useRouter();
  const [emoteWheelVisible, setEmoteWheelVisible] = useState(false);
  const [selectedEmote, setSelectedEmote] = useState("idle2");

  return (
    <ImageBackground source={require("../../assets/images/main_page/salle.webp")} style={styles.background}>
      <View style={styles.container}>
        <AvatarView animation={selectedEmote} />
        
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("/login_register/LoginScreen")}>
          <View style={styles.circleButtonLarge}>
            <MaterialCommunityIcons name="cog" size={28} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.chatButton} onPress={() => router.push("/Chatbot")}> 
          <View style={styles.circleButtonSmall}>
            <MaterialCommunityIcons name="chat" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.hangerButton } onPress={() => router.push("/Vestiaire")}>
          <View style={styles.circleButtonSmall}>
            <MaterialCommunityIcons name="hanger" size={24} color="black" />
          </View>
        </TouchableOpacity>

        {/* Bouton de la roue d'emotes */}
        <TouchableOpacity style={styles.emoteButton} onPress={() => setEmoteWheelVisible(true)}>
          <View style={styles.circleButtonSmall}>
            <MaterialCommunityIcons name="gesture-tap" size={24} color="black" />
          </View>
        </TouchableOpacity>
       
        
        <BattlePassButton xpCurrent={356} xpMax={1000} />
        
        
        <QuestSlider />
      </View>

      {/* Roue d'emotes */}
      <Modal visible={emoteWheelVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.emoteWheel}>
            <FlatList
              data={emotes}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emoteOption}
                  onPress={() => {
                    //We need this to make sure the value is changed 
                    setSelectedEmote("");
                    setTimeout(() => setSelectedEmote(item), 50); 
                    setEmoteWheelVisible(false);
                  }}
                >
                  <Text style={styles.emoteText}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, position: "relative" },
  settingsButton: { position: "absolute", top: 20, right: 20, zIndex: 10 },
  chatButton: { position: "absolute", bottom: 140, right: 20, zIndex: 10 },
  hangerButton: { position: "absolute", bottom: 70, right: 20, zIndex: 10 },
  emoteButton: { position: "absolute", bottom: 210, right: 20, zIndex: 10 },
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  emoteWheel: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 200,
    alignItems: "center",
  },
  emoteOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  emoteText: {
    fontSize: 18,
  },
});

export default MainPage;

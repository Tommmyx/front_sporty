import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const BattlePassButton: React.FC = () => {
  const router = useRouter();

  return (
    <TouchableOpacity style={styles.battlePassButton} onPress={() => router.push("/BattlepassScreen")}>
      <Text style={styles.battlePassText}>Battle Pass</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  battlePassButton: {
    position: "absolute",
    bottom: 90, // 🔥 Ajusté pour qu'il ne soit pas collé à la barre
    left: 20, // 🔥 Aligné à gauche
    width: 140, // Largeur du bouton
    paddingVertical: 12,
    backgroundColor: "rgba(211, 128, 79, 0.85)", // 🔥 Fond semi-transparent pour un effet moderne
    borderRadius: 20, // 🔥 Arrondi pour un look épuré
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6, // 🔥 Ombre subtile pour un effet moderne
  },
  battlePassText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});

export default BattlePassButton;

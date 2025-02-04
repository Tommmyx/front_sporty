import React from "react";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";


interface BattlePassButtonProps {
  xpCurrent: number;
  xpMax: number;
}

const BattlePassButton: React.FC<BattlePassButtonProps> = ({ xpCurrent, xpMax }) => {
  const router = useRouter();
  const xpPercentage = (xpCurrent / xpMax) * 100;

  return (
    <TouchableOpacity style={styles.battlePassContainer} onPress={() => router.push("/BattlepassScreen")}>
      <View style={styles.ticketContainer}>
        <Image
          source={require("../assets/images/main_page/battlepass.png")} 
          style={styles.ticketImage}
        />
      </View>

      <View style={styles.xpContainer}>
        <Text style={styles.xpLabel}>XP</Text>
        <View style={styles.xpBarBackground}>
          <View style={[styles.xpBarForeground, { width: `${xpPercentage}%` }]} />
          <Text style={styles.xpText}>
            {xpCurrent}/{xpMax}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  battlePassContainer: {
    position: "absolute",
    bottom: 70,
    left: 20,
    backgroundColor: "#334257", 
    borderRadius: 12,
    padding: 8,
    width: 170, 
    height: 70, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 6,
    alignItems: "center", 
  },
  ticketContainer: {
    position: "absolute",
    top: -60, 
    width: 160, 
    height: 110, 
    zIndex: 10, 
    alignItems: "center",
  },
  ticketImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  xpContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  xpLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FDC500",
    marginRight: 6,
  },
  xpBarBackground: {
    flex: 1,
    backgroundColor: "#576F72",
    borderRadius: 8,
    height: 20, 
    justifyContent: "center",
    overflow: "hidden",
  },
  xpBarForeground: {
    position: "absolute",
    backgroundColor: "#FDC500",
    height: "100%",
    borderRadius: 8,
  },
  xpText: {
    fontSize: 15,
    fontWeight: "900", 
    color: "#FFFFFF",
    textAlign: "center",
    zIndex: 1,
    textShadowColor: "#000", 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 2, 
    marginBottom: 1, 
    lineHeight: 18, 
  },
});

export default BattlePassButton;

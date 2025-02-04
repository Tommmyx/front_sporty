import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import battlepassImage from "../assets/images/shop/battlepass.webp";
import BattleSection from "../components/Battlepasslevel";
import { ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";


const HeaderWithXP = () => {
  const currentXP = 1200;
  const xpRequired = 2000;
  const level = 5;
  const xpPercentage = (currentXP / xpRequired) * 100;
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
      >
        <ArrowLeft size={32} color="#fff" />
      </TouchableOpacity>

      {/* Image d'entête */}
      <View style={styles.headerWrapper}>
        <Image 
          source={battlepassImage} 
          style={styles.headerImage} 
          resizeMode="cover"
        />
        <Text style={styles.timeRemaining}>
          Time remaining for this season 12D 11H
        </Text>
      </View>
      
      {/* Section Niveau + Barre d'XP */}
      <LinearGradient colors={["#87CEFA", "#0000FF"]} style={styles.levelContainer}>
        <Text style={styles.levelText}>Niveau {level}</Text>
        <View style={styles.xpBarContainer}>
          <LinearGradient
            colors={["#FFD700", "#FFA500"]} // Dégradé doré
            style={[styles.xpBar, { width: `${xpPercentage}%` }]}
          />
          <Text style={styles.xpText}>{currentXP} / {xpRequired} XP</Text>
        </View>
      </LinearGradient>

      {/* Section Titre Récompense */}
      <View style={styles.rewardsContainer}>
        <View style={[styles.rewardSection, styles.leftReward]}>
          <Text style={styles.rewardText}>Récompenses gratuites</Text>
        </View>
        <View style={[styles.rewardSection, styles.rightReward]}>
          <Text style={styles.rewardText}>Récompenses Pass</Text>
        </View>
      </View>

      {/* ScrollView contenant toutes les BattleSections */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {Array.from({ length: 30 }, (_, index) => (
          <BattleSection key={index + 1} level={index + 1} leftImage={battlepassImage} rightImage={battlepassImage} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerWrapper: {
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: 100, 
  },
  timeRemaining: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -155 }, { translateY: 10 }],
    color: "#fff",
    fontSize: 17,
    fontWeight: "900",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  levelContainer: {
    alignItems: "center",
    padding: 10,
  },
  levelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  xpBarContainer: {
    width: "90%",
    height: 25,
    backgroundColor: "#ddd",
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  xpBar: {
    height: "100%",
    position: "absolute",
    left: 0,
    borderRadius: 15,
  },
  xpText: {
    color: "#000",
    fontWeight: "bold",
    position: "absolute",
    zIndex: 2,
  },
  
  rewardsContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#222", 
    paddingVertical: 1,
  },
  rewardSection: {
    flex: 1, 
    alignItems: "center",
    paddingVertical: 10,
  },
  leftReward: {
    borderRightWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#035A78",
  },
  rightReward: {
    backgroundColor: "#C77D00", 
  },
  rewardText: {
    color: "#F2E6D9", 
    fontSize: 16,
    fontWeight: "bold",
  },

  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    alignItems: "center",
  },
});

export default HeaderWithXP;

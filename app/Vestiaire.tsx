import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from "react-native";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import bonhomme from "../assets/images/main_page/bonhomme.png";
import battlepassImage from "../assets/images/shop/battlepass.webp";
import AvatarView from "@/components/AvatarView";

const allItems = {
  hauts: {
    tShirts: [
      { name: "T-shirt manches courtes rouge", image: "https://via.placeholder.com/100" },
      { name: "T-shirt manches longues noir", image: "https://via.placeholder.com/100" },
      { name: "T-shirt oversize blanc", image: "https://via.placeholder.com/100" },
      { name: "Crop top rose", image: "https://via.placeholder.com/100" },
    ],
    chemises: [
      { name: "Chemise unie blanche", image: "https://via.placeholder.com/100" },
      { name: "Chemise à carreaux bleue", image: "https://via.placeholder.com/100" },
      { name: "Chemise en jean", image: "https://via.placeholder.com/100" },
      { name: "Chemise hawaïenne", image: "https://via.placeholder.com/100" },
    ],
  },
  bas: {
    jeans: [
      { name: "Jean slim noir", image: "https://via.placeholder.com/100" },
      { name: "Jean droit bleu", image: "https://via.placeholder.com/100" },
    ],
  },
  chaussures: {
    sneakers: [
      { name: "Sneakers basses blanches", image: "https://via.placeholder.com/100" },
      { name: "Sneakers montantes noires", image: "https://via.placeholder.com/100" },
    ],
    bottes: [
      { name: "Bottes classiques marron", image: "https://via.placeholder.com/100" },
      { name: "Bottes motardes noires", image: "https://via.placeholder.com/100" },
    ],
  },
  accessoires: {
    chapeaux: [
      { name: "Casquette rouge", image: "https://via.placeholder.com/100" },
      { name: "Bob jaune", image: "https://via.placeholder.com/100" },
    ],
  },
};

const categoryIcons = {
  hauts: <FontAwesome5 name="tshirt" size={24} color="#fff" />, 
  bas: <MaterialCommunityIcons name="hanger" size={24} color="#fff" />, 
  chaussures: <MaterialCommunityIcons name="shoe-sneaker" size={24} color="#fff" />, 
  accessoires: <FontAwesome5 name="hat-cowboy" size={24} color="#fff" />, 
};

const VestiaireScreen = () => {
  const router = useRouter();
  const screenHeight = Dimensions.get("window").height;
  const [selectedCategory, setSelectedCategory] = useState<string>("hauts");
  const [selectedSubCategoryIndex, setSelectedSubCategoryIndex] = useState(0);
  const [selectedEmote, setSelectedEmote] = useState("idle2");
  
  const subCategories = selectedCategory ? Object.keys(allItems[selectedCategory]) : [];
  const selectedSubCategory = subCategories[selectedSubCategoryIndex];

  const nextSubCategory = () => {
    setSelectedSubCategoryIndex((prev) => (prev + 1) % subCategories.length);
  };

  const prevSubCategory = () => {
    setSelectedSubCategoryIndex((prev) => (prev - 1 + subCategories.length) % subCategories.length);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
      >
        <ArrowLeft size={32} color="#000" />
      </TouchableOpacity>

      <AvatarView animation={selectedEmote} />

      <View style={{ height: screenHeight * 0.25, backgroundColor: "#bbb" }}>
        <View style={{ flex: 0.3, flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
          {Object.entries(categoryIcons).map(([category, icon]) => (
            <TouchableOpacity
              key={category}
              onPress={() => { setSelectedCategory(category); setSelectedSubCategoryIndex(0); }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                padding: 10,
                backgroundColor: selectedCategory === category ? "#777" : "#999",
                marginHorizontal: 5,
                borderRadius: 20,
              }}
            >
              {icon}
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, backgroundColor: '#666', paddingVertical: 5 }}>
          <TouchableOpacity onPress={prevSubCategory}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{selectedSubCategory}</Text>
          <TouchableOpacity onPress={nextSubCategory}>
            <ChevronRight size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 0.7, backgroundColor: "#888", padding: 10 }}>
          {selectedCategory && selectedSubCategory && allItems[selectedCategory][selectedSubCategory] ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {allItems[selectedCategory][selectedSubCategory].map((item, idx) => (
                <View key={idx} style={{ alignItems: "center", marginRight: 10 }}>
                  <Image source={battlepassImage} style={{ width: 85, height: 90, borderRadius: 10 }} />
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={{ textAlign: "center", color: "#fff" }}>Aucune sous-catégorie sélectionnée</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default VestiaireScreen;

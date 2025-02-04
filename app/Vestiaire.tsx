import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Image } from "react-native";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import bonhomme from "../assets/images/main_page/bonhomme.png";
import battlepassImage from "../assets/images/shop/battlepass.webp";
import AvatarView from "@/components/AvatarView";
import images from "../assets/images";

  const allItems = {
    hauts: {
      tShirts: [
        { name: "T-shirt manches courtes rouge", image: images.tshirt1 },
        { name: "T-shirt manches longues noir", image: images.tshirt2 },
        { name: "T-shirt oversize blanc", image: images.tshirt3 },
        { name: "Crop top rose", image: images.tshirt4 },
      ],
      chemises: [
        { name: "Chemise unie blanche", image: images.chemise1 },
        { name: "Chemise à carreaux bleue", image: images.chemise2 },
        { name: "Chemise en jean", image: images.chemise3 },
        { name: "Chemise hawaïenne", image: images.chemise4 },
      ],
      pulls: [
        { name: "Pull col rond gris", image: images.pulls1 },
        { name: "Pull col V noir", image: images.pulls2 },
        { name: "Pull col roulé beige", image: images.pulls3 },
        { name: "Pull à capuche bleu", image: images.pulls4 },
      ],
      vestes: [
        { name: "Veste en cuir noire", image: images.veste1 },
        { name: "Veste en jean", image: images.veste2 },
        { name: "Bomber kaki", image: images.veste3 },
        { name: "Blazer gris", image: images.veste4 },
      ],
    },
    bas: {
      jeans: [
        { name: "Jean slim noir", image: images.jeans1 },
        { name: "Jean droit bleu", image: images.jeans2 },
        { name: "Jean déchiré", image: images.jeans3 },
        { name: "Jean bootcut", image: images.jeans4 },
      ],
      pantalons: [
        { name: "Pantalon chino beige", image: images.pantalon1 },
        { name: "Pantalon cargo vert", image: images.pantalon2 },
        { name: "Pantalon de survêtement gris", image: images.pantalon3 },
        { name: "Pantalon tailleur noir", image: images.pantalon4 },
      ],
      shorts: [
        { name: "Short en jean bleu", image: images.short1 },
        { name: "Short de sport noir", image: images.short2 },
        { name: "Short cargo beige", image: images.short3 },
        { name: "Short en lin blanc", image: images.short4 },
      ],
      jupes: [
        { name: "Jupe courte noire", image: images.jupe1 },
        { name: "Jupe midi rouge", image: images.jupe2 },
        { name: "Jupe longue verte", image: images.jupe3 },
        { name: "Jupe plissée beige", image: images.jupe4 },
      ],
    },
    chaussures: {
      sneakers: [
        { name: "Sneakers basses blanches", image: images.sneakers1 },
        { name: "Sneakers montantes noires", image: images.sneakers2 },
        { name: "Sneakers rétro rouges", image: images.sneakers3 },
        { name: "Sneakers running bleues", image: images.sneakers4 },
      ],
      bottes: [
        { name: "Bottes classiques marron", image: images.bottes1 },
        { name: "Bottes motardes noires", image: images.bottes2 },
        { name: "UGG beiges", image: images.bottes3 },
        { name: "Bottines grises", image: images.bottes4 },
      ],
    },
    accessoires: {
      chapeaux: [
        { name: "Casquette rouge", image: images.chapeau1 },
        { name: "Bob jaune", image: images.chapeau2 },
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
      <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
        <AvatarView animation={selectedEmote} />
      </View>
        

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
                  <Image source={item.image} style={{ width: 85, height: 90, borderRadius: 10 }} />
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

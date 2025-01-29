import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import battlepassImage from '../../../assets/images/shop/battlepass.webp';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Boutique = () => {
  const router = useRouter();
  const { updatedSportyx = 0 } = useLocalSearchParams(); 
  const [sportyx, setSportyx] = useState(Number(updatedSportyx)); 

  const handleNavigateToSportyxSeller = () => {
    router.push('/(tabs)/shop/sportyxSeller'); 
  };

  const handlePurchase = (itemName, price) => {
    if (sportyx >= price) {
      setSportyx((prev) => prev - price);
      Alert.alert('Achat réussi', `Vous avez acheté ${itemName} pour ${price} Sportyx ⚡ !`);
    } else {
      Alert.alert('Achat impossible', "Vous n'avez pas assez de Sportyx ⚡ !");
    }
  };

  // Articles par rubrique
  const items = {
    Vetements: {
      Hauts: [
        { id: 1, name: 'T-Shirt', price: 100, image: 'https://via.placeholder.com/100' },
        { id: 2, name: 'Chemise', price: 150, image: 'https://via.placeholder.com/100' },
        { id: 3, name: 'Pull', price: 200, image: 'https://via.placeholder.com/100' },
        { id: 4, name: 'Hoodie', price: 250, image: 'https://via.placeholder.com/100' },
      ],
      Pantalons: [
        { id: 5, name: 'Jean', price: 200, image: 'https://via.placeholder.com/100' },
        { id: 6, name: 'Jogging', price: 120, image: 'https://via.placeholder.com/100' },
      ],
      Chaussures: [
        { id: 7, name: 'Baskets', price: 250, image: 'https://via.placeholder.com/100' },
        { id: 8, name: 'Bottes', price: 300, image: 'https://via.placeholder.com/100' },
        { id: 9, name: 'Sandales', price: 100, image: 'https://via.placeholder.com/100' },
      ],
      Accessoires: [
        { id: 10, name: 'Casquette', price: 50, image: 'https://via.placeholder.com/100' },
        { id: 11, name: 'Montre', price: 400, image: 'https://via.placeholder.com/100' },
      ],
    },
    Coffres: [
      { id: 12, name: 'Petit Coffre', price: 50, image: 'https://via.placeholder.com/100' },
      { id: 13, name: 'Grand Coffre', price: 150, image: 'https://via.placeholder.com/100' },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}  showsVerticalScrollIndicator={false}>
      {/* Header avec titre et compteur de Sportyx */}
      <View style={styles.header}>
        <Text style={styles.title}>Boutique</Text>
        <View style={styles.sportyxContainer}>
          <Text style={styles.sportyxText}>⚡ {sportyx}</Text>
          <TouchableOpacity style={styles.buyButton} onPress={handleNavigateToSportyxSeller}>
            <Text style={styles.buyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bloc Battle Pass */}
      <View style={styles.battlePassContainer}>
        <Image source={battlepassImage} style={styles.battlePassImage} />
        <TouchableOpacity
          style={styles.purchaseButton}
          onPress={() => handlePurchase('Battle Pass', 500)}
        >
          <Text style={styles.purchaseButtonText}>Acheter pour 500 ⚡</Text>
        </TouchableOpacity>
      </View>

      {/* Bloc Vêtements */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Vêtements</Text>
        {Object.keys(items.Vetements).map((subCategory) => (
          <View key={subCategory} style={styles.subBlock}>
            <Text style={styles.subtitle}>{subCategory}</Text>
            <FlatList
              data={items.Vetements[subCategory]}
              renderItem={({ item }) => (
                <View style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <Text style={styles.itemName}>{item.name}</Text>
                  <TouchableOpacity
                    style={styles.purchaseButton}
                    onPress={() => handlePurchase(item.name, item.price)}
                  >
                    <Text style={styles.purchaseButtonText}>{item.price} ⚡</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={styles.horizontalScroll}
            />
          </View>
        ))}
      </View>

      {/* Bloc Coffres */}
      <View style={styles.block}>
        <Text style={styles.blockTitle}>Coffres</Text>
        <FlatList
          data={items.Coffres}
          renderItem={({ item }) => (
            <View style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <Text style={styles.itemName}>{item.name}</Text>
              <TouchableOpacity
                style={styles.purchaseButton}
                onPress={() => handlePurchase(item.name, item.price)}
              >
                <Text style={styles.purchaseButtonText}>{item.price} ⚡</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.horizontalScroll}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sportyxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sportyxText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  buyButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  block: {
    marginBottom: 30,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  blockTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subBlock: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  horizontalScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemCard: {
    width: Dimensions.get('window').width / 3 - 26, 
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  purchaseButton: {
    backgroundColor: '#FFD700',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  battlePassContainer: {
    marginBottom: 20,
  },
  battlePassImage: {
    width: '100%',
    height: 200,
  },
});

export default Boutique;

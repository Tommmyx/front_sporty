import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';

const SportyxSeller = () => {
  const router = useRouter();
  const [sportyx, setSportyx] = useState(1500); 

  const handleBackToShop = () => {
    router.replace({
      pathname: '/(tabs)/shop',
      params: { updatedSportyx: sportyx }, 
    });
  };

  const handlePurchase = (price, amount, bonus) => {
    Alert.alert(
      'Achat réussi',
      `Vous avez acheté ${amount} Sportyx ⚡ et obtenu ${bonus} Sportyx gratuits !`
    );
    setSportyx((prev) => prev + amount + bonus); 
  };

  const discountedOffers = [
    { id: 1, price: 4.99, amount: 500, bonus: 500 }, 
    { id: 2, price: 9.99, amount: 1200, bonus: 1200 }, 
    { id: 3, price: 19.99, amount: 3000, bonus: 3000 }, 
  ];

  const bonusOffer = {
    id: 1,
    price: 50, 
    amount: 1000, 
    bonusItem: "1 T-shirt exclusif et 1 Casquette", 
  };


  const regularOffers = [
    { id: 1, price: 0.99, amount: 100, bonus: 0 },    
    { id: 2, price: 4.99, amount: 500, bonus: 75 },   
    { id: 3, price: 9.99, amount: 1200, bonus: 200 }, 
    { id: 4, price: 19.99, amount: 3000, bonus: 500 }, 
    { id: 5, price: 39.99, amount: 6500, bonus: 1200 },
    { id: 6, price: 99.99, amount: 18000, bonus: 4000 },
  ];
  
  

  return (
    <View style={styles.container}>
      {/* Haut de page */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackToShop} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Achat de Sportyx</Text>
        <Text style={styles.sportyxCount}>⚡ {sportyx}</Text>
      </View>

      {/* Corps de la page */}
      <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator={false}>
        {/* Première partie : Sportyx à prix réduit */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sportyx à prix réduit</Text>
          <View style={styles.offersContainer}>
            {discountedOffers.map((offer) => (
              <View key={offer.id} style={styles.offerCard}>
                <View style={styles.imagePlaceholder} />
                <Text style={styles.offerDescription}>
                  {offer.amount} Sportyx ⚡
                </Text>
                <Text style={styles.bonusText}>
                  + {offer.bonus} Sportyx gratuits
                </Text>
                <TouchableOpacity
                  style={styles.priceButton}
                  onPress={() =>
                    handlePurchase(offer.price, offer.amount, offer.bonus)
                  }
                >
                  <Text style={styles.priceButtonText}>{offer.price} €</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Deuxième partie : Sportyx + bonus */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sportyx + bonus</Text>
          <View style={styles.bonusOfferContainer}>
            <View style={styles.bonusImagePlaceholder} />
            <Text style={styles.bonusDescription}>
              {bonusOffer.amount} Sportyx ⚡
            </Text>
            <Text style={styles.bonusText}>
              Bonus : {bonusOffer.bonusItem}
            </Text>
            <TouchableOpacity
              style={styles.priceButton}
              onPress={() =>
                handlePurchase(bonusOffer.price, bonusOffer.amount, 0) 
              }
            >
              <Text style={styles.priceButtonText}>{bonusOffer.price} €</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* Troisième partie : Sportyx */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sportyx</Text>
          <View style={styles.offersContainer}>
            {regularOffers.map((offer) => (
              <View key={offer.id} style={styles.offerCard}>
                <View style={styles.imagePlaceholder} />
                <Text style={styles.offerDescription}>
                  {offer.amount} Sportyx ⚡
                </Text>
                <Text style={styles.bonusText}>
                  + {offer.bonus} Sportyx gratuits
                </Text>
                <TouchableOpacity
                  style={styles.priceButton}
                  onPress={() =>
                    handlePurchase(offer.price, offer.amount, offer.bonus)
                  }
                >
                  <Text style={styles.priceButtonText}>{offer.price} €</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  sportyxCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  body: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  offersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  offerCard: {
    width: '30%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    backgroundColor: '#e0e0e0',
    borderRadius: 30,
    marginBottom: 8,
  },
  offerDescription: {
    fontSize: 12, 
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  bonusText: {
    fontSize: 10, 
    color: '#007BFF', 
    marginBottom: 8,
    textAlign: 'center',
  },
  priceButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  priceButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionContent: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  placeholder: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  bonusOfferContainer: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  bonusImagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  bonusDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SportyxSeller;

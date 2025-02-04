import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTshirt, faBook, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'expo-router';
import images from "../../../assets/images";

const Collection = () => {
  const router = useRouter();
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const toggleSwitch = () => {
    setIsSwitchOn((previousState) => !previousState);
  };

  const handleSearchButton = () => {
    router.push('/(tabs)/collection/search'); 
  };

  // Dictionnaire représentant tous les items présents dans le jeu
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

  // Dictionnaire représentant les items que l'utilisateur possède
  const userItems = {
    hauts: {
      tShirts: [{ name: "T-shirt manches courtes rouge" }, { name: "T-shirt oversize blanc" }],
      chemises: [{ name: "Chemise unie blanche" }],
    },
    accessoires: {
      chapeaux: [
        { name: "Casquette rouge", image: 'https://via.placeholder.com/100' },
        { name: "Bob jaune", image: 'https://via.placeholder.com/100' },
      ],
    },
  };

  return (
    <>
      <View style={styles.fixedHeader}>
        <View style={styles.collectionContainer}>
          <Text style={styles.collectionText}>Collection</Text>
          <View style={styles.horizontalBar} />
        </View>

        <View style={styles.headerContainer}>
          <View style={styles.leftSection}>
            <FontAwesomeIcon icon={faTshirt} size={24} style={styles.icon} />
            <Text style={styles.text}>5</Text>
          </View>

          <View style={styles.verticalBar} />

          <View style={styles.rightSection}>
            <FontAwesomeIcon icon={faBook} size={24} style={styles.icon} />
            <Switch
              onValueChange={toggleSwitch}
              value={isSwitchOn}
              style={styles.switch}
            />

            <View style={styles.verticalBar} />

            <TouchableOpacity
              onPress={handleSearchButton} 
              style={styles.searchButton}
            >
              <FontAwesomeIcon icon={faSearch} size={24} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.bodyContainer}>
        {Object.keys(allItems).map((category) => {
          const userHasItemsInCategory = userItems[category];

          if (!isSwitchOn && !userHasItemsInCategory) {
            return null;
          }

          const totalItemsInCategory = Object.values(allItems[category]).flat().length;
          const ownedItemsInCategory = Object.values(userItems[category] || {}).flat().length;

          return (
            <View key={category} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>
                {category.toUpperCase()} ({ownedItemsInCategory}/{totalItemsInCategory})
              </Text>

              {Object.keys(allItems[category]).map((subCategory) => {
                const userItemsInSubCategory =
                  userItems[category]?.[subCategory]?.map((item) => item.name) || [];

                const totalItemsInSubCategory = allItems[category][subCategory].length;
                const ownedItemsInSubCategory = userItemsInSubCategory.length;

                const itemsToDisplay = isSwitchOn
                  ? allItems[category][subCategory]
                  : allItems[category][subCategory].filter((item) =>
                      userItemsInSubCategory.includes(item.name)
                    );

                if (!isSwitchOn && itemsToDisplay.length === 0) {
                  return null;
                }

                return (
                  <View key={subCategory} style={styles.subCategoryContainer}>
                    <Text style={styles.subCategoryTitle}>
                      {subCategory.toUpperCase()} ({ownedItemsInSubCategory}/{totalItemsInSubCategory})
                    </Text>
                    <View style={styles.itemsContainer}>
                      {itemsToDisplay.map((item, index) => {
                        const isOwned = userItemsInSubCategory.includes(item.name);

                        return (
                          <View
                            key={index}
                            style={[
                              styles.itemContainer,
                              isSwitchOn && isOwned && styles.ownedItemContainer,
                            ]}
                          >
                            <Image
                              source={item.image}
                              style={[
                                styles.itemImage,
                                isSwitchOn && isOwned && styles.ownedItemImage,
                              ]}
                            />
                            <Text
                              style={[
                                styles.itemText,
                                isSwitchOn && isOwned && styles.ownedItemText,
                              ]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  collectionContainer: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  collectionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  horizontalBar: {
    width: '90%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  icon: {
    color: '#333',
    marginHorizontal: 5,
  },
  switch: {
    marginHorizontal: 10,
  },
  verticalBar: {
    width: 1,
    height: 30,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  searchButton: {
    padding: 5,
  },
  bodyContainer: {
    marginTop: 120,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 50,
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subCategoryContainer: {
    marginBottom: 15,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemContainer: {
    width: '45%',
    margin: '2.5%',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  ownedItemContainer: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginBottom: 5,
    borderRadius: 8,
  },
  ownedItemImage: {
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  itemText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  ownedItemText: {
    fontWeight: 'bold',
    color: '#4caf50',
  },
});

export default Collection;

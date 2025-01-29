import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SearchPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [selectedHaut, setSelectedHaut] = useState('Tout');
  const [selectedBas, setSelectedBas] = useState('Tout');
  const [selectedChaussures, setSelectedChaussures] = useState('Tout');
  const [selectedAccessoires, setSelectedAccessoires] = useState('Tout');

  const handleCategorySelect = (categorySetter, category) => {
    categorySetter(category);
  };

  const handleSearchButton = () => {
    router.back(); 
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Body */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Haut */}
        <View style={styles.favoriteSection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.sectionTitle}>Haut</Text>
            <TouchableOpacity
              onPress={() => handleCategorySelect(setSelectedHaut, 'Tout')}
              style={[
                styles.buttonSmall,
                selectedHaut === 'Tout' && styles.buttonSelected,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedHaut === 'Tout' && styles.buttonTextSelected,
                ]}
              >
                Tout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {['T-Shirts', 'Chemises', 'Pulls', 'Vestes'].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(setSelectedHaut, category)}
                style={[
                  styles.buttonFullWidth,
                  selectedHaut === category && styles.buttonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedHaut === category && styles.buttonTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bas */}
        <View style={styles.favoriteSection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.sectionTitle}>Bas</Text>
            <TouchableOpacity
              onPress={() => handleCategorySelect(setSelectedBas, 'Tout')}
              style={[
                styles.buttonSmall,
                selectedBas === 'Tout' && styles.buttonSelected,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedBas === 'Tout' && styles.buttonTextSelected,
                ]}
              >
                Tout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {['Jeans', 'Pantalons', 'Shorts', 'Jupes'].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(setSelectedBas, category)}
                style={[
                  styles.buttonFullWidth,
                  selectedBas === category && styles.buttonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedBas === category && styles.buttonTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Chaussures */}
        <View style={styles.favoriteSection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.sectionTitle}>Chaussures</Text>
            <TouchableOpacity
              onPress={() => handleCategorySelect(setSelectedChaussures, 'Tout')}
              style={[
                styles.buttonSmall,
                selectedChaussures === 'Tout' && styles.buttonSelected,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedChaussures === 'Tout' && styles.buttonTextSelected,
                ]}
              >
                Tout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {['Sneakers', 'Bottes'].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(setSelectedChaussures, category)}
                style={[
                  styles.buttonFullWidth,
                  selectedChaussures === category && styles.buttonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedChaussures === category && styles.buttonTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Accessoires */}
        <View style={styles.favoriteSection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.sectionTitle}>Accessoires</Text>
            <TouchableOpacity
              onPress={() => handleCategorySelect(setSelectedAccessoires, 'Tout')}
              style={[
                styles.buttonSmall,
                selectedAccessoires === 'Tout' && styles.buttonSelected,
              ]}
            >
              <Text
                style={[
                  styles.buttonText,
                  selectedAccessoires === 'Tout' && styles.buttonTextSelected,
                ]}
              >
                Tout
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {['Chapeaux'].map((category) => (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategorySelect(setSelectedAccessoires, category)}
                style={[
                  styles.buttonFullWidth,
                  selectedAccessoires === category && styles.buttonSelected,
                ]}
              >
                <Text
                  style={[
                    styles.buttonText,
                    selectedAccessoires === category && styles.buttonTextSelected,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* OK Button */}
      <TouchableOpacity onPress={handleSearchButton} style={styles.okButton}>
        <Text style={styles.okButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  favoriteSection: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSmall: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  buttonFullWidth: {
    flexBasis: '48%', 
    margin: '1%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelected: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  buttonTextSelected: {
    color: '#fff',
  },
  okButton: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchPage;

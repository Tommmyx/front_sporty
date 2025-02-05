import React, { useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { useRouter } from 'expo-router';

const AmisList = [
  { id: '1', name: 'Lou', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '2', name: 'Cédric', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '3', name: 'Noura', avatar: 'https://randomuser.me/api/portraits/women/50.jpg' },
];

const GroupesList = [
  { id: '1', name: '🚀 Les fous de muscu' },
  { id: '2', name: '🏋️ Fitness Friends' },
];

const ListeAmis = ({ onSelect }) => (
  <FlatList
    data={AmisList}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

const ListeGroupes = ({ onSelect }) => (
  <FlatList
    data={GroupesList}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => onSelect(item)}>
        <View style={styles.itemContainer}>
          <Text style={styles.emoji}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

export default function Communaute() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'amis', title: 'Amis' },
    { key: 'groupes', title: 'Groupes' },
  ]);

  const handleSelect = (item) => {
    router.push({ pathname: '/FriendChat', params: { item: JSON.stringify(item) } }); 
  };

  const renderScene = SceneMap({
    amis: () => <ListeAmis onSelect={handleSelect} />,
    groupes: () => <ListeGroupes onSelect={handleSelect} />,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#000' }}
            style={{ backgroundColor: '#fff' }}
            activeColor="black"
            inactiveColor="grey"
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // ✅ Fond blanc
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10, // ✅ Arrondi moderne
    marginVertical: 6, 
    marginHorizontal: 10,
    backgroundColor: "rgba(180, 230, 220, 0.9)", // ✅ Bleu pastel pour les cartes amis/groupes
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25, // ✅ Avatar rond
    marginRight: 10,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.9)", // ✅ Bordure blanche subtile autour des avatars
  },
  itemText: {
    fontSize: 16,
    color: "#333", // ✅ Texte noir foncé pour la lisibilité
  },
  emoji: {
    fontSize: 18,
    color: "#333", 
    paddingVertical: 5, 
  }
});

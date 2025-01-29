import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell, faHouse, faGlobe, faStore, faRobot, faShirt } from '@fortawesome/free-solid-svg-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        position: 'absolute', // Barre fixe en bas
        bottom: 0, // Collée au bas
        left: 0, // Étendue sur toute la largeur
        right: 0,
        backgroundColor: '#ffffff', // Fond blanc
        borderTopWidth: 0.5, // Bordure fine en haut
        borderTopColor: '#d1d1d1', // Couleur de la bordure
        height: 50,
        paddingTop: 5,
        shadowColor: '#000',
        elevation: 10, // Ombre pour Android
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -2 },
      },
      tabBarShowLabel: false, // Désactiver les labels (noms sous les icônes)
      tabBarActiveTintColor: '#000000', // Couleur des icônes actives
      tabBarInactiveTintColor: '#808080', // Couleur des icônes inactives
    }}>
      <Tabs.Screen
        name="index" 
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHouse} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="collection" 
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faShirt} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="community" 
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faGlobe} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="training" 
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faDumbbell} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="shop"  
        options={{
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faStore} color={color} size={24} />,
          headerShown: false,
        }}
      />
    </Tabs>
    
  );
}

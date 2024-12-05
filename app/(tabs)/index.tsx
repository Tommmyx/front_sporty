import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen'; 
import CameraScreen from './Camera'; 
import HomeScreen from './HomeScreen';
import CreateProfil from './CreateProfil';

import "../../global.css"
import Boutique from './Boutique';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStore, faHouse, faGlobe } from '@fortawesome/free-solid-svg-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            width: '80%', // Réduit la largeur de la barre
            left: '10%',
            borderRadius: 15, // Arrondi de la barre
            backgroundColor: '#6200ea', // Couleur de fond
            height: 60, // Hauteur de la barre
            position: 'absolute', // La rend flottante
            bottom: 20, // La positionne légèrement au-dessus du bas
            shadowColor: '#000', // Ombre pour le style
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
          },
          tabBarLabelStyle: {
            fontSize: 14, // Taille des labels
          },
          tabBarActiveTintColor: '#ffeb3b', // Couleur de l'onglet actif
          tabBarInactiveTintColor: '#ffffff', // Couleur des onglets inactifs
        }}
      >
        <Tab.Screen
          name="Boutique"
          component={Boutique}
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faStore} color={color} size={size || 24} /> 
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            headerShown: false, 
            title: 'Accueil', 
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faHouse} color={color} size={size || 24} />
            ),
          }}
        />
        <Tab.Screen
          name="Communauté"
          component={CameraScreen}
          options={{ 
            headerShown: false, 
            title: 'Communauté',
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faGlobe} color={color} size={size || 24} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

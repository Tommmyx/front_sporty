import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; 
import HomeScreen from './HomeScreen';
import Communaute from './Communaute';
import StartTraining from './StartTraining'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell, faHouse, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ExploreRoutine from './ExploreRoutine';
import CameraScreen from './Camera';
import TrainingScreen from './TrainingScreen';
import { SafeAreaView } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); 

function TrainingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      <Stack.Screen name="StartTraining" component={StartTraining} />
      <Stack.Screen name="ExploreRoutine" component={ExploreRoutine} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="TrainingScreen" component={TrainingScreen} />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            position: 'absolute', // Pour garantir qu'elle reste fixe au bas
            bottom: 0, // Coller la barre en bas de l'écran
            left: 0, // Étendre sur tout l'écran horizontalement
            right: 0,
            backgroundColor: '#ffffff', // Fond blanc
            borderTopWidth: 0.5, // Fine bordure en haut
            borderTopColor: '#d1d1d1', // Gris clair pour la bordure
            height: 60,
            //paddingBottom: 20, // Ajuste pour l'encoche (Safe Area)
            shadowColor: '#000',
            elevation: 10, // Ombre pour Android
            shadowColor: '#000', // Ombre pour iOS
            shadowOpacity: 0.1,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: -2 },
            paddingBottom: 0,
            
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
            marginTop: 0, // Aucun décalage supplémentaire
            
          },
          tabBarIconStyle: {
            marginTop: 4, // Ajuste l'espacement de l'icône vers le bas
        },
          tabBarActiveTintColor: '#000000', // Couleur noire pour l'icône active
          tabBarInactiveTintColor: '#808080',
        }}
      >
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
          name="Training"
          component={TrainingStack}
          options={{ 
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <FontAwesomeIcon icon={faDumbbell} color={color} size={size || 24} /> 
            ),
          }}
        />

        <Tab.Screen
          name="Communauté"
          component={Communaute}
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
    </SafeAreaView>
  );
}

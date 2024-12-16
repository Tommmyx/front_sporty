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
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            width: '90%',
            left: '5%',
            borderRadius: 15,
            backgroundColor: '#6200ea',
            height: 60,
            position: 'absolute',
            bottom: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            
          },
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarItemStyle: {
            padding: 10,
          },
          tabBarActiveTintColor: '#ffeb3b',
          tabBarInactiveTintColor: '#ffffff',
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
  );
}

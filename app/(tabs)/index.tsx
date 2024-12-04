import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './LoginScreen'; 
import CameraScreen from './Camera'; 
import HomeScreen from './HomeScreen';
import CreateProfil from './CreateProfil';
import ProfileScreen from './ProfileScreen';
import StatisticsScreen from './StatisticsScreen';


import "../../global.css"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false, title: 'Accueil' }}/>
      <Tab.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
      <Tab.Screen name="CreateProfil" component={CreateProfil} options={{ headerShown: false }} />
      <Tab.Screen name="Profil" component={ProfileScreen} options={{ headerShown: false }} />
      <Tab.Screen name="Statistics" component={StatisticsScreen} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
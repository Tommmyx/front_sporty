import { Tabs } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faDumbbell, faHouse, faGlobe, faStore, faRobot } from '@fortawesome/free-solid-svg-icons';

export default function Layout() {
  return (
    <Tabs screenOptions={{
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
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: -2 },
        paddingBottom: 0,
        
      },
      tabBarLabelStyle: {
        fontSize: 11,
        marginBottom: 4,
        marginTop: 0, // Aucun décalage supplémentaire
        
      },
      tabBarIconStyle: {
        marginTop: 4, // Ajuste l'espacement de l'icône vers le bas
    },
      tabBarActiveTintColor: '#000000', // Couleur noire pour l'icône active
      tabBarInactiveTintColor: '#808080',
    }}>
      <Tabs.Screen
        name="index" 
        options={{
          title: 'Accueil',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faHouse} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Store" 
        options={{
          title: 'Boutique',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faStore} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="training" 
        options={{
          title: 'Entraînement',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faDumbbell} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="community" 
        options={{
          title: 'Communauté',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faGlobe} color={color} size={24} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Chatbot" 
        options={{
          title: 'IA',
          tabBarIcon: ({ color }) => <FontAwesomeIcon icon={faRobot} color={color} size={24} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Screens
import { HomeScreen } from '../../screens/Home/HomeScreen';
import { SearchScreen } from '../../screens/Search/SearchScreen';
import { CreateBetScreen } from '../../screens/CreateBet/CreateBetScreen';
import TrendingScreen from '../../screens/Trending/TrendingScreen';
import { ProfileScreen } from '../../screens/Profile/ProfileScreen';

// Custom TabBar
import { TabBar } from '../../components/organisms/TabBar';

// Types
import { TabNavigatorParamList } from './types';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

export const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen}
        options={{
          tabBarLabel: 'Recherche',
        }}
      />
      <Tab.Screen 
        name="CreateBet" 
        component={CreateBetScreen}
        options={{
          tabBarLabel: 'Créer',
        }}
      />
      <Tab.Screen 
        name="Trending" 
        component={TrendingScreen}
        options={{
          tabBarLabel: 'Tendances',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

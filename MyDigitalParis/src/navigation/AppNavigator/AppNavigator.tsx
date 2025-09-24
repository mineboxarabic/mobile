import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Navigators
import { TabNavigator } from '../TabNavigator';

// Screens (for modal/detail screens)
import { BetDetailsScreen } from '../../screens/Shared/BetDetailsScreen';

// Types
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false, // Hide headers since tabs will handle their own
        }}
      >
        {/* Main Tab Navigator - contains all main screens with bottom navigation */}
        <Stack.Screen 
          name="MainTabs" 
          component={TabNavigator}
          options={{
            headerShown: false,
          }}
        />
        
        {/* Modal/Detail screens that appear over the tab navigation */}
        <Stack.Screen 
          name="BetDetails" 
          component={BetDetailsScreen}
          options={{
            presentation: 'modal',
            headerShown: true,
            headerTitle: 'Détails du pari',
            headerStyle: {
              backgroundColor: '#3B82F6',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

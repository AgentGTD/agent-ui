import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { InboxScreen } from './src/screens/InboxScreen';
import { ProjectsScreen } from './src/screens/ProjectsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Inbox"
            screenOptions={{
              tabBarActiveTintColor: '#6200ee',
              tabBarInactiveTintColor: 'gray',
            }}
          >
            <Tab.Screen
              name="Inbox"
              component={InboxScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="inbox" color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="Projects"
              component={ProjectsScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <MaterialCommunityIcons name="folder" color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

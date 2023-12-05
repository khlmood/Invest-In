import React from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import StocksScreen from './StocksScreen';
import CommunityScreen from './CommunityScreen';
import MessagesScreen from './MessagesScreen';
import CustomDrawerContent from './CustomDrawerContent';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const MyTabs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false, 
          tabBarActiveTintColor: 'blue', 
          tabBarInactiveTintColor: 'gray',
          tabBarShowLabel: false, 
        }}
        >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Stocks" 
          component={StocksScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="stats-chart-outline" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Community" 
          component={CommunityScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="people-outline" color={color} size={size} />
            ),
          }} 
        />
        <Tab.Screen 
          name="Messages" 
          component={MessagesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon name="chatbubbles-outline" color={color} size={size} />
            ),
          }} 
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={({route}) => ({
          // Hide the 'Tabs' screen from the drawer menu
          drawerItemStyle: route.name === 'Tabs' ? { height: 0 } : {},
          drawerLabelStyle: route.name === 'Tabs' ? { display: 'none' } : {},
          unmountOnBlur: route.name === 'Tabs',
        })}
      >
        <Drawer.Screen name="Tabs" component={MyTabs} />
        {/* Other Drawer Screens */}
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

export default HomePage;

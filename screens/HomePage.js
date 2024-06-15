import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from './../firebaseConfig';

import HomeScreen from './HomeScreen';
import StocksScreen from './StocksScreen';
import CommunityScreen from './CommunityScreen';
import MessagesScreen from './MessagesScreen';
import CustomDrawerContent from './CustomDrawerContent';
import ProfilScreen from './drawer/ProfilScreen';
import SettingsScreen from './drawer/SettingsScreen';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createNativeStackNavigator();


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


const MainDrawer = ({ userData }) => {  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} userData={userData} />}
        screenOptions={({route}) => ({
          // Hide the 'Tabs' screen from the drawer menu
          drawerItemStyle: route.name === 'Tabs' ? { height: 0 } : {},
          drawerLabelStyle: route.name === 'Tabs' ? { display: 'none' } : {},
          unmountOnBlur: route.name === 'Tabs',
        })}
      >
        <Drawer.Screen name="Tabs" component={MyTabs} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
};

const HomePage = () => {
  const [userData, setUserData] = useState({
    email: '',
    username: '',
    profilePicture:'',
    numberOfFollowers: 0,
    numberOfFollowing: 0,
    balance: 0,
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, 'users', FIREBASE_AUTH.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData({
            email: data.email,
            username: data.username,
            profilePicture: data.profilePicture,
            numberOfFollowers: data.followersCount,
            numberOfFollowing: data.followingCount,
            balance: data.balance,
          });
          }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (FIREBASE_AUTH.currentUser) {
      fetchUserData();
    }
  }, [FIREBASE_AUTH.currentUser?.uid]);

  return (
    <RootStack.Navigator>
      <RootStack.Screen name="MainDrawer" options={{ headerShown: false }}>
        {props => <MainDrawer {...props} userData={userData} />}
      </RootStack.Screen>
      <RootStack.Screen name="Profil" component={ProfilScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
};


export default HomePage;

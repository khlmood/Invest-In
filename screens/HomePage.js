import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'; 
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { doc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB, FIREBASE_AUTH } from './../firebaseConfig';
import { useNavigation } from '@react-navigation/native';


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

const g_userdata = []

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


const MainDrawer = () => {  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} userData={g_userdata} />}
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
    userCompleteReg: false
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(FIREBASE_DB, 'users', FIREBASE_AUTH.currentUser.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const updatedUserData = {
            email: data.email,
            username: data.username,
            profilePicture: data.profilePicture ? { uri: data.profilePicture } : require('./../assets/userDefault.png'),
            numberOfFollowers: data.followersCount,
            numberOfFollowing: data.followingCount,
            balance: data.balance,
            userCompleteReg: data.userCompleteReg
          };
          setUserData(updatedUserData);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (FIREBASE_AUTH.currentUser) {
      fetchUserData();
    }
  }, [FIREBASE_AUTH.currentUser?.uid]);

  useEffect(() => {
    g_userdata[0] = userData.email;
    g_userdata[1] = userData.username;
    g_userdata[2] = userData.profilePicture;
    g_userdata[3] = userData.numberOfFollowers;
    g_userdata[4] = userData.numberOfFollowing;
    g_userdata[5] = userData.balance;
    g_userdata[6] = userData.userCompleteReg;
  }, [userData]);

  const navigation = useNavigation();

  useEffect(() => {
    // Automatically navigate to Profile screen if userCompleteReg is false
    if (userData.userCompleteReg === false) {
      navigation.navigate('Profil', { userData, setUserData });
    }
  }, [userData.userCompleteReg, navigation]);


  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{ headerShown: false }}
      />
      <RootStack.Screen name="Profil" component={ProfilScreen} />
      <RootStack.Screen name="Settings" component={SettingsScreen} />
    </RootStack.Navigator>
  );
};


export default HomePage;

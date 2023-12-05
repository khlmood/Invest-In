import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FIREBASE_AUTH } from './../firebaseConfig';

const CustomDrawerContent = (props) => {
  const numberOfFollowers = 0;
  const numberOfFollowing = 0;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <View style={styles.profileCircle}>
          <Image 
            source={require('./../assets/userDefault.png')} 
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>UserNameHere</Text>
        <Text style={styles.userStats}>{numberOfFollowers} followers   {numberOfFollowing} following</Text>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Profil')}>
          <Text>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Settings')}>
          <Text>Settings</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={() => {FIREBASE_AUTH.signOut()}}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    padding: 20,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
    overflow: 'hidden', 
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  userStats: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  logoutButton: {
    marginTop: 15,
    paddingVertical: 10,
    alignItems: 'center',
    width: '100%',
  },
  logoutText: {
    color: 'red',
  },
});

export default CustomDrawerContent;

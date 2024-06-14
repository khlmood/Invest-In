import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FIREBASE_AUTH } from './../firebaseConfig';
import Icon from 'react-native-vector-icons/Ionicons';

// email[0], username[1], profilePicture[2], numberOfFollowers[3], numberOfFollowing[4], balance[5]
const CustomDrawerContent = ({userData, ...props}) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <View style={styles.profileCircle}>
          <Image 
            source={require('./../assets/userDefault.png')} 
            style={styles.profileImage}
          />
        </View>
        <Text style={styles.userName}>{ userData[1] }</Text>
        <Text style={styles.userStats}>{userData[3]} followers   {userData[4]} following</Text>
        <DrawerItemList {...props} />
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Profil')}>
          <Icon name="person-outline" size={25} color="black" style={{paddingRight: 20}} />
          <Text style={styles.items}>Profil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('Settings')}>
        <Icon name="settings-outline" size={25} color="black" style={{paddingRight: 20}} />
          <Text style={styles.items} >Settings</Text>
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
    flexDirection: 'row',
    paddingVertical: 10,
    width: '100%',
    height: 50,
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
  items: {
    fontSize: 20,
    fontFamily: '',
  },
});

export default CustomDrawerContent;

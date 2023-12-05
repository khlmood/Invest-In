import React from 'react';
import { View, Text, Button } from 'react-native';
import { FIREBASE_AUTH } from './../firebaseConfig';


function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
        <Button title='Sign out'onPress={() => {FIREBASE_AUTH.signOut()}} />
      </View>
    );
  }


  export default HomeScreen;
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';



function MessagesScreen({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({ headerTitle: 'Messages' });
    }, [navigation])
  );
  const writeMessage = () => {

  }
  return (
    <View style={{ flex: 1, justifyContent: 'left', alignItems: 'left' }}>
      <Text style={styles.title}>Welcome to your messages inbox !</Text>
      <Text style={styles.description}>Drop a line, share posts and more with private conversations between you and others on Invest'In</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={writeMessage}>
        <Text style={styles.buttonText}>Write a message</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15, 
    color: 'black',
    paddingBottom: 20,
  },
  buttonText: {
    fontSize: 18, 
    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: 'lightblue',
    borderRadius: 35, 
    paddingVertical: 20, 
    paddingHorizontal: 40, 
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MessagesScreen;
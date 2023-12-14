import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { updateDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../firebaseConfig'; // Update the path as needed

const ProfilScreen = ({ route }) => {
  const { userData, setUserData } = route.params;
  const [username, setUsername] = useState(userData.username);

  const handleUpdateUsername = async () => {
    try {
      const userDocRef = doc(FIREBASE_DB, 'users', userData.uid); // Ensure you have the correct uid
      await updateDoc(userDocRef, { username, userCompleteReg: true });

      setUserData({ ...userData, username, userCompleteReg: true });
      // Navigate to Home Screen or close the Profile screen
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profilePicButton}>
        <Text>Change Profile Picture</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Change Username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={handleUpdateUsername}>
        <Text style={styles.buttonText}>Update Username</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profilePicButton: {
    backgroundColor: '#e7e7e7',
    padding: 15,
    borderRadius: 100,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#1DA1F2',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Add any other styles you might need
});


export default ProfilScreen;

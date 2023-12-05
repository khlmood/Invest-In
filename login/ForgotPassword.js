import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FIREBASE_AUTH } from './../firebaseConfig';
import { sendPasswordResetEmail } from "firebase/auth";

const ForgetPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handlePasswordReset = async () => {
    if (email === '') {
      Alert.alert('Enter Email', 'Please enter your email address.');
      return;
    }

    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert('Check your Email', 'A link to reset your password has been sent to your email address.');
      navigation.goBack();
    } catch (error) {
      console.error('Forgot Password Page: ' + error);
      Alert.alert('Error', 'Failed to send password reset email. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Reset Password</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={[styles.input, styles.focusedInput]}
        placeholder="Enter your email"
        placeholderTextColor="grey"
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.resetButton} onPress={handlePasswordReset}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 20,
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#3B3B3B',
    borderRadius: 10,
    color: 'white',
    height: 50,
    marginVertical: 10,
    width: '100%',
    paddingLeft: 10,
    borderWidth: 0,
  },
  focusedInput: {
    borderColor: 'white',
    borderWidth: 1,
  },
  resetButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ForgetPassword;

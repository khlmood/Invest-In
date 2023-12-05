import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from './../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef(null);

  React.useEffect(() => {
    emailRef.current.focus();
  }, []);

  const isEmailValid = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleSignIn = async () => {
    if (!isEmailValid(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password.length == 0) {
      Alert.alert('Enter a password', 'Please enter a password.');
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('Password is too weak', 'Please enter a stronger password.');
      return;
    }
    
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    } catch (error) { 
      Alert.alert('Wrong credentials', 'Wrong Email or Password');
      console.log('Sign In Page: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <View style={styles.container}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Image source={require('./../assets/backArrow.png')} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Login with Email</Text>
        <TextInput
          ref={emailRef}
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={[styles.input, focusedInput === 'email' && styles.focusedInput]}
          onFocus={() => setFocusedInput('email')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="grey"
          placeholder="Email address"
        />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={[styles.input, focusedInput === 'password' && styles.focusedInput]}
          onFocus={() => setFocusedInput('password')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="grey"
          placeholder="Password"
          secureTextEntry
        />
        <Button onPress={() => {navigation.navigate('ForgotPassword');}} title="Forgot your password?" />
      </View>
      <View style={styles.content2}>
        <TouchableOpacity 
          style={styles.signInButton} 
          onPress={handleSignIn}
        >
          <Text style={styles.signInButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 30,
  },
  backArrow: {
    width: 60,
    height: 60,
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    paddingBottom: 30,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  input: {
    backgroundColor: '#3B3B3B',
    borderRadius: 10,
    color: 'white',
    height: 50,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
    paddingLeft: 10,
    borderWidth: 0,
  },
  focusedInput: {
    borderColor: 'white',
    borderWidth: 1,
  },
  forgotButton: {
    marginTop: 20,
    alignSelf: 'center',
  },
  content2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 30,
  },
  signInButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 30,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    width: 300,
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});

export default SignIn;

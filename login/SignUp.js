import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from './../firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
  
  const isConfirmed = () => {
    return password === confirmPassword;
  };

  const handleSignUp = async () => {
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

    if (!isConfirmed()) {
      Alert.alert('Passwords do not match', 'Please make sure your passwords match.');
      return;
    }
    
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const user = userCredential.user;

      const userDocRef = doc(FIREBASE_DB, "users", user.uid);
      await setDoc(userDocRef, {
        email: user.email,
        username: username,
        profilePicture: 'None', 
        followersCount: 0,
        followingCount: 0,
        balance: 10000,
      });

      Alert.alert('Registered', 'Check your Email inbox!');
    } catch (error) {
      console.log('SignUp Page : ' + error);
    } finally {
      setIsLoading(false);
    }
    return;
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
        <Text style={styles.headerText}>Sign up with Email</Text>
        <TextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          style={[styles.input, focusedInput === 'username' && styles.focusedInput]}
          onFocus={() => setFocusedInput('username')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="grey"
          placeholder="Username"
        />
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
        <TextInput
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={[styles.input, focusedInput === 'confirmPassword' && styles.focusedInput]}
          onFocus={() => setFocusedInput('confirmPassword')}
          onBlur={() => setFocusedInput(null)}
          placeholderTextColor="grey"
          placeholder="Confirm password"
          secureTextEntry
        />
      </View>
      <View style={styles.content2}>
        <TouchableOpacity 
          style={styles.signUpButton} 
          onPress={handleSignUp}
        >
          <Text style={styles.signUpButtonText}>Sign Up</Text>
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
  signUpButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 30,
  },
  signUpButtonText: {
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

export default SignUp;

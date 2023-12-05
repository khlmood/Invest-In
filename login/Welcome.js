import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';


const Welcome = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('./../assets/bimage.png')} 
      style={styles.background}
      resizeMode='cover'
    >
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Image source={require('./../assets/logo1.png')} style={styles.logo} />
        <Text style={styles.learnText}>Learn.</Text>
        <Text style={styles.investText}>Invest.</Text>
        <Text style={styles.tradeText}>Trade.</Text>
        <Text style={styles.descriptionText}>Play the markets. Learn to invest.{'\n'}Bank, invest & trade crypto{'\n'}commission-free.</Text>
      </View>
      <View style={styles.content2}>
        <TouchableOpacity 
          style={styles.getStartedButton} 
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
        </TouchableOpacity>

        <Text style={styles.agreementText}>
          By continuing, you agree to Invest'In <Text style={styles.linkText}>terms & conditions</Text>
        </Text>
        <Text style={[styles.agreementText, { paddingBottom: 20}]}>
          and confirm that you have read Invest'In <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    marginRight: 20,
  },
  loginButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'top',
    alignItems: 'left',
  },
  logo: {
    width: 120, 
    height: 120, 
    resizeMode: 'contain',
  },
  learnText: {
    paddingLeft: 30,
    fontSize: 45,
    color: 'blue',
    fontWeight: 'bold',
  },
  investText: {
    paddingLeft: 30,
    fontSize: 45,
    color: 'cyan',
    fontWeight: 'bold',
  },
  tradeText: {
    paddingLeft: 30,
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
  },
  descriptionText: {
    paddingLeft: 30,
    color: 'white',
    fontSize: 14,
    marginTop: 30,
  },
  content2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 30,
  },
  getStartedButtonText: {
    color: 'white',
    fontSize: 16,
    width: 300,
    textAlign: 'center',
  },
  agreementText: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
  linkText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Welcome;

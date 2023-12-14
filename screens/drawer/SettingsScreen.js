import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const SettingsScreen = () => {
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
  const [isUserDataCollectionEnabled, setIsUserDataCollectionEnabled] = useState(false);
  // Add more settings as needed

  const toggleNotificationSwitch = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleUserDataCollectionSwitch = () => setIsUserDataCollectionEnabled(previousState => !previousState);
  // Add more toggle functions as needed

  return (
    <View style={styles.container}>
      <View style={styles.settingItem}>
        <Text style={styles.text}>Enable Notifications</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isNotificationsEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleNotificationSwitch}
          value={isNotificationsEnabled}
        />
      </View>

      <View style={styles.settingItem}>
        <Text style={styles.text}>User Data Collection</Text>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isUserDataCollectionEnabled ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={toggleUserDataCollectionSwitch}
          value={isUserDataCollectionEnabled}
        />
      </View>

      {/* Add more settings here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
  // Add more styles if needed
});

export default SettingsScreen;

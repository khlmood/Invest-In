import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, Modal, TextInput, Button } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import * as ImagePicker from 'expo-image-picker';


function CommunityScreen({ navigation }) {
  const [newPostModalVisible, setNewPostModalVisible] = useState(false);
  const [newPostText, setNewPostText] = useState('');

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({ headerTitle: 'Community' });
    }, [navigation])
  );
  
  const [posts, setPosts] = useState([
    {
      id: '1',
      username: '@teslafan',
      content: 'Tesla stock surges to new all-time high after Elon Musk announces plans to launch a self-driving car service in 2024. The company expects to generate $10 billion in revenue from the service in its first year. #Tesla #Musk #StockMarket',
      liked: false,
      image: 'https://th.bing.com/th/id/R.ae75ebae84f2cb2271930b4d7bb20581?rik=d4hofWTKDjiRwg&pid=ImgRaw&r=0', 
    },
    {
      id: '2',
      username: '@dogecoinlover',
      content: 'Hey guys just wanted to let you know you should buy dogecoin their value will go to the moon once Elon Musk starts working on it #dogecoin #bestcoin #bitcoin #invest',
      liked: false,
      image: null, 
    },
    {
      id: '9',
      username: '@economist',
      content: 'The Federal Reserve announces a change in interest rates, impacting the bond market. Investors are closely watching the developments. #FederalReserve #Bonds #InterestRates',
      liked: false,
      image: 'https://th.bing.com/th/id/OIP.UlyciOSx5_cUxrVavOkBQgHaFj?rs=1&pid=ImgDetMain',
    },
    {
      id: '10',
      username: '@marketwatcher',
      content: 'Market volatility continues as global tensions rise. Traders brace for potential impacts on stock prices. #StockMarket #Volatility #GlobalTensions',
      liked: false,
      image: 'https://th.bing.com/th/id/R.cdcf46bd0eab6ea7eadd5c90cfea89a8?rik=auWlYgwhroyAsQ&pid=ImgRaw&r=0',
    },
    {
      id: '11',
      username: '@politicalinsider',
      content: 'Political debates heat up as the election season approaches. Candidates discuss their economic policies and their potential impact on the stock market. #Politics #Election #StockMarket',
      liked: false,
      image: null,
    },
    {
      id: '12',
      username: '@moneytalks',
      content: 'Tips for managing your investments: Diversify your portfolio, stay informed about market trends, and consider long-term goals. #Investments #FinancialAdvice #MoneyManagement',
      liked: false,
      image: null,
    },
    {
      id: '13',
      username: '@bondtrader',
      content: 'Government bond yields hit a new low, sparking discussions about the state of the economy and potential changes in monetary policy. #Bonds #Yields #Economy',
      liked: false,
      image: 'https://th.bing.com/th/id/R.a5b2f2ef13a72b79b8c1e8982cebe3ce?rik=9gdEEIagxxATiw&pid=ImgRaw&r=0',
    },
    {
      id: '14',
      username: '@financialnews',
      content: 'Breaking: Major tech company reports strong quarterly earnings, driving stock prices higher. Analysts predict continued growth in the tech sector. #Stocks #TechEarnings #FinancialNews',
      liked: false,
      image: 'https://th.bing.com/th/id/OIP.SLqGSIFj5JL7ZbLKQdl-BAHaDf?rs=1&pid=ImgDetMain',
    },
    {
      id: '15',
      username: '@policydebate',
      content: 'Government officials discuss fiscal stimulus measures to boost the economy. Experts weigh in on the potential impact on inflation and financial markets. #EconomicPolicy #Stimulus #Inflation',
      liked: false,
      image: null,
    },
    {
      id: '16',
      username: '@tradingstrategies',
      content: 'Day traders share their winning strategies for navigating volatile markets. Risk management and technical analysis are key to success. #DayTrading #TradingStrategies #MarketVolatility',
      liked: false,
      image: null,
    },
  ]);

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );
  };

  const handlePublishPost = () => {
    if (newPostText.trim()) {
      const newPost = {
        id: String(posts.length + 16),
        username: '@newuser',
        content: newPostText,
        liked: false,
        image: null,
      };
      setPosts([newPost, ...posts]);
      setNewPostText('');
      setNewPostModalVisible(false);
    } else {
      alert('Please enter some text to publish.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.content}>{item.content}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      <View style={styles.interactionContainer}>
        <TouchableOpacity onPress={() => handleLike(item.id)} style={styles.interactionButton}>
          <Icon name={item.liked ? 'heart' : 'heart-o'} size={20} color={item.liked ? 'red' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.interactionButton}>
          <Icon name='comment-o' size={20} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.interactionButton}>
          <Icon name='retweet' size={20} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.interactionButton}>
          <Icon name='share' size={20} color='black' />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{}} style={styles.interactionButton}>
          <Icon name='download' size={20} color='black' />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  const handleAttachImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.canceled) {
      setNewPostText(prev => prev + `\n![image](${result.uri})`);
    }
  };
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setNewPostText(prev => prev + `\n![image](${result.uri})`);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={() => setNewPostModalVisible(true)}>
        <Icon name="plus" size={24} color="white" />
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={false}
        visible={newPostModalVisible}
        onRequestClose={() => setNewPostModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Write your thoughts"
            value={newPostText}
            onChangeText={setNewPostText}
          />
          {/* Buttons for adding images will go here */}
          <Button title="Publish" onPress={handlePublishPost} />
          <Button title="Attach Image" onPress={() => {handleAttachImage}} />
          <Button title="Take Photo" onPress={handleTakePhoto} />
          <Button title="Close" onPress={() => setNewPostModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontWeight: 'bold',
  },
  content: {
    marginTop: 8,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
  likeButton: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  floatingButton: {
    backgroundColor: '#1DA1F2',
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 25,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  modalView: {
    marginTop: 50,
    padding: 20,
  },
  input: {
    fontSize: 18,
    marginBottom: 10,
  },
  interactionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  interactionButton: {
    padding: 8,
    alignItems: 'center',
  },
});

export default CommunityScreen;

import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, KeyboardAvoidingView } from 'react-native';

const lookup = async (symbol) => {
  symbol = symbol.toUpperCase();
  // Prepare date range (last 7 days)
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);
  // Format dates as timestamps
  const period1 = Math.floor(start.getTime() / 1000);
  const period2 = Math.floor(end.getTime() / 1000);
  // Prepare URL for Yahoo Finance API
  const url = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURIComponent(symbol)}?period1=${period1}&period2=${period2}&interval=1d&events=history&includeAdjustedClose=true`;
  try {
    // Fetch data from API
    const response = await fetch(url, {
      headers: { "User-Agent": "ReactNative", "Accept": "*/*" }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // Parse CSV data
    const csvText = await response.text();
    const rows = csvText.split('\n');
    const headers = rows[0].split(',');
    const data = rows.slice(1).reverse().map(row => {
      const values = row.split(',');
      return headers.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
    });
    // Extract price and return result
    const price = parseFloat(data[0]['Adj Close']).toFixed(2);
    return {
      name: symbol,
      price: price,
      symbol: symbol
    };
  } catch (error) {
    console.error('Error fetching stock data:', error);
    return null;
  }
};

function StocksScreen({ navigation }) {
  const [favorites, setFavorites] = useState(['TSLA', 'AAPL']);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [transactionType, setTransactionType] = useState('buy'); // 'buy' or 'sell'
  const [number, setNumber] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({ headerTitle: 'Stock Market' });
    }, [navigation])
  );

  const handleSearch = async () => {
    const stockData = await lookup(searchText);
    if (stockData) {
      setSelectedStock(stockData);
      setModalVisible(true);
      if (!favorites.includes(searchText.toUpperCase())) {
        setFavorites([...favorites, searchText.toUpperCase()]);
      }
    } else {
      alert('Stock symbol incorrect or doesn\'t exist');
    }
  };

  const handleFavoriteSearch = async (stockSymbol) => {
    setSearchText(stockSymbol);
    const stockData = await lookup(stockSymbol);
    if (stockData) {
      setSelectedStock(stockData);
      setModalVisible(true);
    } else {
      alert('Stock symbol incorrect or doesn\'t exist');
    }
  };

  const chooseTransactionType = (type) => {
    setTransactionType(type);
  };

  const performTransaction = () => {
    //TODO:: Implement transaction logic
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }} keyboardVerticalOffset={60} >
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Favorites Watchlist</Text>
        <ScrollView horizontal>
          {favorites.map((stock, index) => (
            <TouchableOpacity
              key={index}
              style={styles.favoriteButton}
              onPress={() => handleFavoriteSearch(stock)}>
              <Text>{stock.toUpperCase()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Search Stock</Text>
        <TextInput
          style={styles.input}
          placeholder="Search stock"
          onChangeText={setSearchText}
          value={searchText}
        />
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Perform Transaction</Text>
        <View style={styles.transactionTypeContainer}>
          <TouchableOpacity 
            style={[styles.transactionTypeButton, transactionType === 'buy' && styles.activeTransactionType]}
            onPress={() => chooseTransactionType('buy')}>
            <Text style={styles.transactionTypeText}>Buy</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.transactionTypeButton, transactionType === 'sell' && styles.activeTransactionType]}
            onPress={() => chooseTransactionType('sell')}>
            <Text style={styles.transactionTypeText}>Sell</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Number"
          onChangeText={setNumber}
          value={number}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.button} onPress={performTransaction}>
          <Text style={styles.buttonText}>Perform Transaction</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        {/* Modal Content */}
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* Display selected stock information */}
            <Text style={styles.modalText}>{selectedStock?.name}</Text>
            <Text style={styles.modalText}>{selectedStock?.symbol}</Text>
            <Text style={styles.modalText}>Price: ${selectedStock?.price}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'left',
  },
  favoriteButton: {
    backgroundColor: 'lightgray',
    borderRadius: 25, 
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    marginVertical: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  transactionTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  transactionTypeButton: {
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 15, 
    paddingHorizontal: 20, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionTypeText: {
    fontSize: 20,
  },
  activeTransactionType: {
    backgroundColor: 'darkgray',
  },
});


export default StocksScreen;

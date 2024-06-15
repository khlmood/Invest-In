import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, KeyboardAvoidingView } from 'react-native';

const lookup = async (symbol) => {
  symbol = symbol.toUpperCase();
  // Prepare URL for Yahoo Finance API
  const url = `https://query1.finance.yahoo.com/v7/finance/download/${encodeURIComponent(symbol)}`;
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
    const latestRow = rows[1].split(','); // The latest stock data row

    const price = parseFloat(latestRow[4]).toFixed(2);
    const name = symbol; // Assuming symbol is the name here, adjust if needed.

    return {
      name: name,
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
  const [selectedStock, setSelectedStock] = useState(null);
  const [transactionType, setTransactionType] = useState('buy'); // 'buy' or 'sell'
  const [number, setNumber] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({ headerTitle: 'Stock Market' });
    }, [navigation])
  );

  const handleSearch = async () => {
    const stockData = await lookup(searchText);
    if (stockData) {
      setSelectedStock(stockData);
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
    } else {
      alert('Stock symbol incorrect or doesn\'t exist');
    }
  };

  const chooseTransactionType = (type) => {
    setTransactionType(type);
  };

  const performTransaction = () => {
    // Simulating transaction logic
    const userBalance = 10000; // Example user balance
    const ownedStock = 50; // Example owned stock amount

    if (transactionType === 'buy') {
      const totalCost = selectedStock.price * number;
      if (totalCost > userBalance) {
        setModalMessage('Transaction failed: Not enough funds');
      } else {
        setModalMessage('Transaction completed');
      }
    } else if (transactionType === 'sell') {
      if (number > ownedStock) {
        setModalMessage('Transaction failed: Not enough owned stock');
      } else {
        setModalMessage('Transaction completed');
      }
    }
    setModalVisible(true);
  };

  return (
    <KeyboardAvoidingView behavior={"padding"} style={{ flex: 1 }} keyboardVerticalOffset={60}>
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stock Selected: {selectedStock ? selectedStock.symbol : "None"}</Text>
          {selectedStock && (
            <View style={styles.stockInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.stockInfoTitle}>Name:             </Text>
                <Text style={styles.stockInfoText}>{selectedStock.name}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.stockInfoTitle}>Symbol:          </Text>
                <Text style={styles.stockInfoText}>{selectedStock.symbol}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.stockInfoTitle}>Price:               </Text>
                <Text style={styles.stockInfoText}>${selectedStock.price}</Text>
              </View>
            </View>
          )}
        </View>

        {selectedStock && (
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
        )}

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setModalVisible(!isModalVisible)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{modalMessage}</Text>
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
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  stockInfo: {
    padding: 20,
  },
  stockInfoTitle: {
    fontSize: 20,
  },
  stockInfoText: {
    fontSize: 20,
    color: 'blue',
  },
});


export default StocksScreen;

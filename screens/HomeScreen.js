import React from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({ headerTitle: 'Portfolio' });
    }, [navigation])
  );

  const chartData = [
    {
      name: 'Apple',
      value: 10,
      color: '#c0392b',
    },
    {
      name: 'Tesla',
      value: 30,
      color: '#2980b9',
    },
    {
      name: 'Amazon',
      value: 20,
      color: '#f1c40f',
    },
    {
      name: 'Google',
      value: 15,
      color: '#27ae60',
    },
    {
      name: 'Microsoft',
      value: 25,
      color: '#3498db',
    },
    {
      name: 'Facebook',
      value: 12,
      color: '#e74c3c',
    },
    {
      name: 'Netflix',
      value: 18,
      color: '#8e44ad',
    },
    {
      name: 'Disney',
      value: 22,
      color: '#f39c12',
    },
    {
      name: 'Amazon',
      value: 20,
      color: '#f1c40f',
    },
  ];
  
  const tableData = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 35,
      price: 192.32,
      total: 6731.20,
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      shares: 10,
      price: 239.37,
      total: 2393.70,
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      shares: 15,
      price: 3455.33,
      total: 51829.95,
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      shares: 8,
      price: 2675.12,
      total: 21401.00,
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      shares: 20,
      price: 324.67,
      total: 6493.40,
    },
    {
      symbol: 'NFLX',
      name: 'Netflix Inc.',
      shares: 12,
      price: 584.76,
      total: 7017.12,
    },
    {
      symbol: 'FB',
      name: 'Meta Platforms, Inc. (formerly Facebook)',
      shares: 18,
      price: 332.49,
      total: 5984.82,
    },
    {
      symbol: 'GOOG',
      name: 'Alphabet Inc. (Class C)',
      shares: 6,
      price: 2678.89,
      total: 16073.34,
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 25,
      price: 306.21,
      total: 7655.25,
    },
  ];
  

  const chartConfig = {
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    backgroundColor: '#1E2923',
    backgroundGradientFrom: '#1E2923',
    backgroundGradientTo: '#08130D',
  };

  const screenWidth = Dimensions.get('window').width;
  const cash = 1036.09;
  const totalValue = tableData.reduce((sum, item) => sum + item.total, cash);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Your Stocks</Text>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor={'value'}
          backgroundColor={'transparent'}
          paddingLeft={'15'}
          absolute
        />
      </View>
      <View style={styles.tableContainer}>
        {tableData.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{item.symbol}</Text>
            <Text style={styles.tableCell}>{item.name}</Text>
            <Text style={styles.tableCell}>{item.shares}</Text>
            <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
            <Text style={styles.tableCell}>${item.total.toFixed(2)}</Text>
          </View>
        ))}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Cash</Text>
          <Text style={styles.tableCellTotal}>${cash.toFixed(2)}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>TOTAL</Text>
          <Text style={styles.tableCellTotal}>${totalValue.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white'
  },
  chartTitle: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  tableContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    flex: 1,
    textAlign: 'left',
  },
  tableCellTotal: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default HomeScreen;

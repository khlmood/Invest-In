import React from 'react';
import { View, Text, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import { chartData, tableData } from './data';

function HomeScreen({ navigation }) {
  useFocusEffect(
    React.useCallback(() => {
      navigation.getParent().setOptions({ headerTitle: 'Portfolio' });
    }, [navigation])
  );

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

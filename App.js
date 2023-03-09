import { ActivityIndicator, StyleSheet, ScrollView, View, Text, TextInput, Button } from 'react-native';
import React, {useEffect, useState} from 'react'
import { Table, Row, Rows } from 'react-native-table-component';
import {Picker} from '@react-native-picker/picker';



export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [tableData, setTableData] = useState();
  const [exchangeRates, setExchangeRates] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [amount, setAmount] = useState();
  const [result, setResult] = useState();

  const getCurrencies = async () => {
    try {
      let responseObject = await fetch('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');
      
      let text = await responseObject.text();
      let lines = text.split('\n');
      let rows = [];
      let exchangeRates = [];

      for(let i = 2; i < lines.length - 1; i++) {
        let columns = lines[i].split('|');
        rows.push(columns);

        exchangeRates.push([columns[3], columns[4]]);
      }

      const tableData = {
        tableHead: lines[1].split('|'),
        tableData: rows,
      };
      setTableData(tableData);
      setExchangeRates(exchangeRates);
      setSelectedValue(exchangeRates[0][1]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onPressCalculate = () => {
    setResult("" + (Number(amount) * Number(selectedValue)).toPrecision(5));
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  return (
    <View style={styles.container}> 
      <ScrollView>
        { isLoading ? (
          <ActivityIndicator />
        ) : (
          <View>
            <View style={styles.table}>
              <Table borderStyle={{ borderWidth: 4, borderColor: 'teal' }}>
                <Row data={tableData.tableHead} style={styles.head} textStyle={styles.headText} />
                <Rows data={tableData.tableData} textStyle={styles.text} />
              </Table>
            </View>
            <View style={styles.inputForm}>
              <View style={styles.rowContainer}>
                <Text style={styles.title}>Amount: </Text>
                <TextInput defaultValue={amount} onChangeText={newAmount => setAmount(newAmount)} keyboardType='numeric' style={styles.inputField} />
              </View>
              <View style={styles.rowContainer}>
                <Text style={styles.title} >Currency: </Text>
                <Picker
                  selectedValue={selectedValue}
                  style={styles.dropdown}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
                >
                  {exchangeRates.map((item, index) => {
                      return (<Picker.Item label={item[0]} value={item[1]} key={index}/>) 
                  })}
                </Picker>
              </View>
              <View style={styles.rowContainer}>
                <Button
                  onPress={onPressCalculate}
                  title="Calculate"
                  style={styles.calculateButton}
                  disabled={selectedValue == undefined || amount == undefined}
                />
                <TextInput editable={false} selectTextOnFocus={false} style={styles.resultField} value={result}/>
              </View>
            </View>
          </View>
        )
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10, paddingTop: 40},
  rowContainer: {flexDirection: 'row', padding: 10, borderColor: 'black', borderWidth: 1},
  inputForm: { },
  table: {paddingBottom: 30},
  head: { height: 40, backgroundColor: 'blue' },
  headText: { fontSize: 12, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
  text: { margin: 6, fontSize: 10, fontWeight: 'bold' , textAlign: 'center' },
  title: {width: '40%',},
  inputField: {width: '60%', borderColor: '#bbccff', borderWidth: 3, paddingLeft: 10},
  resultField: {width: '60%', borderColor: '#bbccff', borderWidth: 3, paddingLeft: 10, marginLeft: 40, backgroundColor: '#ffccbb'},
  dropdown: {width: '60%',},
  calculateButton: {color: '#f194ff',},
});

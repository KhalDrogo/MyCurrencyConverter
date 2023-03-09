import React , {useEffect, useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {Text, TextInput, Button, StyleSheet, View} from 'react-native';

const Converter = (props) => {
    const [amount, setAmount] = useState();
    const [result, setResult] = useState();
    const [selectedValue, setSelectedValue] = useState();

    useEffect(() => {
        setSelectedValue(props.exchangeRates[0][1]);
      }, []);

    const onPressCalculate = () => {
        setResult((Number(amount) * Number(selectedValue)).toPrecision(5) + " CZK");
      };

    return (
        <View>
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
                    {props.exchangeRates.map((item, index) => {
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
    );
  }

export default Converter;

const styles = StyleSheet.create({
    rowContainer: {flexDirection: 'row', padding: 10, borderColor: 'black', borderWidth: 1},
    title: {width: '40%',},
    inputField: {width: '60%', borderColor: '#bbccff', borderWidth: 3, paddingLeft: 10},
    resultField: {width: '60%', borderColor: '#bbccff', borderWidth: 3, paddingLeft: 10, marginLeft: 40, backgroundColor: '#ffccbb'},
    dropdown: {width: '60%',},
    calculateButton: {color: '#f194ff',},
  });
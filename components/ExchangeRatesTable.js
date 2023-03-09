import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const ExchangeRatesTable = (props) => {
    return (
        <View style={styles.table}>
            <Table borderStyle={styles.border}>
                <Row data={props.tableData.tableHead} style={styles.head} textStyle={styles.headText} />
                <Rows data={props.tableData.tableData} textStyle={styles.text} />
            </Table>
        </View>
    );
  };


export default ExchangeRatesTable;

const styles = StyleSheet.create({
    table: {paddingBottom: 30},
    border: {borderWidth: 4, borderColor: '#C19A6B'},
    head: { height: 40, backgroundColor: '#1589FF' },
    headText: { fontSize: 12, fontWeight: 'bold' , textAlign: 'center', color: 'white' },
    text: { margin: 6, fontSize: 10, fontWeight: 'bold' , textAlign: 'center' },
  });
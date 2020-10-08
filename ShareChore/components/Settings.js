import {View, Text, StyleSheet} from 'react-native';
import React, {Component} from 'react';

export default class Home extends Component{
    render()
    {
        return(
            <View style={styles.container}>
                <Text>OK</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    testText: {
        fontSize: 40,
    }
  });
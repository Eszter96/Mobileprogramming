import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import  Calendar  from './components/Calendar';
import  Home  from './components/Home';
 
export default class App extends Component {
  render(){
    return (
      <ScrollView style={styles.container}>
        <Home />
      </ScrollView>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  calendar: {
    backgroundColor: '#FFFFFF',
    marginTop: 100,
  },
  footer: {
    flex: 1,
    //alignSelf:'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-around',
    justifyContent: 'flex-end',
    backgroundColor: 'lightgrey',
  },
  menubtn: {
  }
});
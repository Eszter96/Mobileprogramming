import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {createBottomTabNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import {Icon} from 'react-native-elements';

import Calendar from './Calendar';
import Settings from './Settings';

export default class Home extends Component{
    render()
    {
        return(
            <View style={styles.container}>
                <Calendar />
            </View>
        );
    }
}

const BottomMenu=createMaterialBottomTabNavigator(
    {
        Calendar :{screen:Calendar,
            navigationOptions:{
                tabBarLabel:'Home',
                activeColor:'#fff',
                inactiveColor:'#000000',
                barStyle:{backgroundColor:'lightgray'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'home'} size={25} style={{color:'#fff'}}/>
                    </View>
                )
            }
        },
        Settings :{screen:Settings,
            navigationOptions:{
                tabBarLabel:'Home',
                activeColor:'#fff',
                inactiveColor:'#000000',
                barStyle:{backgroundColor:'lightgray'},
                tabBarIcon:()=>(
                    <View>
                        <Icon name={'person'} size={25} style={{color:'#fff'}}/>
                    </View>
                )
            }
        },
    }
);

export default createAppContainer(BottomMenu);

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
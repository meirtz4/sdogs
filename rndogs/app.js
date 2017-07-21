/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import * as firebase from 'firebase';
import React, { Component } from 'react';
import keychain from './private.json';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import AreaView from './AreaView.js';

const firebaseApp = firebase.initializeApp(keychain.firebase);

const AreasListItem = ({area, schedule ,navigate}) => <Button key={area} title={area} onPress={() => navigate('Area', {area: area, weeks: [schedule[area]]})} />

class App extends Component {

  static navigationOptions = ({navigation}) => ({
        title: '🐶Soluto Dogs🐶'
    }); 

  constructor(props) {
    super(props);
    this.itemsRef = firebase.database().ref();
    this.state = {};
  }

  componentDidMount() {
    this.itemsRef.on('value', (items) => {
      
      this.setState({items: items.val()})
    })
  }

  render() {
    
    if (!this.state.items) {
      return <Text>Loading...</Text>
    }
    const { navigate } = this.props.navigation;
    const areas = Object.keys(this.state.items['schedule']).map(area => ({key: area, data: area}));
    return (
      <View >
        <FlatList data={areas} renderItem={({item}) => <AreasListItem area={item.data} schedule={this.state.items['schedule']} navigate={navigate} />} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
export default StackNavigator({
  Home: {screen: App},
  Area: {screen: AreaView}
})
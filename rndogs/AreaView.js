import React from 'react';
import {View, Text} from 'react-native';
import WeekView from './WeekView.js';

class AreaView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.area
    }); 

    render() {
        const {navigation} = this.props;
        return (
    <View>
        {navigation.state.params.weeks.map(w => <WeekView key={w} week={w} />)}
    </View>);
    }
}

export default AreaView;
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
        <View style={{flex:1}}>
            {navigation.state.params.weeks.map(w => <View key={w} style={{flex:1, height:'100%'}}><WeekView onDayPress={(dogs) => navigation.navigate('Day',{dogs})} updateDogSchedule={(dayOfWeek) => navigation.state.params.updateDogSchedule(navigation.state.params.area, dayOfWeek)} key={w} week={w} /></View>)}
        </View>);
    }
}

export default AreaView;
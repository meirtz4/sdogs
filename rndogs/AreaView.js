import React from 'react';
import {View, Text} from 'react-native';
import { NavigationActions } from 'react-navigation'
import WeekView from './WeekView.js';

class AreaView extends React.Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.area
    });

    constructor(props) {
        super(props);
        this.state = {weeks: props.navigation.state.params.weeks};
    }

    componentDidMount() {
        const {navigation} = this.props;
        const {updateDogSchedule, area, weeks, fbref} = navigation.state.params;
        fbref.on('value', (items) => {
            this.setState({weeks:[items.val()['schedule'][area]]});
        });
        
        
    }

    render() {
        const {navigation} = this.props;
        const {updateDogSchedule, area} = navigation.state.params;
            return (
        <View style={{flex:1}}>
            {this.state.weeks.map(w => <View key={w} style={{flex:1, height:'100%'}}>
                                <WeekView key={w} week={w} 
                                          onDayPress={(dogs) => navigation.navigate('Day',{dogs})} 
                                          updateDogSchedule={(dayOfWeek) => updateDogSchedule(area, dayOfWeek)} />
                            </View>)}
        </View>);
    }
}

export default AreaView;
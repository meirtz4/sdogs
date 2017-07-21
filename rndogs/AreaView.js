import React from 'react';
import {View, Text} from 'react-native';
import WeekView from './WeekView.js';

const AreaView = ({area, weeks}) => <View>
    <Text>{area}</Text>
    {weeks.map(w => <WeekView key={w} week={w} />)}
    
    </View>

export default AreaView;
import React from 'react';
import {Animated, View, Text} from 'react-native';


class LoadingView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {size: new Animated.Value(0)};
    }

    componentDidMount() {
        Animated.spring(this.state.size,
            {
                toValue: 150,
                friction: 1
            }
        ).start();
    }

    render() {
        let {size} = this.state;
        return (<View style={{flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'}}>
    <Text>Fetching data...</Text>
        <Animated.Text style={{fontSize:size}}>🐩</Animated.Text>
    </View>)
        
    }
}
export default LoadingView;
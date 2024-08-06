import React from 'react';
import {Slider} from '@miblanchard/react-native-slider';
import {AppRegistry, StyleSheet, View, Text} from 'react-native';

class SliderExample extends React.Component {
    state = {
        sliderValue: [20, 80],
    };

    render() {
        return (
            <View style={styles.container}>
                <Slider
                    animateTransitions
                    maximumTrackTintColor='blue'
                    minimumTrackTintColor='blue'
                    maximumValue={100}
                    minimumValue={0}
                    step={1}
                    value={this.state.value}
                    onValueChange={value => this.setState({value})}
                />
                <Text>Value: {this.state.value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});

export default SliderExample;
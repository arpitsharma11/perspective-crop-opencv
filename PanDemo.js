import React, { Component } from 'react';
import { StyleSheet, View, Text, PanResponder } from 'react-native';

class PanDemo extends Component {

    constructor(props){
        super(props);
        this.state = {
            dragging: false,
            initialTop: this.props.point.y,
            initialLeft: this.props.point.x,
            offsetTop: 0,
            offsetLeft: 0,
        };
    }

    panResponder = {};

    componentWillMount() {
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: this.handleStartShouldSetPanResponder,
            onPanResponderGrant: this.handlePanResponderGrant,
            onPanResponderMove: this.handlePanResponderMove,
            onPanResponderRelease: this.handlePanResponderEnd,
            onPanResponderTerminate: this.handlePanResponderEnd,
        });
    }

    render() {
        const {
            dragging,
            initialTop,
            initialLeft,
            offsetTop,
            offsetLeft,
        } = this.state;

        const style = {
            backgroundColor: '#F5A540',
            top: initialTop + offsetTop,
            left: initialLeft + offsetLeft,
        };

        return (
            <View style={styles.container}>
                <View
                    {...this.panResponder.panHandlers}
                    style={[styles.circle, style]}>
                </View>
            </View>
        );
    }

    handleStartShouldSetPanResponder = () => {
        return true;
    };

    handlePanResponderGrant = () => {
        this.setState({ dragging: true });
    };

    handlePanResponderMove = (e, gestureState) => {
        this.setState({
            offsetTop: gestureState.dy,
            offsetLeft: gestureState.dx,
        });
        this.props.onChange(this.props.name,gestureState.moveX,gestureState.moveY)
    };

    handlePanResponderEnd = (e, gestureState) => {
        const { initialTop, initialLeft } = this.state;
        //console.log("Final");
        //console.log(gestureState);
        this.setState({
            dragging: false,
            initialTop: initialTop + gestureState.dy,
            initialLeft: initialLeft + gestureState.dx,
            offsetTop: 0,
            offsetLeft: 0,
        });
        this.props.onChange(this.props.name,gestureState.moveX,gestureState.moveY)
    };
}

export default PanDemo;

const styles = StyleSheet.create({
    container: {
        //zIndex: 500,
        //flex: 1,
    },
    circle: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

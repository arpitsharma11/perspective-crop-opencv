import React, { Component } from 'react'
import { PixelRatio, StyleSheet, View, Text } from 'react-native';
import { Svg } from 'expo';
const { Polygon,Line } = Svg;

class CustomPolygon extends Component {
    render(){
        const { line } = this.props;
        return(
          <Svg
            height="1000"
            width="1000"
            style={styles.line}
          >
            <Polygon
              points={line}
              fill="none"
              stroke="#F5A540"
              strokeWidth="1"
            />
          </Svg>
        )
    }
}

export default CustomPolygon;

const styles = StyleSheet.create({
  line : {
    flex: 1,
    position: 'absolute'
  }
});
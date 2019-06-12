import React from 'react';
import { StyleSheet,Animated, Text, View, PanResponder, Dimensions, Image, PixelRatio, NativeModules, Button } from 'react-native';
import { Svg } from 'expo';
const { Polygon,Line } = Svg;

import PanDemo from './PanDemo.js';
import CustomPolygon from './CustomPolygon.js';
//import picture from './assets/test1.jpg';

export default class CropScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        picture: this.props.image ? this.props.image.uri : '',
        p1 : { x : 50, y : 50, i: true },
        p2 : { x : 300, y : 50, i: true },
        p3 : { x : 300, y : 300, i: true },
        p4 : { x : 50, y : 300, i: true }, 
        line: '',
        display: false,
        width: '',
        height: '',
        h: '',
        w: ''
    }
  }

  componentWillMount(){
    this._updateLineValue();
    console.log(this.state.picture);
    this._cal()
  }

  componentWillReceiveProps(){
  }

  _cal(){

    const {width, height} = this.props.image

    console.log('width',width);
    console.log('height',height);

    const imageHeight =  Dimensions.get('window').height;
    const imageWidth =  Dimensions.get('window').width;
    console.log('imageWidth',imageWidth);
    console.log('imageHeight',imageHeight);
    this.setState({
        h: height/imageHeight,
        w: width/imageWidth
    })
  }

  _updateLineValue = () => {
        const { p1, p2, p3, p4 } = this.state;
        let points = ''
        if( p1.i )
                  points +=     (p1.x + 9) + ',' + (p1.y + 9);
              else
                  points +=    p1.x + ',' + p1.y;
          if( p2.i )
                    points +=  ' ' + (p2.x + 9) + ',' + (p2.y + 9);
                else
                    points +=  ' ' + p2.x + ',' + p2.y ;
      if( p3.i )
                    points +=  ' ' + (p3.x + 9) + ',' + (p3.y + 9);
                  else
                    points +=  ' ' + p3.x + ',' + p3.y;
      if( p4.i )
                    points +=  ' ' + (p4.x + 9) + ',' + (p4.y + 9);
                  else
                   points +=    ' ' + p4.x + ',' + p4.y 
        this.setState({
          line: points,
          display: true
        });
    }

    onChange = (p,x,y) => {
        const points = { x : x, y : y, t:false }
        console.log(p,points)
        this.setState({
            [p] : points
        });
        this._updateLineValue();
    }

    _crop = () => {
        const { p1, p2, p3, p4, h, w } = this.state;
        let P1 = {
            'x': p1.x * h,
            'y': (p1.y * w) + 152
        }
        let P2 = {
            'x': p2.x * h,
            'y': (p2.y * w) + 152
        }
        let P3 = {
            'x': p3.x * h,
            'y': (p3.y * w) + 152
        }
        let P4 = {
            'x': p4.x * h,
            'y': (p4.y * w) + 152
        }
        NativeModules.Crop.setPoints(P1,P2,P3,P4,this.props.image.uri);
        NativeModules.Crop.demoFunction((error,msg) => {
            console.log(msg)
        })
        console.log(typeof(p1));
    }

    render() {

        const { p1, p2, p3, p4, line, display, picture } = this.state;

        const imageHeight =  Dimensions.get('window').height - 38;
        const imageWidth =  Dimensions.get('window').width;
        const imageView = {
            flexDirection: 'row',
            height: imageHeight,
            width: imageWidth
        }
        
        return (
        <View style={styles.scrollView}>
            <View style={imageView}>
                <Image
                    style={styles.image}
                    //resizeMode="contain"
                    source={{uri: picture}}
                />  
            </View>
            { display &&
                <React.Fragment>
                    <CustomPolygon line={line} />
                    <View style={styles.panView} >
                    <PanDemo point={p1} name="p1" onChange={this.onChange} />
                    <PanDemo point={p2} name="p2" onChange={this.onChange} />
                    <PanDemo point={p3} name="p3" onChange={this.onChange} />
                    <PanDemo point={p4} name="p4" onChange={this.onChange} />
                    </View>
                </React.Fragment>
            }
            <Button style={styles.cropButton} title="Crop" onPress={this._crop} />
        </View>
        );
    }
}

const styles = StyleSheet.create({
  scrollView: {
    position: 'absolute',
    flex: 1,
  },
  panView:{
    position: 'absolute',
  },
  image: {
    zIndex: 0,
    flex: 1,
    height: undefined,
    width: undefined, 
  },
  line : {
    position: 'absolute'
  },
  cropButton: {
      paddingTop: 4
  }
});

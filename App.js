import React from 'react';
import { StyleSheet, Text, View,Button, NativeModules, Image,PixelRatio } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';

import CropScreen from './CropScreen';

export default class App extends React.Component {

	constructor(props){
		console.log(
			PixelRatio.getPixelSizeForLayoutSize(38));
		super(props);
		this.state = {
			image: ''
		}
	}

  	componentWillMount(){
		this.getPermissionAsync();
	}
  
	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	}
  
	_pickImage = async () => {
    	let result = await ImagePicker.launchImageLibraryAsync({
     		mediaTypes: ImagePicker.MediaTypeOptions.All,
      		allowsEditing: false
   	 	});

    	console.log(result);

    	if (!result.cancelled) {
      		this.setState({ image: result });
    	}
	};

	render() {
		const { image } = this.state;
		if( image )
			return(
				<CropScreen image={image} />
			);
		else 
		return (
			<View style={styles.container}>
				<Button title="Opennn" onPress={this._pickImage} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

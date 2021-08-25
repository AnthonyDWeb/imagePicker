import React, {useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'


export default function App() {
  const [selectedImage, setSelectedImage] = useState(null)

  let openImagePickerAsync = async() =>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false){
      Alert.alert("permission to access camera roll is required !");
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(pickerResult.cancelled === true){
      return;
    }

    setSelectedImage({localUri: pickerResult.uri})
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Image Picker</Text>
        {selectedImage !== null ?
          <Image source={{uri: selectedImage.localUri}} style={styles.imgPP}/>:
          <View style={styles.profilePhoto}>
              <Text style={styles.txtPP}>Profile photo</Text>
          </View>
        }
          <Text>Share a photo from your phone with a friend, just press the button below !</Text>
      <TouchableOpacity style={styles.btnPickerImage} onPress={openImagePickerAsync}>
          <Text style={styles.textBtnPickerImage}>Pick a photo !</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'darkgray',
    padding: 20,
    alignItems: 'center',

  },
  mainTitle:{
    textAlign: 'center',
    fontSize: 32,
    marginTop: 35,
  },
  profilePhoto:{
    height: 100,
    width: 100,
    borderRadius: 50,
    marginVertical: 5,
    borderColor: "white",
    borderWidth: 3,
    backgroundColor: "black",
    justifyContent: 'center',
  },
  imgPP:{
    height: 100,
    width: 100,
    marginVertical: 5,
    borderRadius: 50,
    borderColor: "white",
    borderWidth: 3,
    justifyContent: 'center',
  },
  btnPickerImage:{
    height: 25,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
    borderRadius: 5,
    marginTop: 5,
  },
  textBtnPickerImage:{
    color: "whitesmoke",
  },
  txtPP:{
    color:"whitesmoke",
    width: 95,
    textAlign: 'center',
  },
});

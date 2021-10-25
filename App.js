import React, {useState} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  Text,
  Button
 
} from 'react-native';
import {RNCamera} from "react-native-camera";

const PendingView=()=>(
  <View style={{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  }}>
  <Text style={{fontSize: 25, color:"red"}}>Camera Loading....</Text>
  </View>
)

//hii this is 

const App =()=>{

  const[image, setImage] = useState(null);

  const takePicture = async(camera)=>{
    try{
      const options= {quality: 0.9, base64: false}
        const data= await camera.takePictureAsync(options)
        setImage(data.uri)
        // const filePath= data.uri;
        // const newFilePath= RNFS.ExternalDirectoryPath + '/MyTest.jpg';
        // RNFS.moveFile(filePath, newFilePath)
        // .then(()=>{
        //   console.log('IMAGE MOVED')
        // })
        // .catch(error=>{
        //   console.log(error)
        // })
        console.log(data.uri)
    }catch(error){
      console.warn(error)
    }
  }
// hii this is comment
  return(
   <View style={styles.container}>
   {image ? (
     <View style={styles.preview}>
     <Text style={styles.camtext}>Here Is Your New Profile Pic</Text>
     <Image  style={styles.clicked} source={{uri: image, width: '100%', height:'80%'}} />
     <TouchableOpacity
         style={styles.capture}
     onPress={()=>{
       setImage(null)
     }}
     ><Text style={{fontWeight:'bold', color:'black'}}>CLICK NEW PIC</Text></TouchableOpacity>
     
     
     </View>
   ) : (
     <RNCamera
     style={styles.preview}
     type={RNCamera.Constants.Type.back}
     captureAudio={false}
     flashMode={RNCamera.Constants.FlashMode.off}
     androidCameraPermissionOptions={{
       title: "Permission to use camera",
       message: "longer text to use camera",
       buttonPositive: "OK",
       buttonNegative: "Cancel"
     }}
     androidRecordAudioPermissionOptions={{
      title: "Permission to use audio",
      message: "longer text to use audio",
      buttonPositive: "OK",
      buttonNegative: "Cancel"
    }}

     >
     {({camera, status})=>{
       if(status !=='READY')return <PendingView/>
       return(
         <View style={{flex:1,
        flexDirection:"row",
      marginTop:400,
      
    }}>
         <TouchableOpacity
         style={styles.capture}
         onPress={()=> takePicture(camera)}
         >
         <Text style={{fontWeight:'bold', color:'black'}}>SNAP</Text>
         </TouchableOpacity>
         </View>
       )
     }}
     </RNCamera>
   )}
   
   </View>
  )
}


export default App;

const styles=StyleSheet.create({
  container:{
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black"
  },
  preview:{
    flex:1,
    justifyContent: "space-around",
    alignItems: "center"
  },
  capture:{
    flex: 0,
    backgroundColor: "orange",
    padding: 20,
    alignSelf: "center",
    borderRadius:20,
    
    
  },
  camtext:{
   
    color:"#FFFFFF",
    marginBottom: 10,
    width: "100%",
    textAlign: "center",
    paddingVertical: 20,
    fontSize: 25,
  },
  clicked:{
    width:400,
    height:400,
    borderRadius: 200,
    marginBottom: 50,
  }
})

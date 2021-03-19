import React from 'react';
import { Text, ImageBackground} from 'react-native';
import {images} from '../constants';
import { icons, images, theme, COLORS, SIZES, FONTS } from '../constants'


function Background() {
        return(
           <ImageBackground
           source={images.img2}
           style={{
               height:130,
               width:230,
               marginRight:20,
               borderRadius:10,
               marginBottom:40,
               opacity:0.7,
               backgroundColor:"#000",
               marginLeft:3,
               padding:12,
               marginTop:20
           }}
           >
               <Text style={{
                   fontFamily:FONTS.h2,
                   color:"#FFF",
                   fontSize:15
               }}>Zara Furniture World</Text>
               <Text style={{
                   fontFamily:FONTS.h2,
                   color:"#FFF",
                   fontSize:12
               }}>Get 25% OFF</Text>
           </ImageBackground>
        )
    
}
export default Background;
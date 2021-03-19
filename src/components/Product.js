import React from 'react'
import {
    View,
    Image,
    TouchableOpacity, 
    Text} from 'react-native'
import { icons, images, theme, COLORS, SIZES, FONTS } from '../constants'


function Product (){
        return(
          <TouchableOpacity
            // onPress={this.props.onPress}
            style={{
                backgroundColor:"#f5f5fa",
                height:280,
                width:160,
                borderRadius:20,
                // marginTop:SIZES.ma,
                marginRight:10
            }}
          >
              <View style={{
                  flexDirection:"row",
                  alignItems:"center",
                  alignSelf:"center",
                  marginTop:20
              }}>
                  <Image
                    source={images.img2}
                    style={{height:25,width:20}}
                  />
                  <Text style={{
                      paddingHorizontal:10,
                      fontWeight:"bold",
                      fontSize:16
                  }}>
                      290 Calories
                  </Text>
              </View>
              <Image
                source={images.img1}
                style={{
                    height:105,
                    alignSelf:"center",
                    width:130,
                    marginTop:15,
                    marginBottom:15
                }}
              />
              <Text style={{
                  fontSize:18,
                  fontWeight:"bold",
                  paddingHorizontal:10
              }}>
                  Title
              </Text>
              <Text style={{
                  fontSize:15,
                  fontWeight:"bold",
                  paddingHorizontal:10,
                  color:"#848385"
              }}>
                  Beef burger
              </Text>
          </TouchableOpacity>
        )
}
export default Product
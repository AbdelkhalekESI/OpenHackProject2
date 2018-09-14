
import React from 'react';
import { StyleSheet, Animated, Easing, Dimensions , Image , TouchableOpacity  } from 'react-native';
import GestureRecognizer, { swipeDirections } from 'react-native-swipe-gestures';
import Input from './input';
export default class HomeScreen extends React.Component {

    state = { height : new Animated.Value(0) , border : new Animated.Value(300)
    };

    onSwipeUp(state) {
      Animated.sequence([
        Animated.timing(this.state.height, {
          toValue : 1,
          duration : 300,
          easing : Easing.inOut(Easing.quad),
        }),
         Animated.spring(this.state.border, {
          toValue : 300
        })]).start(); 
    }

    onSwipe(direction, state) {
      const { SWIPE_UP } = swipeDirections;

      switch(direction) {
        case SWIPE_UP:
          this.onSwipeUp(state);
          break;
      }

    }

    render(){
      
        return(
            <GestureRecognizer
                  onSwipeUp={(state) => this.onSwipeUp(state)}
                  onSwipe={(direction, state) => this.onSwipe(direction, state)}
                  config={{
                    velocityThreshold : 0.3,
                    directionalOffsetThreshold: 80
                  }}
                  style={styles.container}>

                   <Image style={ [styles.LogoImage]}
                 source={require('../assets/Logo.png')}
                  />
                  <Image style={ [styles.ParticlesImage]}
                 source={require('../assets/Particles.png')}
                  />
                  
                <Animated.View style={[styles.CircleShapeView, { height : this.state.height.interpolate({
                  inputRange : [0,1],
                  outputRange : [500, Dimensions.get("window").height]
                }), transform : [{
                  translateY: this.state.height.interpolate({
                    inputRange : [0, 1],
                    outputRange : [0, -Dimensions.get("window").height + 400]
                  })
                }], borderRadius : this.state.border
               }]}>
               <Animated.View style={[styles.Input , {opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [0, 1]
                    }) }]}>
                    <Input />
                    
                </Animated.View>
                <Animated.View style={[styles.SubButtonCont , {opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [0, 1]
                    }) }]}>
                    <TouchableOpacity >

                      <Image style={styles.SubmitButton}
                    source={require('../assets/Submit.png')}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                {/* <Animated.View style={[{opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [0, 1]
                    }) }]}>
                    <TouchableOpacity style={styles.SubButtonCont} >

                      <Image style={styles.SubmitButton}
                    source={require('../assets/Submit.png')}
                      />
                    </TouchableOpacity>
                  </Animated.View> */}

               <Animated.View style={[{opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [1, 0]
                    }) }]}>
               <Image style={ [styles.ArrowImage]}
                 source={require('../assets/Arrowup.png')}
                  />
                  </Animated.View>
                    <Animated.Text style={[styles.MainText, {opacity : this.state.height.interpolate({
                      inputRange : [0, 1],
                      outputRange : [1, 0]
                    }) }]} > Swipe up to start </Animated.Text>

                </Animated.View>
              </GestureRecognizer>

        )
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems : "center",
      backgroundColor: '#2fbb55',
      justifyContent : "space-between"

    },CircleShapeView: {
        marginTop : "100%",
        justifyContent : "center",
        alignItems : "center",
        width : 500,
        backgroundColor: '#fff'
    }, MainText : {
        fontSize : 20,
        fontFamily :"Poppins-ExtraLight"
    },
    LogoImage : {
        marginTop : 30,
        position :"absolute",
        width: 150, 
        zIndex : 1,
        height: 150,
        
      },ParticlesImage : {
        marginTop : 20,
        position :"absolute",
        width: "100%", 
        zIndex : 1,
        height: 130,
        
      },
      ArrowImage : {
        width : 40 , 
        height : 50 , 
        marginBottom : 20
      }, 
      Input : { 
      position : "absolute" , 
      top : 50 , 
      },
       SubmitButton : {
        width : 50 , 
        height : 50,
      },
      SubButtonCont : {
        position : "absolute" , 
        bottom : 200 ,
        right : 110
       
      
      }
  });
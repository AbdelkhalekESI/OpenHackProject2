import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet , Dimensions ,TouchableOpacity
} from 'react-native';


changeHandler = value => {
  this.setState({
    InputValue : value
    })

// fetch("api/search?q=" + value)
//   .then( res => res.JSON())
//   .then(parsedData => alert(parsedData))
//   .catch(err => alert(err));

 }
 var IngredientsItem = null ;

export default class Input extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text : "" , 
      Ingredients : []
    }
  }



  DeleteHandler = (itemDetected) => { 
      this.setState(prevState => {
        if (prevState.Ingredients.length > 1)  {
          return { 
            Ingredients :  prevState.Ingredients.filter(item => item !== itemDetected)
          }
        } else { 
          return { 
            Ingredients : []
          }
        }
        
      })
  
  }

  addIngredient = () => { 
    if (this.state.text.trim() === "") {
      return;
    }
    this.setState (prevState => { 
      return {
        Ingredients : prevState.Ingredients.concat(prevState.text) , 
        text : ""
      }
    })
  }

  render() {
    if ( this.state.Ingredients && this.state.Ingredients.length > 0) { 
      IngredientsItem = (
        <View style={styles.IngCont} >
          {this.state.Ingredients.map((item , index) => 
            <TouchableOpacity key={index} onPress={() => this.DeleteHandler(item)}>
            <View style={styles.IngBloc}  > 
            <Text style={styles.MainText} > {item} </Text> 
            </View>
            </TouchableOpacity>
          )}
        </View>
      )
    } else { 
      IngredientsItem = null ;
    }
    return (
      <View style={styles.container}>
      <TextInput
       style={styles.input}
        multiline={false}
        underlineColorAndroid="rgba(0,0,0,0)"
        value={this.state.text}
        onChangeText={(text) => this.setState({text})}
       // onKeyPress={event => (event.nativeEvent.key === 'Enter') ? this.addIngredient : null }
        onSubmitEditing={this.addIngredient}
        

         /> 
        
          {IngredientsItem}
        
        </View>
       
    );
  }
}

const styles = StyleSheet.create({
  input : {
    borderTopLeftRadius : 30,
    borderTopRightRadius : 30,
    borderBottomLeftRadius : 30,
    borderBottomRightRadius : 30,
    width : 250,
    height : 50,
    fontFamily :"Poppins-ExtraLight",
    backgroundColor : "#eee",
    padding : 10
  } , 
  MainText : {
    fontFamily :"Poppins-ExtraLight"
  },
  container : {
    flex : 1 ,
    flexDirection : "column" , 
    justifyContent : "center" , 
    alignItems : "center"
  },
  IngCont : {
    flexDirection : "row" ,
    justifyContent :"flex-start" , 
    alignItems : "center",
    width : Dimensions.get('window').width ,
    marginTop : 20 , 
    marginRight : 50 , 
    marginLeft : 60 , 
    flexWrap : "wrap"
  } , 
  IngBloc : {
    backgroundColor : "#e0e1e2" , 
    borderRadius : 8 ,
    margin : 5,
    padding : 8 , 
  }
});

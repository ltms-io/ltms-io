import React from 'react'
import './FinalRender.css'

class FinalRender extends React.Component{
    //gets all input from the document elements by the name "categories"
    render(){//gets all input from the document elements by the name "categories"
        var catt = document.getElementsByName("categories");
  
        //holds all the values of the document elements
        var cat = [];
  
        //populates cat
        for(var i = 0; i<catt.length; i++){
            cat.push(catt[i].value);
        }

        var items = [];

        for(var j = 0; j < cat.length; j++){
            items.push(<div className = "category">{cat[j]}</div>)
            items.push(<input className = "scoreInputs"></input>);
        }

        /*var inputs = [];
        
        for(var k = 0; k<cat.length; k++){
        inputs.push(<div>{items}</div>);
        }*/

        return(
        <text>{items}</text>
        );
    }
}


export default FinalRender;
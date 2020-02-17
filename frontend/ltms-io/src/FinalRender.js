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

        for(var i = 0; i < cat.length; i++){
            items.push(<div className = "category"><div className = "scoreInputs"></div></div>);
        }

        //var inputs = [];
        
        /*for(var i = 0; i<items.length; i++){
            inputs.push(<div className = "scoreInputs"></div>);
        }*/

        return(
        <text>{items}</text>
        );
    }
}


export default FinalRender;
import React from 'react';
import ReactDOM from 'react-dom';
import FinalRender from './FinalRender.js'
import './Scoresheet.css';


class Sheet extends React.Component{
    renderRow(i){
      //creates the input box to enter the categories
      return (<input type="text" className="category" contentEditable="true" name="categories"></input>);
    }
    
    render(){
      //prompts for the number of categories to score on
      var categories = window.prompt("How many categories?");
        
        //call renderRow to create enough inputs (bust)
        // var add = '<div>';  
        // for(var i = 0; i<count; i++){
        //     add += <div classname = "board-row">  
        //     {this.renderRow(0)}
        //     </div>
        // } 
        // add += '</div>';

        //holds the html input scripts
        //as many as entered by user
        var items = [];

        //calls renderRow to populate items with the script
        for(var i = 0 ; i<categories; i++){
          items.push(<div>{this.renderRow(i)}</div>);
        }

        //returns script to reactDOM to render site
        return(
          //create button to create scoresheet
        <div>
            {items}
            <div><button onClick={() => grabCategories()} className="rend">Render Scoresheet</button></div> 
        </div>
        

        );
       
    }
}

//button push sent here to grab all the categories entered
function grabCategories(){
  ReactDOM.render(<FinalRender />, document.getElementById('root'));
}
export default Sheet;
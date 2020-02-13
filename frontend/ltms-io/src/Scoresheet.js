import React from 'react';
import './Scoresheet.css';


class Square extends React.Component {
    render() {
      return (
        <input type="text" className="category" contentEditable="true" name="categories">
          {/* TODO */}
        </input>
      );
    }
  }



class Sheet extends React.Component{
    renderRow(i){
        return <Square />
    }
    render(){
      var categories = window.prompt("How many categories?");
        
        
        // var add = '<div>';  
        // for(var i = 0; i<count; i++){
        //     add += <div classname = "board-row">  
        //     {this.renderRow(0)}
        //     </div>
        // } 
        // add += '</div>';

        var items = [];

        for(var i = 0 ; i<categories; i++){
          items.push(this.renderRow(i));
        }

        return(
        <div>
            {items}
            <div><button onClick={() => grabCategories("hello")} className="rend">Render Scoresheet</button></div>
        </div>
        

        );
        // return(
        //     <div>
        //         <div classname = "board-row">
        //             {this.renderRow(0)}
        //             {this.renderRow(1)}
        //             {this.renderRow(2)}
        //         </div>
        //     </div>
        // );
    }
}

function grabCategories(variable){
  alert(variable);
  var catt = document.getElementsByName("categories");
  var cat = [];
  for(var i = 0; i<catt.length; i++){
    cat.push(catt[i].value);
  }
  alert(cat[3]);
}
export default Sheet;
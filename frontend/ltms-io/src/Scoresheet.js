import React from 'react';
import './Scoresheet.css';


class Square extends React.Component {
    render() {
      return (
        <textarea className="square">
          {/* TODO */}
        </textarea>
      );
    }
  }

class Sheet extends React.Component{
    renderRow(i){
        return <Square />
    }
    render(){
        const count = 7;
        
        
        // var add = '<div>';  
        // for(var i = 0; i<count; i++){
        //     add += <div classname = "board-row">  
        //     {this.renderRow(0)}
        //     </div>
        // } 
        // add += '</div>';

        var items = [];

        for(var i = 0 ; i<count; i++){
            items.push(<div>{this.renderRow(i)}</div>);
        }

        return(
        <div>
            {items}
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
export default Sheet;
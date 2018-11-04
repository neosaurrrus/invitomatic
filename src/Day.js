import React from 'react';
import './App.css';

class Day extends React.Component {

     dayButtonEvent = (event) => {
         event.preventDefault();
         console.log(this.props)
         this.props.toggleDoable(this.props.dayIndex) 
     }

    render(){
        return (
        <div className="day_dayBox">
            
            <button className="day_dayButton"onClick={this.dayButtonEvent}>{this.props.day.dayNumber}</button>
        </div>
        )
    }
}
export default Day;
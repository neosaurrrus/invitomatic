import React from 'react';
import './App.css';

class Day extends React.Component {

     dayButtonEvent = (event) => {
         event.preventDefault();
         this.props.toggleDoable(this.props.dayIndex) 
         event.currentTarget.classList.toggle("day_doable");
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
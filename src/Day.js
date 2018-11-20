import React from 'react';
import './App.css';

class Day extends React.Component {
    
     dayButtonEvent = (event) => { //change it from doable
         event.preventDefault();
         this.props.toggleDoable(this.props.dayIndex)
         this.setDoable(event.currentTarget);
     }

    setDoable = (target) => {
         target.classList.toggle("day_doable")
     }

    checkDoable = () => {
        if (this.props.day.doable){
            return "day_dayButton day_doable"
        } else {
            return "day_dayButton"
        }
    }


    componentDidUpdate(){ //check it is Doable when loaded
       
    }

    render(){
        return (
        <div className="day_dayBox">
                 <button className={this.checkDoable()} onClick={this.dayButtonEvent}>{this.props.day.dayNumber}</button>
        </div> 
        )
    }
}


export default Day;
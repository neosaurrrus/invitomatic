import React from 'react';
import './App.css';

class Day extends React.Component {
    state = {
        currentClassName: "day_undefined"
    }
     dayButtonEvent = (event) => { //change it from doable
         event.preventDefault();
         this.props.toggleDoable(this.props.dayIndex)
         event.currentTarget.classList.toggle("day_doable");
     }

    componentDidMount(){ //check it is Doable when loaded
        if (this.props.day.doable){
            this.setState({currentClassName: "day_doable"})  
        }
    }

    render(){
            if (this.props.day.doable) {
        return (
        <div className="day_dayBox">
                 <button className={this.state.currentClassName} onClick={this.dayButtonEvent}>{this.props.day.dayNumber}</button>
        </div>
        )
         }
    }
}
export default Day;
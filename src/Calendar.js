import React from 'react';
import './App.css';
import Day from './Day';
         

class Calendar extends React.Component {
   
    componentDidUpdate(){
        console.log("This is the calendar mounting")
    }

     
    calcMonths(){
        if (this.props.months){
        return this.props.months.map((month, index) =>{
                    return (
                        <div key={this.props.months[index]} className="calendar_calendarBox">
                            <div key={this.props.months[index]} className="calendar_monthTitle">{month}</div>
                            <div key={this.props.daysOfWeek[0]}>Mon</div>
                            <div key={this.props.daysOfWeek[1]}>Tue</div>
                            <div key={this.props.daysOfWeek[2]}>Wed</div>
                            <div key={this.props.daysOfWeek[3]}>Thu</div>
                            <div key={this.props.daysOfWeek[4]}>Fri</div>
                            <div key={this.props.daysOfWeek[5]}>Sat</div>
                            <div key={this.props.daysOfWeek[6]}>Sun</div>
                            {this.calcDays(month)}
                        </div>) 
            })

        } 
    }

    calcDays(month){
        let days =  this.props.days.map((dayElement, index) => {
            if(dayElement.dayMonth===month){
                if (index === 0) {
                    return this.insertBlanksFirst(dayElement, index, this.calcBlanks(this.props.days[0].dayName, 0))
                }
                if (dayElement.dayNumber === "01" && dayElement.dayName !== "Monday") {
                    return this.insertBlanksFirst(dayElement, index, this.calcBlanks(this.props.days[index - 1].dayName, 1));
                }
                return ( <Day day={dayElement}
                        key={dayElement._d}
                        dayIndex={index}
                        toggleDoable={this.props.toggleDoable}
                        daysOfWeek = {this.props.daysOfWeek}
                    />)
            }
        })
        return days;
    }
    
    //Works out how many blanks should appear before first day
    calcBlanks(dayName, modifier) {
        let shift = modifier;
        this.props.daysOfWeek.forEach((day, index) => {
            if (day === dayName) {
                shift += index
            }
        })
        return shift;
    }

    //Inserts the required number of blanks
    insertBlanksFirst(dayElement, index, shift){
        let blanks = []
        for(let i=0;i<shift;i++){
            blanks.push(<div></div>)
        } 
        blanks.push(<Day day={dayElement}
            key={dayElement._d}
            dayIndex={index}
            toggleDoable={this.props.toggleDoable}
            daysOfWeek = {this.props.daysOfWeek}
        />)
        return blanks;
     }


    render() {
        return (
        <div className="App">
               <h3> Yay! </h3>
               <strong>These are the dates PEOPLE can do. Remove the dates you can't make.</strong>
                {this.calcMonths()}
        </div>)
    }
}

export default Calendar;
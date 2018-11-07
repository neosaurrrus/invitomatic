import React from 'react';
import moment from 'moment'
import './App.css';
import Day from './Day';



class Month extends React.Component {
    postDates = event => {
        event.preventDefault();
        console.log("this would submit the dates if I had implemented this")
     }

     calcBlanks(){
         return 2
     }
     fillBlanks(num){
        
        return <div></div>
     }

    componentDidMount = () => { //Check if days already exist for this event, else create.
        if (this.props.days.length === 0){
            let upcomingMonths = [];
            const upcomingDays = [];
            const daysAhead = 20;
            //Make the days
            for (let i = 2; i < daysAhead; i++) {
                 upcomingDays.push(moment().add(i, "days"));
            }
          
            upcomingDays.forEach((day) => {
                day.doable = false;
                this.props.addDay(day)
                day.dayFormat = day.format("dddd DD MMMM");
                day.dayNumber = day.format("DD");
                day.dayName = day.format("dddd");
                day.dayMonth = day.format("MMMM");
                upcomingMonths.push(day.dayMonth);
            })
            //build month array by removing dupes from month array.
            let monthSet = new Set(upcomingMonths)
            this.props.addMonth([...monthSet]);
            console.log("Adding days for a new event")
        } else {
            console.log("Days already exist")
        }
    }

/*
 if (dayElement.dayMonth === month) {
     if DayIndex=0 OR dayNumber = 1{
        Loop through days of the week
          if dayName !== "monday"{
                return BLank
            }
        repeat
     }
*/


    render = () => {
                    return (
                        <div className="calendar_calendarBox">
                            <div className="calendar_monthTitle">{this.props.months[index]}</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                            
                            {this.fillBlanks(this.calcBlanks)}

                            {this.props.days.map((dayElement, index)=> {

                            if(dayElement.dayMonth===month){  
                                
                                return <Day day={dayElement}
                                        key={dayElement._d}
                                        dayIndex={index}
                                        toggleDoable={this.props.toggleDoable}
                                        daysOfWeek = {this.props.daysOfWeek}
                                    />
                                }
                            })}
                    </div>) 
                })}
        </div>
        )
    }
}
export default Month;
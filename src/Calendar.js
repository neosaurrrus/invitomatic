import React from 'react';
import moment from 'moment'
import './App.css';
import Day from './Day';



class Calendar extends React.Component {

    state = {
        blankCount: 0
    }
    postDates = event => {
        event.preventDefault();
        console.log("this would submit the dates if I had implemented this")
     }

   

     calcBlanks(dayName){
         console.log("calcBlanks" + dayName )
         this.state.blankCount = 0
         this.props.daysOfWeek.forEach((day,index) => {
             if (day === dayName ){
                this.state.blankCount = index
             }
         })
        console.log(this.state.blankCount)   
     }
   
     insertBlank(){
        console.log("insertblank" + this.state.blankCount)
        let blanks = []
        for(let i=0;i<this.state.blankCount;i++){
            blanks.push(<div></div>)
        } 
        console.log(blanks)
        return blanks;
     }

    componentDidMount = () => { //Check if days already exist for this event, else create.
        if (this.props.days.length === 0){
            let upcomingMonths = [];
            const upcomingDays = [];
            const daysAhead = 74;
            //Make the days
            for (let i = 1; i < daysAhead; i++) {
                 upcomingDays.push(moment().add(i, "days"));
            }
          
            upcomingDays.forEach((day, index) => {
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



    render = () => {
        return (
        <div className="App">

                {this.props.months.map((month, index) =>{
            
                    return (
                        <div className="calendar_calendarBox">
                            <div key={this.props.months[index]} className="calendar_monthTitle">{this.props.months[index]}</div>
                            <div>Mon</div>
                            <div>Tue</div>
                            <div>Wed</div>
                            <div>Thu</div>
                            <div>Fri</div>
                            <div>Sat</div>
                            <div>Sun</div>
                           

                            {this.props.days.map((dayElement, index)=> {
                            
                            if(dayElement.dayMonth===month){
                                if(index === 0 ||dayElement.dayNumber === "01" && dayElement.dayName !== "Monday" ){
                                  console.log(month + index)
                                   this.calcBlanks(this.props.days[index].dayName)
                                   index=index-1;
                                   return this.insertBlank();
                                }
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
export default Calendar;
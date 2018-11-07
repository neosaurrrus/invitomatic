import React from 'react';
import moment from 'moment'
import './App.css';
import Day from './Day';



class Calendar extends React.Component {

  
  
   

     calcBlanks(dayName, modifier){
        let shift = modifier;
         this.props.daysOfWeek.forEach((day,index) => {
             if (day === dayName ){
                shift += index
             }
         })
         return shift;
     }
   
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

    componentDidMount = () => { //Check if days already exist for this event, else create.
        if (this.props.days.length === 0){
            let upcomingMonths = [];
            const upcomingDays = [];
            const daysAhead = 80;
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
                                
                                if (index === 0) {
                                    return this.insertBlanksFirst(dayElement, index, this.calcBlanks(this.props.days[0].dayName, 0))
                                }

                                if (dayElement.dayNumber === "01" && dayElement.dayName !== "Monday") {
                                   return this.insertBlanksFirst(dayElement, index, this.calcBlanks(this.props.days[index - 1].dayName, 1));
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
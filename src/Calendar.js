import React from 'react';
import './App.css';
import Day from './Day';



class Calendar extends React.Component {
   
    componentDidUpdate(){
        console.log(this.props.months)
        console.log(this.props.days)
        console.log(this.props.state)
        console.log("This is the calendar mounting")
    }

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

    render() {
        return (
        <div className="App">
               <h3> Yay! </h3>
               <strong>These are the dates PEOPLE can do. Remove the dates you can't make.</strong>
                {this.props.months.map((month, index) =>{
                    return (
                        <div className="calendar_calendarBox">
                            <div key={this.props.months[index]} className="calendar_monthTitle">{month}</div>
                            <div key={this.props.daysOfWeek[0]}>Mon</div>
                            <div key={this.props.daysOfWeek[1]}>Tue</div>
                            <div key={this.props.daysOfWeek[2]}>Wed</div>
                            <div key={this.props.daysOfWeek[3]}>Thu</div>
                            <div key={this.props.daysOfWeek[4]}>Fri</div>
                            <div key={this.props.daysOfWeek[5]}>Sat</div>
                            <div key={this.props.daysOfWeek[6]}>Sun</div>

                            {this.props.days.map((dayElement, index) => {
                             {console.log(month + " arr  day " +  dayElement.dayMonth)}
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
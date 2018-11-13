/*
ToDO 
Set up Firebase Integration.
Input Formatting
Overall formatting.
Refactoring/Comments
Build!
Host!
*/


import React, { Component } from 'react';
import base from "./base"
import './App.css';
import Calendar from './Calendar';
import moment from 'moment'

class App extends Component {
   state = {
     event: {
        inviteURL: this.props.location.pathname,
        author: this.props.history.author,
        name: this.props.history.event,
        days: [],
        months: [],
        numberOfDays: 90,
     },
     daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
   }

      componentDidMount(){ //Check if days already exist for this event, else create.
        console.log(this.props)
        console.log("This is the app mounting")
        if (this.state.event.days.length === 0) {
          let upcomingMonths = [];
          const upcomingDays = [];
          const daysAhead = this.state.event.numberOfDays;
          //Make the days
          for (let i = 1; i < daysAhead; i++) {
            upcomingDays.push(moment().add(i, "days"));
          }

          upcomingDays.forEach((day, index) => {
            day.doable = false;
            this.addDay(day)
            day.dayFormat = day.format("dddd DD MMMM");
            day.dayNumber = day.format("DD");
            day.dayName = day.format("dddd");
            day.dayMonth = day.format("MMMM");
            upcomingMonths.push(day.dayMonth);

          })
          //build month array by removing dupes from month array.
          let monthSet = new Set(upcomingMonths)
          this.addMonth([...monthSet]);
          console.log("Adding days for a new event")
        } else {
          console.log("Days already exist")
        }
        
        // this.ref = base.syncState(`${Date.now()}/event`, {
        //   context: this,
        //   state: "event"
        // });
      }

componentWillUnmount() {
  base.removeBinding(this.ref);
}

  
  addDay = day => {
    let newEvent = this.state.event
    let newDays = newEvent.days;
    newDays.push(day)
    this.setState({event: newEvent});
  }

  addMonth = upcomingMonths => {
    let newEvent = this.state.event
    newEvent.months = upcomingMonths;
    this.setState({event:newEvent});
  }

 toggleDoable = (index) => {
   let newEvent = this.state.event
   let newDays = newEvent.days
   newDays[index].doable=!newDays[index].doable;
   this.setState({event: newEvent})
 }


  render() {
      return (
        <div className="App">
          <header className="App-header">
          <h1>Invitomatic</h1>
          <h4> http://invitomatic.com{this.props.location.pathname}</h4>
          </header>
          <section>
            <h2>Hey, {this.state.event.author} wants to {this.state.event.name}.</h2>
            <h3>Do you want in?</h3> 
            <button>Yeah!</button>
            <button>Nah!</button>
          </section>
       
          <Calendar 
            toggleDoable={this.toggleDoable}
            state={this.state}
            days={this.state.event.days} 
            months={this.state.event.months} 
            numberOfDays={this.state.event.numberOfDays}
            daysOfWeek={this.state.daysOfWeek}
            />
        </div>
      );
    }
}

export default App;

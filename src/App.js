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

  componentDidMount() {
    const {params} = this.props.match;
    this.ref=base.syncState(`${this.props.location.pathname}/event`, {
      contect: this,
      state: "event"
    });
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
            addDay={this.addDay}
            addMonth={this.addMonth}
            days={this.state.event.days} 
            months={this.state.event.months} 
            daysOfWeek={this.state.event.daysOfWeek}
            toggleDoable={this.toggleDoable}
            numberOfDays={this.state.event.numberOfDays}
            />
        </div>
      );
    }
}

export default App;

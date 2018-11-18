/*
ToDO 
Set up Firebase Integration - DONE


Input Formatting
Overall formatting.
Refactoring/Comments
Build!
Host!
*/


import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'

import Base from "./base"

import './App.css';
import Calendar from './Calendar';
import moment from 'moment'

class App extends Component {
  state = {
    event: {},
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  }

  componentDidMount(){ 
    console.log(this.props);
  
    this.syncDB();

    

    if(!this.state.event.days){
      console.log("Building initial state")
          this.buildInitialState()
    } else {
      console.log("This event already exists")
    } 

  }
  
  checkValid(){ //Checks to see if the url has a valid event. 
    console.log(this.state)
    console.log("checkvalid")
    if (!this.state.event.name){
      this.props.history.push("/");
    }
  }
  
  syncDB(){  //Sets up rebase sync
      this.ref = Base.syncState(`${this.props.match.params.inviteId}/event`, {
        context: this,
        state: "event"
      });
      this.checkValid();
  }

  //NOW lets make the DAYS and MONTHS JUST Once here....
  buildInitialState() {
    console.log(this.state.days)
    if (this.state.days) {
      let firstState = this.state
      firstState.event = {
        inviteID: this.props.match.params.inviteId,
        author: this.props.location.state.author,
        name: this.props.location.state.name,
        days: [],
        months: [],
        numberOfDays: 90
      };
      this.setState({event: firstState.event});
      console.log("build State")
      console.log(this.state)

      if (this.state.event.days.length < 6) {
        let upcomingMonths = [];
        const upcomingDays = [];
        const daysAhead = this.state.event.numberOfDays;
        //Make the days
        for (let i = 1; i < daysAhead; i++) {
          upcomingDays.push(moment().add(i, "days"));
        }
        let formattedDays = upcomingDays.map((day) => {
          let newDay = {}
          newDay.doable = false;
          newDay.dayFormat = day.format("dddd DD MMMM");
          newDay.dayNumber = day.format("DD");
          newDay.dayName = day.format("dddd");
          newDay.dayMonth = day.format("MMMM");
          upcomingMonths.push(newDay.dayMonth);
          return newDay
        })
        this.addDays(formattedDays);

        //build month array by removing dupes from month array.
        let monthSet = new Set(upcomingMonths)
        this.addMonth([...monthSet]);
      };
    };
    }
  componentWillUnmount() {
    Base.removeBinding(this.ref);
  }

  
  addDays = (daysObj) => {
    let newStateEvent = this.state.event
    console.log(this.state)
    newStateEvent.days = daysObj;
    console.log(newStateEvent)
    this.setState({event: newStateEvent});
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

  buttonYesEvent = (event) => {
    console.log("YES worked");
    let newEvent = this.state.event;
    console.log(newEvent.numberOfDays);
    newEvent.numberOfDays++;
    this.setState({event: newEvent});
    
  }


  render() {
      return (
        <div className="App">
          <header className="App-header">
          <h1>Invitomatic</h1>
          <h4> http://invitomatic.com{this.props.location.pathname}</h4>
          </header>
          <section>
            <h2>{this.state.event.numberOfDays} Hey, {this.state.event.author} wants to {this.state.event.name}.</h2>
            <h3>Do you want in?</h3> 
            <button onClick={this.buttonYesEvent}> Yeah!</button>
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

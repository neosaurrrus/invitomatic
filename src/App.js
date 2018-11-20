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
import {Redirect} from 'react-router-dom';
import Base from "./Base"
import Calendar from './Calendar';
import moment from 'moment'
import './App.css';

class App extends Component {
  state = {
    event: {},
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    loaded: false
  }

  isEmptyObject(obj) {
    let el=""
    for( el in obj){
      return false;
    }
    return true;
  }
  componentDidMount(){
    console.log(this.props.location)
    this.syncDB();
    console.log(this.state.event)
    console.log("does this occur before loading?")
  }
  componentDidUpdate(){
    if (this.state.loaded && !this.isEmptyObject(this.state.event)) {
      this.checkValid()
    } else {
      console.log("Not Loaded yet")
    }
  }

  componentWillUnmount() {
    Base.removeBinding(this.ref);
  }

  

 syncDB() { //Sets up rebase sync and calls for a check on what it gets.
    console.log("Sync DB")
    console.log(this.state)
   this.ref = Base.syncState(`${this.props.match.params.inviteId}/event`, {
     context: this,
     defaultValue:{failed: true},
     state: "event",
     then: this.setLoaded()
   });
   
 }

  setLoaded(){
      this.setState({loaded: true}, () => {console.log("loaded set to " + this.state.loaded.toString())})
  }


  checkValid(){ //Checks the state that is on the DB for this URL
      console.log("Check Valid")
      console.log(this.state.event)
      console.log("Event is empty? " + this.isEmptyObject(this.state.event))
    if (typeof this.state.event.days === "object") {
      console.log("Days array already exists, skipping date creation")
    } else if (this.props.location.state) {
      console.log("building new dates")
      this.buildDates();
    }
    console.error("Cannot deterimine what to do.")
  }
  
  // checkURL() { //checks to see if this URL contains props normally given by the landing component. IF not redirect to Landing.
  //   console.log(this.state.event)
  //   if (this.state.event.failed) {
  //     console.log("Empty DB Entry for this URL. Bumping to landing")
  //     this.props.history.push("/");
  //     // HOW TO HARD REDIRECT AS IT SEEMS TO KEEP GOINg ON
  //   }
  // }

  buildDates() { //builds the event object if empty
    console.log("checking that this was a valid URL")

    // this.checkURL()
    console.log("Build Dates")
    console.log(this.state)
    let newEvent = this.state.event;
    newEvent.inviteID = this.props.match.params.inviteId
    newEvent.author = this.props.location.state.author
    newEvent.name =  this.props.location.state.name
    newEvent.days = []
    newEvent.months = []
    newEvent.numberOfDays = 90;
    newEvent.failed = false;
    this.buildDays(newEvent)
    this.setState({event:newEvent})
  }

  buildDays(newEvent){
    console.log("Build Days")
    console.log(this.state)
    let upcomingMonths = [];
    const upcomingDays = [];
    const daysAhead = newEvent.numberOfDays;
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
    console.log("is the formatted days being used?")
    newEvent.days = formattedDays;

    //build month array by removing dupes from month array.
    let monthSet = new Set(upcomingMonths)
    newEvent.months = [...monthSet];

  };

  
  

 toggleDoable = (index) => {
   let newEvent = this.state.event
   let newDays = newEvent.days
   newDays[index].doable=!newDays[index].doable;
   this.setState({event: newEvent})
 }



  render() {
      if (this.state.event.failed && !this.state.event.days && this.state.loaded && !this.props.location.state ) {
         return <Redirect to='/'/>;
      }
      return (
     
        <div className="App">

          <header className="App-header">
          <h1>Invitomatic</h1>
          <h4> http://invitomatic.com{this.props.location.pathname}</h4>
          </header>
          <section>
            <h2>Hey, {this.state.event.author} wants to {this.state.event.name}.</h2>
            <h3>People In: </h3>
            <h3>People Out:</h3>
            <h2>So, who are you?</h2> 
            <input className="landing_input" type= "text"/>
            <h2>And are you up for it?</h2>
            <button className="landing_button" type="submit">Yeah!</button> <button className="landing_button" type="submit">Nah..</button>
  
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

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
import Base from "./Base"
import Calendar from './Calendar';
import moment from 'moment'
import './App.css';

class App extends Component {
  state = {
    event: {},
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    loading: true
  }


  componentDidMount(){
    this.syncDB();
  }
  componentDidUpdate(){
    if(!this.state.loading){this.checkValid()}
  }

  componentWillUnmount() {
    Base.removeBinding(this.ref);
  }

  
 syncDB() { //Sets up rebase sync and calls for a check on what it gets.
    console.log("Sync DB")
    console.log(this.state)
   this.ref = Base.syncState(`${this.props.match.params.inviteId}/event`, {
     context: this,
     state: "event",
     then: this.setLoading()
   });
 }

  setLoading(){
      this.setState({loading: false}, () => {console.log("loading set to false")})
  }


  checkValid(){ //Checks the state that is on the DB for this URL
      console.log("Check Valid")
      console.log(this.state)
    if (typeof this.state.event.days === "object" && !this.setLoading) {
      console.log("Days array already exists, skipping date creation")
    } else if (!this.state.event.days && !this.setLoading ) {
       console.log("building new dates")
       this.buildDates();
    }
    if (typeof this.state.event.name === undefined && typeof this.props.location.state === undefined){
      console.log("name not found in either props or state.")
      this.props.history.push("/");
    }
  }
  

  buildDates() { //builds the event object if empty
    console.log("Build Dates")
    console.log(this.state)
    let newEvent = this.state.event;
    newEvent.inviteID = this.props.match.params.inviteId
    newEvent.author = this.props.location.state.author
    newEvent.name =  this.props.location.state.name
    newEvent.days = []
    newEvent.months = []
    newEvent.numberOfDays = 90;
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

  buttonYesEvent = (event) => {
    console.log("YES worked");
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

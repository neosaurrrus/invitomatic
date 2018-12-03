/*
* * Application to do List 

* * DONE
Sort out day Logic 
Set up Firebase Integration
Sort out path logic 
Sort out In behavior
Sort out Out Behavior
Sort out what you see at start, hide stuff till its loaded.
General situation text.
URL formatting
Input limits
Clipboard thing.
Change it to proper name
Favicon
Refactored somewhat

* * CURRENT
------

- Fix OUT bug in Yeah or NAH.
- Fonts/Logo.

* * FUTURE
------

Accessibility Pass.
Figure out API Key issue.
Build!
Host!
Test
*/


import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import Base from "./Base"
import Calendar from './Calendar';
import moment from 'moment'
import './App.css';
import NewEvent from './NewEvent';
import ExistingEvent from './ExistingEvent';

class App extends Component {
  state = {
    event: {},
    daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    loaded: false,
    currentUser: "",
    currentUserChoice: "unknown"
  }

  isEmptyObject(obj) { //Helper function to determine if an object is empty.
    let el=""
    for( el in obj){
      return false;
    }
    return true;
  }
  componentDidMount(){
    this.syncDB();
  }
  componentDidUpdate(){
    if (this.state.loaded && !this.isEmptyObject(this.state.event)) {
      this.checkValid()
    } else {
      console.info("Event is not loaded yet")
    }
  }

  componentWillUnmount() {
    Base.removeBinding(this.ref);
  }

  

 syncDB() { //Sets up rebase sync and calls for a check on what it gets.
   this.ref = Base.syncState(`${this.props.match.params.inviteId}/event`, {
     context: this,
     defaultValue:{failed: true},
     state: "event",
     then: this.setLoaded()
   });
   
 }

  setLoaded(){ //Sets the loaded property in state to true
      this.setState({loaded: true}, () => {console.log("loaded set to " + this.state.loaded.toString())})
  }

  checkValid(){ //Checks the state that is on the DB for this URL
    if (typeof this.state.event.days === "object") {
      console.info("Event already exists, skipping date creation")
    } else if (this.props.location.state) {
      console.info("building new dates")
      this.buildDates();
    }
    console.info("Valid Event, nothing to be done")
  }
  
  buildDates() { //builds the event object if empty
    let newEvent = this.state.event;
    newEvent.inviteID = this.props.match.params.inviteId
    newEvent.author = this.props.location.state.author
    newEvent.name =  this.props.location.state.name
    newEvent.days = []
    newEvent.months = []
    newEvent.in = []
    newEvent.out = ["None"]
    newEvent.numberOfDays = 92;
    newEvent.failed = false;
    // newEvent.out.push("None");
    newEvent.in.push(newEvent.author + "[creator]");
    this.buildDays(newEvent)
    this.setState({event:newEvent})
  }

  buildDays(newEvent){ //Populates the event with days using Moment library
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

 toggleDoable = (index) => { //function to set a given day to doable or not
   let newEvent = this.state.event
   let newDays = newEvent.days
   newDays[index].doable=!newDays[index].doable;
   this.setState({event: newEvent})
 }
 userInput = (event) => {  //controls the name input
  let user = this.state.currentUser;
  user = event.target.value;
  this.setState({currentUser: user})
 }

 checkUser = (user) => { //checks the name has responded before and removes it prior to setIn or setOut
   let newEvent = this.state.event;
   console.log(this.state.event.out);
   newEvent.in = this.state.event.in.filter(inUser => inUser !== (", " + user));
   newEvent.out = this.state.event.out.filter(inUser => inUser !== (", " + user));
   this.setState({event: newEvent})
 }

copyURL = () => { //Puts the URL into the clipboard. Uses code I borrowed from stackoverflow as I am too dumb to understand refs
  let dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', `https://invite.li${this.props.location.pathname}`);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

 setIn = () => { //When the invite is accepted via button, add the person to the In array.
  this.checkUser(this.state.currentUser);
  let newEvent = this.state.event
  newEvent.in.push(", " + this.state.currentUser)
  this.setState({event: newEvent})
  this.setState({currentUserChoice: "in"})
 }

 setOut = () => { //When the invite is declined via button, add the person to the Out array
  this.checkUser(this.state.currentUser);
  let newEvent = this.state.event
  if (newEvent.out[0] === "None"){newEvent.out[0] = this.state.currentUser} 
  else {newEvent.out.push(", " + this.state.currentUser)}
  this.setState({event: newEvent})
  this.setState({currentUserChoice: "out"})
 }  
  displayHeader = (event) => { //Picks the right header depending if the event is new or not. Once it is loaded.
    if (Object.keys(event).length > 1 && typeof this.props.location.state === "object") { //New Event
      console.log("picking new event header")
       return (
       <NewEvent
          name={this.state.event.name}
          author={this.state.event.author}
          currentUser={this.state.currentUser}
          out={this.state.event.out}
          in={this.state.event.in}
          copyURL={this.copyURL}
          setIn={this.setIn}
          setOut={this.setOut}
          userInput={this.userInput}
        />
     ) 
    } 
    if (Object.keys(event).length > 1 && typeof this.props.location.state === "undefined") { //existing event
       console.log("picking existing event header")
       return (
        <ExistingEvent
          name={this.state.event.name}
          author={this.state.event.author}
          currentUser={this.state.currentUser}
          out={this.state.event.out}
          in={this.state.event.in}
          copyURL={this.copyURL}
          setIn={this.setIn}
          setOut={this.setOut}
          userInput={this.userInput}
        />
     ) 
    } 
  }
  displayCalendar = (choice) => { //Show the calendar, when 1. The user is In, 2. the event is loaded.
    if ((choice === "in" || typeof this.props.location.state === 'object') && Object.keys(this.state.event).length > 1 ) {
       return <Calendar 
          toggleDoable={this.toggleDoable}
          state={this.state}
          days={this.state.event.days} 
          months={this.state.event.months} 
          numberOfDays={this.state.event.numberOfDays}
          daysOfWeek={this.state.daysOfWeek}
          isNewEvent={typeof this.props.location.state}
          />
    } else if (choice === "out") {return <h3> Bummer, come back here if you change your mind</h3>}
  }
  render() {
      if (this.state.event.failed && !this.state.event.days && this.state.loaded && !this.props.location.state ) {
         return <Redirect to='/'/>;
      }
      return (
        <div className="App">
            {this.displayHeader(this.state.event)}
            {this.displayCalendar(this.state.currentUserChoice)}
        </div>
      );
  }

}

export default App;

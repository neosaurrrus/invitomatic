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

* * CURRENT
------

Refactoring 

- New days object
- Put the two summary paths into a component each


Overall formatting.

- Add UI design small things, read guide.




* * FUTURE
------

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
    newEvent.out = []
    newEvent.numberOfDays = 90;
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
   newEvent.in = this.state.event.in.filter(inUser => inUser !== (", " + user));
   if (this.state.event.in.length > 0) newEvent.out = this.state.event.out.filter(inUser => inUser !== (", " + user));
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


  summaryDisplay = (event) => { //Shows the event summary if DB is loaded. Big dunction needs componentising.
    if (Object.keys(event).length > 1 && typeof this.props.location.state === "undefined") {
       return (
        <div>
          <header className="App-header">
            <h3>inviteli</h3>
            <h2>Hey, {this.state.event.author} wants to {this.state.event.name}.</h2>
            <p>People In: {this.state.event.in}</p>
            <p>People Out: {this.state.event.out}</p>
              <button className="app_inverseButton" onClick={this.copyURL}>copy link</button>
            <br/>
          </header>
          <section>
            <h2>First, who are you?</h2> 
            <input className="landing_input" type= "text" value={this.state.currentUser} onChange={this.userInput}/>
            <h2>And are you up for it?</h2>
            <button className="landing_button" onClick={this.setIn} type="submit">Yeah! </button>
            <button className="landing_button" onClick={this.setOut} type="submit">Nah.. </button>
          </section>
        </div> 
     ) 
    } 
    if (Object.keys(event).length > 1 && typeof this.props.location.state === "object") {
       return (
        <div>
          <header className="App-header">
          <h3>inviteli</h3>
            <h2>Let's {this.state.event.name}!</h2>
          <br/>
          <button className="app_inverseButton" onClick={this.copyURL}>copy link</button>
          <br/>
          </header>
          <section>
            <h4>Responses</h4>
              <p>{this.state.event.in.length} People In: {this.state.event.in}</p>
              <p>People Out: {this.state.event.out}</p>
              <br/>
            <h4>Dates you can make</h4>
          </section>   
        </div>
     ) 
    } 
   
  }
  resultDisplay = (choice) => { //Show the calendar, when 1. The user is In, 2. the event is loaded.
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
            {this.summaryDisplay(this.state.event)}
            {this.resultDisplay(this.state.currentUserChoice)}
        </div>
      );
  }

}

export default App;

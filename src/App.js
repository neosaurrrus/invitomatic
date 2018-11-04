/*
ToDO 
Set up Firebase Integration.
Format the calendar 
Name and Event Proper Capture

*/


import React, { Component } from 'react';
import './App.css';
import Calendar from './Calendar';

class App extends Component {
   state = {
     inviteURL: null,
     days: [],
     months: [],
     daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
   }

  componentDidMount() {
    this.setState({inviteURL: this.props.location.pathname})
  }

  addDay = day => {
    let newDays = this.state.days
    newDays.push(day)
    this.setState({days: newDays});
  }

  addMonth = upcomingMonths => {
    this.setState({
      months: upcomingMonths
    });
  }

 toggleDoable = (index) => {
   console.log(index)
   let newDays = this.state.days
   newDays[index].doable=!newDays[index].doable;
   this.setState({days: newDays})
 }


    

  render() {
      return (
        <div className="App">
          <header className="App-header">
          <h1>Invitomatic</h1>
          </header>
          <h2>Hey wants to EVENT.</h2>
          <h3>So, when are you free?</h3>
          <Calendar 
            addDay={this.addDay}
            addMonth={this.addMonth}
            days={this.state.days} 
            months={this.state.months} 
            daysOfWeek={this.state.daysOfWeek}
            toggleDoable={this.toggleDoable}
            />
          <h4> Share this with others: http://invitomatic.com{this.props.location.pathname}</h4> 
        </div>
      );
    }
}

export default App;

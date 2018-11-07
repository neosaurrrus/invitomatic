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
import './App.css';
import Calendar from './Calendar';

class App extends Component {
   state = {
     inviteURL: null,
     author: null,
     event: null,
     days: [],
     months: [],
     numberOfDays: 90,
     daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
   }

  componentDidMount() {
    this.setState({
      inviteURL: this.props.location.pathname,
      author: this.props.history.author,
      event: this.props.history.event,
    })

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
          <h4> http://invitomatic.com{this.props.location.pathname}</h4>
          </header>
          <section>
            <h2>Hey, {this.state.author} wants to {this.state.event}.</h2>
            <h3>Do you want in?</h3> 
            <button>Yeah!</button>
            <button>Nah!</button>
          </section>
       
          <Calendar 
            addDay={this.addDay}
            addMonth={this.addMonth}
            days={this.state.days} 
            months={this.state.months} 
            daysOfWeek={this.state.daysOfWeek}
            toggleDoable={this.toggleDoable}
            numberOfDays={this.state.numberOfDays}
            />
        </div>
      );
    }
}

export default App;

import React, { Component } from 'react';
import './App.css';

class App extends Component {
   state = {
     inviteURL: null,
     inviteDates:{}
   };

  componentDidMount() {
    this.setState({inviteURL: this.props.location.pathname})
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <h1>Invitomatic</h1>
        </header>
        <h2>Hey wants to EVENT.</h2>
        <h3>So, when are you free?</h3>
        <h4> Share this with others: http://invitomatic.com{this.props.location.pathname}</h4> 
      </div>
    );
  }
}

export default App;


import React, { Component } from 'react';
import './App.css';
import Responses from './Responses';

class NewEvent extends Component {
  render() {
        return (
        <div>
          <header className="App-header">
            <h3 className="logo">inviteli</h3>
              <h2>Let's {this.props.name}!</h2>
            <br/>
            <button className="app_inverseButton" onClick={this.props.copyURL}>copy link</button>
            <br/>
          </header>
           <Responses
              in={this.props.in}
              out={this.props.out}
            />
        </div>
      ) 
  }
}

export default NewEvent
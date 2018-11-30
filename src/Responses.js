

import React, { Component } from 'react';
import './App.css';

class Responses extends Component {

  buildResponses = (event) => { //builds the resposes section depending what responses have occured
    if (this.props.out.length === 0 && this.props.in.length === 1){
      return <p>Noone else has responded ...yet...</p>
    }

    if (this.props.out.length === 0 && this.props.in.length > 1){
      return <p>{this.props.in.length} People In: {this.props.in}</p>
    }

    return (
      <div>
        <p>{this.props.in.length} People In: {this.props.in}</p>
        <p>People Out: {this.props.event.out}</p> 
      </div>
      )
     
    
  } 
  
  render() {
      return (
        <section>
          {this.buildResponses}
        </section>
      )
        
  }

}

export default Responses;

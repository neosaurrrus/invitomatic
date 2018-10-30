import React from 'react';
import './App.css';

class Calendar extends React.Component {
    render(){
        return (
        <div className="App">
            <form className="date-selector" onSubmit={this.goToInvite}>
            <p>loop through month components</p>
            </form>
        </div>
        )
    }
}
export default Calendar;
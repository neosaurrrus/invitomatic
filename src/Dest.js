import React from 'react'

class Dest extends React.Component{
        render(){ return (
                 <div>
                        <h1> This is the destination </h1>
                        <p> Your name is  {this.props.location.state.name} and you want to {this.props.location.state.event}</p>
                </div>
        )
               
        }
}


export default Dest;
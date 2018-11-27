import React, { Component } from "react";
import socketIOClient from "socket.io-client";


const endpoint = "http://192.168.1.50:4001"
//change IP address to local machine's IP
const socket = socketIOClient(endpoint);



class App extends Component {
  constructor() {
    super();
    this.state = {
      people: [],
      name: '',
      age: ''
      
    };
  }

  componentDidMount () {
    socket.on('person', (person) => {
      this.setState({ people: [...this.state.people, person] })
    })
  }

  handleChange = event => {
    this.setState({
      name: event.target.value
    })
  }

  handleChanges = event => {
    this.setState({
      age: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let name = this.state.name;
    let age = this.state.age;
    let id = socket.id.slice(8);
      let person = {
      id,
      name,
      age
      } 
      this.setState({
      people: [...this.state.people, person],
      name: '',
      age: ''
      })
      socket.emit('person', name, age, id)

}
  
  render() {
    const person = this.state.people.sort((obj1, obj2) => obj2.age - obj1.age).map((person, index) => {
      return  <tr key={index}>
                <td>{person.id}</td>
                <td>{person.name}</td>
                <td>{person.age}</td>
              </tr>
    })

    return (
      <div>
      <h1>HELLO</h1>
      <p>Please enter the following:</p>
        <form onSubmit={this.handleSubmit}>
              <input type="text" placeholder="name" value={this.state.name}onChange={this.handleChange} /><br/><br/>
              <input type="text" placeholder="age" value={this.state.age} onChange={this.handleChanges} /> <br/><br/>
              <button className="btn btn-primary">Enter</button>
        </form>
        <table className="table table-dark">
            <thead>
              <tr>
                  <th scope="col">ID</th>
                  <th scope="col">First</th>
                  <th scope="col">Age</th>
              </tr>
            </thead>
            <tbody>
                {person}
            </tbody>
        </table>
      </div>
    );
  }
}
export default App;
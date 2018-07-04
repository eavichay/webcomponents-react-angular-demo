import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import './wc/popup-menu'
import './wc/love-component'
import SuperToast from './wc/super-toast'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      love: 'Web Components',
      color: '#446688'
    }
  }

  handleMenuSelect(event) {
    const { target } = event
    if (target.localName === 'li') {
      this.fireToast(target.textContent)
    }
  }

  inputChanged (e) {
    const love = e.target.value
    this.setState({love})
  }

  colorChanged (e) {
    const color = e.target.value
    this.setState({color})
  }

  fireToast (message) {
    const toast = new SuperToast()
    toast.message = message
    toast.color = this.state.color
    document.body.appendChild(toast)
    requestAnimationFrame( () => {
      toast.appear()
    })
  }

  render() {

    const {love, color} = this.state

    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Welcome to React - Web Components Demo!</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <hr />
        <h2>This is a part of the product, written in React</h2>
        <p>We are interacting with the custom element</p>
        <input type="text" onChange={this.inputChanged.bind(this)} value={love} />
        <input type="color" onChange={this.colorChanged.bind(this)} value={color} />
        <button onClick={_=>this.fireToast(love)}>Fire toast</button>
        <popup-menu onMouseUp={this.handleMenuSelect.bind(this)}>
          <li role="menuitem">More info</li>
          <li role="menuitem">Edit...</li>
          <li role="menuitem">Go to home page</li>
          <li role="menuitem">Do something else</li>
          <li role="menuitem">Awesome, it works</li>
          <hr />
          <li role="menuitem">Wee, separator</li>
        </popup-menu>
        <love-component who={love}></love-component>
      </div>
    );
  }
}

export default App;

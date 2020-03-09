import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import BoardForm from './App_BoardForm';
import BoardList from './App_BoardList';


class App extends Component {
  render() {
    return (
      <div>
        <h3>Redux board</h3>
        <BoardForm />
        <BoardList />
      </div>
    )
  }
}

export default App;
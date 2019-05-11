import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './Container/Main/Main';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <React.Fragment>
          <Main/>
      </React.Fragment>
    );
  }
}

export default App;


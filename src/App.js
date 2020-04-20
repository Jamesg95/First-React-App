import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import DirectoryComponent from './components/DirectoryComponent';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href='/'>Nucamp</NavbarBrand>
          </div>
        </Navbar>
        <DirectoryComponent />
      </div>
    );
  }
}

export default App;

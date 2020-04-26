import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import DirectoryComponent from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null
    };
  }

    onCampsiteSelect(campsiteId) {
        this.setState({selectedCampsite: campsiteId});
    } 

  render() {
    return (
      <div>
        <Navbar dark color='primary'>
          <div className='container'>
            <NavbarBrand href='/'>Nucamp</NavbarBrand>
          </div>
        </Navbar>
        <DirectoryComponent campsites= {this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
        <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}/> 
      </div>
    );
  }
}

export default Main;
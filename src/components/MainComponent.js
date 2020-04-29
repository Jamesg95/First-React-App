import React, { Component } from 'react';
import Header from './HeaderComponent';
import DirectoryComponent from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import { CAMPSITES } from '../shared/campsites';
import Footer from './FooterComponent';

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
        <Header />
        <DirectoryComponent campsites= {this.state.campsites} onClick={campsiteId => this.onCampsiteSelect(campsiteId)}/>
        <CampsiteInfo campsite={this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]}/> 
        <Footer />
      </div>
    );
  }
}

export default Main;

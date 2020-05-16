import React, { Component } from 'react';
import DirectoryComponent from './DirectoryComponent';
import CampsiteInfo from './CampsiteInfoComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import{ Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { actions } from 'react-redux-form'
import { postComment, fetchCampsites, fetchCommments, fetchPromotions, fetchPartners, postFeedback } from '../redux/ActionCreators'
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStatetoProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

const mapDispatchtoProps = {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchCommments: () => (fetchCommments()),
  fetchPromotions: () => (fetchPromotions()),
  fetchPartners: () => (fetchPartners()),
  postFeedback: (feedback) => (postFeedback(feedback))
}

class Main extends Component {

  componentDidMount() {
    this.props.fetchCampsites()
    this.props.fetchCommments()
    this.props.fetchPromotions()
    this.props.fetchPartners()
  }

  render() {
    const HomePage = () => {
      return(
        <Home 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
          promotionsLoading={this.props.promotions.isLoading}
          promotionsErrMess={this.props.promotions.errMess}
          partner={this.props.partners.partners.filter(partner => partner.featured)[0]}
          partnersLoading={this.props.partners.isLoading}
          partnersErrMess={this.props.partners.errMess}
        />
      )
      }

    const AboutPage = () => {
      return (
        <About partners={this.props.partners.partners} />
      )
    }

    const CampsiteWithId = ({match}) => {
      return (
        <CampsiteInfo 
          campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
          comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          commentsErrMess={this.props.comments.errMess}
          postComment={this.props.postComment}
        />
      )
    }


    return (
      <div>
        <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
            <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/directory' render={() => <DirectoryComponent campsites={this.props.campsites} />} />
              <Route path='/directory/:campsiteId' component={CampsiteWithId} />
              <Route exact path='/contactus' render={() => <Contact 
                postFeedback={this.props.postFeedback}
                resetFeedbackForm={this.props.resetFeedbackForm} />} />
              <Route path='/aboutus' component={AboutPage} />
              <Redirect to='/home' />
            </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Main));

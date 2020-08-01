import React, { Component } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from "./components/Navbar/Navbar";
import { Route, withRouter } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import Login from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';

class App extends Component {
  componentDidMount() {
    this.props.initializApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs'                   // следит за url и загружает coolback который передали
            render={() => <DialogsContainer />} />

          <Route path='/profile/:userId?'           // в url есть параметр userID
            render={() => <ProfileContainer />} />

          <Route path='/users'
            render={() => <UsersContainer />} />

          <Route path='/login'
            render={() => <Login />} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializApp }))(App);
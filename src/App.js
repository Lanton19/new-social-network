import React, { Component, Suspense } from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from "./components/Navbar/Navbar";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer';
import Login from './components/Login/Login';
import { connect, Provider } from 'react-redux';
import { compose } from 'redux';
import { initializApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { HashRouter } from "react-router-dom";
import { withSuspense } from './hoc/withSuspense';
//import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer')); // ленивая загрузка
//import ProfileContainer from './components/Profile/ProfileContainer';
const ProfileContainer = React.lazy(() => import('././components/Profile/ProfileContainer'));

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
            render={withSuspense(DialogsContainer)} />

          <Route path='/profile/:userId?'           // в url есть параметр userID
            render={withSuspense(ProfileContainer ) } />

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

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializApp }))(App);

const SamuraiJSApp = (props) => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}
// Provider из react-redux - передаем store созданный с помощью createStore.
// Provider использует context API для того, чтобы засунуть в context store, чтобы дочерние компоненты могли до него достучаться 
export default SamuraiJSApp;
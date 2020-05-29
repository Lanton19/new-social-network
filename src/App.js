import React from 'react';
import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route } from "react-router-dom";
import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

const App = (props) => {
  return ( 
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs'                                             // следит за url и загружает coolback который передали
            render={ () => <DialogsContainer /> } /> 

          <Route path='/profile/:userId?'                           // в url есть параметр userID
            render={() => <ProfileContainer />} />

          <Route path='/users'
            render={() => <UsersContainer />} />

        </div>
      </div>
    )
}
export default App;

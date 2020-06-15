import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://img.favpng.com/17/14/18/logo-science-clip-art-png-favpng-u8mYYKbb2nfTPUbvuq8Hdcgph.jpg' />
        
        <div className={s.loginBlock}>
            { props.isAuth 
            ? <div>{props.login} - <button onClick={props.logout}>Log out</button> </div> 
             : <NavLink to={"/login"}>Login</NavLink>}
        </div>         
    </header>
}   
export default Header;

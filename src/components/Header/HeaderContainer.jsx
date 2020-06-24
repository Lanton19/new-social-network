import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';

class HeaderContainer extends React.Component {   //контейнерный компонент для запроса на сервер

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, {logout })(HeaderContainer); // контейнерный компонент, который возвращает функция connect

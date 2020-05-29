import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { getAuthUserData } from '../../redux/auth-reducer'; 

class HeaderContainer extends React.Component {   //контейнерный компонент для запроса на сервер
    componentDidMount() {
this.props.getAuthUserData();
    }
    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer); // контейнерный компонент, который возвращает функция connect

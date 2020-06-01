import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { withRouter, Redirect } from 'react-router-dom';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {        // компонент для запроса на сервак 
    componentDidMount() {
        let userId = this.props.match.params.userId;   // получаем userID из API
        if (!userId) { userId = 2; } // если userId нет загрузить второго пользователя
        this.props.getUserProfile(userId);
    }
    render() { 
        return (
            < Profile {...this.props} profile={this.props.profile} /> // презинтационный компонент
        )
    }
}

let mapStateToProps = (state) => ({      // круглые скобки, чтобы ф-я вернула объект, не воспринималась как тело ф-ии
    profile: state.profilePage.profile
});

export default compose(
    connect(mapStateToProps, { getUserProfile }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);


/* 
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);  // в hoc передаем целевой компонент и создает новый
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) // получение данных из URL

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);   // запрос к store и получение колбеков с пропсами */
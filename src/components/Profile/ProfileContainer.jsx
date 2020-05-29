import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

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

let WithUrlDataContainerComponent = withRouter(ProfileContainer) // получение данных из URL

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);   // запрос к store и получение колбеков с пропсами
import React from 'react';
import Profile from './Profile';
import axios from 'axios';
import { connect } from 'react-redux';
import { setUserProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';

class ProfileContainer extends React.Component{        // компонент для запроса на сервак 
    componentDidMount() {
        let userId = this.props.match.params.userId;   // получаем userID из API
        if (!userId) {userId=2;} // если userId нет загрузить второго пользователя
        axios .get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)  // переход к юзеру
        .then(response => {                                                   // доступ к телу объекта
            this.props.setUserProfile(response.data);
        });
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

export default connect(mapStateToProps, {setUserProfile}) (WithUrlDataContainerComponent);   // запрос к store и получение колбеков с пропсами
import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter, Redirect } from 'react-router-dom';
import { compose } from 'redux';


class ProfileContainer extends React.Component {        // компонент для запроса на сервак 

    refreshProfile() {
        let userId = this.props.match.params.userId;   // получаем userID из API
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('./login');
            }
        } // если userId нет загрузить свой профайл
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) { //предыдущие пропсы, стейт 
        if (this.props.match.params.userId != prevProps.match.params.userId) {     // если ID из текущих пропсов не равен предыдущим
            this.refreshProfile();
        }
    }

    render() {
        // console.log("RENDER PROFILE");
        return (
            < Profile {...this.props}
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus}  // презентационный компонент
                savePhoto={this.props.savePhoto}   />
        )
    }
}

let mapStateToProps = (state) => {      // круглые скобки, чтобы ф-я вернула объект, не воспринималась как тело ф-ии
    //console.log("mapStateToProps PROFILE")
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
    withRouter,
)(ProfileContainer);

/*
let AuthRedirectComponent = withAuthRedirect(ProfileContainer);  // в hoc передаем целевой компонент и создает новый
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent) // получение данных из URL

export default connect(mapStateToProps, { getUserProfile })(WithUrlDataContainerComponent);   // запрос к store и получение колбеков с пропсами */
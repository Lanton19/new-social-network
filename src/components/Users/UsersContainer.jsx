import React from 'react';
import {connect} from 'react-redux';
import { 
    follow, 
    setCurrentPage, 
    unfollow, toggleFollowingProgress, requestUsers
} from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { 
    getCurrentPage, 
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, 
    getUsers
 } from '../../redux/users-selectors';

class UsersContainer extends React.Component {    // extends - наследование свойств React.Component
    componentDidMount() {
        this.props.requestUsers(this.props.page, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            < Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                page={this.props.page}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    } // если сейчас получаем данные, то отобразим прелоадер либо ничего
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        page: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,{follow, unfollow, setCurrentPage, toggleFollowingProgress, requestUsers})
)(UsersContainer)
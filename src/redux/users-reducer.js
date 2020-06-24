import { usersAPI } from "../api/api";

const FOLLOW = 'FOLLOW'; // подписан 
const UNFOLLOW = 'UNFOLLOW';  //не подписан
const SET_USERS = 'SET_USERS';   // установка пользователей в state
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'; // установить текущую страницу
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'; // установить общее количество пользователей
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; // переключи значение получения данных
const TOGGLE_IS_FOLLOWONG_PROGRESS = 'TOGGLE_IS_FOLLOWONG_PROGRESS'; // переключение процесса подписки

let initialState = {                       //первоначальная инициализация
    users: [ ],                             // массив пользователей
    pageSize: 5,                           // пользователей на странице(размер страницы)
    totalUsersCount: 0,                    // общее количество пользователей
    page: 1,                        // текущая страница
    isFetching: true,                      // получаем данные от сервера?
    followingInProgress: []             // загрузка от повторного нажатия на подписку
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                // users: [...state.users],
                users: state.users.map(u => {   // берем массив пользователей, делаем копию
                    if (u.id === action.userId) {// если userID равен нужному нам пользователю
                        return { ...u, followed: true }       // делаем копию пользователя и меняем followed
                    }
                    return u;                     // возвращаем его же
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {   // берем массив пользователей, делаем копию
                    if (u.id === action.userId) {// если userID равен нужному нам пользователю
                        return { ...u, followed: false }       // делаем копию пользователя и меняем followed
                    }
                    return u;                     // возвращаем его же
                })
            }
        case SET_USERS: {
            return { ...state, users: action.users }   //перезатираем user-ов, теми что пришли из action
        }
        // делаем копию стейта и подменяем свойство в этой копии
        case SET_CURRENT_PAGE: {
            return { ...state, page: action.page } // устанавливаем текущую страницу
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count } // установить общее количество пользователей
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching } // переключатель данных(приходят не приходят)
        }
        case TOGGLE_IS_FOLLOWONG_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
                // фильтрация id не равна id из actin
            }
        }
        default:
            return state;
    }
}
//создатели action (действий)
export const followSuccess = (userId) => ({ type: FOLLOW, userId })

export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setCurrentPage = (page) => ({ type: SET_CURRENT_PAGE, page })

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (isFetching, userID) => ({ type: TOGGLE_IS_FOLLOWONG_PROGRESS, isFetching, userID })

export const requestUsers = (page, pageSize) => {
    return (dispatch) => {

        dispatch(toggleIsFetching(true));  // активация крутилки
        dispatch(setCurrentPage(page));

        usersAPI.requestUsers(page, pageSize).then(data => {    // когда придет ответ от сервера, получаем data
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));                // устанавливаем пользователей из response
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const follow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));  // переключение процесса подписки перед запросом
        usersAPI.follow(userId)
            .then(response => {                    // когда придет ответ от сервера
                if (response.data.resultCode == 0) { //если нет ошибок(подтверждение от сервера что подписка произошла)   
                    dispatch(followSuccess(userId));              // вызвать collback
                }
                dispatch(toggleFollowingProgress(false, userId));  // переключение процесса подписки после запроса
            });
    }
}

export const unfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));  // переключение процесса подписки перед запросом
        usersAPI.unfollow(userId)
            .then(response => {                    // когда придет ответ от сервера
                if (response.data.resultCode == 0) { //если нет ошибок(подтверждение от сервера что подписка произошла)   
                    dispatch(unfollowSuccess(userId));              // вызвать collback
                }
                dispatch(toggleFollowingProgress(false, userId));  // переключение процесса подписки после запроса
            });
    }
}

export default usersReducer;
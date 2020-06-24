import { authAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA'; // установить пользовательские данные 

let initialState = {                       //первоначальная инициализация
    userId: null,                           // id юзера
    email: null,
    login: null,
    isAuth: false                        // залогинены или нет                                    
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload // свойство payload с userId, email, login
            }

        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: 
    { userId, email, login, isAuth } })

export const getAuthUserData = () => (dispatch) => { // получить аутентификационные пользовательские данные (санк криэйтор)
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {      // если залогинены вернуть данные
            let { id, email, login } = response.data.data; // 1data - структура axios, 2data - из API 
            dispatch(setAuthUserData(id, email, login, true)); // данные в reducer
        }
    });
}

export const login = (email, password, rememberMe) => (dispatch) => { // логинемся (санк криэйтор - ф-я возвращающая санку)
    
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {      // если залогинены вернуть данные
                dispatch (getAuthUserData())
            }
            else {
                let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
                dispatch(stopSubmit('login', {_error: message}));
            }
        });
}

export const logout = () => (dispatch) => { 
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {   
                dispatch (setAuthUserData(null, null, null, false))
            }
        });
}
export default authReducer;
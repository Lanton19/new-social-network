import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA'; // установить пользовательские данные
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState = {                       //первоначальная инициализация
    userId: null,                           // id юзера
    email: null,
    login: null,
    isAuth: false,                        // залогинены или нет
    captchaUrl: null                       // if nuul, then captcha is not recquired              
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload // свойство payload с userId, email, login
            }
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});

export const getCaptchaUrlSuccess = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch) => { // получить аутентификационные пользовательские данные (санк криэйтор)
    let response = await authAPI.me();

    if (response.data.resultCode === 0) {      // если залогинены вернуть данные
        let { id, email, login } = response.data.data; // 1data - структура axios, 2data - из API 
        dispatch(setAuthUserData(id, email, login, true)); // данные в reducer
    }
}

export const login = (email, password, rememberMe, captcha ) => async (dispatch) => { // логинемся (санк криэйтор - ф-я возвращающая санку)

    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {      // если залогинены вернуть данные
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: message }));
    }
}

export const getCaptchaUrl = () => async (dispatch) => { // запрос капчи

    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false))
    }
}
export default authReducer;
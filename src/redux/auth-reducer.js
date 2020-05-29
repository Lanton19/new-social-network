import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA'; // установить пользовательские данные 

let initialState = {                       //первоначальная инициализация
    userId: null,                            
    email: null,                          
    login: null, 
    isAuth: false                                                            
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data, // свойство data с userId, email, login
                isAuth: true  
            }
        
        default:
            return state;
    }
}

export const setAuthUserData = (userId, email, login) => ({ type: SET_USER_DATA, data: {userId, email, login} })

export const getAuthUserData = () => (dispatch) => { // получить аутентификационные пользовательские данные (санк криэйтор)
    authAPI.me().then(response => {
        if (response.data.resultCode === 0) {      // если залогинены вернуть данные
            let {id, email, login} = response.data.data; // 1data - структура axios, 2data - из API 
            dispatch(setAuthUserData(id, email, login)); // данные в reducer
        }
    });
}
export default authReducer;
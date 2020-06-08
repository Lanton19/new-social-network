import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST'; // константа чтобы не использовать строки, дабы не допустить ошибки в написании(компилятор ругнется при опечатке)
const SET_USER_PROFILE = 'SET_USER_PROFILE'; // получение профайла
const SET_STATUS = 'SET_STATUS';   // получение статуса

let initialState = {                       //первоначальная инициализация
    posts: [
        { id: 1, message: "Hi, how are you", likeCount: 12 },
        { id: 2, message: "How It's my first post your APP", likeCount: 32 }
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,                         // копия state
                posts: [...state.posts, newPost], // копируем массив меняем посты, добавляем в конец массива
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_STATUS: {
            return { ...state, status: action.status }
        }
        default:
            return state;
    }
}

//создатели action (действий)
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const getUserProfile = (userId) => (dispatch) => {     // запросить юзерский профайл, санка
    usersAPI.getProfile(userId).then(response => {           // доступ к телу объекта
        dispatch(setUserProfile(response.data));
    });
}
export const getStatus = (userId) => (dispatch) => {     // запросить юзерский статус, санка
    profileAPI.getStatus(userId)
        .then(response => {            // доступ к телу объекта
            dispatch(setStatus(response.data));
        });
}
export const updateStatus = (status) => (dispatch) => {     // обновить юзерский статус, санка
    profileAPI.updateStatus(status)
        .then(response => {           // доступ к телу объекта
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
        });
}

export default profileReducer;
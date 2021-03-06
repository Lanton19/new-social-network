import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST'; // константа чтобы не использовать строки, дабы не допустить ошибки в написании(компилятор ругнется при опечатке)
const SET_USER_PROFILE = 'SET_USER_PROFILE'; // получение профайла
const SET_STATUS = 'SET_STATUS';   // получение статуса
const DELETE_POST = 'DELETE_POST';   // удаление поста
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';   // загрузка файла с фото

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
        case DELETE_POST: {
            return { ...state, post: state.post.filter(p => p.id != action.postId) }
        }
        case SAVE_PHOTO_SUCCES: {
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        }
        default:
            return state;
    }
}

//создатели action (действий)
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSucces = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos })

export const getUserProfile = (userId) => async (dispatch) => {     // запросить юзерский профайл, санка
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {     // запросить юзерский статус, санка
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {     // обновить юзерский статус, санка
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {     // загрузка файла
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSucces(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {     // изменение профайла
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', { _error: response.data.messages[0] }));
        return Promise.reject(response.data.messages[0] );     
    }
}

export default profileReducer;
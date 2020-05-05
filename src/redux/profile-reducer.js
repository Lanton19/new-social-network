const ADD_POST = 'ADD-POST'; // константа чтобы не использовать строки, дабы не допустить ошибки в написании(компилятор ругнется при опечатки)
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {                       //первоначальная инициализация
    posts: [
        { id: 1, message: "Hi, how are you", likeCount: 12 },
        { id: 2, message: "How It's my first post your APP", likeCount: 32 }
    ],
    newPostText: 'it-kamasutra.com'
};

const profileReducer = (state = initialState, action) =>{
    switch (action.type){
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };
            return {
                ...state,                         // копия state
                posts: [...state.posts, newPost], // копируем массив меняем посты, добавляем в конец массива
                newPostText: ''
            };   
        } 
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText

            }
        }
        default:
            return state;    
        }
} 

//создатели action (действий)
export const addPostActionCreator = () => ({ type: ADD_POST })     

export const updateNewPostTextActionCreator = (text) =>
        ({ type: UPDATE_NEW_POST_TEXT, newText: text })
        
export default profileReducer;
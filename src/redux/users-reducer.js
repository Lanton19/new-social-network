const ADD_POST = 'ADD-POST'; // константа чтобы не использовать строки, дабы не допустить ошибки в написании(компилятор ругнется при опечатки)
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {                       //первоначальная инициализация
    users: [
        { id: 1, fullName: 'Dmitry', status: 'I am a boss', location: {} },
        { id: 2, message: "How It's my first post your APP", likeCount: 32 }
    ],
};

const usersReducer = (state = initialState, action) =>{
    switch (action.type){
       
        default:
            return state;    
        }
} 

//создатели action (действий)
export const addPostActionCreator = () => ({ type: ADD_POST })     

export const updateNewPostTextActionCreator = (text) =>
        ({ type: UPDATE_NEW_POST_TEXT, newText: text })
        
export default usersReducer;
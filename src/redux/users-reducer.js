const FOLLOW = 'FOLLOW'; 
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';


let initialState = {                       //первоначальная инициализация
    users: [ ],
};

const usersReducer = (state = initialState, action) =>{
    switch (action.type){
        case FOLLOW: 
            return {
                ...state,
               // users: [...state.users],
                users: state.users.map(  u => {   // берем массив пользователей, делаем копию
                    if (u.id === action.userId) {// если userID равен нужному нам пользователю
                        return {...u, followed: true}       // делаем копию пользователя и меняем followed
                    }
                    return u;                     // возвращаем его же

                })
            }
        case UNFOLLOW:
            return {
                ...state,
               // users: [...state.users],
                users: state.users.map(  u => {   // берем массив пользователей, делаем копию
                    if (u.id === action.userId) {// если userID равен нужному нам пользователю
                        return {...u, followed: false}       // делаем копию пользователя и меняем followed
                    }
                    return u;                     // возвращаем его же

                })
            }
        case SET_USERS: {
            return{
                ...state,
                users: [...state.users, ...action.users]  //взять из state старых юзеров(создать копию массива) и дописать users которые пришли из action
            }
        }
        default:
            return state;    
        }
} 

//создатели action (действий)
export const followAC = (userId) => ({ type: FOLLOW, userId })     

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })

export const setUsersAC = (users) => ({ type: SET_USERS, users })
        
export default usersReducer;
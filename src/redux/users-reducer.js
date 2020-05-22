const FOLLOW = 'FOLLOW'; // подписан 
const UNFOLLOW = 'UNFOLLOW';  //не подписан
const SET_USERS = 'SET_USERS';   // установка пользователей в state
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'; // установить текущую страницу
const SET_TOTAL_USERS_COUNT =  'SET_TOTAL_USERS_COUNT'; // установить общее количество пользователей
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'; // переключи значение получения данных

let initialState = {                       //первоначальная инициализация
    users: [],                             // массив пользователей
    pageSize: 5,                           // пользователей на странице(размер страницы)
    totalUsersCount: 0,                    // общее количество пользователей
    currentPage: 1,                        // текущая страница
    isFetching: true                       // получаем данные от сервера?
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
            return {...state, users: action.users }   //перезатираем user-ов, теми что пришли из action
        }
        // делаем копию стейта и подменяем свойство в этой копии
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage } // устанавливаем текущую страницу
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count } // установить общее количество пользователей
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching } // переключатель данных(приходят не приходят)
        }
        default:
            return state;
    }
}
//создатели action (действий)
export const follow = (userId) => ({ type: FOLLOW, userId })

export const unfollow = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const setTotalUsersCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export default usersReducer;
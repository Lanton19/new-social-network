import { createStore, combineReducers, applyMiddleware } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer"; 
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({           // объединение редюсеров создание объекта со свойствами
    profilePage: profileReducer,        // свойство profileReduser со значением profileReduser
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer 
}); 

let store = createStore(reducers, applyMiddleware (thunkMiddleware)); // создание store и передача закомбайнерных reducer
// applyMiddleware - принять промежуточные слои для санок 

window.store = store;   // сохранить store глобально. в объект window

export default store;
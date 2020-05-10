import { createStore, combineReducers } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";

let reducers = combineReducers({           // объединение редюсеров создание объекта со свойствами
    profilePage: profileReducer,        // свойство profileReduser со значением profileReduser
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer 
}); 

let store = createStore(reducers); // создание store и передача закомбайнерных reducer

window.store = store;   // сохранить store глобально. в объект window

export default store;
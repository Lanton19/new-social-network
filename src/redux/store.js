import profileReducer from './profile-reducer.js';
import sidebarReducer from './sidebar-reducer.js';
import dialogsReducer from './dialogs-reducer.js';

let store = {
    _state: {
        profilePage: {
            posts: [
                { id: 1, message: "Hi, how are you", likeCount: 12 },
                { id: 2, message: "How It's my first post your APP", likeCount: 32 }
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogs: [
                { id: 1, name: "Antony" },
                { id: 2, name: "Vera" },
                { id: 3, name: "Sasha" },
                { id: 4, name: "Victor" },
                { id: 5, name: "Anna" },
                { id: 6, name: "Valera" }
            ],
            messages: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How is your APP" },
                { id: 3, message: "Yo" },
                { id: 4, message: "Yo" },
                { id: 5, message: "Yo" }
            ],
            newMessageBody: ""
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('state changed');
    },

    getState() {
        return this._state;   // _state обращение к state не напрямую, через геттер(свойство объекта)
    },
    subscribe(observer) {
        this._callSubscriber = observer; // наблюдатель, подписчик на изменения в store для отрисовки 
    },

    dispatch(action) {                           // перенаправление по action(действия из UI), преобразуют state
        this._state.profilePage = profileReducer(this._state.profilePage, action);// преобразование state и обновление(перепресваивание) 
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);
        this._callSubscriber(this._state);//уведомление всех подписчиков
    }
}

export default store;
window.store = store;
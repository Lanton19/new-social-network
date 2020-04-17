const UPDATE_NEW_MESSAGE_BODY = 'UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

const dialogsReducer = (state = initialState, action) =>{

    switch (action.type){
        case UPDATE_NEW_MESSAGE_BODY: 
            state.newMessageBody = action.body;
            return state;
        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';     // зануление()
            state.messages.push({id: 6, message: body});
            return state;
        default:
            return state;
    }
} 

//создатели action (действий)

export const sendMessageCreator = () => ({ type: SEND_MESSAGE })

export const updateNewMessageBodyCreator = (body) =>
                ({ type: UPDATE_NEW_MESSAGE_BODY, body: body })
                
export default dialogsReducer;                                 
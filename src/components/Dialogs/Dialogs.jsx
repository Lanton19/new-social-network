import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { updateNewMessageBodyCreator, sendMessageCreator } from '../../redux/state';


const Dialogs = (props) => {

    let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} />);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () =>{                 //нажатие на отправку сообщения
        props.store.dispatch (sendMessageCreator());
    }

    let onNewMassageChange = (e) => {               //e - event(событие) изменение нового сообщения
        let body = e.target.value;                  // вводимое значение
        props.store.dispatch (updateNewMessageBodyCreator(body)); // вызов события
    }
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
               <div> {messagesElements} </div>
            </div>
            <div>
                <div>
                    <textarea value = {newMessageBody} 
                            onChange= {onNewMassageChange}
                            placeholder='Enter your message'> </textarea>
                </div>
                <div>
                    <button onClick={onSendMessageClick}>Sent</button>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;
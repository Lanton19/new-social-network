import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    let state = props.dialogsPage;   //передача в пропсах stor

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id}/>);
    let newMessageBody = state.newMessageBody;

    let onSendMessageClick = () =>{                 //при клике отправка сообщения
        props.sendMessage();
    }

    let onNewMassageChange = (e) => {               //e - event(событие) изменение нового сообщения
        let body = e.target.value;                  // вводимое значение
        props.updateNewMessageBody(body);
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
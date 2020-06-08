import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

const Dialogs = (props) => {

    let state = props.dialogsPage;   //передача в пропсах stor

    let dialogsElements = state.dialogs.map(d => <DialogItem name={d.name} key={d.id} id={d.id} />);
    let messagesElements = state.messages.map(m => <Message message={m.message} key={m.id} />);
    let newMessageBody = state.newMessageBody;

    let addNewMessage = (velues) => { 
        props.sendMessage(velues.newMessageBody);              
    }

    if (!props.isAuth) return <Redirect to='/login' />; // перенаправление на логин если не залогинен

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div> {messagesElements} </div>
            </div>
            <AddMessageFormRedux onSubmit={addNewMessage } />
        </div>
    )
}

const AddMessageForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit } >
        <div>
            <Field  component='textarea' name='newMessageBody'  placeholder='Enter your message'/>
        </div>
       
        <div>
            <button>Sent</button>
        </div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm)

export default Dialogs;
import React from 'react';
import { updateNewMessageBodyCreator, sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
    return{
        dialogsPage: state.dialogsPage //получение объекта данных из state, c помощью библиотеки react-redux
    }
}

let mapDispatchToProps = (dispatch) => {
    return{
         updateNewMessageBody: () => {
            dispatch(sendMessageCreator());
         },   // получаем coolback 
         sendMessage: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
         }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs); // conect возвращает контейнерный компонент, отрисовывается --
// -- презинтационный компонет Dialogs в него из пропсов данные из объектов, которые возвращаются функциями 

export default DialogsContainer;
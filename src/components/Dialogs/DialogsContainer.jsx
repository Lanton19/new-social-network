import React from 'react';
import { sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {     //превратить часть state в props
    return{
        dialogsPage: state.dialogsPage //получение объекта данных из state, c помощью библиотеки react-redux
    }
}

let mapDispatchToProps = (dispatch) => {   // передача collback в презинтационный компонент
    return{
        sendMessage: () => {
            dispatch(sendMessageCreator());
         },   // получаем coolback 
         updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
         }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (Dialogs); // conect возвращает контейнерный компонент, отрисовывается --
// -- презинтационный компонет Dialogs в него приходят из пропсов данные из объектов, которые возвращаются функциями 

export default DialogsContainer;
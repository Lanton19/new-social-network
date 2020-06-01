import React from 'react';
import { sendMessageCreator, updateNewMessageBodyCreator} from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {     //превратить часть state в props
    return{
        dialogsPage: state.dialogsPage, //получение объекта данных из state, c помощью библиотеки react-redux
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

/* let AuthRedirectComponent = withAuthRedirect(Dialogs);  // в hoc передаем целевой компонент и создает новый

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent); // conect возвращает контейнерный компонент, отрисовывается --
// -- презинтационный компонет Dialogs в него приходят из пропсов данные из объектов, которые возвращаются функциями  */

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
    )(Dialogs);  // compose вызовет withAuthRedirect и передасть Dialogs в него, результат пойдет в connect;
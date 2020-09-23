import React, { useState, useEffect } from 'react';

const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false); // useState возвращает массив, первый элемент записываем в 
    //editMode, второй в setEditMode(ф-я которую меняет первый элемент)
    let [status, setStatus] = useState(props.status); // локальный state 

    useEffect( ()=>{                 // после отрисовки компонента. синхронизация состояния
        setStatus(props.status);
    }, [props.status] );              // если изменился props.status - запусти useEffect

    const activateEditMode = () => {  // обработчик при нажатии на статус
        setEditMode(true); // react возьмет объект  state изменив те свойства, которые переназначены(editMode)
    }

    const deactivateEditMode = () => {   // закончил редактирование
        setEditMode(false);
        props.updateStatus(status);
    }
    const onStatusChange = (e) => {       // e -onChange. При каждом напечатывании символа меняем локальный status
        setStatus(e.currentTarget.value);
    }
    return (
        <div>
            {!editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={activateEditMode}>{props.status || 'Статус'}</span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                        value={status} />
                </div>
            }
        </div>
    )
}
export default ProfileStatusWithHooks;
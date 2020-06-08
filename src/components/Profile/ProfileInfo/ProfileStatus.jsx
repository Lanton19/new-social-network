import React from 'react';

class ProfileStatus extends React.Component {

    state = {                                   // локальный state
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {   // обработчик при нажатии на статус
        this.setState({
            editMode: true    // react возьмет объект  state изменив те свойства, которые переназначены(editMode)
        })
    }
    deactivateEditMode = () => {   // закончил редактирование
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {       // e -onChange
        this.setState({
            status: e.currentTarget.value
        })  
    }

    componentDidUpdate (prevProps, prevState) {       // предыдущие пропсы и state
       if (prevProps.status != this.props.status) {  // если в предыдущих пропсах статус не равен текущим пропсам
         this.setState({
             status: this.props.status               // засинхронизировать state
         });
       } 
        console.log('componentDidUpdate')
    }
    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.props.status || '________'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} 
                        value={this.state.status } />
                    </div>
                }
            </div>
        )
    }
}
export default ProfileStatus;
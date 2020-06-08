import React from 'react';
import { reduxForm, Field } from 'redux-form';
const LoginForm = (props) => {
        return (
                <form onSubmit={props.handleSubmit } >                                              
                        <div>
                                <Field placeholder={'Login'} name={'login'} component={'input'} />   
                        </div>
                        <div>
                                <Field placeholder={'Password'} name={'password'} component={'input'} />
                        </div>
                        <div>
                                <Field type={'checkbox'} name={'rememberMe'} component={'input'} /> rememder me
                        </div>
                        <div>
                                <button>Login</button>
                        </div>
                </form>
        )
}                                
// handleSubmit - убирает значения по умолчанию, 
// сбор всех данных и упаковка в объект,
// контейнерный компонент(созданный вокруг input) вызывает onSubmit и передает в него объект с данными

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)   // уникальное название для формы

const Login = (props) => {
        const onSubmit = (formData) => {
                console.log(formData);       
        }
        return <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} />
        </div>
}

export default Login;
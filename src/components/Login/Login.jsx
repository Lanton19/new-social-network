import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/FormsControls/FormsControls';
import { required } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import style from './../common/FormsControls/FormsControls.module.css';

const LoginForm = (props) => {
        return (
                <form onSubmit={props.handleSubmit } >                                              
                        <div>
                                <Field placeholder={'Email'} name={'email'} 
                                validate={[required]}
                                component={Input} />   
                        </div>
                        <div>
                                <Field placeholder={'Password'} name={'password'} type={'password'}
                                validate={[required]}
                                component={Input } />
                        </div>
                        <div>
                                <Field type={'checkbox'} name={'rememberMe'} component={Input} /> rememder me
                        </div>
                        { props.error && <div className={style.formSummaryError}>  
                               {props.error}
                        </div>
                        }
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
                props.login(formData.email, formData.password, formData.rememberMe);       
        }

        if (props.isAuth) {
                return <Redirect to={'/profile'} />
        }

        return <div>
                <h1>Login</h1>
                <LoginReduxForm onSubmit={onSubmit} />
        </div>
}

const mapStateToProps = (state) =>({
        isAuth: state.auth.isAuth
})

export default connect(mapStateToProps , {login} )(Login);
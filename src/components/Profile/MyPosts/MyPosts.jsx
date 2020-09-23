import React, { Component } from 'react';
import s from './MyPosts.module.css'
import Post from './Posts/Post';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} placeholder={'Post message'}
                    validate={[required, maxLength10]} />
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({ form: 'PostAddNewPostForm' })(AddNewPostForm);

const MyPosts = React.memo (props => {   // проверка пропсов и стейта в функциональном компоненте

    /*    shouldComponentUpdate(nextProps, nextState){        //должен ли компонент обновится?
           return nextProps != this.props || nextState != this.state;                
          //если новые пропсы или новый стейт не равны текущим
          //только для классовых компонентов
       }  */
    let postsElements =
        [...props.posts]
        .reverse()
        .map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount} />);

    let newPostElement = React.createRef();   // cоздание ссылки

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return (
    <div className={s.postsBlock}>
        <h3> My posts</h3>
        <AddNewPostFormRedux onSubmit={onAddPost} />
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
    )
});

export default MyPosts;

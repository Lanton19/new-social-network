import React from 'react';
import s from './MyPosts.module.css'
import Post from './Posts/Post';
import { reduxForm, Field } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const MyPosts = (props) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} />);

    let newPostElement = React.createRef(); // cоздание ссылки

    let onAddPost = (values) => {
        props.addPost(values.newPostText)
    }

    return <div className={s.postsBlock}>
        <h3> My posts</h3>
        <AddNewPostFormRedux onSubmit={ onAddPost }  />
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

let AddNewPostForm = (props) => {
    return (
        <form onSubmit={ props.handleSubmit }>
            <div>
                <Field  name ='newPostText' component={Textarea} placeholder={'Post message'}
                validate={ [required , maxLength10] }/>
            </div>
            <div>
                <button>Add post</button>  
            </div>
        </form>
    )
}

let AddNewPostFormRedux = reduxForm({form: 'PostAddNewPostForm'})(AddNewPostForm) ;

export default MyPosts;

import React from 'react';
import s from './MyPosts.module.css'
import Post from './Posts/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/state';

const MyPosts = (props) => {

    let postsElements =
        props.posts.map(p => <Post message={p.message} likeCount={p.likeCount} />);

    let newPostElement = React.createRef(); // cоздание ссылки

    let addPost = () => {
        //  props.addPost();
        props.dispatch(addPostActionCreator());
    }
    let onPostChange = () => {
        let text = newPostElement.current.value;
        //  props.updateNewPostText(text);
        let action = updateNewPostTextActionCreator(text);
        props.dispatch(action);
    }
    return <div className={s.postsBlock}>
        <h3> My posts</h3>
        <div>
            <div>
                <textarea onChange={onPostChange} ref={newPostElement}
                    value={props.newPostText}> </textarea>      {/*  вывод текста из ссылки */}
            </div>
            <div>
                <button onClick={addPost}>Add post</button>   {/* вызов ф-ии при нажатии на кнопку */}
            </div>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}

export default MyPosts;

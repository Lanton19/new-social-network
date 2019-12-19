import React from 'react';
import s from './Post.module.css'



const Post = (props) => {
    return <div className={s.item}>
        <img src='https://avatars.mds.yandex.net/get-pdb/27625/2a8a2fab-686b-48da-8450-d5cac2debe12/s1200?webp=false' />
        {props.message}
        <div>
            <span>like</span> {props.likeCount}
        </div>
    </div>
}
export default Post;
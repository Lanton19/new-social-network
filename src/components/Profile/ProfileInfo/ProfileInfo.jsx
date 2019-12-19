import React from 'react';
import s from './ProfileInfo.module.css';

const ProfileInfo = () => {
    return (
        <div>
            <div className={s.imgFirst}>
                <img src='https://zastavok.net/main/priroda/1467375918.jpg'></img>
            </div>

            <div className={s.descriptionBlock}>
                ava+description
            </div>

        </div>
    )
}

export default ProfileInfo;

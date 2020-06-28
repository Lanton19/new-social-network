import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            {/* <div>
                <img src='https://zastavok.net/main/priroda/1467375918.jpg' />
            </div> */}
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large} />
                <div>{props.profile.fullName}</div><div>{props.profile.aboutMe}</div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}
export default ProfileInfo;

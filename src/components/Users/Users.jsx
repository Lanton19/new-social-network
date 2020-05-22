import React from 'react';
import styles from './users.module.css';
import userPhoto from '../../assets/images/user.png';
import { NavLink } from 'react-router-dom';

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);   // подсчет страниц, округление в большую сторону
    let pages = [];                                             // создаем пустой массив
    for (let i = 1; i <= pagesCount; i++) {                          // пробегаем фором 
        pages.push(i);                                          // добавляем
    }
    return <div>
        <div>
            {pages.map(p => {                                  // p - pages
                return <span className={props.currentPage === p && styles.selectedPage} 
                // если текущая страница равна запушенной p - применить стиль 
                    onClick={(e) => { props.onPageChanged(p); }}>{p}</span>
                // при клике  
            })}
        </div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id }>  {/* куда ведёт */}
                        <img src={u.photos.small != null ? u.photos.small : userPhoto} 
                        // если фото не равен null отоброзить, иначе отобразить фото по умолчанию
                            className={styles.userPhoto} />   
                        </NavLink>
                    </div>
                    <div>
                        {u.followed      // если подписаны
                                 // при клике на мышь отработает колбэк и возьмет в пропсах unfollow и передаст id
                            ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                             
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{'u.location.country'}</div>
                        <div>{'u.location.city'}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users; 
import React from 'react';
import styles from './users.module.css';

let Users = (props) => {

    if (props.users.length === 0 ) {
    props.setUsers([

        {
            id: 1, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=bd699f488887ee545be0cea97ee0bb6b&n=13&exp=1',
            followed: false, fullName: 'Dmitry', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' }
        },
        {
            id: 2, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=bd699f488887ee545be0cea97ee0bb6b&n=13&exp=1',
            followed: true, fullName: 'Anton', status: 'I am a boss too', location: { city: 'Podolsk', country: 'Rossia' }
        },
        {
            id: 3, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=bd699f488887ee545be0cea97ee0bb6b&n=13&exp=1',
            followed: true, fullName: 'Vera', status: 'I am a boss too', location: { city: 'Podolsk', country: 'Rossia' }
        },
        {
            id: 4, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=bd699f488887ee545be0cea97ee0bb6b&n=13&exp=1',
            followed: false, fullName: 'Slava', status: 'I am a boss too', location: { city: 'Vidoe', country: 'Rossia' }
        },
        {
            id: 4, photoUrl: 'https://im0-tub-ru.yandex.net/i?id=bd699f488887ee545be0cea97ee0bb6b&n=13&exp=1',
            followed: false, fullName: 'Ira', status: 'I am a boss too', location: { city: 'Vidnoe', country: 'Rossia' }
        }   
        ]
    )
    }
    return <div>
        {
            props.users.map(u => <div key={u.id}>
                <span>
                    <div>
                        <img src={u.photoUrl} className={styles.userPhoto} />
                    </div>
                    <div>
                        {u.followed
                            ? <button onClick={() => { props.unfollow(u.id) }}>Unfollow</button>
                            : <button onClick={() => { props.follow(u.id) }}>Follow</button>}
                    </div>
                </span>
                <span>
                    <span>
                        <div>{u.fullName}</div>
                        <div>{u.status}</div>
                    </span>
                    <span>
                        <div>{u.location.country}</div>
                        <div>{u.location.city}</div>
                    </span>
                </span>
            </div>)
        }
    </div>
}

export default Users;
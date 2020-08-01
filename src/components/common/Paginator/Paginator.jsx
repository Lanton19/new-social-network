import React from 'react';
import styles from './Paginator.module.css';

let Paginator = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pagesCount = Math.ceil(totalUsersCount / pageSize);   // подсчет страниц, округление в большую сторону
    
    let pages = [];                                             // создаем пустой массив
    for (let i = 1; i <= pagesCount; i++) {                          // пробегаем фором 
        pages.push(i);                                          // добавляем
    }
    return <div>
        {pages.map(p => {                                  // p - pages
            return <span className={currentPage === p && styles.selectedPage}
                // если текущая страница равна запушенной p - применить стиль 
                onClick={(e) => {
                    onPageChanged(p);
                }}>{p}</span>
            // при клике  
        })}
    </div>
}

export default Paginator; 
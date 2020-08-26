import React, { useState } from 'react';
import styles from './Paginator.module.css';
import cn from "classnames";

let Paginator = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);   // подсчет страниц, округление в большую сторону

    let pages = [];                                             // создаем пустой массив
    for (let i = 1; i <= pagesCount; i++) {                          // пробегаем фором 
        pages.push(i);                                          // добавляем
    }

    let portionCount = Math.ceil(pagesCount / portionSize); // подсчет порции (подсчет всех страниц / размер порции)
    let [portionNumber, setPortionNumber] = useState(1);    // в локальном state храним portionNumber
    // и ф-ю setPortionNumber, которая изменияет portionNumber.   хук useState.
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1; // номер страницы левой граници порции
    let rightPortionPageNumber = portionNumber * portionSize;          // номер страницы правой граници порции

    return <div className={styles.paginator}>
        {portionNumber > 1 &&                     // показывай кнопку в лево, если текущая порция > 1 
            //при клике на кнопку установить порция текущая - 1 
            <button onClick={() => { setPortionNumber(portionNumber - 1) }}>PREV</button>}

        {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber) // страницы >= левой границы и <= правой
            .map((p) => {                                  // p - pages
                return <span className={ cn({
                    [styles.selectedPage]: currentPage === p
                }, styles.pageNumber)}
                    key={p}
                    // если текущая страница равна запушенной p - применить стиль 
                    onClick={(e) => {
                        onPageChanged(p);
                    }}>{p}</span>
                // при клике  
            })}
        {portionCount > portionNumber &&          // показывай кнопку в право, если количество порций больше текущая порция
            //при клике на кнопку установить порция текущая + 1
            <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>}

    </div>
}

export default Paginator; 
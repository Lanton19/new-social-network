//функция изменить объект в массив
export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
   return items.map(u => {               // вернет новый массив в котором заменит,
    if (u[objPropName] === itemId) {     // если найдет совпадения по objPropName c itemId
        return { ...u, ...newObjProps}   // создав копию объекта измененного и заменит старые свойства новыми
    }
    return u;                     
})
}
import React from 'react';
import styles from './FormsControls.module.css';

const FormControl = ({input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error; 
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {props.children} 
            </div>
            { hasError && <span>{meta.error}</span>}
        </div>
    )  
}

export const Textarea = (props) => {
    const {input, meta, child, ...restPprops } = props;
    return <FormControl {...props}><textarea {...input} {...restPprops} /></ FormControl> 
    // отрисовываем FormControl и внутрь передаем child
}

export const Input = (props) => { 
    const {input, meta, child, ...restPprops } = props; 
    return <FormControl {...props}><input {...input} {...restPprops} /></FormControl>
}
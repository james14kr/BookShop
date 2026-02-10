import React from 'react'
import styles from './Button.module.css'

const Button = ({title = '버튼', variant = 'purple', size = 'small', disabled = false, ...props}) => {
  return (
    <button 
      type='button'
      className={
        `${styles.button} ${styles[variant]} ${styles[size]} ${disabled ? styles.disabled : '' /*if문을 대신할 수 있는 문법 : 삼항 연산자*/}` 
      }
      disabled={disabled}
      {...props}
    >{title}</button>
  )
}

export default Button
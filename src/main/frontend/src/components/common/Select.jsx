import React from 'react'
import styles from './Select.module.css'

//children이라는 이름으로 전달된 props는 컴포넌트의 자식으로 전달된 태그를 그려줌
const Select = ({children, ...props}) => {
  return (
    <select className={styles.select} {...props}>
      {children}
    </select>
  )
}

export default Select
import React from 'react'
import styles from './Textarea.module.css'

const Textarea = ({...props}) => {
  return (
    <textarea className={styles.textarea} {...props}>
      
    </textarea>
  ) 
}

export default Textarea
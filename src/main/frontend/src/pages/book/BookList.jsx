import React from 'react'
import { login } from '../../api/loginApi'
import styles from './BookList.Module.css'
import Button from '../../components/common/Button'
import { useNavigate } from 'react-router-dom'

const BookList = () => {

  const loginInfo = sessionStorage.getItem('loginInfo')
  const name = JSON.parse(loginInfo)

  const nav = useNavigate();

  const logOut = () => {
    alert('로그아웃 하시겠습니까?')
    nav('/login');
  }

  return (
    <div className={styles.container}>
      <div>도서 목록 페이지입니다.</div>
      <div>
        <span>{name.memName}</span>님 반갑습니다.
      </div>
      <div>
        <Button title='로그아웃' onClick={logOut}/>
      </div>
    </div>
   
  )
}

export default BookList
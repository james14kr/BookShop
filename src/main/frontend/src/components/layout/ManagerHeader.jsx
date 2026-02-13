import React from 'react'
import styles from './ManagerHeader.module.css'
import { useNavigate } from 'react-router-dom';

const ManagerHeader = ({setLoginInfo}) => {

  const nav = useNavigate();

  const loginInfo = sessionStorage.getItem('loginInfo');
  const info = JSON.parse(loginInfo);

  return (
    <div className={styles.container}>
      <img src="/logo.png" className={styles.logo} />
      <ul>
        <li>{info.memEmail} 매니저님 반갑습니다.</li>
          <li style={{cursor : 'pointer'}}
              onClick={e => {
                sessionStorage.removeItem('loginInfo');
                setLoginInfo({});
                nav('/');
              }}
          >logOut</li>
      </ul>
    </div>
  )
}

export default ManagerHeader
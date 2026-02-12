import React from 'react'
import styles from './Header.module.css'
import { Link } from 'react-router-dom'

//일반 사용자가 보는 페이지의 헤더 영역

const Header = () => {

  //로그인 여부를 확인
  //json 타입으로 가져옴(문자열)
  const loginInfo = sessionStorage.getItem('loginInfo');
  console.log(loginInfo);

  //json 데이터를 객체로 변환
  const loginInfo2 = JSON.parse(loginInfo);
  console.log(loginInfo2);

  return (
    <div>
      <div className={styles.top_menu}>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/join'>Join</Link>
          </li>
        </ul>
      </div>
      <div className={styles.banner_div}>
        <img  
          className={styles.banner_img}
          src="/book_banner.PNG" 
        />
        <h3 className={styles.banner_title}>BOOK SHOP</h3>
      </div>
      <div>
        일반사용자가 보는 메뉴
      </div>
    </div>
  )
}

export default Header
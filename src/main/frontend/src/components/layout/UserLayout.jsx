import React from 'react'
import Header from './Header'
import UserSide from './UserSide'
import styles from './UserLayout.module.css'
import { Outlet } from 'react-router-dom'

/**
 * 로그인 사용자 마이페이지 영역 레이아웃 컴포넌트
 * /user/* 경로 (장바구니, 구매내역, 마이페이지)에서 공통으로 사용
 *
 * [화면 구조]
 *  Header (공통 헤더)
 *  ┌──────────┬────────────────────┐
 *  │ UserSide │      Outlet        │
 *  │ 사이드메뉴│ (페이지 컴포넌트) │
 *  └──────────┴────────────────────┘
 *
 * Props:
 *  setLoginInfo : 로그아웃 시 loginInfo 상태를 {}로 변경하는 함수
 */
const UserLayout = ({setLoginInfo}) => {
  return (
    <div className={styles.container}>
      {/* 공통 헤더 */}
      <Header setLoginInfo={setLoginInfo}/>
      <div className={styles.main}>
        {/* 좌측 사이드 메뉴 */}
        <div className={styles.side}>
          <UserSide/>
        </div>
        {/* 우측: 현재 경로에 해당하는 페이지 컴포넌트 렌더링 위치 */}
        <div className={styles.content}>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default UserLayout
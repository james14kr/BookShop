import React from 'react'
import styles from './UserSide.module.css'
import { NavLink } from 'react-router-dom'

/**
 * 사용자 사이드 메뉴 컴포넌트
 * UserLayout의 좌측에 배치되어 /user/* 페이지 간 이동을 담당
 *
 * [NavLink vs Link 차이]
 *  - Link     : 일반 링크 (항상 동일한 스타일)
 *  - NavLink  : 현재 URL과 일치하면 "active" 상태 자동 감지
 *               className prop에 함수를 전달하면 isActive를 받을 수 있음
 *
 * [className 동적 적용 방법]
 *  className={({isActive}) => isActive ? styles.active : ''}
 *  → 현재 URL이 to 경로와 일치하면 styles.active CSS 클래스 적용
 *  → 활성 링크에 강조 스타일 (색상, 굵기 등) 자동 적용
 *  → CSS Modules에서 styles.active = UserSide.module.css의 .active 클래스
 */
const UserSide = () => {
  return (
    <div className={styles.container}>
      <div>
        <h2>SIDE MENU</h2>
        <ul>
          <li>
            {/* 장바구니 - /user/cart 와 URL 일치 시 active 클래스 적용 */}
            <NavLink
                to={'/user/cart'}
                className={({isActive}) => isActive ? styles.active : ''}>
                장바구니
            </NavLink>
          </li>
          <li>
            {/* 구매내역 - /user/buyList 와 URL 일치 시 active 클래스 적용 */}
            <NavLink
                to={'/user/buyList'}
                className={({isActive}) => isActive ? styles.active : ''}>
                구매내역
            </NavLink>
          </li>
          <li>
            {/* 마이페이지 - /user/mypage 와 URL 일치 시 active 클래스 적용 */}
            <NavLink
                to={'/user/mypage'}
                className={({isActive}) => isActive ? styles.active : ''}>
                마이페이지
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserSide
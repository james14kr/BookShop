import React, { useState, useEffect } from 'react'
import styles from './ManagerHeader.module.css'
import { useNavigate } from 'react-router-dom'

const ManagerHeader = ({ setLoginInfo }) => {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const loginInfo = sessionStorage.getItem('loginInfo')
  const info = JSON.parse(loginInfo)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    sessionStorage.removeItem('loginInfo')
    setLoginInfo({})
    nav('/')
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.inner}>

        {/* 로고 + 관리자 뱃지 */}
        <div className={styles.left}>
          <img src="/logo.png" alt="logo" className={styles.logo} />
          <span className={styles.adminBadge}>
            <span className={styles.badgeDot} />
            MANAGER
          </span>
        </div>

        {/* 우측 유저 정보 */}
        <div className={styles.right}>
          <div className={styles.userInfo}>
            <span className={styles.avatar}>
              {info?.memEmail?.[0]?.toUpperCase() ?? 'M'}
            </span>
            <span className={styles.email}>{info?.memEmail}님</span>
          </div>

          <div className={styles.divider} />

          <button className={styles.logoutBtn} onClick={handleLogout}>
            <span className={styles.logoutIcon}>↩</span>
            Logout
          </button>
        </div>

      </div>
    </header>
  )
}

export default ManagerHeader
import React, { useState, useEffect } from 'react'
import styles from './Header.module.css'
import { Link, useNavigate } from 'react-router-dom'

const Header = ({ setLoginInfo }) => {
  const nav = useNavigate()
  const [scrolled, setScrolled] = useState(false)

  const loginInfo = sessionStorage.getItem('loginInfo')
  const loginInfo2 = JSON.parse(loginInfo)

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
    <header className={styles.root}>

      {/* ── 상단 유틸 바 ── */}
      <div className={`${styles.utilBar} ${scrolled ? styles.utilBarScrolled : ''}`}>
        <nav className={styles.utilInner}>

          {/* 로고 */}
          <Link to="/" className={styles.logo}>
            Book<span className={styles.logoDot}>.</span>store
          </Link>

          {/* 우측 메뉴 */}
          <ul className={styles.utilNav}>
            {loginInfo == null ? (
              <>
                <li>
                  <Link to="/login" className={styles.utilLink}>Login</Link>
                </li>
                <li className={styles.divider} />
                <li>
                  <Link to="/join" className={styles.joinBtn}>Join</Link>
                </li>
              </>
            ) : (
              <>
                <li className={styles.greeting}>
                  <span className={styles.greetingDot} />
                  {loginInfo2.memEmail}님
                </li>
                <li>
                  <button
                    className={styles.utilLink}
                    onClick={() => nav('/user/cart')}
                  >
                    장바구니
                  </button>
                </li>
                <li className={styles.divider} />
                <li>
                  <button
                    className={styles.utilLink}
                    onClick={() => nav('/user/cart')}
                  >
                    마이페이지
                  </button>
                </li>
                <li className={styles.divider} />
                <li>
                  <button
                    className={styles.logoutBtn}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* ── 배너 영역 ── */}
      <div className={styles.banner}>
        <img
          className={styles.bannerImg}
          src="/book_banner.PNG"
          alt="book banner"
        />

        {/* 오버레이 */}
        <div className={styles.bannerOverlay} />

        {/* 배너 텍스트 */}
        <div className={styles.bannerContent}>
          <p className={styles.bannerEyebrow}>curated reads for curious minds</p>
          <h1 className={styles.bannerTitle}>BOOK SHOP</h1>
          <div className={styles.bannerAccent} />
        </div>
      </div>

    </header>
  )
}

export default Header
import React, { useState } from 'react'
import styles from './Login.module.css'
import { login } from '../../api/loginApi'
import { useNavigate, Link } from 'react-router-dom'

const Login = ({ setLoginInfo }) => {
  const nav = useNavigate()

  const [loginData, setLoginData] = useState({
    memEmail: '',
    memPw: ''
  })
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)

  const handleLoginData = e => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const goLogin = async () => {
    setLoading(true)
    const response = await login(loginData)

    if (response.data !== '') {
      const loginInfo = {
        memEmail: response.data.memEmail,
        memName: response.data.memName,
        memRole: response.data.memRole
      }
      sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo))
      setLoginInfo(loginInfo)

      if (loginInfo.memRole === 'MANAGER') {
        nav('/manage/book-form')
      } else {
        nav('/')
      }
    } else {
      setLoading(false)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      setLoginData({ memEmail: '', memPw: '' })
    }
  }

  return (
    <div className={styles.container}>

      {/* 배경 장식 */}
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      {/* 카드 */}
      <div className={`${styles.card} ${shake ? styles.shake : ''}`}>

        {/* 상단 헤더 */}
        <div className={styles.cardHeader}>
          <div className={styles.logoMark}>
            Book<span className={styles.logoDot}>.</span>store
          </div>
          <h2 className={styles.title}>로그인</h2>
          <p className={styles.subtitle}>계속하려면 계정에 로그인하세요</p>
        </div>

        {/* 폼 */}
        <div className={styles.form}>

          {/* 이메일 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>✉</span>
              <input
                className={styles.input}
                placeholder="이메일을 입력하세요"
                name="memEmail"
                type="email"
                value={loginData.memEmail}
                onChange={handleLoginData}
                onKeyDown={e => e.key === 'Enter' && goLogin()}
                autoComplete="email"
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>비밀번호</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                className={styles.input}
                placeholder="비밀번호를 입력하세요"
                name="memPw"
                type="password"
                value={loginData.memPw}
                onChange={handleLoginData}
                onKeyDown={e => e.key === 'Enter' && goLogin()}
                autoComplete="current-password"
              />
            </div>
          </div>

          {/* 로그인 버튼 */}
          <button
            className={`${styles.loginBtn} ${loading ? styles.loginBtnLoading : ''}`}
            onClick={goLogin}
            disabled={loading}
          >
            {loading ? (
              <span className={styles.spinner} />
            ) : (
              '로그인'
            )}
          </button>

          {/* 하단 링크 */}
          <p className={styles.joinPrompt}>
            아직 계정이 없으신가요?{' '}
            <Link to="/join" className={styles.joinLink}>회원가입</Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login
import React, { useEffect, useState } from 'react'
import styles from './Join.module.css'
import { useNavigate } from 'react-router-dom'
import { checkEmail, insertInfo } from '../../api/memberApi.js'
import { useDaumPostcodePopup } from 'react-daum-postcode'
import { Link } from 'react-router-dom'

const Join = () => {
  const nav = useNavigate()
  const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  const open = useDaumPostcodePopup(scriptUrl)

  const [info, setInfo] = useState({
    memEmail: '', memPw: '', confirmPw: '',
    memName: '', memTel: '',
    tel1: '', tel2: '', tel3: '',
    memAddr: '', addrDetail: ''
  })

  const [errors, setErrors] = useState({
    memEmail: '', memPw: '', confirmPw: '',
    memName: '', memTel: '',
  })

  const [cnt, setCnt] = useState(0)
  const [isDesable, setIsDesable] = useState(true)
  const [emailChecked, setEmailChecked] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (cnt === 0) setCnt(cnt + 1)
  })

  const validateField = (name, value) => {
    let errorMsg = ''
    switch (name) {
      case 'memEmail':
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (value.length < 5) errorMsg = '이메일은 5글자 이상이어야 합니다.'
        else if (value.length > 50) errorMsg = '이메일은 최대 50글자입니다.'
        else if (!emailPattern.test(value)) errorMsg = '이메일 형식이 맞지 않습니다.'
        break
      case 'memPw':
        const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,50}$/
        if (value.length < 1) errorMsg = '비밀번호는 필수 입력입니다.'
        else if (!pwPattern.test(value)) errorMsg = '비밀번호는 영문, 숫자 조합 4~50글자 가능합니다.'
        break
      case 'memName':
        if (value.length < 1) errorMsg = '이름은 필수 입력입니다.'
        else if (value.length > 30) errorMsg = '이름은 최대 30글자입니다.'
        break
      case 'tel1':
        if (!/^[0-9]{3}$/.test(value)) errorMsg = '연락처 형식이 맞지 않습니다.'
        break
      case 'tel2':
        if (!/^[0-9]{3,4}$/.test(value)) errorMsg = '연락처 형식이 맞지 않습니다.'
        break
      case 'tel3':
        if (!/^[0-9]{4}$/.test(value)) errorMsg = '연락처 형식이 맞지 않습니다.'
        break
    }
    return errorMsg
  }

  const handleInfo = (e) => {
    const { name, value } = e.target
    setInfo(prev => ({ ...prev, [name]: value }))

    if (name === 'tel1' || name === 'tel2' || name === 'tel3') {
      setInfo(prev => ({ ...prev, memTel: `${prev.tel1}-${prev.tel2}-${prev.tel3}` }))
    }

    if (name === 'memEmail') {
      setIsDesable(true)
      setEmailChecked(false)
    }

    const errorMsg = validateField(name, value)
    const keyName = name === 'tel1' || name === 'tel2' || name === 'tel3' ? 'memTel' : name
    setErrors(prev => ({ ...prev, [keyName]: errorMsg }))
  }

  useEffect(() => {
    if (cnt === 0) return
    const result = Object.values(errors).every(v => v === '')
    setIsDesable(!result)
  }, [errors])

  const regInfo = async () => {
    setLoading(true)
    try {
      const response = await insertInfo(info)
      if (response.status === 201) {
        alert('회원가입을 축하합니다')
        nav('/login')
      } else {
        alert('오류 발생!')
      }
    } finally {
      setLoading(false)
    }
  }

  const checkId = async () => {
    const response = await checkEmail(info.memEmail)
    if (response.data) {
      alert('이미 사용 중인 이메일입니다.')
    } else {
      setEmailChecked(true)
      setIsDesable(false)
    }
  }

  const handleComplete = (data) => {
    setInfo(prev => ({ ...prev, memAddr: data.address }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.bgOrb1} />
      <div className={styles.bgOrb2} />

      <div className={styles.card}>
        {/* 헤더 */}
        <div className={styles.cardHeader}>
          <Link to="/" className={styles.logoMark}>
            Book<span className={styles.logoDot}>.</span>store
          </Link>
          <h2 className={styles.title}>회원가입</h2>
          <p className={styles.subtitle}>새 계정을 만들어 도서를 즐겨보세요</p>
        </div>

        {/* 폼 */}
        <div className={styles.form}>

          {/* 이메일 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>이메일</label>
            <div className={styles.inlineRow}>
              <div className={styles.inputWrap} style={{ flex: 1 }}>
                <span className={styles.inputIcon}>✉</span>
                <input
                  className={`${styles.input} ${emailChecked ? styles.inputSuccess : ''}`}
                  placeholder="example@email.com"
                  name="memEmail"
                  type="email"
                  value={info.memEmail}
                  onChange={handleInfo}
                />
              </div>
              <button
                className={`${styles.checkBtn} ${emailChecked ? styles.checkBtnDone : ''}`}
                onClick={checkId}
                type="button"
              >
                {emailChecked ? '✓ 확인됨' : '중복확인'}
              </button>
            </div>
            {errors.memEmail && <p className={styles.errorMsg}>⚠ {errors.memEmail}</p>}
          </div>

          {/* 비밀번호 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>비밀번호</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                className={styles.input}
                placeholder="영문 + 숫자 조합 4자 이상"
                type="password"
                name="memPw"
                value={info.memPw}
                onChange={handleInfo}
              />
            </div>
            {errors.memPw && <p className={styles.errorMsg}>⚠ {errors.memPw}</p>}
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>비밀번호 확인</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>🔒</span>
              <input
                className={`${styles.input} ${
                  info.confirmPw && info.confirmPw !== info.memPw ? styles.inputError : ''
                } ${info.confirmPw && info.confirmPw === info.memPw ? styles.inputSuccess : ''}`}
                placeholder="비밀번호를 다시 입력하세요"
                type="password"
                name="confirmPw"
                value={info.confirmPw}
                onChange={handleInfo}
              />
            </div>
            {info.confirmPw && info.confirmPw !== info.memPw && (
              <p className={styles.errorMsg}>⚠ 비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          {/* 이름 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>이름</label>
            <div className={styles.inputWrap}>
              <span className={styles.inputIcon}>👤</span>
              <input
                className={styles.input}
                placeholder="이름을 입력하세요"
                name="memName"
                value={info.memName}
                onChange={handleInfo}
              />
            </div>
            {errors.memName && <p className={styles.errorMsg}>⚠ {errors.memName}</p>}
          </div>

          {/* 연락처 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>연락처</label>
            <div className={styles.telRow}>
              <input
                className={`${styles.input} ${styles.telInput}`}
                placeholder="010"
                name="tel1"
                maxLength={3}
                value={info.tel1}
                onChange={handleInfo}
              />
              <span className={styles.telDash}>—</span>
              <input
                className={`${styles.input} ${styles.telInput}`}
                placeholder="0000"
                name="tel2"
                maxLength={4}
                value={info.tel2}
                onChange={handleInfo}
              />
              <span className={styles.telDash}>—</span>
              <input
                className={`${styles.input} ${styles.telInput}`}
                placeholder="0000"
                name="tel3"
                maxLength={4}
                value={info.tel3}
                onChange={handleInfo}
              />
            </div>
            {errors.memTel && <p className={styles.errorMsg}>⚠ {errors.memTel}</p>}
          </div>

          {/* 주소 */}
          <div className={styles.fieldGroup}>
            <label className={styles.label}>주소</label>
            <div className={styles.inlineRow}>
              <div className={styles.inputWrap} style={{ flex: 1 }}>
                <span className={styles.inputIcon}>📍</span>
                <input
                  className={styles.input}
                  readOnly
                  placeholder="주소 검색을 클릭하세요"
                  name="memAddr"
                  value={info.memAddr}
                  onClick={() => open({ onComplete: handleComplete })}
                  style={{ cursor: 'pointer' }}
                />
              </div>
              <button
                className={styles.checkBtn}
                onClick={() => open({ onComplete: handleComplete })}
                type="button"
              >
                검색
              </button>
            </div>
            <div className={styles.inputWrap} style={{ marginTop: 8 }}>
              <span className={styles.inputIcon}>🏠</span>
              <input
                className={styles.input}
                placeholder="상세 주소를 입력하세요"
                name="addrDetail"
                value={info.addrDetail}
                onChange={handleInfo}
              />
            </div>
          </div>

          {/* 구분선 */}
          <div className={styles.divider} />

          {/* 가입 버튼 */}
          <button
            className={`${styles.submitBtn} ${isDesable ? styles.submitBtnDisabled : ''}`}
            onClick={regInfo}
            disabled={isDesable || loading}
            type="button"
          >
            {loading ? <span className={styles.spinner} /> : '회원가입'}
          </button>

          <p className={styles.loginPrompt}>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" className={styles.loginLink}>로그인</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Join
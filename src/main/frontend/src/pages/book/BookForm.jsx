import React, { useEffect, useState } from 'react'
import styles from './BookForm.module.css'
import { selectCate } from '../../api/CategoriesApi'
import { insertBook } from '../../api/bookApi'

const BookForm = () => {
  const [cateList, setCateList] = useState([])
  const [loading, setLoading] = useState(false)

  const [bookData, setBookData] = useState({
    bookTitle: '', bookPrice: '', author: '',
    bookIntro: '', publishDate: '', cateNum: '0'
  })

  const [mainImg, setMainImg] = useState(null)
  const [mainImgPreview, setMainImgPreview] = useState(null)
  const [subImgs, setSubImgs] = useState(null)
  const [subPreviews, setSubPreviews] = useState([])

  const [errors, setErrors] = useState({
    bookTitle: '', bookPrice: '', publishDate: '',
    cateNum: '', author: '', bookIntro: ''
  })

  useEffect(() => {
    getListData()
  }, [])

  const getListData = async () => {
    const response = await selectCate()
    setCateList(response.data)
  }

  const validateField = () => {
    let isValid = true
    const newErrors = { bookTitle: '', bookPrice: '', publishDate: '', cateNum: '', author: '', bookIntro: '' }

    if (bookData.bookTitle === '') { newErrors.bookTitle = '도서명은 필수 입력입니다.'; isValid = false }
    if (bookData.bookTitle.length > 50) { newErrors.bookTitle = '50글자를 초과할 수 없습니다.'; isValid = false }
    if (bookData.bookPrice === '') { newErrors.bookPrice = '가격은 필수 입력입니다.'; isValid = false }
    if (isNaN(bookData.bookPrice) || Number(bookData.bookPrice) <= 0) { newErrors.bookPrice = '적합한 데이터가 아닙니다.'; isValid = false }
    if (bookData.cateNum === '0') { newErrors.cateNum = '카테고리는 필수 선택입니다.'; isValid = false }
    if (bookData.publishDate === '') { newErrors.publishDate = '출판일은 필수항목입니다.'; isValid = false }
    if (bookData.author === '') { newErrors.author = '글쓴이를 입력하세요.'; isValid = false }
    if (bookData.bookIntro.length < 5) { newErrors.bookIntro = '5글자 이상 입력하세요.'; isValid = false }

    setErrors(newErrors)
    return isValid
  }

  const handleBookData = (e) => {
    setBookData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }))
    }
  }

  const handleMainImg = (e) => {
    const file = e.target.files[0]
    setMainImg(file)
    if (file) setMainImgPreview(URL.createObjectURL(file))
  }

  const handleSubImgs = (e) => {
    const fileArr = Array.from(e.target.files)
    setSubImgs(fileArr)
    setSubPreviews(fileArr.map(f => URL.createObjectURL(f)))
  }

  const regBook = async () => {
    const isValid = validateField()
    if (!isValid) return

    const regForm = new FormData()
    regForm.append('bookTitle', bookData.bookTitle)
    regForm.append('bookPrice', bookData.bookPrice)
    regForm.append('author', bookData.author)
    regForm.append('bookIntro', bookData.bookIntro)
    regForm.append('publishDate', bookData.publishDate)
    regForm.append('cateNum', bookData.cateNum)
    regForm.append('mainImg', mainImg)
    for (const e of subImgs) regForm.append('subImgs', e)

    try {
      setLoading(true)
      const response = await insertBook(regForm)
      if (response.status === 201) {
        alert('등록 성공')
        setBookData({ bookTitle: '', bookPrice: '', author: '', bookIntro: '', publishDate: '', cateNum: '0' })
        setMainImg(null); setMainImgPreview(null)
        setSubImgs(null); setSubPreviews([])
      } else {
        alert('등록 실패')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>

      {/* ── 페이지 헤더 ── */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>도서 등록</h2>
          <p className={styles.pageSubtitle}>새 도서를 등록합니다. 모든 필수 항목을 입력하세요.</p>
        </div>
        <button
          className={`${styles.submitBtn} ${loading ? styles.submitBtnLoading : ''}`}
          onClick={regBook}
          disabled={loading}
        >
          {loading ? <span className={styles.spinner} /> : '도서 등록 →'}
        </button>
      </div>

      {/* ── 폼 그리드 ── */}
      <div className={styles.grid}>

        {/* 왼쪽: 이미지 업로드 */}
        <div className={styles.imgCol}>

          {/* 대표 이미지 */}
          <div className={styles.card}>
            <p className={styles.cardLabel}>대표 이미지</p>
            <label className={styles.imgUpload}>
              {mainImgPreview
                ? <img src={mainImgPreview} alt="대표" className={styles.previewImg} />
                : (
                  <div className={styles.imgPlaceholder}>
                    <span className={styles.uploadIcon}>＋</span>
                    <span className={styles.uploadText}>클릭하여 업로드</span>
                  </div>
                )
              }
              <input type="file" accept="image/*" hidden onChange={handleMainImg} />
            </label>
          </div>

          {/* 상세 이미지 */}
          <div className={styles.card}>
            <p className={styles.cardLabel}>상세 이미지 <span className={styles.optional}>(다중 선택)</span></p>
            <label className={styles.subImgUpload}>
              <div className={styles.imgPlaceholder} style={{ height: 70 }}>
                <span className={styles.uploadIcon} style={{ fontSize: '1rem' }}>📎</span>
                <span className={styles.uploadText}>
                  {subImgs ? `${subImgs.length}개 선택됨` : '파일 선택'}
                </span>
              </div>
              <input type="file" accept="image/*" multiple hidden onChange={handleSubImgs} />
            </label>

            {/* 서브 이미지 미리보기 */}
            {subPreviews.length > 0 && (
              <div className={styles.subPreviews}>
                {subPreviews.map((src, i) => (
                  <img key={i} src={src} alt={`서브 ${i + 1}`} className={styles.subThumb} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 도서 정보 */}
        <div className={styles.infoCol}>

          {/* 카테고리 */}
          <div className={styles.card}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>카테고리 <Required /></label>
              <select
                name="cateNum"
                value={bookData.cateNum}
                onChange={handleBookData}
                className={`${styles.select} ${errors.cateNum ? styles.fieldError : ''}`}
              >
                <option value="0">카테고리를 선택하세요</option>
                {cateList.map((cate, i) => (
                  <option key={i} value={cate.cateNum}>{cate.cateName}</option>
                ))}
              </select>
              {errors.cateNum && <p className={styles.errorMsg}>⚠ {errors.cateNum}</p>}
            </div>
          </div>

          {/* 제목 + 저자 */}
          <div className={styles.card}>
            <div className={styles.twoCol}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>도서명 <Required /></label>
                <input
                  className={`${styles.input} ${errors.bookTitle ? styles.fieldError : ''}`}
                  name="bookTitle"
                  placeholder="도서 제목 (최대 10자)"
                  value={bookData.bookTitle}
                  onChange={handleBookData}
                />
                {errors.bookTitle && <p className={styles.errorMsg}>⚠ {errors.bookTitle}</p>}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>저자 <Required /></label>
                <input
                  className={`${styles.input} ${errors.author ? styles.fieldError : ''}`}
                  name="author"
                  placeholder="저자명"
                  value={bookData.author}
                  onChange={handleBookData}
                />
                {errors.author && <p className={styles.errorMsg}>⚠ {errors.author}</p>}
              </div>
            </div>
          </div>

          {/* 가격 + 출판일 */}
          <div className={styles.card}>
            <div className={styles.twoCol}>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>가격 <Required /></label>
                <div className={styles.inputWithSuffix}>
                  <input
                    className={`${styles.input} ${errors.bookPrice ? styles.fieldError : ''}`}
                    name="bookPrice"
                    placeholder="0"
                    value={bookData.bookPrice}
                    onChange={handleBookData}
                    type="number"
                    min={1}
                  />
                  <span className={styles.suffix}>원</span>
                </div>
                {errors.bookPrice && <p className={styles.errorMsg}>⚠ {errors.bookPrice}</p>}
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>출판일 <Required /></label>
                <input
                  className={`${styles.input} ${errors.publishDate ? styles.fieldError : ''}`}
                  name="publishDate"
                  type="date"
                  value={bookData.publishDate}
                  onChange={handleBookData}
                />
                {errors.publishDate && <p className={styles.errorMsg}>⚠ {errors.publishDate}</p>}
              </div>
            </div>
          </div>

          {/* 도서 소개 */}
          <div className={styles.card}>
            <div className={styles.fieldGroup}>
              <label className={styles.label}>도서 소개 <Required /></label>
              <textarea
                className={`${styles.textarea} ${errors.bookIntro ? styles.fieldError : ''}`}
                name="bookIntro"
                rows={5}
                placeholder="도서 소개를 5글자 이상 입력하세요..."
                value={bookData.bookIntro}
                onChange={handleBookData}
              />
              <div className={styles.charCount}>
                <span style={{ color: errors.bookIntro ? '#ff4d7e' : 'rgba(255,255,255,0.25)' }}>
                  {bookData.bookIntro.length}자
                </span>
              </div>
              {errors.bookIntro && <p className={styles.errorMsg}>⚠ {errors.bookIntro}</p>}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const Required = () => <span style={{ color: '#c9a96e', marginLeft: 2 }}>*</span>

export default BookForm
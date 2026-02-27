import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/common/Button'
import { selectCartList, updateCartCount, deleteContent } from '../../api/cartApi'
import styles from './Cart.module.css'
import dayjs from 'dayjs'

// ═══════════════════════════════════════════════════════════
//  Cart 컴포넌트
//  - 로그인한 사용자의 장바구니 목록을 조회/수정/삭제하는 페이지
//  - 체크박스로 상품을 선택하고 선택된 상품의 합계 금액을 계산
// ═══════════════════════════════════════════════════════════
const Cart = () => {

  // 페이지 이동을 위한 navigate 훅
  const nav = useNavigate()

  // 서버에서 조회한 장바구니 상품 목록
  const [cartList, setCartList] = useState([])

  // 체크박스로 선택된 상품들의 cartNum(장바구니 번호) 배열
  // ex) [1, 3, 5] → 1번, 3번, 5번 상품이 선택된 상태
  const [checked, setChecked] = useState([])

  // ─────────────────────────────────────────────────────────
  //  선택된 상품들의 총 합계 금액 계산 (실시간)
  //  1) cartList에서 checked 배열에 포함된 상품만 filter
  //  2) 각 상품의 (단가 × 수량)을 모두 더해서 합계 반환
  //  3) cartList가 비어있거나 선택된 상품이 없으면 0 반환
  // ─────────────────────────────────────────────────────────
  const totalPrice = cartList
    ?.filter(item => checked.includes(item.cartNum))
    .reduce((sum, item) => sum + (item.bookPrice * item.cartCnt), 0) || 0

  // ─────────────────────────────────────────────────────────
  //  컴포넌트 마운트 시 장바구니 목록 조회
  //  1) sessionStorage에서 로그인 정보 확인
  //  2) 로그인 정보가 없으면 로그인 페이지로 이동
  //  3) 로그인 정보가 있으면 이메일로 장바구니 목록 API 호출
  //  4) 조회 성공 시 cartList state에 저장
  //  5) 조회 실패 시 빈 배열로 초기화
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))

    // 로그인 여부 확인 → 비로그인 시 로그인 페이지로 강제 이동
    if (!loginInfo) {
      alert("로그인이 필요합니다.")
      nav('/login')
      return
    }

    // 장바구니 목록 비동기 조회 함수
    const fetchCartList = async () => {
      try {
        const response = await selectCartList(loginInfo.memEmail)
        setCartList(response ?? []) // 응답이 null/undefined이면 빈 배열로 대체
      } catch (error) {
        console.error("장바구니 조회 실패", error)
        setCartList([])
      }
    }

    fetchCartList()
  }, [nav]) // nav가 변경될 때마다 실행 (사실상 최초 1회 실행)

  // ─────────────────────────────────────────────────────────
  //  수량 변경 함수
  //  1) 변경할 cartNum(장바구니 번호)과 newCount(새 수량)를 받음
  //  2) newCount가 1 미만이면 실행 중단 (최소 수량 1개 보장)
  //  3) API 호출로 서버 DB의 수량 업데이트
  //  4) 성공 시 cartList state에서 해당 상품의 수량만 변경
  //     (전체 재조회 없이 해당 항목만 업데이트 → 성능 최적화)
  // ─────────────────────────────────────────────────────────
  const handleQuantityChange = async (cartNum, newCount) => {
    if (newCount < 1) return // 수량 0 이하 방지

    try {
      // 서버 DB 수량 업데이트 API 호출
      await updateCartCount({ cartNum, cartCnt: newCount })

      // state에서 해당 상품의 수량만 교체 (불변성 유지)
      setCartList(prev =>
        prev.map(item =>
          item.cartNum === cartNum ? { ...item, cartCnt: newCount } : item
        )
      )
    } catch (error) {
      console.error("수량 변경 실패", error)
    }
  }

  // ─────────────────────────────────────────────────────────
  //  상품 삭제 함수
  //  1) 삭제할 cartNum을 받아 서버 API 호출
  //  2) 성공 시 cartList에서 해당 상품 제거
  //  3) checked 배열에서도 해당 cartNum 제거
  //     (삭제된 상품이 선택 목록에 남아있는 버그 방지)
  //  4) 실패 시 에러 메시지 alert
  // ─────────────────────────────────────────────────────────
  const handleDelete = async (cartNum) => {
    try {
      await deleteContent(cartNum) // 서버 DB에서 해당 장바구니 항목 삭제

      // 목록에서 삭제된 상품 제거
      setCartList(prev => prev.filter(item => item.cartNum !== cartNum))

      // 체크 목록에서도 해당 상품 번호 제거
      setChecked(prev => prev.filter(num => num !== cartNum))
    } catch (error) {
      console.error("장바구니 삭제 실패", error)
      alert("삭제 실패")
    }
  }

  // ─────────────────────────────────────────────────────────
  //  전체 선택 여부 판단 변수 (파생 상태)
  //  - cartList가 1개 이상 있고, 모든 상품이 checked 배열에 있으면 true
  //  - 전체선택 체크박스의 checked 속성에 사용
  // ─────────────────────────────────────────────────────────
  const isAllChecked = cartList.length > 0 && checked.length === cartList.length

  // ─────────────────────────────────────────────────────────
  //  전체 선택 / 전체 해제 함수
  //  - 체크박스가 체크되면 → 모든 상품의 cartNum을 checked 배열에 추가
  //  - 체크박스가 해제되면 → checked 배열을 빈 배열로 초기화
  // ─────────────────────────────────────────────────────────
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setChecked(cartList.map(item => item.cartNum)) // 전체 선택
    } else {
      setChecked([]) // 전체 해제
    }
  }

  // ─────────────────────────────────────────────────────────
  //  렌더링
  //  - 장바구니가 비어있으면 → 빈 장바구니 안내 UI 표시
  //  - 상품이 있으면 → 카드 목록 + 요약 패널 표시
  // ─────────────────────────────────────────────────────────
  return (
    <div className={styles.container}>

      {/* ── 페이지 헤더: 제목 + 상품 수 + 전체선택 체크박스 ── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <h2 className={styles.pageTitle}>장바구니</h2>
          <span className={styles.itemCount}>{cartList.length}개의 상품</span>
        </div>
        {/* 상품이 1개 이상일 때만 전체선택 체크박스 표시 */}
        {cartList.length > 0 && (
          <label className={styles.checkAllLabel}>
            <input
              type="checkbox"
              checked={isAllChecked}    // 전체 선택 여부
              onChange={handleCheckAll} // 전체 선택 / 해제 토글
              className={styles.checkInput}
            />
            <span className={styles.checkMark} />
            전체 선택
          </label>
        )}
      </div>

      {/* ── 장바구니가 비어있을 때 ── */}
      {(!cartList || cartList.length === 0) ? (
        <div className={styles.emptyBox}>
          <div className={styles.emptyIcon}>🛒</div>
          <p className={styles.emptyText}>장바구니에 담긴 상품이 없습니다.</p>
          {/* 도서 목록 페이지로 이동 버튼 */}
          <button className={styles.shopBtn} onClick={() => nav('/')}>도서 둘러보기 →</button>
        </div>
      ) : (
        <>
          {/* ── 상품 카드 목록 ── */}
          <div className={styles.cartList}>
            {cartList.map((item, index) => (
              <CartCard
                key={item.cartNum}        // React 리스트 렌더링 key
                item={item}               // 상품 데이터
                index={index}             // 애니메이션 딜레이용 인덱스
                checked={checked.includes(item.cartNum)} // 이 상품이 선택됐는지 여부
                onCheck={(e) => {
                  // 개별 체크박스 체크 → checked 배열에 cartNum 추가
                  if (e.target.checked) {
                    setChecked(prev => [...prev, item.cartNum])
                  } else {
                    // 개별 체크박스 해제 → checked 배열에서 cartNum 제거
                    setChecked(prev => prev.filter(n => n !== item.cartNum))
                  }
                }}
                onQuantityChange={handleQuantityChange} // 수량 변경 함수 전달
                onDelete={handleDelete}                 // 삭제 함수 전달
              />
            ))}
          </div>

          {/* ── 하단 요약 패널: 선택 합계 + 버튼 ── */}
          <div className={styles.summaryPanel}>
            <div className={styles.summaryLeft}>
              {/* 선택된 상품 수와 합계 금액 표시 */}
              <span className={styles.summaryLabelText}>
                선택 {checked.length}개 합계
              </span>
              <span className={styles.summaryAmount}>
                {totalPrice.toLocaleString()}
                <span className={styles.summaryUnit}>원</span>
              </span>
            </div>
            <div className={styles.summaryActions}>
              {/* 도서 목록으로 돌아가기 */}
              <button className={styles.secondaryBtn} onClick={() => nav('/')}>
                쇼핑 계속하기
              </button>
              {/* 구매하기: 선택된 상품이 없으면 비활성화 */}
              <button
                className={styles.primaryBtn}
                onClick={() => alert('구매 기능 구현 필요')}
                disabled={checked.length === 0}
              >
                구매하기 ({checked.length})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  CartCard 컴포넌트
//  - 장바구니의 개별 상품 카드 UI
//  - 체크박스 / 이미지 / 도서정보 / 단가 / 수량조절 / 합계 / 삭제 버튼으로 구성
//
//  Props:
//  - item             : 상품 데이터 객체 (cartNum, bookTitle, bookPrice, cartCnt 등)
//  - index            : 카드 등장 애니메이션 딜레이 계산용 순번
//  - checked          : 이 카드의 체크박스 선택 여부 (boolean)
//  - onCheck          : 체크박스 onChange 핸들러
//  - onQuantityChange : 수량 변경 핸들러 (cartNum, newCount)
//  - onDelete         : 삭제 핸들러 (cartNum)
// ═══════════════════════════════════════════════════════════
function CartCard({ item, index, checked, onCheck, onQuantityChange, onDelete }) {

  // 카드 호버 상태 (마우스 올렸을 때 CSS 스타일 변경용)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      // checked 상태에 따라 골드 테두리 클래스 추가
      className={`${styles.cartCard} ${checked ? styles.cartCardChecked : ''}`}
      // index × 0.07초로 카드마다 순차적 등장 애니메이션 적용
      style={{ animationDelay: `${index * 0.07}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >

      {/* ── 체크박스: 개별 상품 선택/해제 ── */}
      <label className={styles.cardCheck}>
        <input
          type="checkbox"
          checked={checked}   // 부모 Cart에서 내려온 선택 여부
          onChange={onCheck}  // 부모의 checked 배열 업데이트
          className={styles.checkInput}
        />
        <span className={styles.checkMark} /> {/* 커스텀 체크박스 UI */}
      </label>

      {/* ── 도서 이미지: 서버 업로드 경로에서 불러옴 ── */}
      <div className={styles.bookThumb}>
        <img
          src={`http://localhost:8080/upload/${item.uploadFileName}`}
          alt={item.bookTitle}
          className={styles.bookImg}
        />
      </div>

      {/* ── 도서 정보: 제목 + 장바구니 추가 날짜 ── */}
      <div className={styles.bookInfo}>
        <p className={styles.bookTitle}>{item.bookTitle}</p>
        {/* dayjs 날짜 포맷 변환: "2024-01-15T09:30:00" → "2024.01.15 09:30" */}
        <p className={styles.bookDate}>
          {dayjs(item.cartDate).format('YYYY.MM.DD HH:mm')} 추가
        </p>
      </div>

      {/* ── 단가: 상품 1개의 가격 ── */}
      <div className={styles.bookPrice}>
        <span className={styles.priceLabel}>단가</span>
        <span className={styles.priceValue}>{item.bookPrice.toLocaleString()}원</span>
      </div>

      {/* ── 수량 조절: − 버튼 / 현재 수량 / + 버튼 ── */}
      <div className={styles.qtyControl}>
        {/* 수량 감소: 현재 수량 - 1 전달 (1 미만이면 handleQuantityChange에서 차단) */}
        <button
          className={styles.qtyBtn}
          onClick={() => onQuantityChange(item.cartNum, item.cartCnt - 1)}
        >−</button>

        {/* 현재 수량 표시 */}
        <span className={styles.qtyValue}>{item.cartCnt}</span>

        {/* 수량 증가: 현재 수량 + 1 전달 */}
        <button
          className={styles.qtyBtn}
          onClick={() => onQuantityChange(item.cartNum, item.cartCnt + 1)}
        >+</button>
      </div>

      {/* ── 합계: 단가 × 수량 실시간 계산 ── */}
      <div className={styles.subtotal}>
        <span className={styles.priceLabel}>합계</span>
        <span className={styles.subtotalValue}>
          {(item.bookPrice * item.cartCnt).toLocaleString()}원
        </span>
      </div>

      {/* ── 삭제 버튼: 해당 상품을 장바구니에서 제거 ── */}
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(item.cartNum)}
        title="삭제"
      >✕</button>

    </div>
  )
}

export default Cart
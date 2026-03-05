import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectList } from '../../api/buyApi'
import styles from './BuyList.module.css'
import dayjs from 'dayjs'

// ═══════════════════════════════════════════════════════════
//  BuyList 컴포넌트 - 구매 내역 페이지
//  - 로그인한 사용자의 구매 목록을 조회하여 카드로 표시
//  - 각 구매 카드를 클릭하면 구매 상세 내역이 펼쳐짐 (아코디언)
//  - URL: /user/buyList (UserLayout 안에서 렌더링)
// ═══════════════════════════════════════════════════════════
const BuyList = () => {

  const nav = useNavigate()

  // 서버에서 조회한 구매 목록 (BuyDTO[] 형태)
  // 각 BuyDTO 안에 detailList(BuyDetailDTO[]) 포함
  const [buyList, setBuyList] = useState([])

  // 현재 펼쳐진 구매 카드의 buyNum을 Set으로 관리
  // Set을 쓰는 이유: 여러 개를 동시에 펼칠 수 있고, has/add/delete 연산이 간편
  const [openSet, setOpenSet] = useState(new Set())

  // ─────────────────────────────────────────────────────────
  //  컴포넌트 마운트 시 구매 목록 조회
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))

    // 비로그인 시 로그인 페이지로 이동
    if (!loginInfo) {
      alert("로그인이 필요합니다.")
      nav('/login')
      return
    }

    const getBuyList = async () => {
      try {
        const response = await selectList(loginInfo.memEmail)
        if (response) {
          setBuyList(response.data ?? [])
        }
      } catch (e) {
        console.error("구매 내역 조회 실패", e)
        setBuyList([])
      }
    }
    getBuyList()
  }, [nav])

  // ─────────────────────────────────────────────────────────
  //  아코디언 토글 함수
  //  - 해당 buyNum이 openSet에 있으면 제거(접기)
  //  - 없으면 추가(펼치기)
  //  - 새로운 Set 객체를 만들어 반환해야 React가 상태 변화를 감지함
  // ─────────────────────────────────────────────────────────
  const toggleDetail = (buyNum) => {
    setOpenSet(prev => {
      const next = new Set(prev)       // 이전 Set을 복사 (불변성 유지)
      if (next.has(buyNum)) {
        next.delete(buyNum)            // 이미 열려 있으면 닫기
      } else {
        next.add(buyNum)               // 닫혀 있으면 열기
      }
      return next
    })
  }

  return (
    <div className={styles.container}>

      {/* ── 페이지 헤더 ── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageTitleGroup}>
          <h2 className={styles.pageTitle}>구매내역</h2>
          <span className={styles.itemCount}>{buyList.length}건</span>
        </div>
      </div>

      {/* ── 구매 내역이 없을 때 ── */}
      {buyList.length === 0 ? (
        <div className={styles.emptyBox}>
          <div className={styles.emptyIcon}>📦</div>
          <p className={styles.emptyText}>구매 내역이 없습니다.</p>
          <button className={styles.shopBtn} onClick={() => nav('/')}>
            도서 둘러보기 →
          </button>
        </div>
      ) : (
        <div className={styles.buyList}>
          {buyList.map((buy, index) => (
            <div
              key={buy.buyNum}
              className={styles.buyCard}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              {/* ── 구매 카드 헤더 (클릭 시 상세 토글) ── */}
              <div
                className={`${styles.buyHeader} ${openSet.has(buy.buyNum) ? styles.buyHeaderOpen : ''}`}
                onClick={() => toggleDetail(buy.buyNum)}
              >
                {/* 왼쪽: 구매번호 + 날짜 + 도서 종류 수 */}
                <div className={styles.buyHeaderLeft}>
                  <div className={styles.buyNumBadge}># {buy.buyNum}</div>
                  <div className={styles.buyMeta}>
                    <span className={styles.buyDate}>
                      {dayjs(buy.buyDate).format('YYYY.MM.DD HH:mm')}
                    </span>
                    <span className={styles.buyKindCount}>
                      총 {buy.detailList?.length ?? 0}종
                    </span>
                  </div>
                </div>

                {/* 오른쪽: 총 결제금액 + 토글 화살표 */}
                <div className={styles.buyHeaderRight}>
                  <div className={styles.buyTotal}>
                    {/* 첫 번째 책 제목 (2종 이상이면 "외 N종" 추가) */}
                    <span className={styles.firstBookTitle}>
                      {buy.detailList?.[0]?.bookTitle ?? ''}
                      {(buy.detailList?.length ?? 0) > 1 && ` 외 ${buy.detailList.length - 1}종`}
                    </span>
                    <span className={styles.totalLabel}>결제금액</span>
                    <span className={styles.totalAmount}>
                      {buy.buyPrice.toLocaleString()}
                      <span className={styles.totalUnit}>원</span>
                    </span>
                  </div>
                  {/* 화살표: 펼쳐지면 180도 회전 (CSS로 처리) */}
                  <span className={`${styles.arrow} ${openSet.has(buy.buyNum) ? styles.arrowOpen : ''}`}>
                    ▼
                  </span>
                </div>
              </div>

              {/* ── 구매 상세 목록 (아코디언 펼침 영역) ── */}
              {openSet.has(buy.buyNum) && (
                <div className={styles.detailSection}>
                  {buy.detailList?.map((detail) => (
                    <DetailCard key={detail.buyDetailNum} detail={detail} />
                  ))}

                  {/* 상세 하단: 합계 요약 */}
                  <div className={styles.detailFooter}>
                    <span className={styles.detailFooterLabel}>총 결제금액</span>
                    <span className={styles.detailFooterAmount}>
                      {buy.buyPrice.toLocaleString()}원
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════
//  DetailCard 컴포넌트 - 구매 상세 1건 카드
//  Props:
//  - detail : BuyDetailDTO { buyDetailNum, bookTitle, bookPrice, buyCnt, buyDetailPrice, uploadFileName }
// ═══════════════════════════════════════════════════════════
function DetailCard({ detail }) {
  return (
    <div className={styles.detailCard}>

      {/* 도서 이미지 */}
      <div className={styles.bookThumb}>
        <img
          src={`http://localhost:8080/upload/${detail.uploadFileName}`}
          alt={detail.bookTitle}
          className={styles.bookImg}
        />
      </div>

      {/* 도서 정보: 제목 + 단가 */}
      <div className={styles.bookInfo}>
        <p className={styles.bookTitle}>{detail.bookTitle}</p>
        <p className={styles.bookUnitPrice}>
          단가 {detail.bookPrice.toLocaleString()}원
        </p>
      </div>

      {/* 구매 수량 */}
      <div className={styles.detailCell}>
        <span className={styles.cellLabel}>수량</span>
        <span className={styles.cellValue}>{detail.buyCnt}권</span>
      </div>

      {/* 도서별 결제금액 (단가 × 수량) */}
      <div className={styles.detailCell}>
        <span className={styles.cellLabel}>결제금액</span>
        <span className={styles.cellPriceValue}>
          {detail.buyDetailPrice.toLocaleString()}원
        </span>
      </div>

    </div>
  )
}

export default BuyList

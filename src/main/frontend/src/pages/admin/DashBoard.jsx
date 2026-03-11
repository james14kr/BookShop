import React, { useEffect, useState } from 'react'
import { getSummary } from '../../api/dashboardApi'
import styles from './DashBoard.module.css'

// ═══════════════════════════════════════════════════════════
//  DashBoard 컴포넌트 - 관리자 대시보드 페이지
//  - 마운트 시 getSummary() 1번 호출로 4개 지표 한 번에 조회
//  - URL: /manage/dashBoard (ManagerLayout 안에서 렌더링)
// ═══════════════════════════════════════════════════════════
const DashBoard = () => {

  // DashBoardDTO { todayOrderCount, monthOrderCount, todaySales, monthSales }
  // 초기값 null → API 응답 전 숫자 자리에 '-' 표시
  const [summary, setSummary] = useState(null)

  // ─────────────────────────────────────────────────────────
  //  컴포넌트 마운트 시 대시보드 지표 1번만 조회
  //  의존성 배열 [] → 마운트 시 1회만 실행
  // ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchSummary = async () => {
      const response = await getSummary()
      if (response) {
        // response.data = { todayOrderCount, monthOrderCount, todaySales, monthSales }
        setSummary(response.data)
      }
    }
    fetchSummary()
  }, [])

  return (
    <div className={styles.container}>

      {/* ── 페이지 헤더 ── */}
      <div className={styles.pageHeader}>
        <h2 className={styles.pageTitle}>Dashboard</h2>
        <p className={styles.pageSubtitle}>오늘의 현황을 확인하세요</p>
      </div>

      {/*
        ── 지표 카드 그리드 (2열 배치) ──

        [삼항 연산자 패턴]
        {summary ? summary.todayOrderCount : '-'}
        → summary가 null이면(API 응답 전) '-' 표시
        → summary에 값이 있으면 실제 숫자 표시

        [toLocaleString()]
        숫자를 천 단위 쉼표 포함 문자열로 변환
        예) 3840000 → "3,840,000"
        금액처럼 큰 숫자를 읽기 쉽게 표현할 때 사용
      */}
      <div className={styles.cardGrid}>

        {/* ── 오늘의 주문건수 카드 ── */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📦</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>오늘의 주문</span>
            <span className={styles.cardValue}>
              {summary ? summary.todayOrderCount : '-'}
              <span className={styles.cardUnit}>건</span>
            </span>
          </div>
        </div>

        {/* ── 이번 달 주문건수 카드 ── */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📋</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>이번 달 주문</span>
            <span className={styles.cardValue}>
              {summary ? summary.monthOrderCount : '-'}
              <span className={styles.cardUnit}>건</span>
            </span>
          </div>
        </div>

        {/* ── 오늘의 매출액 카드 ── */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>오늘의 매출</span>
            <span className={styles.cardValue}>
              {/* toLocaleString()으로 천 단위 쉼표 표시 */}
              {summary ? summary.todaySales.toLocaleString() : '-'}
              <span className={styles.cardUnit}>원</span>
            </span>
          </div>
        </div>

        {/* ── 이번 달 매출액 카드 ── */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>📈</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>이번 달 매출</span>
            <span className={styles.cardValue}>
              {summary ? summary.monthSales.toLocaleString() : '-'}
              <span className={styles.cardUnit}>원</span>
            </span>
          </div>
        </div>

        <div className={styles.table}>
          <h3>🏆구매 랭킹 회원 TOP 5</h3>
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>사용자</td>
                <td>구매건수</td>
                <td>총 구매금액</td>
              </tr>
            </thead>
            <tbody>
              {summary?.topMemberList?.map((item, index) => (
                <tr key={item.memEmail}>
                  <td>{index+1}</td>
                  <td>{item.memEmail}</td>
                  <td>{item.saleCntPerMember}</td>
                  <td>{item.salePerMember.toLocaleString()}원</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles.table}>
          <h3>🏆판매 랭킹 책 TOP 5</h3>
          <table>
            <thead>
              <tr>
                <td>No</td>
                <td>제목</td>
                <td>작가</td>
                <td>총 구매건수</td>
              </tr>
            </thead>
            <tbody>
              {summary?.topBookList?.map((item, index) => (
                <tr key={item.bookNum}>
                  <td>{index+1}</td>
                  <td>{item.bookTitle}</td>
                  <td>{item.author}</td>
                  <td>{item.totalBuyCnt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default DashBoard

import React, { useEffect, useState } from 'react'
import { getSummary } from '../../api/dashboardApi'
import styles from './DashBoard.module.css'

const DashBoard = () => {

  // 서버에서 받아온 대시보드 지표 상태
  // DashBoardDTO { todayOrderCount, monthOrderCount, todaySales, monthSales }
  const [summary, setSummary] = useState(null)

  // 컴포넌트 마운트 시 지표 조회
  useEffect(() => {
    const fetchSummary = async () => {
      const response = await getSummary()
      if (response) {
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

      {/* ── 지표 카드 그리드 ── */}
      <div className={styles.cardGrid}>

        {/* 오늘의 주문건수 */}
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

        {/* 이번 달 주문건수 */}
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

        {/* 오늘의 매출 */}
        <div className={styles.card}>
          <div className={styles.cardIcon}>💰</div>
          <div className={styles.cardBody}>
            <span className={styles.cardLabel}>오늘의 매출</span>
            <span className={styles.cardValue}>
              {summary ? summary.todaySales.toLocaleString() : '-'}
              <span className={styles.cardUnit}>원</span>
            </span>
          </div>
        </div>

        {/* 이번 달 매출 */}
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

      </div>
    </div>
  )
}

export default DashBoard

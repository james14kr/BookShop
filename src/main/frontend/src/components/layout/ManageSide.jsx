import React, { useState } from 'react'
import styles from './ManageSide.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_GROUPS = [
  {
    label: '도서 관리',
    items: [
      { key: 'book-form',  label: '도서 등록',  icon: '＋' },
      { key: 'book-list',  label: '도서 목록',  icon: '☰' },
    ]
  },
  {
    label: '회원 관리',
    items: [
      { key: 'member-list', label: '회원 목록', icon: '👥' },
    ]
  },
  {
    label: '주문 관리',
    items: [
      { key: 'order-list', label: '주문 목록', icon: '📦' },
    ]
  },
]

const ManageSide = () => {
  const nav = useNavigate()
  const location = useLocation()

  return (
    <nav className={styles.container}>
      {/* 상단 골드 액센트 */}
      <div className={styles.accent} />

      {/* 섹션 타이틀 */}
      <p className={styles.sectionTitle}>관리자 메뉴</p>

      {NAV_GROUPS.map((group) => (
        <div key={group.label} className={styles.group}>
          <p className={styles.groupLabel}>{group.label}</p>
          <ul className={styles.list}>
            {group.items.map((item) => {
              const isActive = location.pathname.includes(item.key)
              return (
                <SideItem
                  key={item.key}
                  item={item}
                  isActive={isActive}
                  onClick={() => nav(`/manage/${item.key}`)}
                />
              )
            })}
          </ul>
        </div>
      ))}

      {/* 하단 */}
      <div className={styles.footer}>ADMIN PANEL</div>
    </nav>
  )
}

function SideItem({ item, isActive, onClick }) {
  const [hovered, setHovered] = useState(false)
  const active = isActive || hovered

  return (
    <li
      className={styles.item}
      style={{
        background: active ? 'rgba(201,169,110,0.08)' : 'transparent',
        color: active ? '#e8c98a' : 'rgba(255,255,255,0.45)',
        paddingLeft: active ? 20 : 14,
        borderLeft: active ? '2px solid #c9a96e' : '2px solid transparent',
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className={styles.icon}>{item.icon}</span>
      <span className={styles.label}>{item.label}</span>
    </li>
  )
}

export default ManageSide
import React from 'react'
import styles from './ManagerLayout.module.css'
import ManagerHeader from './ManagerHeader'
import ManageSide from './ManageSide'
import { Outlet } from 'react-router-dom'

const ManagerLayout = ({ setLoginInfo }) => {
  return (
    <div className={styles.container}>
      <ManagerHeader setLoginInfo={setLoginInfo} />
      <div className={styles.main}>
        <aside className={styles.side}>
          <ManageSide />
        </aside>
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default ManagerLayout
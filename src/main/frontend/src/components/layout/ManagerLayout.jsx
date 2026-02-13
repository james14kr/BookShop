import React from 'react'
import styles from './ManagerLayout.module.css'
import ManagerHeader from './ManagerHeader'
import ManageSide from './ManageSide'
import BookForm from '../../pages/book/BookForm'

////////////////////////////////////////////////////////////////////
//- 매니저가 보는 화면의 레이아웃, 매니저 헤더, 매니저 사이드로 3분할 -//
////////////////////////////////////////////////////////////////////

const ManagerLayout = ({setLoginInfo}) => {
  return (
    <div className={styles.container}>
      <ManagerHeader setLoginInfo = {setLoginInfo} />
      <div className={styles.main}>
        <div className={styles.side}>
          <ManageSide />
        </div>
        <div className={styles.content}>
          <BookForm/>
        </div>
      </div>
    </div>
  )
}

export default ManagerLayout
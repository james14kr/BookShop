import React from 'react'
import Header from './Header'
import MyPageSide from './MyPageSide'
import Cart from '../../pages/cart/Cart'
import MyPageForm from './MyPageForm'
import styles from './MyPageLayout.module.css'

const MyPageLayout = ({setLoginInfo}) => {
  return (
    <div className={styles.container}>
      <Header setLoginInfo={setLoginInfo}/>
      <div className={styles.main}>
        <div className={styles.side}>
          <MyPageSide/>
        </div>
        <div className={styles.content}>
          <Cart/>
        </div>
      </div>
    </div>
  )
}

export default MyPageLayout
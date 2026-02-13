import React from 'react'
import styles from './BasicLayout.module.css'
import Header from './Header'
import Join from '../../pages/member/Join'
import { Outlet } from 'react-router-dom'

/////////////////////////////////////////////////////////////////
//- 일반 회원이 보는 화면의 레이아웃, 상단 헤더만 존재(2분할 화면) -//
/////////////////////////////////////////////////////////////////

const BasicLayout = ({setLoginInfo}) => {
  return (
    <div className={styles.container}>
      <Header setLoginInfo = {setLoginInfo} />
      <div style={{marginTop : '20px'}}>
        {/* BasicLayout 컴포넌트와 함께 열리는 컴포넌트의 위치를 지정 */}
        <Outlet/>
      </div>
    </div>
  )
}

export default BasicLayout
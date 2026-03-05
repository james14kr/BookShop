import React, { useEffect, useState } from 'react'
import { getSummary } from '../../api/dashboardApi'
import styles from './DashBoard.module.css'

const DashBoard = () => {

  const[dashBoard, setDashBoard] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try{
        const response = await getSummary()
        if(response){
          setDashBoard(response.data)
        }
      }catch(e){
        console.log('대시보드 조회 실패', e)
      }
    }

    fetchSummary();
    console.log(dashBoard)
  }, [])

  return (
   <div className={styles.container}>
      <div>dashBoard</div>
   </div>
  )
}

export default DashBoard

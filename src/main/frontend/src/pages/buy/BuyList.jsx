import React, { useEffect, useState } from 'react'
import { selectList } from '../../api/buyApi'

/**
 * 구매 내역 페이지 컴포넌트
 * 로그인한 사용자의 구매 목록을 조회하여 표시
 * URL : /user/buyList (UserLayout 안에서 렌더링)
 */
const BuyList = () => {

  // 서버에서 조회한 구매 목록 상태
  // BuyDTO[] 형태: 각 BuyDTO 안에 detailList(BuyDetailDTO[]) 포함
  const [buyList, setBuyList] = useState([]);

  /**
   * 컴포넌트 마운트 시 구매 목록 조회
   * useEffect의 두 번째 인자 [] → 컴포넌트가 처음 렌더링될 때 한 번만 실행
   */
  useEffect(()=>{
    // sessionStorage에서 로그인 정보 가져오기
    // JSON.parse : 문자열 → 객체 변환 ({ memEmail, memName, memRole })
    const loginInfo = JSON.parse(sessionStorage.getItem("loginInfo"))

    // 비동기 함수는 useEffect 내부에서 직접 async 사용 불가
    // → 별도 async 함수를 선언 후 호출하는 패턴 사용
    const getBuyList = async () => {
      const response = await selectList(loginInfo.memEmail)
      console.log(response)         // 응답 데이터 확인용 (개발 중)
      setBuyList(response.data)     // response.data = List<BuyDTO>
    }
    getBuyList();
  }, [])  // [] : 의존성 배열 비어있음 → 최초 1회만 실행

  return (
    <div>
      구매내역  {/* TODO: 구매 목록 UI 구현 예정 */}
    </div>
  )
}

export default BuyList
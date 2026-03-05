/**
 * 구매(Buy) 관련 API 통신 함수 모음
 *
 * [Axios란?]
 *  - HTTP 요청을 쉽게 보낼 수 있는 JavaScript 라이브러리
 *  - fetch()보다 사용하기 편리하고 자동으로 JSON 파싱
 *  - response.data 로 서버 응답 바디에 바로 접근 가능
 *
 * [async/await 패턴]
 *  - 비동기(Async) 함수: 내부에서 await 사용 가능
 *  - await : Promise가 완료될 때까지 기다린 후 결과 반환
 *  - try/catch : 요청 실패 시 에러 처리
 */
import axios from "axios";

/**
 * 구매 등록 함수
 * POST /buys
 * @param data { buyPrice, memEmail, detailList: [{bookNum, buyCnt}, ...] }
 * @returns axios response (성공 시), undefined (실패 시 - catch에서 return 없음)
 */
export const insertBuy = async(data) => {
  try{
    const response = await axios.post("http://localhost:8080/buys", data)
    return response;
  }catch(e){
    console.log("도서 구매 등록 axios 오류", e)
  }
}

/**
 * 구매 목록 조회 함수
 * GET /buys/list/{memEmail}
 * @param memEmail 조회할 회원 이메일
 * @returns axios response (response.data = List<BuyDTO>)
 *          BuyDTO 안에 detailList(List<BuyDetailDTO>) 포함
 */
export const selectList = async (memEmail) => {
  try{
    const response = await axios.get(`http://localhost:8080/buys/list/${memEmail}`)
    return response;
  }catch(e){
    console.log('도서 구매 조회 axios 에러', e)
  }
}
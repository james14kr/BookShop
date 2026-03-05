import axios from "axios";

/**
 * 대시보드 관련 API 통신 함수
 *
 * [학습 포인트] API 단일화 - 여러 지표를 1번 호출로 받기
 * ──────────────────────────────────────────────────────
 * ❌ 지표마다 함수 분리 시 → 컴포넌트에서 4번 호출 필요
 *   const r1 = await getTodayOrder()
 *   const r2 = await getMonthOrder()   ...4번 반복
 *
 * ✅ 통합 함수 1개 → 컴포넌트에서 1번 호출로 완료
 *   const r = await getSummary()
 *   → r.data = { todayOrderCount, monthOrderCount, todaySales, monthSales }
 */

/**
 * 대시보드 전체 지표 조회
 * GET http://localhost:8080/manage/dashBoard
 *
 * @returns axios response
 *   response.data = DashBoardDTO {
 *     todayOrderCount : 오늘 주문건수  (int)
 *     monthOrderCount : 이번 달 주문건수 (int)
 *     todaySales      : 오늘 매출액    (long)
 *     monthSales      : 이번 달 매출액  (long)
 *   }
 */
export const getSummary = async () => {
  try {
    const response = await axios.get("http://localhost:8080/manage/dashBoard")
    return response;  // response.data 에 DashBoardDTO JSON이 담겨 있음
  } catch (e) {
    console.log("대시보드 조회 axios 오류", e)
    // return 없음 → undefined 반환 → 호출부에서 if(response) 체크 필요
  }
}

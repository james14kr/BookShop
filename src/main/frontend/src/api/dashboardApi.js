import axios from "axios";

// GET /manage/dashBoard
// 대시보드 전체 지표 한 번에 조회
// 응답: { todayOrderCount, monthOrderCount, todaySales, monthSales }
export const getSummary = async () => {
  try {
    const response = await axios.get("http://localhost:8080/manage/dashBoard")
    return response;
  } catch (e) {
    console.log("대시보드 조회 axios 오류", e)
  }
}

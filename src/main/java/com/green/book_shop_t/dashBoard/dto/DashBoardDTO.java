package com.green.book_shop_t.dashBoard.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 관리자 대시보드 지표를 담는 DTO
 *
 * [학습 포인트] 단일 API 통합 설계 - 여러 지표를 하나의 DTO에 담기
 * ─────────────────────────────────────────────────────────────────
 * 대시보드에서 여러 지표를 표시할 때:
 *
 * ❌ 지표마다 API 분리 시 → 프론트에서 4번 요청
 *   GET /manage/dashBoard/todayOrder
 *   GET /manage/dashBoard/monthOrder
 *   GET /manage/dashBoard/todaySales
 *   GET /manage/dashBoard/monthSales
 *
 * ✅ 이 DTO로 통합 시 → 프론트에서 1번 요청
 *   GET /manage/dashBoard → { todayOrderCount, monthOrderCount, todaySales, monthSales }
 *
 * [각 필드의 타입 선택 이유]
 * - todayOrderCount, monthOrderCount : int  (건수는 21억 이하)
 * - todaySales, monthSales           : long (금액은 21억 초과 가능)
 *
 * [JSON 변환 시 필드명]
 * Java camelCase 필드명 → JSON key 그대로 사용
 * todayOrderCount → "todayOrderCount"
 * → React에서 response.data.todayOrderCount 로 접근
 */
@Getter
@Setter
@ToString
public class DashBoardDTO {

  private int  todayOrderCount;   // 오늘 주문건수  (COUNT 결과)
  private int  monthOrderCount;   // 이번 달 주문건수 (COUNT 결과)
  private long todaySales;        // 오늘 매출액    (SUM 결과, long 사용)
  private long monthSales;        // 이번 달 매출액  (SUM 결과, long 사용)

}

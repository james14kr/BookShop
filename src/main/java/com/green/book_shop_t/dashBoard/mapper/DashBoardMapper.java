package com.green.book_shop_t.dashBoard.mapper;

import com.green.book_shop_t.dashBoard.dto.TopBookDTO;
import com.green.book_shop_t.dashBoard.dto.TopMemberDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 대시보드 DB 쿼리 실행 Mapper 인터페이스
 * 연결 XML: resources/mapper/dashBoard-mapper.xml
 *
 * [학습 포인트] 반환 타입 int vs long
 * ─────────────────────────────────────────────
 * int  : 약 21억까지 표현 가능 → 건수(COUNT)에 적합
 * long : 약 922경까지 표현 가능 → 금액(SUM)에 적합
 *
 * 매출액은 건수가 많아질수록 int 범위를 초과할 수 있으므로
 * selectTodaySales, selectMonthSales는 long 타입 사용
 *
 * [메서드명 ↔ XML id 규칙]
 * 인터페이스 메서드명 = XML <select id="..."> 의 id 값 (반드시 일치)
 */
@Mapper
public interface DashBoardMapper {

  // 오늘 주문건수 → XML: SELECT COUNT(*) WHERE DATE(BUY_DATE) = CURDATE()
  int selectTodayOrderCount();

  // 이번 달 주문건수 → XML: SELECT COUNT(*) WHERE YEAR/MONTH 조건
  int selectMonthOrderCount();

  // 오늘 매출액 → XML: SELECT COALESCE(SUM(BUY_PRICE), 0) WHERE 오늘
  long selectTodaySales();

  // 이번 달 매출액 → XML: SELECT COALESCE(SUM(BUY_PRICE), 0) WHERE 이번달
  long selectMonthSales();

  List<TopMemberDTO> selectTopMember();

  List<TopBookDTO> selectTopBook();

}

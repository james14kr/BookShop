package com.green.book_shop_t.dashBoard.service;

import com.green.book_shop_t.dashBoard.dto.DashBoardDTO;
import com.green.book_shop_t.dashBoard.dto.TopBookDTO;
import com.green.book_shop_t.dashBoard.dto.TopMemberDTO;
import com.green.book_shop_t.dashBoard.mapper.DashBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 관리자 대시보드 비즈니스 로직 Service
 *
 * [학습 포인트] 개별 메서드 vs 통합 메서드 설계
 * ─────────────────────────────────────────────
 * - selectTodayOrderCount() 등 개별 메서드는 그대로 유지
 *   → 나중에 특정 지표만 필요한 다른 기능에서 재사용 가능
 *
 * - getSummary() 는 4개 메서드를 모아 DTO 하나로 조립하는 역할
 *   → Controller는 getSummary() 하나만 호출하면 됨
 *   → Service가 Mapper 호출 4번을 대신 처리해줌
 */
@Service
@RequiredArgsConstructor
public class DashBoardService {

  // DashBoardMapper 자동 주입 (@RequiredArgsConstructor)
  private final DashBoardMapper dashBoardMapper;

  /**
   * 오늘 주문건수 조회
   * SQL: SELECT COUNT(*) WHERE DATE(BUY_DATE) = CURDATE()
   */
  public int getTodayOrderCount(){
    return dashBoardMapper.selectTodayOrderCount();
  }

  /**
   * 이번 달 주문건수 조회
   * SQL: SELECT COUNT(*) WHERE YEAR = YEAR(NOW()) AND MONTH = MONTH(NOW())
   */
  public int getMonthOrderCount(){
    return dashBoardMapper.selectMonthOrderCount();
  }

  /**
   * 오늘 매출액 조회
   * SQL: SELECT COALESCE(SUM(BUY_PRICE), 0) WHERE DATE(BUY_DATE) = CURDATE()
   * → 주문이 0건이면 SUM()이 NULL 반환 → COALESCE로 0으로 처리
   * → long 타입 사용: 매출액은 int 범위(약 21억)를 초과할 수 있음
   */
  public long getTodaySales(){
    return dashBoardMapper.selectTodaySales();
  }

  /**
   * 이번 달 매출액 조회
   * SQL: SELECT COALESCE(SUM(BUY_PRICE), 0) WHERE 이번달 조건
   */
  public long getMonthSales(){
    return dashBoardMapper.selectMonthSales();
  }


  public List<TopMemberDTO> getTopMember(){
    return dashBoardMapper.selectTopMember();
  }

  public List<TopBookDTO> getTopBook(){
    return dashBoardMapper.selectTopBook();
  }

  /**
   * 대시보드 전체 지표 조회 - 4개 값을 DashBoardDTO에 조립하여 반환
   *
   * [동작 순서]
   * 1. DashBoardDTO 객체 생성 (모든 필드 0으로 초기화)
   * 2. Mapper를 4번 호출하여 각 지표 값 조회
   * 3. DTO setter로 각 값 주입
   * 4. 완성된 DTO 반환 → Controller가 JSON으로 변환하여 응답
   *
   * [DashBoardDTO 조립 과정]
   * new DashBoardDTO()
   *   .setTodayOrderCount(5)     ← selectTodayOrderCount() 결과
   *   .setMonthOrderCount(42)    ← selectMonthOrderCount() 결과
   *   .setTodaySales(125000)     ← selectTodaySales() 결과
   *   .setMonthSales(3840000)    ← selectMonthSales() 결과
   */
  public DashBoardDTO getSummary(){
    DashBoardDTO dto = new DashBoardDTO();                                    // DTO 생성
    dto.setTodayOrderCount(dashBoardMapper.selectTodayOrderCount());  // 오늘 주문건수 세팅
    dto.setMonthOrderCount(dashBoardMapper.selectMonthOrderCount());  // 이달 주문건수 세팅
    dto.setTodaySales(dashBoardMapper.selectTodaySales());            // 오늘 매출 세팅
    dto.setMonthSales(dashBoardMapper.selectMonthSales());            // 이달 매출 세팅
    dto.setTopMemberList(dashBoardMapper.selectTopMember());
    dto.setTopBookList(dashBoardMapper.selectTopBook());
    return dto;                                                               // 조립된 DTO 반환
  }

}

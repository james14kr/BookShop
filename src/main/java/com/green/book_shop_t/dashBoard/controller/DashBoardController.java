package com.green.book_shop_t.dashBoard.controller;

import com.green.book_shop_t.dashBoard.dto.DashBoardDTO;
import com.green.book_shop_t.dashBoard.service.DashBoardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 관리자 대시보드 Controller
 * URL 공통 접두사: /manage/dashBoard
 *
 * ════════════════════════════════════════════════════════
 * [학습 포인트] @GetMapping URL 중복 → Ambiguous Mapping 에러
 * ════════════════════════════════════════════════════════
 *
 * ❌ 잘못된 방법 - 같은 URL에 메서드 여러 개 → 앱 시작 불가
 *
 *   @GetMapping("")
 *   public ResponseEntity<?> getTodayOrderCount() { ... }
 *
 *   @GetMapping("")   ← 같은 URL 중복!
 *   public ResponseEntity<?> getMonthOrderCount() { ... }
 *
 *   → 에러: Ambiguous handler methods mapped for '/manage/dashBoard'
 *   → Spring은 같은 HTTP메서드 + 같은 URL이 여러 개면 어느 것을 실행할지 알 수 없어
 *     애플리케이션 시작 자체를 거부함
 *
 * ✅ 올바른 방법 A - URL을 각각 다르게 지정
 *   @GetMapping("/todayOrder")   → GET /manage/dashBoard/todayOrder
 *   @GetMapping("/monthOrder")   → GET /manage/dashBoard/monthOrder
 *
 * ✅ 올바른 방법 B - 메서드 1개로 통합, DTO에 모든 값 담아 반환 (이 방식 사용)
 *   @GetMapping("")              → GET /manage/dashBoard
 *   DashBoardDTO에 4개 지표를 모두 담아 한 번에 반환
 *   → 프론트에서 API 1번 호출로 모든 데이터 수신 → 성능 효율적
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/manage/dashBoard")
public class DashBoardController {

  // @RequiredArgsConstructor 가 DashBoardService 생성자 자동 주입
  private final DashBoardService dashBoardService;

  /**
   * 대시보드 전체 지표 조회 API
   * (GET) localhost:8080/manage/dashBoard
   *
   * [반환 JSON - DashBoardDTO가 자동으로 JSON 변환]
   * {
   *   "todayOrderCount" : 5,
   *   "monthOrderCount" : 42,
   *   "todaySales"      : 125000,
   *   "monthSales"      : 3840000
   * }
   *
   * [단일 API로 통합하는 이유]
   * - 지표 4개를 각각 API로 만들면 프론트에서 4번 요청 필요
   * - DashBoardDTO 하나에 담아 1번만 응답하면 네트워크 비용 절감
   */
  @GetMapping("")
  public ResponseEntity<?> getSummary(){
    try {
      // Service에서 4개 지표가 모두 채워진 DashBoardDTO 반환
      DashBoardDTO result = dashBoardService.getSummary();
      return ResponseEntity.status(HttpStatus.OK).body(result);  // 200 OK + JSON
    }catch (Exception e){
      log.error("대시보드 조회 api 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();  // 500
    }
  }

}

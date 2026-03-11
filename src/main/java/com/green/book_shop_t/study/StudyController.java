package com.green.book_shop_t.study;

import com.green.book_shop_t.book.dto.CartDTO;
import com.green.book_shop_t.book.service.CartService;
import com.green.book_shop_t.buy.dto.BuyDTO;
import com.green.book_shop_t.buy.service.BuyService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

/**
 * 학습용 테스트 컨트롤러
 * ─────────────────────────────────────────────
 * 실제 서비스와 무관한 학습/테스트 전용 API 모음
 * 기본 URL: /study
 *
 * [학습 포인트] Map 반환 타입 정리
 * ─────────────────────────────────────────────
 * Map<Integer, String>  : key-Integer, value-String 으로 타입 고정
 * Map<String, Object>   : key-String,  value-모든 타입 허용 (여러 타입 혼합 시 사용)
 *
 * [JSON 변환 방식]
 * @RestController 선언 시 반환 객체를 Jackson이 자동으로 JSON으로 변환
 * Map → { "key": value } 형태로 변환
 * List → [ item1, item2, ... ] 형태로 변환
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
public class StudyController {

  private final BuyService buyService;
  private final CartService cartService;

  /**
   * [test1] Map<Integer, String> 기본 반환 테스트
   * ─────────────────────────────────────────────
   * GET /study/test1
   *
   * Map<Integer, String> : key는 Integer, value는 String으로 타입 고정
   * HashMap              : 순서 보장 없음, key 중복 불가
   * put(key, value)      : Map에 데이터 추가
   *
   * [JSON 응답 예시]
   * { "1": "java" }
   */
  @GetMapping("/test1")
  public Map<Integer, String> mapTest1() {

    // List 객체 생성 (현재 미사용 - 학습용으로 선언만)
    List<String> list = new ArrayList<>();

    // Map 객체 생성
    Map<Integer, String> map = new HashMap<>();

    // map 객체에 데이터 추가
    map.put(1, "java");

    return map;
  }

  /**
   * [test2] Map<String, Object> 다양한 타입 혼합 반환 테스트
   * ─────────────────────────────────────────────
   * GET /study/test2
   *
   * Map<String, Object> : value를 Object로 선언해 int, double, String 등 모든 타입 혼합 가능
   * → 여러 타입의 데이터를 하나의 Map으로 반환해야 할 때 사용
   *
   * [JSON 응답 예시]
   * { "1": 1, "2": 1.1, "3": "aaa" }
   */
  @GetMapping("/test2")
  public Map<String, Object> test2() {

    // key는 문자열, value는 모든 자료형을 담을 수 있는 Map 객체 생성
    Map<String, Object> map = new HashMap<>();

    map.put("1", 1);      // Integer
    map.put("2", 1.1);    // Double
    map.put("3", "aaa");  // String

    return map;
  }

  /**
   * [test3] 여러 서비스 결과를 Map 하나에 담아 반환 테스트
   * ─────────────────────────────────────────────
   * GET /study/test3
   *
   * [학습 포인트] 여러 목록을 하나의 응답으로 통합하는 패턴
   * ❌ API 분리 시 → 프론트에서 2번 요청
   *   GET /study/buyList
   *   GET /study/cartList
   *
   * ✅ Map 통합 시 → 프론트에서 1번 요청
   *   GET /study/test3 → { "buyList": [...], "cartList": [...] }
   *
   * [JSON 응답 예시]
   * {
   *   "buyList":  [ { "buyNum": 1, "buyPrice": 35000, ... }, ... ],
   *   "cartList": [ { "cartNum": 1, "bookNum": 3, ... }, ... ]
   * }
   */
  @GetMapping("/test3")
  public Map<String, Object> test3() {

    // 구매 목록 조회
    List<BuyDTO> buyList = buyService.selectBuyLists("hwangms14kr@naver.com");

    // 장바구니 목록 조회
    List<CartDTO> cartList = cartService.selectCartList("hwangms14kr@naver.com");

    // 두 리스트를 하나의 Map에 담아 반환
    Map<String, Object> map = new HashMap<>();
    map.put("buyList", buyList);
    map.put("cartList", cartList);

    return map;
  }

}

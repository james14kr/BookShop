package com.green.book_shop_t.buy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 구매 정보를 담는 DTO 클래스
 * DB의 SHOP_BUY 테이블(구매 헤더) + BUY_DETAIL 테이블(구매 상세) 데이터를 함께 담음
 *
 * [구매 데이터 구조]
 *  BuyDTO (1건의 구매 = 주문)
 *    └── List<BuyDetailDTO> detailList (구매한 도서 목록, 1:N)
 *
 * [INSERT 흐름]
 *  1. SHOP_BUY INSERT (buyNum AUTO_INCREMENT → useGeneratedKeys로 자동 채움)
 *  2. BUY_DETAIL INSERT (detailList 돌면서 FOREACH로 다중 INSERT)
 *
 * [React → Java 전송 JSON 예시]
 *  {
 *    "buyPrice": 35000,
 *    "memEmail": "user@naver.com",
 *    "detailList": [
 *      { "bookNum": 1, "buyCnt": 2 },
 *      { "bookNum": 3, "buyCnt": 1 }
 *    ]
 *  }
 */
@Getter
@Setter
@ToString
public class BuyDTO {

  private int buyNum;                     // 구매 번호 (Primary Key, AUTO_INCREMENT)
  private int buyPrice;                   // 총 결제 금액 (단가 × 수량 합산)
  private String memEmail;                // 구매 회원 이메일 (FK → SHOP_MEMBER)
  private LocalDateTime buyDate;          // 구매 일시 (DB DEFAULT NOW())
  private List<BuyDetailDTO> detailList;  // 구매 상세 목록 (1:N - 구매한 도서들)

}

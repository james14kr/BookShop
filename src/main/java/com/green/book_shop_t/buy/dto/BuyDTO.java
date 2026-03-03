package com.green.book_shop_t.buy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 구매 헤더 DTO (Data Transfer Object)
 *
 * SHOP_BUY 테이블과 1:1로 매핑되는 클래스
 * 하나의 구매 주문 전체를 나타내며, 구매한 도서 목록(BUY_DETAIL)을 List로 포함
 *
 * [테이블 관계]
 * SHOP_BUY (1) ──── BUY_DETAIL (N)
 *   1건 주문              도서 여러 종
 *
 * [buyDetailList 포함 이유]
 * - 구매 내역 조회 시 주문 정보(BuyDTO)와 도서 목록(BuyDetailDTO) 을
 *   한 번에 묶어서 응답하기 위해 포함
 * - MyBatis <collection> 태그로 1:N 관계를 자동 매핑
 */
@Getter
@Setter
@ToString
public class BuyDTO {

    /* ======================== SHOP_BUY 테이블 컬럼 ======================== */

    private int buyNum;             // 구매번호 (PK, AUTO_INCREMENT)
    private int buyPrice;           // 총 구매금액
    private String memEmail;        // 구매 회원 이메일 (FK → SHOP_MEMBER.MEM_EMAIL)
    private LocalDateTime buyDate;  // 구매 일시

    /* ======================== 1:N 관계 - 구매 도서 목록 ======================== */

    /**
     * 이 구매에 포함된 도서 상세 목록
     * MyBatis <collection> 으로 BUY_DETAIL 행들을 자동으로 리스트에 담아줌
     * ex) 도서 3권을 한 번에 구매하면 buyDetailList.size() == 3
     */
    private List<BuyDetailDTO> buyDetailList;
}

package com.green.book_shop_t.buy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 구매 상세 DTO (Data Transfer Object)
 *
 * BUY_DETAIL 테이블과 1:1로 매핑되는 클래스
 * 하나의 구매(SHOP_BUY)에 속한 도서 1종의 구매 정보를 담음
 *
 * [JOIN 컬럼 포함 이유]
 * - bookTitle, uploadFileName 은 BUY_DETAIL 테이블에 없는 컬럼이지만,
 *   구매 내역 화면에서 도서 제목과 이미지를 함께 표시해야 하므로
 *   SHOP_BOOK, BOOK_IMG 와의 JOIN 조회 결과를 담기 위해 포함
 */
@Getter
@Setter
@ToString
public class BuyDetailDTO {

    /* ======================== BUY_DETAIL 테이블 컬럼 ======================== */

    private int buyDetailNum;   // 구매 상세 번호 (PK, AUTO_INCREMENT)
    private int bookNum;        // 구매한 도서번호 (FK → SHOP_BOOK.BOOK_NUM)
    private int buyCnt;         // 구매 수량
    private int buyNum;         // 소속 구매번호 (FK → SHOP_BUY.BUY_NUM)

    /* ======================== JOIN 조회용 컬럼 (BUY_DETAIL 외 테이블) ======================== */

    private String bookTitle;       // 도서 제목 (SHOP_BOOK.BOOK_TITLE) - 화면 출력용
    private int bookPrice;          // 도서 단가 (SHOP_BOOK.BOOK_PRICE) - 상세 금액 계산용
    private String uploadFileName;  // 도서 대표 이미지 (BOOK_IMG.UPLOAD_FILE_NAME) - 화면 출력용
}

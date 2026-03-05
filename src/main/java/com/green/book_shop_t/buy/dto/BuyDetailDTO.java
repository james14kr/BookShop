package com.green.book_shop_t.buy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 구매 상세 정보를 담는 DTO 클래스
 * DB의 BUY_DETAIL 테이블 + JOIN된 SHOP_BOOK, BOOK_IMG 데이터를 함께 담음
 *
 * [역할]
 *  - 하나의 구매(BuyDTO)에 속한 개별 도서 1건의 정보를 담음
 *  - INSERT 시 사용: bookNum, buyCnt, buyNum
 *  - SELECT 시 추가로 담기는 값: bookTitle, bookPrice, buyDetailPrice, uploadFileName
 *
 * [buyDetailPrice 처리 방식]
 *  - DB에 저장하지 않고 SELECT 시 SQL에서 계산
 *  - SQL: BK.BOOK_PRICE * D.BUY_CNT AS BUY_DETAIL_PRICE
 *  - 도서별 실제 결제 금액 (단가 × 수량)
 *
 * [중첩 구조 대신 플랫(flat) 구조 선택 이유]
 *  - 이전: BookDTO bookDTO 필드로 도서 정보 중첩 → BookDTO 안의 bookImgList collection 문제로 500 에러
 *  - 현재: 필요한 필드만 직접 추가 → 단순하고 매핑 오류 없음
 */
@Getter
@Setter
@ToString
public class BuyDetailDTO {

  private int buyDetailNum;       // 구매상세 번호 (Primary Key, AUTO_INCREMENT)
  private int bookNum;            // 도서 번호 (FK → SHOP_BOOK)
  private int buyCnt;             // 구매 수량
  private int buyNum;             // 구매 번호 (FK → SHOP_BUY)
  private String bookTitle;       // 도서 제목 (JOIN으로 가져온 값)
  private int bookPrice;          // 도서 단가 (JOIN으로 가져온 값)
  private int buyDetailPrice;     // 도서별 결제금액 = bookPrice × buyCnt (SELECT 시 SQL 계산)
  private String uploadFileName;  // 대표 이미지 파일명 (JOIN으로 가져온 값)
}

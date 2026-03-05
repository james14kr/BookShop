package com.green.book_shop_t.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * 장바구니 정보를 담는 DTO 클래스
 * DB의 SHOP_CART 테이블 + JOIN된 SHOP_BOOK, BOOK_IMG 데이터를 함께 담음
 *
 * [INSERT 시 사용 필드] bookNum, cartCnt, memEmail
 * [SELECT 시 추가 필드] cartNum, bookTitle, bookPrice, cartDate, uploadFileName
 *
 * [ON DUPLICATE KEY UPDATE]
 *  - SHOP_CART에 (bookNum, memEmail)로 복합 UNIQUE KEY 설정
 *  - 같은 책을 다시 담으면 INSERT 대신 기존 cartCnt에 추가 수량을 더함
 *  - 예) 이미 2개 담긴 책에 3개 추가 → cartCnt = 2+3 = 5
 */
@Getter
@Setter
@ToString
public class CartDTO {

  private int cartNum;            // 장바구니 번호 (Primary Key, AUTO_INCREMENT)
  private int bookNum;            // 도서 번호 (FK → SHOP_BOOK)
  private String bookTitle;       // 도서 제목 (JOIN으로 가져온 값)
  private int bookPrice;          // 도서 가격 (JOIN으로 가져온 값)
  private int cartCnt;            // 장바구니 수량
  private String memEmail;        // 회원 이메일 (FK → SHOP_MEMBER)
  private LocalDateTime cartDate; // 장바구니 담은 날짜 (DB DEFAULT NOW())
  private String uploadFileName;  // 대표 이미지 파일명 (JOIN으로 가져온 값)
}
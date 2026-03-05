package com.green.book_shop_t.book.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

/**
 * 도서 정보를 담는 DTO 클래스
 * DB의 SHOP_BOOK 테이블 + BOOK_IMG 테이블(1:N 관계) 데이터를 함께 담음
 *
 * [1:N 관계 처리]
 *  - 한 권의 책(BookDTO)에 여러 이미지(BookImgDTO)가 존재
 *  - MyBatis XML에서 <collection> 태그로 bookImgList를 자동 매핑
 *  - 도서 목록: 대표 이미지(IS_MAIN='Y') 1개만 포함
 *  - 도서 상세: 대표 이미지 + 상세 이미지 모두 포함
 */
@Getter
@Setter
public class BookDTO {

  private int bookNum;                    // 도서 번호 (Primary Key)
  private String bookTitle;               // 도서 제목
  private String author;                  // 저자
  private int bookPrice;                  // 판매 가격 (원)
  private int bookStock;                  // 재고 수량
  private String bookIntro;               // 도서 소개
  private LocalDate publishDate;          // 출판일
  private int cateNum;                    // 카테고리 번호 (FK → BOOK_CATEGORY)
  private List<BookImgDTO> bookImgList;   // 도서 이미지 목록 (MyBatis <collection> 으로 자동 매핑)
}

package com.green.book_shop_t.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class CartDTO {

  private int cartNum;      // 장바구니 번호
  private int bookNum;      // 책 번호
  private String bookTitle; // 책 제목
  private int bookPrice;    // 책 가격
  private int cartCnt;      // 수량
  private String memEmail;  // 장바구니 주인 이메일
  private LocalDate cartDate; // 장바구니 담은 날짜
}
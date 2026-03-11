package com.green.book_shop_t.dashBoard.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TopBookDTO {

  private int bookNum;
  private String bookTitle;
  private String author;
  private int totalBuyCnt;

}

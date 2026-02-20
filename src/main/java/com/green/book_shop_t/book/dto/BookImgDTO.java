package com.green.book_shop_t.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BookImgDTO {

  private int imgNum;
  private String originFileName;
  private String uploadFileName;
  private String isMain;
  private int bookNum;

}

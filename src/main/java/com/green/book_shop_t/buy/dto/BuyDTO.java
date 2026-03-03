package com.green.book_shop_t.buy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@ToString
public class BuyDTO {

  private int buyNum;
  private int buyPrice;
  private String memEmail;
  private LocalDateTime buyDate;
  private List<BuyDetailDTO> detailList;

}

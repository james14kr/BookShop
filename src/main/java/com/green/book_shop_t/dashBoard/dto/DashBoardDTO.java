package com.green.book_shop_t.dashBoard.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DashBoardDTO {

  private int todayOrderCount;
  private int monthOrderCount;
  private long todaySales;
  private long monthSales;

}

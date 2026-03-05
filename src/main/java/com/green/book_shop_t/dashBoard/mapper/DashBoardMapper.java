package com.green.book_shop_t.dashBoard.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DashBoardMapper {

  int selectTodayOrderCount();
  int selectMonthOrderCount();
  long selectTodaySales();
  long selectMonthSales();

}

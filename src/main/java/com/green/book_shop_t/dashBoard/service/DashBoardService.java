package com.green.book_shop_t.dashBoard.service;

import com.green.book_shop_t.dashBoard.dto.DashBoardDTO;
import com.green.book_shop_t.dashBoard.mapper.DashBoardMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashBoardService {

  private final DashBoardMapper dashBoardMapper;

  public int getTodayOrderCount(){
    return dashBoardMapper.selectTodayOrderCount();
  }

  public int getMonthOrderCount(){
    return dashBoardMapper.selectMonthOrderCount();
  }

  public long getTodaySales(){
    return dashBoardMapper.selectTodaySales();
  }

  public long getMonthSales(){
    return dashBoardMapper.selectMonthSales();
  }

  public DashBoardDTO getSummary(){
    DashBoardDTO dto = new DashBoardDTO();
    dto.setTodayOrderCount(dashBoardMapper.selectTodayOrderCount());
    dto.setMonthOrderCount(dashBoardMapper.selectMonthOrderCount());
    dto.setTodaySales(dashBoardMapper.selectTodaySales());
    dto.setMonthSales(dashBoardMapper.selectMonthSales());
    return dto;
  }

}

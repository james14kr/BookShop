package com.green.book_shop_t.dashBoard.controller;


import com.green.book_shop_t.dashBoard.dto.DashBoardDTO;
import com.green.book_shop_t.dashBoard.service.DashBoardService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/manage/dashBoard")
public class DashBoardController {

  private final DashBoardService dashBoardService;

  @GetMapping("")
  public ResponseEntity getSummary(){
    try {
      DashBoardDTO result = dashBoardService.getSummary();
      return ResponseEntity.status(HttpStatus.OK).body(result);
    } catch (Exception e) {
      log.error("대시보드 조회 api 오류", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}

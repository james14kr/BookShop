package com.green.book_shop_t.book_cate.controller;

import com.green.book_shop_t.book_cate.dto.CateDTO;
import com.green.book_shop_t.book_cate.service.CateService;
import com.green.book_shop_t.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RequestMapping("/categories")
@RestController
public class CateController {

  private final CateService cateService;

  //카테고리 목록 조회하는 api
  @GetMapping("")
  public ResponseEntity<List<CateDTO>> searchCate(){
    try {
      List<CateDTO> cateList = cateService.searchCate();
      return ResponseEntity.status(HttpStatus.OK).body(cateList);
    } catch (Exception e) {
      log.error("리스트 목록 조회 중 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}


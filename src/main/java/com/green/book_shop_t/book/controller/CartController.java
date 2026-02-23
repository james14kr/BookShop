package com.green.book_shop_t.book.controller;

import com.green.book_shop_t.book.dto.CartDTO;
import com.green.book_shop_t.book.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class CartController {

  private final CartService cartService;

  //카트 등록 api
  @PostMapping("/cart")
  public ResponseEntity<?> regCart(@RequestBody CartDTO cartDTO){
    try {
      cartService.regCart(cartDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("카트 등록 api 에러 ", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //카트 리스트 조회 api
  @GetMapping("/cartList/{memEmail}")
  public ResponseEntity<?> selectCartList(@PathVariable("memEmail") String memEmail){
    try{
      List<CartDTO> result = cartService.selectCartList(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    }catch (Exception e){
      log.error("카트 리스트 조회 기능 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}

package com.green.book_shop_t.book.service;

import com.green.book_shop_t.book.dto.CartDTO;
import com.green.book_shop_t.book.mapper.CartMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartService {

  private final CartMapper cartMapper;

  //카트 등록 기능 메서드
  public void regCart(CartDTO cartDTO){
    cartMapper.insertCart(cartDTO);
  }

  //카트 리스트 조회 기능 메서드
  public List<CartDTO> selectCartList(String memEmail){
    return cartMapper.selectCartList(memEmail);
  }

  //장바구니 상품 삭제 기능 메서드

  public void deleteCart(int cartNum){
    cartMapper.deleteContent(cartNum);
  }

  //장바구니 수정 기능 메서드
  public void updateCartContent(CartDTO cartDTO){
    cartMapper.updateCart(cartDTO);
  }

}

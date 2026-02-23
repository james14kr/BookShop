package com.green.book_shop_t.book.mapper;

import com.green.book_shop_t.book.dto.CartDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CartMapper {

  //카트 등록 쿼리 실행 메서드
  void insertCart(CartDTO cartDTO);

  //카트 리시트 조회 실행 메서드
  List<CartDTO> selectCartList(String memEmail);

}

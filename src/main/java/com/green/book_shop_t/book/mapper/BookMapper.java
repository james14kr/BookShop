package com.green.book_shop_t.book.mapper;

import com.green.book_shop_t.book.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BookMapper {

  //도서 등록 쿼리 실행 메서드
  void insertBook(BookDTO bookDTO);

}

package com.green.book_shop_t.book.mapper;

import com.green.book_shop_t.book.dto.BookDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookMapper {

  //도서 등록 쿼리 실행 메서드
  void insertBook(BookDTO bookDTO);

  //도서 목록 조회 쿼리 실행 메서드
  List<BookDTO> selectBook();

  //도서 상세 정보 조회 쿼리 실행 메서드
  BookDTO selectBookDetail(int bookNum);

  //다음에 저장될 도서 번호를 조회하는 쿼리
  int getNextBookNum();

}

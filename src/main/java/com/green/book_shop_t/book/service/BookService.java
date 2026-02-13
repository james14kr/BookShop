package com.green.book_shop_t.book.service;

import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

  private final BookMapper bookMapper;

  //도서 등록 기능 메서드
  public void regBook(BookDTO bookDTO){
    bookMapper.insertBook(bookDTO);
  }

  //도서 목록 조회 기능 메서드
  public List<BookDTO> selectBook(){
    return bookMapper.selectBook();
  }

  //도서 상세 정보 조회 기능 메서드
  public BookDTO selectBookDetail(int bookNum){
    return bookMapper.selectBookDetail(bookNum);
  }

}

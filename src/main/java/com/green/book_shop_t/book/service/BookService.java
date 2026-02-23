package com.green.book_shop_t.book.service;

import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.dto.BookImgDTO;
import com.green.book_shop_t.book.mapper.BookImgMapper;
import com.green.book_shop_t.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

  private final BookMapper bookMapper;
  private final BookImgMapper bookImgMapper;

  //도서 등록 기능 메서드
  //insert 쿼리가 연속 두 번 실행되기 때문에 transaction을 걸어줌
  //@Transactional 어노테이션이 붙어 있는 service 메서드는 안에 작성된 모든 쿼리가 성공해야 커밋 진행함
  //(rollbackFor = Exception.class) : 어떤 이유에서든 오류가 발생하면 전부 롤백시키겠다라는 설정
  @Transactional(rollbackFor = Exception.class)
  public void regBook(BookDTO bookDTO, List<BookImgDTO> imgList){
    bookMapper.insertBook(bookDTO);
    bookImgMapper.insertImages(imgList);
  }

  //도서 목록 조회 기능 메서드
  public List<BookDTO> selectBook(){
    return bookMapper.selectBook();
  }

  //도서 상세 정보 조회 기능 메서드
  public BookDTO selectBookDetail(int bookNum){
    return bookMapper.selectBookDetail(bookNum);
  }

  //다음에 저장될 도서번호를 조회하는 기능
  public int getNextBookNum(){
    return bookMapper.getNextBookNum();
  }
}

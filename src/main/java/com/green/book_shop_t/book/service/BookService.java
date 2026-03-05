package com.green.book_shop_t.book.service;

import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.dto.BookImgDTO;
import com.green.book_shop_t.book.mapper.BookImgMapper;
import com.green.book_shop_t.book.mapper.BookMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 도서 비즈니스 로직을 처리하는 Service 클래스
 */
@Service
@RequiredArgsConstructor
public class BookService {

  private final BookMapper bookMapper;
  private final BookImgMapper bookImgMapper;

  /**
   * 도서 등록 메서드 - SHOP_BOOK과 BOOK_IMG에 동시 INSERT
   *
   * [@Transactional(rollbackFor = Exception.class) 설명]
   *  - INSERT 쿼리가 두 번 실행됨 (도서정보 + 이미지들)
   *  - 두 쿼리를 하나의 트랜잭션으로 묶어 원자성(Atomicity) 보장
   *  - 모든 쿼리 성공 → COMMIT (DB에 영구 반영)
   *  - 하나라도 실패 → ROLLBACK (모든 변경사항 원상복구)
   *  - rollbackFor = Exception.class : 런타임 예외 + 체크 예외 모두 롤백
   */
  @Transactional(rollbackFor = Exception.class)
  public void regBook(BookDTO bookDTO, List<BookImgDTO> imgList){
    bookMapper.insertBook(bookDTO);       // SHOP_BOOK 테이블 INSERT
    bookImgMapper.insertImages(imgList);  // BOOK_IMG 테이블 다중 INSERT (FOREACH)
  }

  /** 도서 전체 목록 조회 - 각 도서의 대표 이미지(IS_MAIN='Y') 포함 */
  public List<BookDTO> selectBook(){
    return bookMapper.selectBook();
  }

  /** 도서 상세 정보 조회 - 대표 이미지 + 상세 이미지 모두 포함 */
  public BookDTO selectBookDetail(int bookNum){
    return bookMapper.selectBookDetail(bookNum);
  }

  /**
   * 다음에 INSERT할 도서 번호 조회
   * SQL: SELECT IFNULL(MAX(BOOK_NUM), 0) + 1
   * AUTO_INCREMENT 대신 수동으로 번호를 관리하는 방식
   * → 테이블이 비어있으면 1, 마지막 번호가 5면 6 반환
   */
  public int getNextBookNum(){
    return bookMapper.getNextBookNum();
  }
}

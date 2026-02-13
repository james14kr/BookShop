package com.green.book_shop_t.book.controller;

import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.service.BookService;
import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
public class BookController {

  private final BookService bookService;

  //도서 등록 api
  @PostMapping("")
  public ResponseEntity<?> regBook(@RequestBody BookDTO bookDTO){
    try{
      bookService.regBook(bookDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      log.error("도서 등록 api 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //도서 목록 조회 api
  @GetMapping("/select")
  public ResponseEntity<?> selectBook(){
    try {
      List<BookDTO> result = bookService.selectBook();
      return ResponseEntity.status(HttpStatus.OK).body(result);
    } catch (Exception e) {
      log.error("도서 목록 조회 기능 에러", e );
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  //도서 상세 정보 조회 api
  @GetMapping("/detail/{bookNum}")
  public ResponseEntity<?> selectBookDetail(@PathVariable("bookNum")int bookNum){
    try {
      BookDTO result = bookService.selectBookDetail(bookNum);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    }catch (Exception e){
      log.error("도서 상세 정보 조회 기능 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}

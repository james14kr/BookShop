package com.green.book_shop_t.book.controller;

import com.green.book_shop_t.book.dto.BookDTO;
import com.green.book_shop_t.book.service.BookService;
import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.service.MemberService;
import com.green.book_shop_t.util.UploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/books")
public class BookController {

  private final BookService bookService;
  private final UploadUtil uploadUtil;

  //application.properties 파일의 file.upload.dir로 선언한 데이터를 주입
  @Value("${file.upload.dir}")
  private String uploadPath;

  //도서 등록 api
  //파일이 포함된 데이터를 REACT에서 FormData 객체에 담겨 전송됨. 이때, 데이터를 전달받는 문법도 달라짐
  //BookDTO 매개변수 : FormData로 전달되는 데이터 중 Key값이 BookDTO와 동일한 데이터를 전달받는 매개변수
  //전송된 파일 데이터를 전달받을 때는 MultipartFile 자료형으로 전달받음
  //ex> @RequestParam(전송되는 파일의 key값) MultipartFile 데이터를 전달 받을 변수명
  @PostMapping("")
  public ResponseEntity<?> regBook(BookDTO bookDTO
          ,@RequestParam("mainImg")MultipartFile mainImgFile
          ,@RequestParam("subImgs")MultipartFile[] subImgs
  ){
    try{
      //SHOP_BOOK 테이블에 INSERT할 데이터 확인
      System.out.println(bookDTO);

      //선택한 대표 파일명을 출력
      System.out.println(mainImgFile.getOriginalFilename());

      //선택한 상세 파일들 확인
      for(MultipartFile img : subImgs){
        System.out.println(img.getOriginalFilename());
      }

      //------------------대표파일 첨부 기능-------------------//
      uploadUtil.fileUpload(mainImgFile);

      //------------------상세파일 첨부 기능-------------------//
      uploadUtil.multipleFileUpload(subImgs);

//      bookService.regBook(bookDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      log.error("도서 등록 api 에러", e);      System.out.println(bookDTO);
      //선택한 파일명을 출력
      System.out.println(mainImgFile.getOriginalFilename());
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

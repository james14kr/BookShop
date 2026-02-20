package com.green.book_shop_t.book.mapper;

import com.green.book_shop_t.book.dto.BookImgDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BookImgMapper {

  //도서 이미지 등록 쿼리 실행 메서드
  void insertImages(List<BookImgDTO> imgList);

}

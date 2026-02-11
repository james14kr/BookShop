package com.green.book_shop_t.book_cate.mapper;

import com.green.book_shop_t.book_cate.dto.CateDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CateMapper {

  //카테고리 목록 조회 실행 메서드
  List<CateDTO> selectCateList();

}

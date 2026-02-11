package com.green.book_shop_t.book_cate.service;

import com.green.book_shop_t.book_cate.dto.CateDTO;
import com.green.book_shop_t.book_cate.mapper.CateMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CateService {

  private final CateMapper cateMapper;

  //카테고리 목록 조회 기능
  public List<CateDTO> searchCate(){
    return cateMapper.selectCateList();
  }

}

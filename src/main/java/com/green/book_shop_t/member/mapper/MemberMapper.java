package com.green.book_shop_t.member.mapper;

import com.green.book_shop_t.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

  void insertInfo(MemberDTO memberDTO);

  String checkEmail(String memEmail);

}

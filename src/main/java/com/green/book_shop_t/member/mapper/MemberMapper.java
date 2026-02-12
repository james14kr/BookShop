package com.green.book_shop_t.member.mapper;

import com.green.book_shop_t.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberMapper {

  void insertInfo(MemberDTO memberDTO);

  //아이디 중복 체크 실행 메서드
  String checkEmail(String memEmail);

  //로그인 쿼리 실행 메서드
  MemberDTO login (MemberDTO memberDTO);

}

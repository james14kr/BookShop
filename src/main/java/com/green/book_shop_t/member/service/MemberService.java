package com.green.book_shop_t.member.service;

import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {
  private final MemberMapper memberMapper;

  public void regInfo(MemberDTO memberDTO){
    memberMapper.insertInfo(memberDTO);
  }

  //사용 가능 이메일 확인 기능
  public boolean checkEmail(String memEmail){
    String email = memberMapper.checkEmail(memEmail);
    return email == null;
  }



}










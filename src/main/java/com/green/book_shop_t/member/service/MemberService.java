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

  //로그인 여부 확인 기능 메서드
  public MemberDTO login(MemberDTO memberDTO){
    //로그인 하려는 회원의 이메일, 이름, 권한정보를 리엑트에 전달
    //데이터 조회 안됨(result == null) ->로그인 불가능
    MemberDTO result = memberMapper.login(memberDTO);
    return result;
  }


}










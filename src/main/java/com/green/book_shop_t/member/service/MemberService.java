package com.green.book_shop_t.member.service;

import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.mapper.MemberMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * 회원 비즈니스 로직을 처리하는 Service 클래스
 *
 * [Service 계층의 역할]
 *  - Controller로부터 요청을 받아 비즈니스 로직을 처리
 *  - Mapper(DB)를 호출하여 데이터를 가져오거나 저장
 *  - 처리 결과를 Controller로 반환
 *
 * [어노테이션 설명]
 *  - @Service           : Spring이 이 클래스를 서비스 Bean으로 등록
 *  - @RequiredArgsConstructor : final 필드에 대한 생성자를 자동 생성
 *                              → memberMapper를 생성자 주입 방식으로 의존성 주입
 */
@Service
@RequiredArgsConstructor
public class MemberService {

  // final : 한 번 주입되면 변경 불가 (불변성 보장)
  private final MemberMapper memberMapper;

  /**
   * 회원가입 처리 메서드
   * Mapper를 통해 SHOP_MEMBER 테이블에 회원 정보 INSERT
   * @param memberDTO 저장할 회원 정보
   */
  public void regInfo(MemberDTO memberDTO){
    memberMapper.insertInfo(memberDTO);
  }

  /**
   * 이메일 사용 가능 여부 확인 메서드
   * Mapper에서 해당 이메일 조회 → null이면 사용 가능(true)
   * @param memEmail 확인할 이메일
   * @return true: 사용 가능한 이메일 / false: 이미 존재하는 이메일
   */
  public boolean checkEmail(String memEmail){
    String email = memberMapper.checkEmail(memEmail);
    // email이 null이면 DB에 해당 이메일 없음 → 사용 가능 → true 반환
    // email에 값이 있으면 DB에 이미 존재 → 중복 → false 반환
    return email == null;
  }

  /**
   * 로그인 처리 메서드
   * Mapper에서 이메일+비밀번호 일치 여부 확인 후 회원 정보 반환
   * @param memberDTO 로그인 시도 정보 (memEmail, memPw)
   * @return 로그인 성공 시 회원 정보(memEmail, memName, memRole) / 실패 시 null
   *         React에서 null이면 로그인 실패로 처리
   */
  public MemberDTO login(MemberDTO memberDTO){
    MemberDTO result = memberMapper.login(memberDTO);
    return result;
  }


}










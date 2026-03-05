package com.green.book_shop_t.member.controller;

import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * 회원 관련 HTTP 요청을 처리하는 Controller 클래스
 *
 * [어노테이션 설명]
 *  - @Slf4j             : log.error(), log.info() 등 로그 기능 자동 활성화
 *  - @RestController    : @Controller + @ResponseBody 합친 것
 *                         → 모든 메서드의 반환값을 JSON으로 응답 (View X)
 *  - @RequiredArgsConstructor : final 필드 생성자 자동 주입
 *  - @RequestMapping("/members") : 이 컨트롤러의 모든 URL 앞에 /members 붙음
 *                                  ex) /members, /members/login, /members/checkEmail/{email}
 *
 * [ResponseEntity란?]
 *  - HTTP 응답 전체(상태코드 + 헤더 + 바디)를 직접 제어할 수 있는 객체
 *  - ResponseEntity.status(HttpStatus.CREATED).build()  → 201, 바디 없음
 *  - ResponseEntity.status(HttpStatus.OK).body(result)  → 200, JSON 바디 포함
 *  - ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build() → 500
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

  private final MemberService memberService;

  /**
   * 회원가입 API
   * POST /members
   * @RequestBody : React에서 JSON으로 보낸 데이터를 MemberDTO 객체로 변환하여 받음
   *               (Content-Type: application/json 필수)
   * @return 201 Created (성공) / 500 Internal Server Error (실패)
   */
  @PostMapping("")
  public ResponseEntity<?> regInfo(@RequestBody MemberDTO memberDTO){
    try{
      memberService.regInfo(memberDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("회원가입 등록 중 에러 발생", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * 이메일 중복 확인 API
   * GET /members/checkEmail/{memEmail}
   * @PathVariable : URL 경로의 {memEmail} 부분을 String memEmail 변수로 받음
   *                 ex) /members/checkEmail/test@naver.com → memEmail = "test@naver.com"
   * @return 200 OK + true(사용 가능) or false(중복) 반환
   */
  @GetMapping("/checkEmail/{memEmail}")
  public ResponseEntity<?> checkEmail(@PathVariable("memEmail") String memEmail){
    try {
      boolean result = memberService.checkEmail(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    } catch (Exception e) {
      log.error("이메일 중복 체크 중 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * 로그인 API
   * GET /members/login?memEmail=xxx&memPw=xxx
   * 매개변수 MemberDTO memberDTO : @RequestParam 없이도 쿼리 파라미터를 DTO로 자동 바인딩
   * (GET 요청이라 @RequestBody 사용 불가 → 쿼리스트링으로 전달)
   * @return 200 OK + MemberDTO(memEmail, memName, memRole) / null이면 로그인 실패
   */
  @GetMapping("/login")
  public ResponseEntity<?> checkLogin(MemberDTO memberDTO){
    try {
      MemberDTO result = memberService.login(memberDTO);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    } catch (Exception e) {
      log.error("로그인 기능 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}

  






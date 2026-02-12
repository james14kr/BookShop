package com.green.book_shop_t.member.controller;

import com.green.book_shop_t.member.dto.MemberDTO;
import com.green.book_shop_t.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
  private final MemberService memberService;

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

  //사용 가능한 이메일인지 체크하는 api
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

  //로그인 api
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








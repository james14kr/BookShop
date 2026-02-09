package com.green.book_shop_t.member.dto;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class MemberDTO {
  private String memEmail;        // 이메일 (Primary Key)
  private String memPw;           // 비밀번호
  private String memName;         // 이름
  private String memTel;          // 전화번호
  private String memAddr;         // 주소
  private String addrDetail;      // 상세주소
  private String isUsing;         // 사용여부 (Y/N)
  private String memRole;         // 권한 (USER/MANAGER/ADMIN)
  private LocalDateTime joinDate;  // 가입일시
}

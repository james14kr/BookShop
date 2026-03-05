package com.green.book_shop_t.member.dto;

import lombok.*;

import java.time.LocalDateTime;

/**
 * 회원 정보를 담는 DTO (Data Transfer Object) 클래스
 *
 * [DTO란?]
 *  - 계층(Layer) 간 데이터 전달만을 목적으로 하는 객체
 *  - Controller ↔ Service ↔ Mapper 사이에서 데이터를 주고받을 때 사용
 *  - DB의 SHOP_MEMBER 테이블 컬럼과 1:1 매핑
 *
 * [Lombok 어노테이션 설명]
 *  - @Getter  : 모든 필드의 getter 메서드 자동 생성 (getMemEmail() 등)
 *  - @Setter  : 모든 필드의 setter 메서드 자동 생성 (setMemEmail() 등)
 *  - @ToString : toString() 자동 생성 → System.out.println(dto) 시 필드값 출력
 */
@Setter
@Getter
@ToString
public class MemberDTO {

  private String memEmail;        // 이메일 (Primary Key - 회원 식별자, 중복 불가)
  private String memPw;           // 비밀번호 (영문+숫자 조합 4~50자)
  private String memName;         // 이름
  private String memTel;          // 전화번호 (010-0000-0000 형식)
  private String memAddr;         // 주소 (Daum Postcode API로 검색)
  private String addrDetail;      // 상세주소 (동/호수 등)
  private String isUsing;         // 사용여부 (Y: 활성 / N: 탈퇴) - DB 기본값 'Y'
  private String memRole;         // 권한 (USER: 일반 / MANAGER: 매니저 / ADMIN: 관리자)
  private LocalDateTime joinDate; // 가입일시 (DB 자동 입력 - DEFAULT NOW())
}

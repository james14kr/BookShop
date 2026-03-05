package com.green.book_shop_t.member.mapper;

import com.green.book_shop_t.member.dto.MemberDTO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 회원 관련 DB 쿼리를 실행하는 Mapper 인터페이스
 *
 * [MyBatis Mapper 동작 원리]
 *  1. @Mapper 어노테이션을 붙이면 MyBatis가 인터페이스를 감지
 *  2. resources/mapper/member-mapper.xml 파일의 namespace와 연결
 *  3. 메서드 이름(insertInfo) = XML의 id 속성값(insertInfo)으로 매핑
 *  4. Spring이 구현 클래스 없이도 자동으로 프록시 객체를 생성하여 Bean 등록
 *  5. Service에서 @Autowired or 생성자 주입으로 사용
 *
 * 연결 XML : resources/mapper/member-mapper.xml
 */
@Mapper
public interface MemberMapper {

  /**
   * 회원 정보를 SHOP_MEMBER 테이블에 INSERT
   * XML id : insertInfo
   * @param memberDTO 저장할 회원 정보 (memEmail, memPw, memName, memTel, memAddr, addrDetail)
   *                  isUsing, memRole, joinDate는 DB 기본값(DEFAULT)으로 자동 입력
   */
  void insertInfo(MemberDTO memberDTO);

  /**
   * 이메일 중복 여부 확인 쿼리 실행
   * XML id : checkEmail
   * @param memEmail 중복 확인할 이메일 주소
   * @return DB에 해당 이메일이 존재하면 이메일 문자열 반환, 없으면 null
   *         → Service에서 null 이면 사용 가능(true), 값 있으면 중복(false)으로 처리
   */
  String checkEmail(String memEmail);

  /**
   * 로그인 쿼리 실행 (이메일 + 비밀번호 일치 여부 확인)
   * XML id : login
   * @param memberDTO 로그인 시도 정보 (memEmail, memPw 사용)
   * @return 일치하는 회원의 MemberDTO (memEmail, memName, memRole만 SELECT)
   *         일치 회원 없으면 null 반환 → Service에서 null 이면 로그인 실패로 처리
   */
  MemberDTO login (MemberDTO memberDTO);

}

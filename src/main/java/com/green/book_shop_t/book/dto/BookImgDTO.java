package com.green.book_shop_t.book.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * 도서 이미지 정보를 담는 DTO 클래스
 * DB의 BOOK_IMG 테이블 컬럼과 1:1 매핑
 *
 * [대표이미지 vs 상세이미지 구분]
 *  - isMain = 'Y' : 대표 이미지 (도서 목록에서 썸네일로 표시)
 *  - isMain = 'N' : 상세 이미지 (도서 상세 페이지 하단에 표시)
 *
 * [파일명 구분]
 *  - originFileName : 사용자가 선택한 원본 파일명 (ex: "책표지.png")
 *  - uploadFileName : 서버에 저장된 UUID 파일명 (ex: "a1b2c3d4-....png")
 *    → UUID를 사용하는 이유: 파일명 중복 방지
 */
@Getter
@Setter
@ToString
public class BookImgDTO {

  private int imgNum;             // 이미지 번호 (Primary Key, AUTO_INCREMENT)
  private String originFileName;  // 원본 파일명 (사용자 선택 파일명)
  private String uploadFileName;  // 서버 저장 파일명 (UUID + 확장자)
  private String isMain;          // 대표 이미지 여부 ('Y': 대표 / 'N': 상세)
  private int bookNum;            // 도서 번호 (FK → SHOP_BOOK)

}

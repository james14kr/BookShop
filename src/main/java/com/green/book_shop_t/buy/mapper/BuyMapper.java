package com.green.book_shop_t.buy.mapper;

import com.green.book_shop_t.buy.dto.BuyDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 구매 관련 DB 쿼리를 실행하는 Mapper 인터페이스
 * 연결 XML : resources/mapper/buy-mapper.xml
 */
@Mapper
public interface BuyMapper {

  /**
   * SHOP_BUY 테이블에 구매 헤더 정보 INSERT
   * XML: useGeneratedKeys="true" keyProperty="buyNum"
   * → INSERT 완료 후 생성된 AUTO_INCREMENT 값이 buyDTO.buyNum에 자동으로 채워짐
   * → 이후 insertBuyDetail에서 이 buyNum을 사용
   */
  void insertBuy(BuyDTO buyDTO);

  /**
   * BUY_DETAIL 테이블에 구매 상세(도서 목록) INSERT
   * XML: FOREACH로 buyDTO.detailList를 순회하여 다중 INSERT
   * @param buyDTO detailList와 buyNum(insertBuy 후 자동 채워진 값) 포함
   */
  void insertBuyDetail(BuyDTO buyDTO);

  /**
   * 특정 회원의 구매 목록 조회
   * XML: SHOP_BUY, BUY_DETAIL, SHOP_BOOK, BOOK_IMG 4테이블 JOIN
   * resultMap "buy" → BuyDTO(buyNum, buyPrice, memEmail, buyDate, List<BuyDetailDTO>)
   */
  List<BuyDTO> selectBuyList(String memEmail);

}

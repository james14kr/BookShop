package com.green.book_shop_t.buy.service;

import com.green.book_shop_t.buy.dto.BuyDTO;
import com.green.book_shop_t.buy.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 구매 비즈니스 로직을 처리하는 Service 클래스
 */
@Service
@RequiredArgsConstructor
public class BuyService {

  private final BuyMapper buyMapper;

  /**
   * 구매 정보 등록 메서드 - SHOP_BUY와 BUY_DETAIL에 동시 INSERT
   *
   * [처리 순서]
   *  1. insertBuy(buyDTO) : SHOP_BUY INSERT
   *     - useGeneratedKeys="true", keyProperty="buyNum"
   *     - AUTO_INCREMENT로 생성된 buyNum이 buyDTO.buyNum에 자동 설정됨
   *  2. insertBuyDetail(buyDTO) : BUY_DETAIL INSERT
   *     - buyDTO.detailList를 FOREACH로 순회하여 다중 INSERT
   *     - 각 detail의 buyNum으로 1단계에서 채워진 buyDTO.buyNum 사용
   *
   * [@Transactional] : 두 INSERT가 하나의 트랜잭션 → 하나라도 실패 시 전체 롤백
   */
  @Transactional(rollbackFor = Exception.class)
  public void insertBuy(BuyDTO buyDTO){
    buyMapper.insertBuy(buyDTO);       // SHOP_BUY INSERT + buyNum 자동 채움
    buyMapper.insertBuyDetail(buyDTO); // BUY_DETAIL FOREACH INSERT
  }

  /**
   * 구매 목록 조회 메서드
   * @param memEmail 조회할 회원 이메일
   * @return 해당 회원의 구매 목록 (BuyDTO 안에 List<BuyDetailDTO> 포함)
   */
  public List<BuyDTO> selectBuyLists(String memEmail){
    return buyMapper.selectBuyList(memEmail);
  }

}

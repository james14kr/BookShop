package com.green.book_shop_t.buy.service;

import com.green.book_shop_t.buy.dto.BuyDTO;
import com.green.book_shop_t.buy.dto.BuyDetailDTO;
import com.green.book_shop_t.buy.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 구매 관련 비즈니스 로직을 처리하는 Service 클래스
 *
 * @Service   : Spring이 이 클래스를 서비스 Bean으로 등록
 * @RequiredArgsConstructor : final 필드(BuyMapper)를 생성자 주입
 * @Slf4j     : log 변수를 자동 생성
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class BuyService {

    private final BuyMapper buyMapper;

    /**
     * 구매 등록 기능 메서드
     *
     * SHOP_BUY 와 BUY_DETAIL 두 테이블에 순서대로 INSERT 해야 하므로
     * @Transactional 을 사용하여 두 쿼리를 하나의 트랜잭션으로 묶음
     * → SHOP_BUY INSERT 성공 후 BUY_DETAIL INSERT 실패 시 전체 롤백
     *
     * [처리 순서]
     * 1) SHOP_BUY INSERT → 자동생성된 buyNum 이 buyDTO.buyNum 에 채워짐
     * 2) buyDetailList 의 각 BuyDetailDTO 에 buyNum 을 세팅
     * 3) BUY_DETAIL INSERT (도서 1종씩 반복)
     *
     * @param buyDTO 총 구매금액, 회원이메일, 구매 도서 목록(buyDetailList)을 담은 DTO
     */
    @Transactional
    public void regBuy(BuyDTO buyDTO) {

        // 1) SHOP_BUY 테이블에 구매 헤더 INSERT
        //    INSERT 후 자동생성된 BUY_NUM이 buyDTO.buyNum 에 자동으로 채워짐 (useGeneratedKeys)
        buyMapper.insertBuy(buyDTO);

        // 2) buyDetailList 의 각 항목에 방금 생성된 buyNum 을 세팅 후 BUY_DETAIL INSERT
        for (BuyDetailDTO detail : buyDTO.getBuyDetailList()) {

            // SHOP_BUY의 BUY_NUM(FK)을 각 상세 항목에 세팅
            detail.setBuyNum(buyDTO.getBuyNum());

            // BUY_DETAIL 테이블에 도서 1종 INSERT
            buyMapper.insertBuyDetail(detail);
        }
    }

    /**
     * 회원별 구매 목록 조회 기능 메서드
     * 구매 헤더와 도서 상세 목록을 한 번에 조회하여 반환
     *
     * @param memEmail 조회할 회원의 이메일
     * @return 구매 목록 (각 BuyDTO 안에 List<BuyDetailDTO> 포함)
     */
    public List<BuyDTO> selectBuyList(String memEmail) {
        return buyMapper.selectBuyList(memEmail);
    }
}

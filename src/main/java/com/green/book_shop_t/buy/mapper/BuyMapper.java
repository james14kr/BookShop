package com.green.book_shop_t.buy.mapper;

import com.green.book_shop_t.buy.dto.BuyDTO;
import com.green.book_shop_t.buy.dto.BuyDetailDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 구매 관련 MyBatis Mapper 인터페이스
 *
 * @Mapper 어노테이션을 붙이면 Spring이 자동으로 구현체를 생성해줌
 * 실제 쿼리는 buy-mapper.xml 파일에 작성
 * 메서드명은 xml의 id 속성값과 반드시 일치해야 함
 */
@Mapper
public interface BuyMapper {

    /**
     * 구매 헤더 등록 (SHOP_BUY INSERT)
     * INSERT 후 자동 생성된 BUY_NUM이 buyDTO.buyNum 에 자동으로 채워짐 (useGeneratedKeys)
     * → 이후 insertBuyDetail 에서 buyNum 을 FK로 사용
     *
     * @param buyDTO 총 구매금액(buyPrice), 회원이메일(memEmail)을 담은 DTO
     */
    void insertBuy(BuyDTO buyDTO);

    /**
     * 구매 상세 등록 (BUY_DETAIL INSERT)
     * 도서 1종의 구매 정보를 저장
     * BuyDetailDTO.buyNum 에 insertBuy 로 생성된 buyNum 이 들어있어야 함
     *
     * @param buyDetailDTO 도서번호(bookNum), 수량(buyCnt), 구매번호(buyNum)을 담은 DTO
     */
    void insertBuyDetail(BuyDetailDTO buyDetailDTO);

    /**
     * 회원별 구매 목록 조회 (SHOP_BUY + BUY_DETAIL JOIN)
     * 구매 헤더와 상세 도서 목록을 한 번에 조회
     * resultMap의 <collection>으로 BuyDTO.buyDetailList 가 자동으로 채워짐
     *
     * @param memEmail 조회할 회원의 이메일
     * @return 해당 회원의 구매 목록 (각 BuyDTO 안에 List<BuyDetailDTO> 포함)
     */
    List<BuyDTO> selectBuyList(String memEmail);
}

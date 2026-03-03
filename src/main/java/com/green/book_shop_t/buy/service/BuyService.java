package com.green.book_shop_t.buy.service;

import com.green.book_shop_t.buy.dto.BuyDTO;
import com.green.book_shop_t.buy.dto.BuyDetailDTO;
import com.green.book_shop_t.buy.mapper.BuyMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class BuyService {

    private final BuyMapper buyMapper;

    @Transactional(rollbackFor = Exception.class)
    public void insertBuy(BuyDTO buyDTO){
        buyMapper.insertBuy(buyDTO);
        buyMapper.insertBuyDetail(buyDTO);
    }

}

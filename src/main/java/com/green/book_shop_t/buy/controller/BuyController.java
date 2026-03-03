package com.green.book_shop_t.buy.controller;

import com.green.book_shop_t.buy.dto.BuyDTO;
import com.green.book_shop_t.buy.service.BuyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 구매 관련 REST API Controller
 *
 * @RestController : JSON 형태로 데이터를 응답
 * @RequestMapping("/buy") : 모든 API URL 앞에 /buy 가 붙음
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/buy")
public class BuyController {

    private final BuyService buyService;

    /**
     * 구매 등록 API
     *
     * [요청 방식] POST /buy
     * [요청 Body] JSON 형태의 BuyDTO
     *   {
     *     "buyPrice"      : 50000,
     *     "memEmail"      : "user@example.com",
     *     "buyDetailList" : [
     *       { "bookNum": 1, "buyCnt": 2 },
     *       { "bookNum": 3, "buyCnt": 1 }
     *     ]
     *   }
     * [응답 성공] 201 Created (본문 없음)
     * [응답 실패] 500 Internal Server Error
     *
     * @param buyDTO 총 구매금액, 회원이메일, 구매 도서 목록을 담은 DTO
     */
    @PostMapping("")
    public ResponseEntity<?> regBuy(@RequestBody BuyDTO buyDTO) {
        try {
            buyService.regBuy(buyDTO);
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } catch (Exception e) {
            log.error("구매 등록 api 에러", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 회원별 구매 목록 조회 API
     *
     * [요청 방식] GET /buy/list/{memEmail}
     * [URL 예시] GET /buy/list/user@example.com
     * [응답 성공] 200 OK + 구매 목록 JSON 배열
     *   [
     *     {
     *       "buyNum": 1,
     *       "buyPrice": 50000,
     *       "memEmail": "user@example.com",
     *       "buyDate": "2026-03-03T10:00:00",
     *       "buyDetailList": [
     *         { "buyDetailNum": 1, "bookTitle": "클린코드", "buyCnt": 2, ... },
     *         { "buyDetailNum": 2, "bookTitle": "자바의 정석", "buyCnt": 1, ... }
     *       ]
     *     }
     *   ]
     * [응답 실패] 500 Internal Server Error
     *
     * @param memEmail URL 경로에서 받아오는 회원 이메일
     */
    @GetMapping("/list/{memEmail}")
    public ResponseEntity<?> selectBuyList(@PathVariable("memEmail") String memEmail) {
        try {
            List<BuyDTO> result = buyService.selectBuyList(memEmail);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            log.error("구매 목록 조회 api 에러", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

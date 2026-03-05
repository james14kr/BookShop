package com.green.book_shop_t.book.controller;

import com.green.book_shop_t.book.dto.CartDTO;
import com.green.book_shop_t.book.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 장바구니 관련 HTTP 요청을 처리하는 Controller
 *
 * [HTTP 메서드와 CRUD 매핑]
 *  - POST   (Create) → 장바구니 추가
 *  - GET    (Read)   → 장바구니 목록 조회
 *  - PUT    (Update) → 수량 수정 (전체 필드 수정 의미)
 *  - DELETE (Delete) → 장바구니 상품 삭제
 */
@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("")  // 이 컨트롤러는 기본 경로 사용 (/cart, /cartList 등)
public class CartController {

  private final CartService cartService;

  /**
   * 장바구니 상품 추가 API
   * POST /cart
   * React에서 JSON으로 {bookNum, cartCnt, memEmail} 전송
   * ON DUPLICATE KEY UPDATE로 같은 책이면 수량만 증가
   */
  @PostMapping("/cart")
  public ResponseEntity<?> regCart(@RequestBody CartDTO cartDTO){
    try {
      cartService.regCart(cartDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    }catch (Exception e){
      log.error("카트 등록 api 에러 ", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * 장바구니 목록 조회 API
   * GET /cartList/{memEmail}
   * 해당 회원의 장바구니 상품 목록을 최신순으로 반환
   * SHOP_CART + SHOP_BOOK + BOOK_IMG JOIN하여 도서 정보도 함께 반환
   */
  @GetMapping("/cartList/{memEmail}")
  public ResponseEntity<?> selectCartList(@PathVariable("memEmail") String memEmail){
    try{
      List<CartDTO> result = cartService.selectCartList(memEmail);
      return ResponseEntity.status(HttpStatus.OK).body(result);
    }catch (Exception e){
      log.error("카트 리스트 조회 기능 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * 장바구니 상품 삭제 API
   * DELETE /cart/{cartNum}
   * cartNum으로 특정 장바구니 항목 1건 삭제
   * Cart.jsx에서 단건 삭제 및 구매 후 일괄 삭제에 사용
   */
  @DeleteMapping("/cart/{cartNum}")
  public ResponseEntity<?> deleteContent(@PathVariable("cartNum") int cartNum){
    try {
      cartService.deleteCart(cartNum);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      log.error("장바구니 상품 삭제 기능 에러",e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

  /**
   * 장바구니 수량 수정 API
   * PUT /cart
   * React에서 {cartNum, cartCnt, bookNum, memEmail} 전송
   * bookNum + memEmail 조건으로 해당 상품의 수량을 새 수량으로 변경
   */
  @PutMapping("cart")
  public ResponseEntity<?> updateCartContent(@RequestBody CartDTO cartDTO){
    try {
      cartService.updateCartContent(cartDTO);
      return ResponseEntity.status(HttpStatus.CREATED).build();
    } catch (Exception e) {
      log.error("장바구니 수정 api 에러", e);
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
  }

}

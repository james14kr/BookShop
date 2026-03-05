/**
 * 장바구니(Cart) 관련 API 통신 함수 모음
 * Spring 서버(localhost:8080)의 CartController와 통신
 */
import axios from "axios"

/**
 * 장바구니 상품 추가
 * POST /cart
 * @param cartData { bookNum, cartCnt, memEmail }
 * ON DUPLICATE KEY UPDATE 덕분에 같은 책이면 서버에서 수량만 증가 처리
 */
export const insertCart = async (cartData) => {
  try{
    const response = await axios.post('http://localhost:8080/cart', cartData)
    return response;
  }catch(e){
    console.log(e)
  }
}

/**
 * 장바구니 목록 조회
 * GET /cartList/{memEmail}
 * @param memEmail 조회할 회원 이메일
 * @returns List<CartDTO> (도서 정보 + 이미지 포함)
 *          response.data를 바로 반환 (배열 형태)
 */
export const selectCartList = async (memEmail) => {
  try{
    const response = await axios.get(`http://localhost:8080/cartList/${memEmail}`)
    return response.data; // axios response에서 data 추출 후 반환
  }catch(e){
    console.log("장바구니 리스트 조회 axios 에러" , e)
  }
}

/**
 * 장바구니 수량 수정
 * PUT /cart
 * @param cartData { cartNum, cartCnt, bookNum, memEmail }
 * 서버에서 bookNum + memEmail 조건으로 수량을 cartCnt로 교체
 */
export const updateCartCount = async (cartData) => {
  try {
    const response = await axios.put('http://localhost:8080/cart', cartData)
    return response.data;
  } catch (e) {
    console.log("장바구니 수량 수정 axios 에러", e)
  }
}

/**
 * 장바구니 상품 삭제
 * DELETE /cart/{cartNum}
 * @param cartNum 삭제할 장바구니 번호
 * Cart.jsx에서 단건 삭제와 구매 후 일괄 삭제 모두에 사용
 * Promise.all([deleteContent(1), deleteContent(2)]) 로 동시 삭제 가능
 */
export const deleteContent = async (cartNum) =>{
  try{
    const response = await axios.delete(`http://localhost:8080/cart/${cartNum}`)
    return response.data;
  }catch (e){
    console.log("장바구니 삭제 axios 에러", e);
  }
}
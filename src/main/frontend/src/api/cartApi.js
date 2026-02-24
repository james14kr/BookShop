import axios from "axios"

//장바구니 등록 함수
export const insertCart = async (cartData) => {
  try{
    const response = await axios.post('http://localhost:8080/cart', cartData)
    return response;
  }catch(e){
    console.log(e)
  }
}

export const selectCartList = async (memEmail) => {
  try{
    const response = await axios.get(`http://localhost:8080/cartList/${memEmail}`)
    return response.data;
  }catch(e){
    console.log("장바구니 리스트 조회 axios 에러" , e)
  }
}
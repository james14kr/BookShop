//SHOP_BOOK 테이블과 관련한 axios 기능 정의 파일

import axios from "axios"

//도서 등록 함수
export const insertBook = async(bookData) => {
  try{
    const response = await axios.post('http://localhost:8080/books', bookData);
    return response;
  }catch(e){
    console.log('도서 등록 axios 에러', e)
  }
}
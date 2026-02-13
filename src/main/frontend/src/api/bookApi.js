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

//도서 조회 함수
export const selectBook = async() => {
  try{
    const response = await axios.get('http://localhost:8080/books/select')
    return response;
  }catch(e){
    console.log('도서 조회 axios 에러', e)
  }
}

//도서 상세 정보 조회 함수
export const selectBookDetail = async (bookNum) => {
  try{
    const response = await axios.get(`http://localhost:8080/books/detail/${bookNum}`)
    return response;
  }catch(e){
    console.log(e)
  }
}
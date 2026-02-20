//SHOP_BOOK 테이블과 관련한 axios 기능 정의 파일

import axios from "axios"

//도서 등록 함수
//파일도 함께 전달하기 위해서는 통신 설정을 변경해야 함
export const insertBook = async(bookData) => {
  try{
    //데이터 전송 시 파일 데이터도 포함시킨다는 설정
    const fileConfig ={
      header : {'Content-Type' : 'multipart/form-data'}
    };

    const response = await axios.post('http://localhost:8080/books', bookData, fileConfig);
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
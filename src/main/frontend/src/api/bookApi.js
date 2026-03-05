/**
 * 도서(Book) 관련 API 통신 함수 모음
 * Spring 서버(localhost:8080)의 BookController와 통신
 */
import axios from "axios"

/**
 * 도서 등록 함수
 * POST /books
 * @param bookData FormData 객체 (도서정보 + 이미지 파일 포함)
 *
 * [FormData란?]
 *  - 일반 JSON으로는 파일 전송이 불가능 → FormData 사용
 *  - multipart/form-data 형식으로 텍스트 + 파일을 함께 전송
 *  - 서버에서 @RequestParam으로 MultipartFile 수신
 *
 * [fileConfig 설명]
 *  - Content-Type: multipart/form-data 헤더 설정
 *  - 파일 전송 시 반드시 필요 (미설정 시 파일 전송 실패)
 */
export const insertBook = async(bookData) => {
  try{
    const fileConfig ={
      header : {'Content-Type' : 'multipart/form-data'}
    };
    const response = await axios.post('http://localhost:8080/books', bookData, fileConfig);
    return response;
  }catch(e){
    console.log('도서 등록 axios 에러', e)
  }
}

/**
 * 도서 전체 목록 조회 함수
 * GET /books/select
 * @returns List<BookDTO> (각 도서의 대표 이미지 포함)
 */
export const selectBook = async() => {
  try{
    const response = await axios.get('http://localhost:8080/books/select')
    return response;
  }catch(e){
    console.log('도서 조회 axios 에러', e)
  }
}

/**
 * 도서 상세 정보 조회 함수
 * GET /books/detail/{bookNum}
 * @param bookNum 조회할 도서 번호
 * @returns BookDTO (도서 정보 + 모든 이미지 목록 포함)
 *          response.data.bookImgList 에서 대표/상세 이미지 구분하여 사용
 */
export const selectBookDetail = async (bookNum) => {
  try{
    const response = await axios.get(`http://localhost:8080/books/detail/${bookNum}`)
    return response;
  }catch(e){
    console.log(e)
  }
}

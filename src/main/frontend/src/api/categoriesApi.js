import axios from "axios"

//카테고리 목록 조회 axios
export const selectCate = async () => {
  try{
    const response = await axios.get('http://localhost:8080/categories')
    return response;
  }catch(e){
    console.log("카테고리 목록 axios 에러", e);
  }
} 

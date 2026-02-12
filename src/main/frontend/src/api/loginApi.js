import axios from "axios"

//로그인 함수
export const login = async (loginData) => {
  try{
    const response = await axios.get('http://localhost:8080/members/login', {params : loginData})
    return response;
  }catch(e){
    console.log("로그인 axios 에러", e)
  }
}
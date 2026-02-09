//회원과 관련된 axios 기능을 정의한 파일

import axios from "axios"
/*
* @param{Object} info
* @returns
*/

//회원가입 요청 api
export const insertInfo = async (info) => {
  try{
    const response = await axios.post('http://localhost:8080/members', info);
    return response;
  }catch(e){
    console.log("회원가입 axios 에러" , e /*모든 오류의 정보*/)
  }
}
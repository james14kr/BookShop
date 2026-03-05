import axios from "axios";

export const getSummary = async () => {
  try{
    const response = await axios.get("http://localhost:8080/manage/dashBoard")
    return response;
  }catch(e){
    console.log('대시보드 조회 axios 오류', e)
  }
}

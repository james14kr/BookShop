import React from 'react'

//WebStorage에는 문자열만 저장 가능
const WebStorage = () => {

  //localStorage에 데이터 저장
  localStorage.setItem('local-name', 'kim');
  localStorage.setItem('local-age', 30);

  //localStorage에 저장된 데이터 읽기 & 지우기
  localStorage.getItem('local-name');
  localStorage.removeItem('local-age');

  //sessionStorage에 데이터 저장
  sessionStorage.setItem('session-name', 'lee');
  sessionStorage.setItem('session-age', 20);

  //sessionStorage에 저장된 데이터 읽기 & 지우기
  sessionStorage.getItem('session-name');
  sessionStorage.removeItem('session-age')

  return (
    <div>WebStorage</div>
  )
}

export default WebStorage
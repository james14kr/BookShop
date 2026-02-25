import React, { useState } from 'react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'
import styles from './Login.module.css'
import { login } from '../../api/loginApi'
import { useNavigate } from 'react-router-dom'

const Login = ({setLoginInfo}) => {

  const nav = useNavigate();

  //입력할 정보를 저장할 state 변수
  const [loginData, setLoginData] = useState({
    memEmail : '',
    memPw : ''
  })

  //입력할 때마다 실해는 함수
  const handleLoginData = e => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    })
  }

  //로그인 버튼 클릭 시 실행 함수
  //spring에서 null이 리턴되면 리액트에서는 빈문자로 전달받음
  const goLogin = async() => {
    const response = await login(loginData);
    if(response.data !== ''){
      alert("로그인 성공")

      const loginInfo = {
        memEmail : response.data.memEmail,
        memName : response.data.memName,
        memRole : response.data.memRole
      } 

      //로그인 정보를 sessionStorage에 저장하기 위해서 json으로 변경
      //JSON.stringify(객체); -> 객체를 json으로 변경
      //JSON.parse(json); -> json 데이터를 객체로 변경
      sessionStorage.setItem('loginInfo', JSON.stringify(loginInfo));

      setLoginInfo(loginInfo);

      if(loginInfo.memRole === 'MANAGER'){
        nav('/manage/book-form')
      }else{
        nav('/');
      }

    

    }else{
      alert('아이디 및 비밀번호를 확인하세요')

      //입력 데이터 초기화
      setLoginData({
        memEmail : '',
        memPw : '',
      });
    }
  }



  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <div>
          <Input 
            placeholder='Input Your Id' 
            name='memEmail' 
            value={loginData.memEmail}
            onChange={handleLoginData}/>
        </div>
        <div>
          <Input 
            placeholder='Input your Password' 
            name='memPw' value={loginData.memPw} 
            onChange={handleLoginData} 
            type='password' 
            //키보드 엔터 입력 시 로그인 기능 실행
            onKeyDown={e => {
              if(e.key === 'Enter'){
                goLogin();
              }
            }}
            />
        </div>
        <div> 
          <Button title='로그인' size='medium' onClick={goLogin}/>
        </div>
      </div>
    </div>
  )
}

export default Login
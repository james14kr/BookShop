import React, { useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import styles from './Join.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { insertInfo } from '../../api/memberApi.js'

const Join = () => {

  // const test1 = () => {
  //   alert(1);
  // }

  const nav = useNavigate();

  //입력한 정보를 저장할 state 변수
  const[info, setInfo] = useState({
    memEmail : '',
    memPw : '',
    confirmPw : '',
    memName : '',
    memTel : '',
    tel1 : '',
    tel2 : '',
    tel3 : '',
    memAddr : '',
    addrDetail : ''
  })

  console.log(info);

  //입력할 때 마다 실행하는 함수
  const handleInfo = (e) => {
    //e -> 이벤트의 모든 정보가 담긴 객체
    const {name, value} = e.target; //구조분해할당

    setInfo( prev => ({...prev, /*info의 최신 데이터*/[name] : value})
    )

    //만약 연락처를 변경하고 있다면
    if(name === 'tel1' || name === 'tel2' || name === 'tel3'){
      setInfo( prev => ({...prev, memTel : `${prev.tel1}-${prev.tel2}-${prev.tel3}`}))
    }
    
  }

  //회원가입 버튼을 클릭 시 실행하는 함수
  const regInfo = async () => {
    const response = await insertInfo(info);
    if(response.status === 201){
      alert('회원가입을 축하합니다')
      nav('/login')
    }else{
      alert('오류 발생!!')
    }
  }

  return (
    <div className={styles.container}>
      <div>
        <p>Email</p>
        <div className={styles.id_div}>
          <Input name='memEmail' value={info.memEmail} onChange={e => handleInfo(e)}/>
          <Button title='중복확인'/>
        </div>
      </div>
      <div>
        <p>Password</p>
        <Input type='password' name='memPw' value={info.memPw} onChange={e => handleInfo(e)}/>
      </div>
      <div>
        <p>Confirm Password</p>
        <Input type='password' name='confirmPw' value={info.confirmPw} onChange={e => handleInfo(e)}/>
      </div>
      <div>
        <p>Name</p>
        <Input name='memName' value={info.memName} onChange={e => handleInfo(e)}/>
      </div>
      <div>
        <p>Tel</p>
        <div className={styles.tel_div}>
          <Input name='tel1' value={info.tel1} onChange={handleInfo}/>
          <Input name='tel2' value={info.tel2} onChange={handleInfo}/>
          <Input name='tel3' value={info.tel3} onChange={handleInfo}/>
        </div>
      </div>  
      <div>
        <p>Address</p>
        <div className={styles.address_div}>
          <Input name= 'memAddr' value={info.memAddr} onChange={e => handleInfo(e)}/>
          <Button title='검색' variant='gray'/>
        </div>
        <Input name= 'addrDetail' value={info.addrDetail} onChange={e => handleInfo(e)}/>
      </div>
      <div className={styles.btn_div}>
        <Button title='회원가입' onClick={regInfo}/>
      </div>
      

      {/* <Button 
        title = 'aaa' 
        variant = 'purple'
        size = 'small'
        onClick = {test1}/>
      <Button 
        title = '자바'
        variant = 'green'
        size = 'medium'/>
      <Button 
        title = '자바'
        variant = 'gray'
        size = 'medium'/>
      <Button/>

      <br />

      <Input
        type="password"
        name='aaa'
        value={10}
        onChange={e => console.log(e)}
      />
      <br />
      <Input
        type="number"
        name='aaa'
        value={10}
        onChange={e => console.log(e)}
      />
      <br />
      <Input
        type="number"
        name='aaa'
        value={10}
        onChange={e => console.log(e)}
      />
      <br /> */}
    </div>
  )
}

export default Join
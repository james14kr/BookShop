import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import styles from './Join.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { checkEmail, insertInfo } from '../../api/memberApi.js'
import { FaSlack } from 'react-icons/fa6'
import Postcode from '../../Postcode.jsx'
import { useDaumPostcodePopup } from 'react-daum-postcode';

const Join = () => {

  // const test1 = () => {
  //   alert(1);
  // }

  const nav = useNavigate();
  
  //다음 주소록 사용을 위한 선언
  const scriptUrl = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'
  const open = useDaumPostcodePopup(scriptUrl);

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
  });

  //유효성 검사(Validation) 결과 에러 메세지를 저장하는 state변수
  const [errors, setErrors] = useState({
    memEmail : '',
    memPw : '',
    confirmPw : '',
    memName : '',
    memTel : '',
  });

  //마운트 시점인지 판단을 위한 state 변수
  //cnt 값이 0일때가 마운트 시점
  const[cnt, setCnt] = useState(0);

  //
  useEffect(() => {
    if(cnt == 0){
      setCnt(cnt + 1)
    }
  })

  //유효성 검사함수(값 입력할 때 마다 실행)
  const validateField = (name, value) => {
    let errorMsg = ''; 
    switch(name){
      case 'memEmail' : 
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //이메일 형식 정규식
        if(value.length < 5){
          errorMsg = '이메일은 5글자 이상이어야 합니다.';
        }else if(value.length > 50){
          errorMsg = '이메일은 최대 50글자입니다.';
        }else if(!emailPattern.test(value)){
          errorMsg = '이메일 형식이 맞지 않습니다.'
        }
        break;
      case 'memPw' : 
        const pwPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{4,50}$/; //비밀번호 형식 정규식
        if(value.length < 1){
          errorMsg = '비밀번호는 필수 입력입니다.'
        }else if(!pwPattern.test(value)){
          errorMsg = '비밀번호는 영문, 숫자 조합 4~50글자 가능합니다.'
        }
        break;      
      case "memName" :
        if(value.length < 1){
          errorMsg = '이름은 필수 입력입니다.'
        }else if(value.length > 30){
          errorMsg = '이름은 최대 30글자입니다.'
        }
        break;
      case 'tel1' : 
        const telPattern1 = /^[0-9]{3}$/; //연락처 정규식
        if(!telPattern1.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break; 
      case 'tel2' : 
        const telPattern2 = /^[0-9]{3,4}$/; //연락처 정규식
        if(!telPattern2.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break; 
      case 'tel3' : 
        const telPattern3 = /^[0-9]{4}$/; //연락처 정규식
        if(!telPattern3.test(value)){
          errorMsg = '연락처 형식이 맞지 않습니다.'
        }
        break; 
        
    }

    return errorMsg;

  }

  //회원가입 버튼 활성화 여부를 지정하는 state
  const [isDesable, setIsDesable] = useState(true); 

  console.log(info);

  //입력할 때 마다 실행하는 함수
  const handleInfo = (e) => {
    //e -> 이벤트의 모든 정보가 담긴 객체
    const {name, value} = e.target; //구조분해할당

    // //정규식 테스트
    // const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    // const vaild = emailRegex.test(value);
    // console.log(vaild);

    setInfo( prev => ({...prev, /*info의 최신 데이터*/[name] : value})
    )

    //만약 연락처를 변경하고 있다면
    if(name === 'tel1' || name === 'tel2' || name === 'tel3'){
      setInfo( prev => ({...prev, memTel : `${prev.tel1}-${prev.tel2}-${prev.tel3}`}))
    }

    //이메일 변경하고 있다면..
    if(name == 'memEmail'){
      setIsDesable(true);
    }

    //유효성 검사 실행
    const errorMsg = validateField(name, value);

    const keyName = name === 'tel1' || name === 'tel2' || name === 'tel3' ? 'memTel' : name;

    setErrors((prev) => {
      return{
        ...prev,
        [keyName] : errorMsg
      }
    })
    
  }

  //erros 객체의 모든 key에 대한 value가 빈 문자인지 확인하는 코드
  //errors값이 변경되어 리렌더링 됐을때 실행
  useEffect(() => {

    //마운트 시점에는 실행 안함
    if(cnt == 0){
      return;
    }

    //errors 객체의 모든 value가 빈문자인지 확인, -> return true
    const result = Object.values(errors).every(value => value === '');
    console.log(result)

    if(result){
      setIsDesable(false);
    }else{
      setIsDesable(true)
    }

  }, [errors])

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

  //중복확인 버튼을 클릭 시 실행하는 함수
  const checkId = async () => {
    const response = await checkEmail(info.memEmail);
    if(response.data){
      alert('아이디 중복')
    }else{
      alert('아이디 사용 가능')
      setIsDesable(false)
    }
  }

  //주소 검색 팝업에서 주소 선택시 실행하는 함수
  const handleComplete = (data) => {
    //선택한 도로명 주소를 주소 입력창에 세팅
    console.log(data);
    setInfo({...info, memAddr : data.address})
  }

  return (
    <div className={styles.container}>
      <div>
        <p>Email</p>
        <div className={styles.id_div}>
          <Input name='memEmail' value={info.memEmail} onChange={e => handleInfo(e)}/>
          <Button title='중복확인' onClick={checkId}/>
        </div>
        {errors.memEmail && <p className='error'>{errors.memEmail}</p>}
      </div>
      <div>
        <p>Password</p>
        <Input type='password' name='memPw' value={info.memPw} onChange={e => handleInfo(e)}/>
        {errors.memPw && <p className='error'>{errors.memPw}</p>}
      </div>
      <div>
        <p>Confirm Password</p>
        <Input type='password' name='confirmPw' value={info.confirmPw} onChange={e => handleInfo(e)}/>
      </div>
      <div>
        <p>Name</p>
        <Input name='memName' value={info.memName} onChange={e => handleInfo(e)}/>
        {errors.memName && <p className='error'>{errors.memName}</p>}
      </div>
      <div>
        <p>Tel</p>
        <div className={styles.tel_div}>
          <Input name='tel1' value={info.tel1} onChange={handleInfo}/>
          <Input name='tel2' value={info.tel2} onChange={handleInfo}/>
          <Input name='tel3' value={info.tel3} onChange={handleInfo}/>
        </div>
        {errors.memTel && <p className='error'>{errors.memTel}</p>}
      </div>  
      <div>
        <p>Address</p>
        <div className={styles.address_div}>
          <Input readOnly={true} name= 'memAddr' value={info.memAddr} onChange={e => handleInfo(e)} onClick={() => open({ onComplete: handleComplete })}/>
          <Button 
            title='검색' 
            variant='gray' 
            onClick={() => open({ onComplete: handleComplete })}/>
        </div>
        <Input name= 'addrDetail' value={info.addrDetail} onChange={e => handleInfo(e)}/>
      </div>
      <div className={styles.btn_div}>
        <Button title='회원가입' onClick={regInfo} disabled={isDesable}/>
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
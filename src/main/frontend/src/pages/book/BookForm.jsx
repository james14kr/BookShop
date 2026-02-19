import React, { useEffect, useState } from 'react'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import styles from './BookForm.module.css'
import axios from 'axios'
import { selectCate } from '../../api/CategoriesApi'
import { insertBook } from '../../api/bookApi'
import Select from '../../components/common/Select'
import Textarea from '../../components/common/Textarea'

const BookForm = () => {
  //조회한 카테고리 목록 데이터를 저장할 state변수
  const[cateList, setCateList] = useState([]);


  //마운트 시 카테고리 목록 조회
  //useEffect 안의 화살표 함수 앞에는 async 못 붙음!
  useEffect(() => {
    getListData();
  }, [])

  //카테고리 목록 조회 함수
  const getListData = async () => {
    const response = await selectCate();
    setCateList(response.data);
  }

  //Spring으로 전달할 데이터를 저장할 state 변수
  const[bookData, setBookData] = useState ({
    bookTitle : '',
    bookPrice : '',
    author : '',
    bookIntro : '',
    publishDate : '',
    cateNum : '0'
  });

  //선택한 이미지 파일을 저장할 state 변수
  const [mainImg, setMainImg] = useState(null);
  const [subImgs, setSubImgs] = useState(null);

  //유효성 검사 결과 에러 메세지를 저장하는 state변수
  const [errors, setErrors] = useState({
    bookTitle : '',
    bookPrice : '',
    publishDate : '',
    cateNum : '',
    author : '',
    bookIntro: ''
  })

  //유효성 검사 실행 함수
  const validateField = () => {
    //유효성 검사 결과를 표현하는 데이터(true : 모든 유효한 데이터)
    let isvalid = true;

    //최신 에러 메세지를 저장할 변수
    const newErrors = {
      bookTitle : '',
      bookPrice : '',
      publishDate : '',
      cateNum : '',
      author : '',
      bookIntro: ''
    }

    //제목 유효성 검사
    // 1) 제목을 입력하지 않았을 때
    if(bookData.bookTitle === ''){
      newErrors.bookTitle = '도서명은 필수 입력입니다.'
      isvalid = false;
    }
    // 2) 제목이 최대글자 수를 넘겼을 때
    if(bookData.bookTitle.length > 20){
      newErrors.bookTitle = '10글자를 초과할 수 없습니다.'
      isvalid = false;
    }

    //가격 유효성 검사
    // 1) 가격을 입력하지 않았을 때
    if(bookData.bookPrice === ''){
      newErrors.bookPrice = '가격은 필수 입력입니다.'
      isvalid = false;
    }

    // 2) 잘못된 데이터 입력했을 때 (문자x, 0이하)
    if(isNaN(bookData.bookPrice) || Number(bookData.bookPrice) <= 10){
      newErrors.bookPrice = '적합한 데이터가 아닙니다.'
      isvalid = false;
    }

    //cateNum 유효성 검사
    // 1)cateNum이 0일 경우,
    if(bookData.cateNum === '0'){
      newErrors.cateNum = '카테고리는 필수 선택입니다.'
      isvalid = false;
    }

    //publishDate 유효성 검사
    // 1) 날짜 선택
    if(bookData.publishDate === ''){
      newErrors.publishDate = '출판일은 필수항목입니다.'
      isvalid = false;
    }

    //author 유효성 검사
    if(bookData.author === ''){
      newErrors.author = '글쓴이를 입력하세요'
      isvalid = false;
    }

    //bookIntro 유효성 검사
    if(bookData.bookIntro.length < 5){
      newErrors.bookIntro = '5글자 이상 적으시오'
      isvalid = false;
    }

    //위에서 조건에 따라 작성한 최신 에러 메세지를 erros state에 저장
    setErrors(newErrors);
    return isvalid;
  }

  //데이터 입력마다 실행하는 함수
  const handleBookData = (e) => {
    setBookData( (prev) => {
      return{
        ...prev,
        [e.target.name] : e.target.value
      }
    })

    //키 입력시 유효성 검사 결과 나오는 에러메서지를 초기화하는 코드
    if(errors[e.target.name]){
      setErrors((prev) => {
        return{
          ...prev,
          [e.target.name] : ''
        }
      })
    }
  }

  console.log(bookData);

  //도서 등록 버튼 클릭 시 실행 함수
  const regBook = async () => {
    //유효성 검사 실행
    const isValid = validateField();

    if(!isValid){
      return; //더이상 실행 안함
    }

    //입력한 도서 정보 및 첨부파일 정보를 모두 저장할 수 있는 FormData 객체 생성 및 데이터 적재
    const regForm = new FormData(); //모든 정보를 담을 통
    regForm.append('bookTitle', bookData.bookTitle);
    regForm.append('bookPrice', bookData.bookPrice);
    regForm.append('author', bookData.author);
    regForm.append('bookIntro', bookData.bookIntro);
    regForm.append('publishDate', bookData.publishDate);
    regForm.append('cateNum', bookData.cateNum);

    //파일 정보 저장
    regForm.append('mainImg', mainImg);

    //상세 파일들 정보 저장
    //배열 데이터를 전달할 수 없기 때문에, 파일 하나씩 반복해서 적재
    for(const e of subImgs){
      regForm.append('subImgs', e);
    }

    const response =  await insertBook(regForm);

    if(response.status == 201){
      alert('등록 성공')
    }else{
      alert('등록 실패')
    }
  }

  console.log('subImgs : ' , subImgs);

  return (

    <div className={styles.container}>

      <div>
        <p>Book Category</p>
        <Select 
          name='cateNum'
          value={bookData.cateNum}
          onChange={e => handleBookData(e)}>
          <option value='0'>카테고리 선택</option>
          {
            cateList.map( (cate, i) => {
              return(
                <option key={i} value={cate.cateNum}>{cate.cateName}</option>
              )
            })
          }
        </Select>
        {errors.cateNum && <p className='error'>{errors.cateNum}</p>}
      </div>

      <div>
        <p>Book Title</p>
        <Input 
          name='bookTitle'
          value={bookData.bookTitle}
          onChange={e => handleBookData(e)}
        />
        {errors.bookTitle && <p className='error'>{errors.bookTitle}</p>}
      </div>

      <div>
        <div>
          <p>Price</p>
          <Input
            name='bookPrice'
            value={bookData.bookPrice}
            onChange={e => handleBookData(e)}
          />
          {errors.bookPrice && <p className='error'>{errors.bookPrice}</p>}
        </div>
        <div>
          <p>Author</p>
          <Input
            name='author'
            value={bookData.author}
            onChange={e => handleBookData(e)}
          />
          {errors.author && <p className='error'>{errors.author}</p>}
        </div>
      </div>

      <div>
        <p>Introduce</p>
        <Textarea 
          cols={20} rows={5}
          name='bookIntro'
          value={bookData.bookIntro}
          onChange={e => handleBookData(e)}>

        </Textarea>
          {errors.bookIntro && <p className='error'>{errors.bookIntro}</p>}
      </div>

      <div>
        <p>Publish Date</p>
        <Input
            type='date'
            name='publishDate'
            value={bookData.publishDate}
            onChange={e => handleBookData(e)}
          />
          {errors.publishDate && <p className='error'>{errors.publishDate}</p>}
      </div>

      <div>
        <input type="file" 
          //업로드할 파일을 선택할 때 
          onChange={e => {
            //선택한 파일의 이름을 consol에 출력하는 코드
            console.log(e.target.files)
            console.log(e.target.files[0])
            //대표 이미지를 mainImg 변수에 저장
            setMainImg(e.target.files[0])
          }}
        />
      </div>
      <div>
        {/* multiful */}
        <input 
          type="file"
          multiple={true}
          onChange={e => {
            console.log(e.target.files);
            //선택한 모든 파일명을 consol에 출력
            for(let i = 0; i < e.target.files.length; i++){
              console.log(e.target.files[i].name)
            }

            //선택한 파일 전체를 저장할 배열 생성
            const fileArr = [];

            //선택한 파일 수만큼 배열에 파일을 저장
            for(let i = 0; i < e.target.files.length; i++){
              fileArr.push(e.target.files[i]); //i라는 키값의 value를 저장
            }

            setSubImgs(fileArr);

          }}
        />
      </div>

      <div>
        <Button title='도서 등록' onClick={regBook}/>
      </div>
    </div>
  )
}

export default BookForm;

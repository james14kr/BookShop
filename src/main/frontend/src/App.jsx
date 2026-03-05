import { Route, Routes } from 'react-router-dom'
import BasicLayout from './components/layout/BasicLayout'
import ManagerLayout from './components/layout/ManagerLayout'
import Join from './pages/member/Join'
import './reset.css'
import BookList from './pages/book/BookList'
import Login from './pages/member/Login'
import BookForm from './pages/book/BookForm'
import { useState } from 'react'
import BookDetail from './pages/book/BookDetail'
import Cart from './pages/cart/Cart'
import UserLayout from './components/layout/UserLayout'
import MyPage from './pages/member/MyPage'
import BuyList from './pages/buy/BuyList'
import DashBoard from './pages/admin/DashBoard'

/**
 * 루트 컴포넌트 - 전체 라우팅(페이지 이동) 구조 정의
 *
 * [중첩 라우트(Nested Route) 패턴]
 *  - 바깥 Route : 레이아웃 컴포넌트 (공통 Header, Sidebar 포함)
 *  - 안쪽 Route : 실제 콘텐츠 페이지 컴포넌트
 *  - 바깥 레이아웃의 <Outlet/> 자리에 안쪽 페이지가 렌더링됨
 *  - 안쪽 Route의 path에는 '/' 사용 안 함 (바깥 path와 자동으로 합쳐짐)
 *
 * [레이아웃 구조]
 *  BasicLayout  : Header + <Outlet/>
 *  ManagerLayout: ManagerHeader + ManageSide + <Outlet/>
 *  UserLayout   : Header + UserSide + <Outlet/>
 *
 * [loginInfo 상태 관리]
 *  - sessionStorage에서 초기값 읽어옴 (페이지 새로고침 시 로그인 유지)
 *  - setLoginInfo를 Header, Login 컴포넌트에 prop으로 전달
 *  - 로그인 시: setLoginInfo({memEmail, memName, memRole}) → Header 버튼 변경
 *  - 로그아웃 시: setLoginInfo({}) → sessionStorage 삭제 → Header 버튼 원복
 */
function App() {

  // sessionStorage에서 로그인 정보 초기화
  // { memEmail, memName, memRole } 또는 null
  const [loginInfo, setLoginInfo] = useState(
    JSON.parse(sessionStorage.getItem("loginInfo"))
  );

  return (
    <>
      <Routes>
        {/* ── BasicLayout: 일반 회원 접근 영역 (Header만 표시) ── */}
        <Route path='/' element = {<BasicLayout setLoginInfo ={setLoginInfo}/>}>
          <Route path='' element = {<BookList/>}/>              {/* 메인 - localhost:5173 */}
          <Route path='join' element = {<Join/>}/>             {/* 회원가입 - /join */}
          <Route path='login' element = {<Login setLoginInfo={setLoginInfo}/>}/> {/* 로그인 - /login */}
          <Route path="books/:bookNum" element={<BookDetail />} /> {/* 도서 상세 - /books/:bookNum */}
        </Route>

        {/* ── ManagerLayout: 매니저 권한 접근 영역 (ManagerHeader + ManageSide) ── */}
        <Route path='/manage' element = {<ManagerLayout setLoginInfo = {setLoginInfo}/>}>
          <Route path='book-form' element = {<BookForm/>}/>    {/* 도서 등록 - /manage/book-form */}
          <Route path='dashBoard' element = {<DashBoard/>}/>   {/* 관리자 홈 - /manage/dashBoard */} 
        </Route>

        {/* ── UserLayout: 로그인 사용자 영역 (Header + UserSide 사이드 메뉴) ── */}
        <Route path='/user' element={<UserLayout setLoginInfo={setLoginInfo}/>}>
          <Route path='cart' element={<Cart/>}/>               {/* 장바구니 - /user/cart */}
          <Route path='buyList' element={<BuyList/>}/>         {/* 구매내역 - /user/buyList */}
          <Route path='mypage' element={<MyPage/>}/>           {/* 마이페이지 - /user/mypage */}
        </Route>

      </Routes>
    </>
  )
}

export default App

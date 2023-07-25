import React from 'react';
import {Routes,Route,Navigate} from 'react-router-dom';
import {NoticeList} from '../pages/notice/NoticeList';
import {NoticeDetail} from '../pages/notice/NoticeDetail'
import {NoticeWrite} from '../pages/notice/NoticeWrite'
import {NoticeModify} from '../pages/notice/NoticeModify'

// Router의 역할 이란? 

export const Router:React.FC = () =>{
    return( // 보여줄 화면 리턴 
      <div className='wrap'>
        <Routes>
          <Route path='/' element={<Navigate to='/notice'></Navigate>}/> 
          <Route path='/notice'>
            <Route path='' element={<NoticeList />} />
            <Route path='detail' element={<NoticeDetail />} />
            <Route path='write' element={<NoticeWrite />} />
            <Route path='detail/modify' element={<NoticeModify />} />
          </Route>
        </Routes>
      </div>
    )
  }
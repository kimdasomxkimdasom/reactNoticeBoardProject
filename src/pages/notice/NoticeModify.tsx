import React from 'react';
import {NoticeModifyContentComponent} from '../../components/notice/modify/NoticeModifyContentComponent'

export const NoticeModify:React.FC = () =>{
    return(
      <div className='notice-modify-wrap'>
        <h1>공지사항 수정</h1>
        <NoticeModifyContentComponent />
      </div>
    )
  }
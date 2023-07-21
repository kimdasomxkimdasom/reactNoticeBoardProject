import React from 'react';
import {NoticeWriteContentComponent} from '../../components/notice/write/NoticeWriteContentComponent';

export const NoticeWrite:React.FC = () =>{
    return(
      <div className='notice-wirte-wrap'>
        <h1>공지사항 등록</h1>
        <NoticeWriteContentComponent />
      </div>
    )
  }
import React from 'react';
import {NoticeDetailContentComponent} from '../../components/notice/detail/NoticeDetailContentComponent';

export const NoticeDetail:React.FC = () =>{
    return(
        <div className='notice--wrap'>
          <h1>공지사항 상세</h1>
          <NoticeDetailContentComponent />
        </div>
      )
  }
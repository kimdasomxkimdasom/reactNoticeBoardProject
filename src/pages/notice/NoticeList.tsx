import React from 'react';
import {NoticeListSearchComponent} from '../../components/notice/list/NoticeListSearchComponent';
import {NoticeListTableComponent} from '../../components/notice/list/NoticeListTableComponent';

export const NoticeList:React.FC = () =>{
    return(
      <div className='notice-list-wrap'>
        <h1>공지사항 목록</h1>
        <NoticeListSearchComponent />
        <NoticeListTableComponent />
      </div>
    )
  }
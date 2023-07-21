import React from 'react';

// 공지사항 목록 검색
export const NoticeListSearchComponent:React.FC = () => {

    // 검색 API 호출
    const doSearch = () => {
        alert('검색 !')
    }

    return (
      <div className='notice-list-searach'>
        <input type="text" id="searchInputBox" placeholder='검색'></input>
        <button type="button" onClick={doSearch}>검색</button>
      </div>
    )
  }
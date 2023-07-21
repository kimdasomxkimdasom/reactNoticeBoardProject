import React from 'react';
import { useNavigate } from 'react-router';

// 공지사항 수정 컴포넌트
export const NoticeModifyContentComponent:React.FC = () => {

    const navigate = useNavigate(); 

    // 뒤로가기
    const goBack = () => {
        alert('뒤로가기 !')
        navigate('/notice/detail');
        // navigate(-1); 
        // 이전 페이지로 이동
    }

    // 삭제 API 호출
    const doDelete = () => {
        alert('삭제 !')
    }

    // 수정 API 호출
    const doModify = () => {
        alert('수정 !')
    }

    return (
      <>
      <div className='notice-write-content'>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
                <th>
                    구분
                </th>
                <td>
                    <label><input type="radio" name="is_option" value="PC" />PC웹</label>
	                <label><input type="radio" name="is_option" value="WEB" />APP</label>
                </td>
            </tr>
            <tr>
                <th>
                    제목
                </th>
                <td>
                    <input type='text' name='title' id='title' required/>
                </td>
            </tr>
            <tr>
                <th>
                    내용
                </th>
                <td>
                    <input type='text' name='content' id='content' required/>
                </td>
            </tr>
            <tr>
                <th>
                    전시여부
                </th>
                <td>
                    <label><input type="radio" name="is_open" value="Y" />전시</label>
	                <label><input type="radio" name="is_open" value="N" />미전시</label>
                </td>
            </tr>
            <tr>
                <th>
                    상단여부
                </th>
                <td>
                    <label><input type="radio" name="is_top" value="Y" />전시</label>
	                <label><input type="radio" name="is_top" value="N" />미전시</label>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='notice-write-btn'>
        <button type="button" onClick={goBack}>뒤로가기</button>
        <button type="button" onClick={doDelete}>삭제</button>
        <button type="button" onClick={doModify}>수정</button>
      </div>
      </>
    )
  }
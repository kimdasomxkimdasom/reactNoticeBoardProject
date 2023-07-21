import React from 'react';
import { useNavigate } from 'react-router';

// 공지사항 등록 내용 컴포넌트
export const NoticeWriteContentComponent:React.FC = () => {

    const navigate = useNavigate(); 

    // 뒤로가기
    const goBack = () => {
        alert('뒤로가기 !')
        navigate('/notice');
        // navigate(-1); 
        // 이전 페이지로 이동
    }

    // 등록 API 호출
    const doWrite = () => {
        alert('등록 !')
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
        <button type="button" onClick={doWrite}>등록</button>
      </div>
      </>
    )
  }
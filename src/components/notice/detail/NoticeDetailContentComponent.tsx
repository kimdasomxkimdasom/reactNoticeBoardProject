import React from 'react';
import { useNavigate } from 'react-router';

// 공지사항 상세 내용 컴포넌트
export const NoticeDetailContentComponent:React.FC = () => {

    const navigate = useNavigate(); 

    // 수정페이지 이동
    const goModify = () => {
        alert('이동 !')
        navigate('/notice/modify');
    }

    return (
      <>
      <div className='notice-detail-content'>
        <table>
          <thead>
          </thead>
          <tbody>
            <tr>
                <th>
                    구분
                </th>
                <td>
                    PC웹
                </td>
            </tr>
            <tr>
                <th>
                    제목
                </th>
                <td>
                    공지사항 제목
                </td>
            </tr>
            <tr>
                <th>
                    내용
                </th>
                <td>
                    공지사항 내용
                </td>
            </tr>
            <tr>
                <th>
                    전시여부
                </th>
                <td>
                    전시
                </td>
            </tr>
            <tr>
                <th>
                    상단여부
                </th>
                <td>
                    고정
                </td>
            </tr>
            <tr>
                <th>
                    등록자(아이디)
                </th>
                <th>
                    등록일시
                </th>
                <td>
                    김등록(AEND1234)
                </td>
                <td>
                    2023.08.29 14:45
                </td>
            </tr>
            <tr>
                <th>
                    수정자(아이디)
                </th>
                <th>
                    수정일시
                </th>
                <td>
                    -
                </td>
                <td>
                    -
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='notice-write-btn'>
        <button type="button" onClick={goModify}>수정하기</button>
      </div>
      </>
    )
  }
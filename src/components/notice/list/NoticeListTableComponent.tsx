import React from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import {noticeListAPI} from '../../../states/noticeSelector';
import {noticeListType} from '../../../types/notice/NoticeType';
import axios from 'axios';

// 공지사항 리스트 컴포넌트
export const NoticeListTableComponent:React.FC = () => {
    const navigate = useNavigate(); 
    /**
     * useNavigate()를 호출해서 주소 전달
     * 
     * React Router의 useNavigate 훅을 사용하여 라우팅을 제어할 수 있다.
     * useNavigate 훅을 사용하면 컴포넌트 내에서 다른 경로로 이동 및 라우팅을 변경할 수 있다.
     */

    const noticeListRes = useRecoilValue(noticeListAPI);    // 공지사항 리스트 API 호출
    const noticeList = noticeListRes.data.companyNoticeList;    // 공지사항 리스트 API 호출
    const noticeListLength = noticeListRes.data.totalCount; // 공지사항 리스트 갯수
    
    console.log(noticeListRes.data);

    // 등록 페이지 이동
    const goWrite = () => {
      alert('이동 !');
      navigate('/notice/write');
      /**
       * useNavigate() 를 호출하여, navigate 변수에 할당하고 
       * 버튼을 클릭시 goWrite 함수 실행 -> navigate 함수 사용해 경로로 이동
       */
    }

    // 상세 페이지 이동
    const goDetail = (companyNoticeSeq: number) => {
      alert(`${companyNoticeSeq} 로 이동 !`);
      navigate(`detail?companyNoticeSeq=${companyNoticeSeq}`);
    }

    // https://jsonplaceholder.typicode.com/ 
    // Fake API

    // http://192.168.1.60:18040/swagger-ui/index.html#

    // const headers = {
    //   'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
    //   'companySeq': '1',
    //   'userSeq': '1',
    // };

    // axios.get('http://192.168.1.60:18040/operation-settings/company-notices?startPage=1&pageLength=50' , {headers})
    //   .then(response => {
    //   // 요청 성공 시 처리
    //   console.log(response.data);
    // })
    //   .catch(error => {
    //   // 요청 실패 시 처리
    //   console.error(error);
    // });
  
    return (
      <>
      <div className='notice-list'>
        <table>
          <thead style={{ fontWeight: 'bold' }}>
            <tr>
              <td width="10%">No</td>
              <td width="50%">제목</td>
              <td width="10%">상단여부</td>
              <td width="10%">등록자</td>
              <td width="20%">등록일시</td>
            </tr>
          </thead>

          <tbody>
            {noticeListLength !== 0 ? (
              noticeList.map((item:noticeListType,index: number)=>{
                const isNoticeTopNm = item.isNoticeTop === 'Y' ? '고정' : '미고정'; // 상단여부
                const companyNoticeSeq = item.companyNoticeSeq;

                return(
                  <tr>
                    <td>{item.no}</td>
                    <td>
                      <button type='button' onClick={()=>{goDetail(companyNoticeSeq)}}>{item.title}</button>
                    </td>
                    <td>{isNoticeTopNm}</td>
                    <td>{item.regUserSeq}</td>
                    <td>{item.regDatetime}</td>
                 </tr>
                );
              }) 
            ) : (
            <tr>
              <td colSpan={3}>등록된 공지사항이 없습니다.</td>
            </tr>
            )}
          </tbody>

        </table>
      </div>
      <div className='notice-list-write'>
          <button type='button' onClick={goWrite}>공지 등록</button>
      </div>
      </>
    )
    
  }
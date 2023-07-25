import axios from 'axios';
import React, { useEffect, startTransition } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { NoticeDetailSeqAtom } from '../../../states/noticeAtom';
import { noticeInfoAPI } from '../../../states/noticeSelector';

// 공지사항 상세 내용 컴포넌트
export const NoticeDetailContentComponent:React.FC = () => {
    const navigate = useNavigate(); 

    /**
     * useLocation() : 현재 URL경로, 검색 매개변수, 해수 등 정보 제공
     */
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const companyNoticeSeq = params.get("companyNoticeSeq");

    const noticeDetail = useRecoilValueLoadable(noticeInfoAPI);
    
    /**
     * useRecoilState() : 
     * 상태(atom)값 읽고 업데이트 하기 위함
     * Recoil에서 정의한 상태 값을 React 컴포넌트에서 쉽게 사용가능 
     */
    const [detailSeq, setDetailSeq] = useRecoilState(NoticeDetailSeqAtom);

    /**
     * useEffect() : 데이터 가져오기, 구독(subscription), DOM 직접 조작
     */
    useEffect(()=>{
        if(typeof companyNoticeSeq === 'string'){
          setDetailSeq(companyNoticeSeq); // NoticeDetailSeqAtom 값 변경
        }
    },[setDetailSeq, companyNoticeSeq, detailSeq]); // setDetailSeq, companyNoticeSeq, DetailSeq 값이 변경될때마다 재랜더링

    if (noticeDetail.state === 'loading') { // 로딩 상태
        return <div>Loading...</div>;
    }

    if (noticeDetail.state === 'hasError') { // 오류 상태
        throw noticeDetail.contents;
    }

    const keywords = noticeDetail.contents.data.companyNoticeInfo.keywords;
    const joinedKeywords = keywords.join(','); // "1,2,3"
    const splitKeywords = joinedKeywords.split(','); // ["1", "2", "3"]

    // 파일 다운로드
    const doDownload = async() =>{
        const noticeDetailFileNum = noticeDetail.contents.data.companyNoticeInfo.fileList[0].attachedFileSeq;
        const noticeDetailFileName = noticeDetail.contents.data.companyNoticeInfo.fileList[0].originalFileName;

        try{
            // 해당 경로의 API get 요청
            // responseType: 'blob'로 설정 ==> Binary Large Object : 바이너리 데이터
            const response = await axios.get(`http://192.168.1.60:18040/file/download?attachedFileSeq=${noticeDetailFileNum}&isSelf=false`,{ responseType: 'blob'});

            if(response.status === 200){
                const url = window.URL.createObjectURL(new Blob([response.data])); // response.data 담은 url 생성
                const link = document.createElement('a'); // link 상수에 a Element 선언 
                link.href = url;
                link.setAttribute('download', noticeDetailFileName); // noticeDetailFileName 이름을 가진 download 속성 값 설정
                document.body.appendChild(link); // 바디 요소의 끝에 link 생성
                link.click();
            } else{
                return;
            }
        }
            catch(error){
            console.log(error);
        }

      }

    // 수정페이지 이동
    const goModify = () => {
        alert(`${companyNoticeSeq} 로 이동 !`);
        navigate(`modify?companyNoticeSeq=${companyNoticeSeq}`);
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
                    {noticeDetail.contents.data.companyNoticeInfo.companyNoticeDivision}
                </td>
            </tr>
            <tr>
                <th>
                    제목
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.title}
                </td>
            </tr>
            <tr>
                <th>
                    내용
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.content}
                </td>
            </tr>
            <tr>
                <th>
                    전시여부
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.isOpen === 'Y' ? (
                      <span>전시</span>
                    ) : (
                      <span>미전시</span>
                    )}
                </td>
            </tr>
            <tr>
                <th>
                    상단여부
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.isNoticeTop === 'Y' ? (
                      <span>상단 전시</span>
                    ) : (
                      <span>상단 미전시</span>
                    )}
                </td>
            </tr>
            <tr>
                <th>
                    키워드 1
                </th>
                <td>
                    {splitKeywords[0]}
                </td>
            </tr>
            <tr>
                <th>
                    키워드 2
                </th>
                <td>
                    {splitKeywords[1]}
                </td>
            </tr>
            <tr>
                <th>
                    키워드 3
                </th>
                <td>
                    {splitKeywords[2]}
                </td>
            </tr>
            <tr>
                <th>
                    키워드 4
                </th>
                <td>
                    {splitKeywords[3]}
                </td>
            </tr>
            <tr>
                <th>
                    키워드 5
                </th>
                <td>
                    {splitKeywords[4]}
                </td>
            </tr>
            <tr>
                <th>
                    파일여부
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.fileList != null ? (
                      <span>
                           {noticeDetail.contents.data.companyNoticeInfo.fileList[0].originalFileName}
                           <button type="button" onClick={doDownload}>파일다운</button>
                        </span>
                    ) : (
                      <span> X </span>
                    )}
                </td>
            </tr>
            <tr>
                <th>
                    등록자(아이디)
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.regUserSeq}
                </td>
            </tr>
            <tr>
                <th>
                    등록일시
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.regDatetime}
                </td>
            </tr>
            <tr>
                <th>
                    수정자(아이디)
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.modUserSeq}
                </td>
            </tr>
            <tr>
                <th>
                    수정일시
                </th>
                <td>
                    {noticeDetail.contents.data.companyNoticeInfo.modDatetime}
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='notice-write-btn'>
        <button type="submit" onClick={goModify}>수정하기</button>
      </div>
      </>
    )
  }
import axios, { AxiosRequestConfig } from 'axios';
import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilRefresher_UNSTABLE } from 'recoil';
import { noticeListAPI } from '../../../states/noticeSelector';
import { noticeWriteType } from '../../../types/notice/NoticeType';

// 키워드 객체 구조 정의 
interface KeywordFormState {
    keywordOne: string;
    keywordTwo: string;
    keywordThree: string;
    keywordFour: string;
    keywordFive: string;
}

// 공지사항 등록 내용 컴포넌트
export const NoticeWriteContentComponent:React.FC = () => {
    
    const navigate = useNavigate(); // 페이지 이동을 위한

    /**
     * 
     * useRecoilRefresher_UNSTABLE : 안전한 기능이 아니고 실험 중인 기능 (UNSTABLE)
     * Recoil 상태를 리프레쉬
     * 
     */
    const listRefresh = useRecoilRefresher_UNSTABLE(noticeListAPI); // noticeListAPI 재호출을 위한

    // 오른쪽 set~ 을 통하여 값 재정의 
    const [companyNoticeDivision, setCompanyNoticeDivision] = useState<string[]>([]);  // 구분 빈 배열 정의
    const [title, setTitle] = useState('');                                            // 제목 빈문자열 정의
    const [content, setContent] = useState('');                                        // 내용 빈문자열 정의
    const [isOpen, setIsOpen] = useState<string>('Y');                                 // 전시여부 초기값 = 'Y' 정의
    const [isNoticeTop, setIsNoticeTop] = useState<string>('N');                       // 상단전시여부 초기값 = 'N' 정의
    const [keywordsArray, setKeywordsArray] = useState<KeywordFormState>({             // 키워드 빈 배열 및 문자열 배열 정의
        keywordOne: '',
        keywordTwo: '',
        keywordThree: '',
        keywordFour: '',
        keywordFive: '',
    });
    const [multipartFile, setmultipartFile] = useState<File | null>(null);             // 첨부파일 빈 값 정의

    const companyNoticeDivisionHandler = (e:React.ChangeEvent<HTMLInputElement>) => {  // 구분 핸들러 ( PC웹 : PC , APP : APP )
        const { value } = e.target;
        setCompanyNoticeDivision((prevCompanyNoticeDivision) => {
            if (prevCompanyNoticeDivision.includes(value)) {
                // 이미 선택되어 있던 옵션을 해제할 때
                return prevCompanyNoticeDivision.filter((companyNoticeDivision) => companyNoticeDivision !== value);
            } else {
                // 새로운 옵션을 추가할 때
                return [...prevCompanyNoticeDivision, value];
            }
        });
    };

    const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => { // 제목 핸들러
        setTitle(e.target.value);
    };

    const onChangeContent = (e:React.ChangeEvent<HTMLTextAreaElement>) => { // 내용 핸들러
        setContent(e.target.value);
    };

    const isOpenHandler = (e:React.ChangeEvent<HTMLInputElement>) => { // 전시여부 핸들러 ( 전시 : Y , 미전시 : N )
        setIsOpen(e.target.value);
    };

    const isNoticeTopHandler = (e:React.ChangeEvent<HTMLInputElement>) => { // 상단 전시 여부 핸들러 ( 전시 : Y , 미전시 : N )
        setIsNoticeTop(e.target.value);
    };

    const onChangeKeywords = (e: React.ChangeEvent<HTMLInputElement>) => { // 키워드 핸들러 
        const { name, value } = e.target;
        setKeywordsArray((prevKeywordsArray: any) => ({
            ...prevKeywordsArray,
            [name]: value,
        }));
    };
    
    const handleUpload = (e:React.ChangeEvent<HTMLInputElement> ) => { // 첨부파일 핸들러
        if(e.target.files !== null){
            setmultipartFile(e.target.files[0]); // 첨부파일에 값 등록
        }
    };

    // 등록 API 호출
    const doWrite = async() =>{
        if(!window.confirm("등록 하시겠습니까?")){
            return;
        }

        if (title.trim() === '') {
            alert('제목을 입력해주세요!');
            return;
        }
        if (content.trim() === '') {
            alert('내용을 입력해주세요!');
            return;
        }

        // keywords 객체를 배열로 변환
        const keywords = Object.values(keywordsArray);
        
        const strCompanyNoticeDto:noticeWriteType = {
            title , 
            content, 
            // companyNoticeDivision,
            isOpen, 
            isNoticeTop, 
            keywords
        };
        
        const data = new FormData(); // 폼 전송데이터 생성
        data.append('strCompanyNoticeDto', JSON.stringify(strCompanyNoticeDto)); // JSON으로 변경하여 전송할 데이터 추가
    
        if(multipartFile){
            data.append('multipartFile', multipartFile); // 전송할 파일 추가
        }

        try {
            const headers: AxiosRequestConfig['headers'] = {
            'Content-Type': 'multipart/form-data',
            'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
            'companySeq': '1',
            'userSeq': '1',
            }

            // POST 등록 요청 
            const response = await axios.post(`http://192.168.1.60:18040/operation-settings/company-notice`, data, {headers}); 
        
            if(response.status === 200){
                alert('등록 성공!');
                navigate('/notice');
                listRefresh(); // noticeListAPI 재호출
                
            } else{
                alert('등록 실패!');
                console.log(response);
                return;
            }
            
        } catch (error) {
            console.log(error);
        }
      
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
                    <label><input type='checkbox' name='companyNoticeDivision' value='PC' checked={companyNoticeDivision.includes('PC')} onChange={companyNoticeDivisionHandler} />PC웹</label>
	                <label><input type='checkbox' name='companyNoticeDivision' value='APP' checked={companyNoticeDivision.includes('APP')} onChange={companyNoticeDivisionHandler} />APP</label>
                </td>
            </tr>
            <tr>
                <th>
                    제목
                </th>
                <td>
                    <input type='text' name='title' id='title' value={title} onChange={onChangeTitle} required/>
                </td>
            </tr>
            <tr>
                <th>
                    내용
                </th>
                <td>
                    <textarea name='content' id='content' value={content} onChange={onChangeContent} required></textarea>
                </td>
            </tr>
            <tr>
                <th>
                    전시여부
                </th>
                <td>
                    <label><input type='radio' name='isOpen' value='Y' checked={isOpen === 'Y'}  onChange={isOpenHandler} />전시</label>
	                <label><input type='radio' name='isOpen' value='N' checked={isOpen === 'N'}  onChange={isOpenHandler} />미전시</label>
                </td>
            </tr>
            <tr>
                <th>
                    상단여부
                </th>
                <td>
                    <label><input type='radio' name='isNoticeTop' value='Y' checked={isNoticeTop === 'Y'}  onChange={isNoticeTopHandler} />상단 전시</label>
	                <label><input type='radio' name='isNoticeTop' value='N' checked={isNoticeTop === 'N'}  onChange={isNoticeTopHandler}  />상단 미전시</label>
                </td>
            </tr>
            <tr>
                <th>
                    키워드 1
                </th>
                <td>
                    <input type='text' name='keywordOne' id='keywordOne' value={keywordsArray.keywordOne} onChange={onChangeKeywords}/>
                </td>
            </tr>
            <tr>
                <th>
                    키워드 2
                </th>
                <td>
                    <input type='text' name='keywordTwo' id='keywordTwo' value={keywordsArray.keywordTwo} onChange={onChangeKeywords}/>
                </td>
            </tr>
            <tr>
                <th>
                    키워드 3
                </th>
                <td>
                    <input type='text' name='keywordThree' id='keywordThree' value={keywordsArray.keywordThree} onChange={onChangeKeywords}/>
                </td>
            </tr>
            <tr>
                <th>
                    키워드 4
                </th>
                <td>
                    <input type='text' name='keywordFour' id='keywordFour' value={keywordsArray.keywordFour} onChange={onChangeKeywords}/>
                </td>
            </tr>
            <tr>
                <th>
                    키워드 5
                </th>
                <td>
                    <input type='text' name='keywordFive' id='keywordFive' value={keywordsArray.keywordFive} onChange={onChangeKeywords}/>
                </td>
            </tr>
            <tr>
                <th>
                    파일첨부
                </th>
                <td>
                    <input type='file' name='file' id='file' onChange={handleUpload} accept='image/*'></input>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='notice-write-btn'>
        <button type='button' onClick={()=>{navigate(-1)}}>뒤로가기</button>
        <button type='submit' onClick={doWrite}>등록</button>
      </div>
      </>
    )
  }
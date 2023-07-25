import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValueLoadable } from 'recoil';
import { NoticeDetailSeqAtom } from '../../../states/noticeAtom';
import { noticeInfoAPI, noticeListAPI } from '../../../states/noticeSelector';
import { noticeModifyType, noticeWriteType } from '../../../types/notice/NoticeType';

interface KeywordFormState {
    keywordOne: string;
    keywordTwo: string;
    keywordThree: string;
    keywordFour: string;
    keywordFive: string;
}

// 공지사항 수정 컴포넌트
export const NoticeModifyContentComponent:React.FC = () => {
    const navigate = useNavigate();

    const listRefresh = useRecoilRefresher_UNSTABLE(noticeListAPI); // noticeListAPI 재호출을 위한
    const detailRefresh = useRecoilRefresher_UNSTABLE(noticeInfoAPI); // noticeInfoAPI 재호출을 위한

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const companyNoticeSeq = params.get("companyNoticeSeq"); // url에서 companyNoticeSeq 가져오기
    
    const noticeDetail = useRecoilValueLoadable(noticeInfoAPI);
    
    const [detailSeq, setDetailSeq] = useRecoilState(NoticeDetailSeqAtom);

    const [companyNoticeDivision, setCompanyNoticeDivision] = useState<string[]>([]); // 구분선택 배열
    const [title, setTitle] = useState('');     // 제목 
    const [content, setContent] = useState(''); // 내용 
    const [isOpen, setIsOpen] = useState<string>('Y');           // 전시여부
    const [isNoticeTop, setIsNoticeTop] = useState<string>('N'); // 상단전시여부
    const [keywordsArray, setKeywordsArray] = useState<KeywordFormState>({  // 키워드 배열
        keywordOne: '',
        keywordTwo: '',
        keywordThree: '',
        keywordFour: '',
        keywordFive: '',
    });
    const [multipartFile, setmultipartFile] = useState<File | null>(null); // 새로운 첨부파일 
    const [delFileSeqs, setDelFileSeqs] = useState<string[]>([]); // 삭제할 파일 seq
    const [orgFileSeq, setOrgFileSeq] = useState('');   // 오리지널 첨부 파일 seq
    const [orgFileName, setOrgFileName] = useState(''); // 오리지널 첨부 파일 name

    const companyNoticeDivisionHandler = (e:React.ChangeEvent<HTMLInputElement>) => { // 구분 핸들러 ( PC웹 : PC , APP : APP )
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

    const onChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) => {     // 제목 핸들러
        setTitle(e.target.value);
    };

    const onChangeContent = (e:React.ChangeEvent<HTMLTextAreaElement>) => { // 내용 핸들러
        setContent(e.target.value);
    };
    
    const isOpenHandler = (e:React.ChangeEvent<HTMLInputElement>) => {   // 전시여부 핸들러 ( 전시 : Y , 미전시 : N )
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
            setmultipartFile(e.target.files[0]);
            setDelFileSeqs([orgFileSeq]);
        }
    };

    useEffect(()=>{
        if(typeof companyNoticeSeq === 'string'){

          setDetailSeq(companyNoticeSeq); // NoticeDetailSeqAtom 값 변경
          
          if (noticeDetail.state === 'hasValue') { // 값이 있으면 
            const { title, content, isOpen, isNoticeTop, keywords, fileList } = noticeDetail.contents.data.companyNoticeInfo;

            if(fileList != null){
                console.log(fileList[0])

                setOrgFileSeq(fileList[0].attachedFileSeq)
                setOrgFileName(fileList[0].originalFileName)
            }
            
            const joinedKeywords = keywords.join(','); // "1,2,3"
            const splitKeywords = joinedKeywords.split(','); // ["1", "2", "3"]
            
            setTitle(title);
            setContent(content);
            setIsOpen(isOpen);
            setIsNoticeTop(isNoticeTop);

            setKeywordsArray({
                keywordOne: splitKeywords[0],
                keywordTwo: splitKeywords[1],
                keywordThree: splitKeywords[2],
                keywordFour: splitKeywords[3],
                keywordFive: splitKeywords[4],
            });

          }
        }
      },[setDetailSeq, companyNoticeSeq, detailSeq, noticeDetail]); // setDetailSeq, seq, DetailSeq, noticeDetail 값이 변경될때마다 재랜더링

    if (noticeDetail.state === 'loading') { // 로딩 상태
        return <div>Loading...</div>;
    }

    if (noticeDetail.state === 'hasError') { // 오류 상태
        throw noticeDetail.contents;
    }
    
    // 수정 API 호출
    const doModify = async () => {
        
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
        
        const strCompanyNoticeDto:noticeModifyType = {
            title , 
            content, 
            // companyNoticeDivision,
            isOpen, 
            isNoticeTop, 
            keywords,
            delFileSeqs
        };
        
        const data = new FormData();
        data.append('strCompanyNoticeDto', JSON.stringify(strCompanyNoticeDto));
        
        if(multipartFile){
            data.append('multipartFile', multipartFile);
        }
        
        console.log("JSON "+JSON.stringify(strCompanyNoticeDto))

        if(!window.confirm("수정 하시겠습니까?")){
            return;
        }
        
        try {

            const headers: AxiosRequestConfig['headers'] = {
            'Content-Type': 'multipart/form-data',
            'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
            'companySeq': '1',
            'userSeq': '1',
            }

            // PUT 수정 요청
            const response = await axios.put(`http://192.168.1.60:18040/operation-settings/company-notice/${companyNoticeSeq}`, data, {headers}); 
            console.log(response)

            if(response.status === 200){
                alert('수정 성공!')
                detailRefresh(); 
                navigate('/notice'); 
                listRefresh(); // noticeListAPI 재호출
                
            } else{
                alert('수정 실패!')
                console.log(response);
                return;
            }
            
        } catch (error) {
            console.log(error);
        }
        
    }
    
    // 삭제 API 호출
    const doDelete = async() =>{ 
        if(!window.confirm("삭제 하시겠습니까?")){
            return;
        }
        
        try{
            const headers: AxiosRequestConfig['headers'] = {
                'Content-Type': 'multipart/form-data',
                'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
                'companySeq': '1',
                'userSeq': '1',
            }
            
            // DELETE 삭제 요청
            const response = await axios.delete(`http://192.168.1.60:18040/operation-settings/company-notice/${companyNoticeSeq}`, {headers}); 
            if(response.status === 200){
                alert('삭제 성공!')
                navigate('/notice'); 
                listRefresh(); // noticeListAPI 재호출
                
            } else {
                alert('삭제 실패!')
                console.log(response);
                return;
            }
        }
        catch(error){
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
	                <label><input type='radio' name='isNoticeTop' value='Y' checked={isNoticeTop === 'N'}  onChange={isNoticeTopHandler} />상단 미전시</label>
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
                    {noticeDetail.contents.data.companyNoticeInfo.fileList != null ? (
                    <>
                        <input type='hidden' name='orgFileSeq' id='orgFileSeq' value={orgFileSeq} />
                        <input type='hidden' name='orgFileName' id='orgFileName' value={orgFileName} />
                        <span>기존 파일 이름 : {noticeDetail.contents.data.companyNoticeInfo.fileList[0].originalFileName}</span>
                    </>
                    ) : (
                    <span></span>
                    )}
                </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='notice-write-btn'>
        <button type="button" onClick={()=>{navigate(-1)}}>뒤로가기</button>
        <button type="submit" onClick={doDelete}>삭제</button>
        <button type="submit" onClick={doModify}>수정</button>
      </div>
      </>
    )
  }

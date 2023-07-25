import React from 'react';
import ReactDOM from 'react-dom/client';
import {RecoilRoot} from 'recoil';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';

// index.html div id=root
const root = ReactDOM.createRoot( // 렌더링 할 루트를 생성해준다 => 루트는 리액트 애플리케이션을 브라우저의 DOM에 렌더링하는 시작점
  document.getElementById('root') as HTMLElement // id가 'root'인 DOM 요소를 가져온다. 
);
root.render( // root 객체에 대해서 리액트 애플리케이션을 랜더링
  <React.StrictMode>  {/* React 엄격모드 활성화 : 개발 환경에서 추가적인 검사와 경고를 활성화하여 애플리케이션의 잠재적인 문제를 조기에 감지하는 데 도움을 준다.*/}
    <RecoilRoot>  {/* Recoil 전역상태관리 라이브러리 : Recoil을 사용하기 위해 전역 상태를 초기화하고 관리하는 역할 */}
        <BrowserRouter> {/* URL경로에 맞게 페이지를 보여주는 라우팅 기능 */}
          <App /> {/* 초기 index page 컴포넌트 즉, 메인 컴포넌트 */}
        </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

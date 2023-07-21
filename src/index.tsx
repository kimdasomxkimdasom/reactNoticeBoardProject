import React from 'react';
import ReactDOM from 'react-dom/client';
import {RecoilRoot} from 'recoil';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';

// index.html div id=root
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // 각 기능 공부 하기 
  <React.StrictMode>  {/* React 엄격모드 활성화 */}
    <RecoilRoot>  {/* Recoil 전역상태관리 라이브러리 */}
        <BrowserRouter> {/* URL경로에 맞게 페이지를 보여주는 컴포넌트 */}
          <App /> {/* 초기 index page 컴포넌트 */}
        </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);

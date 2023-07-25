import axios from 'axios';
import { selector } from "recoil";
import { NoticeDetailSeqAtom } from './noticeAtom';

/**
 * Recoil ?
 * 상태 관리 라이브러리로, React 애플리케이션에서 전역 상태를 관리하기 위해 사용됩니다. 
 * Recoil을 사용하면 상태를 읽고 쓸 수 있는 Atoms과 이를 결합하여 파생된 상태를 만들 수 있는 Selectors를 정의할 수 있습니다.
 * 
 * selector 함수는 Recoil에서 파생된 상태를 정의하는 함수입니다. selector 함수는 key, get 등의 속성을 가집니다.
 * key: 파생된 상태를 식별하는 고유한 문자열 키입니다.
 * get: 파생된 상태를 가져오는 비동기 함수를 정의합니다. 이 함수 내에서 다른 Atoms의 값을 가져와서 사용할 수 있습니다
 */


// NoticeListAPI
export const noticeListAPI = selector({
    key: 'noticeListAPI',
    get: async ({ get }) => {

        const headers = {
            'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
            'companySeq': '1',
            'userSeq': '1',
        };

        const response = await axios.get('http://192.168.1.60:18040/operation-settings/company-notices?startPage=1&pageLength=50'
            , { headers })
        return response.data;
    },
});

// NoticeInfoAPI
export const noticeInfoAPI = selector({
    key: 'noticeInfoAPI',
    get: async ({ get }) => {

        const headers = {
            'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
            'companySeq': '1',
            'userSeq': '1',
        };

        const response = await axios.get(`http://192.168.1.60:18040/operation-settings/company-notice/${get(NoticeDetailSeqAtom)}`
            , { headers })
        return response.data;
    },
});




















// NoticeListAPI
export const noticeListAPITest = selector({
    key: 'noticeListAPITest',
    get: async ({ get }) => {
      try {

        const headers = {
            'x-token': '9BDCAB0E12144F97936BDDF3F7127D76', 
            'companySeq': '1',
            'userSeq': '1',
        };

        const response = await axios.get('http://192.168.1.60:18040/operation-settings/company-notices?startPage=1&pageLength=50'
            , { headers });
        // 성공한 경우, 응답 데이터를 반환합니다.
        return response.data;

      } catch (error) {
        // 실패한 경우, 에러를 처리하거나 기본값을 반환할 수 있습니다.
        console.error('API 호출에 실패했습니다.', error);
        return [];
      }
    },
});
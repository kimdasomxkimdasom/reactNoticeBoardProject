import React from "react";
import { atom } from "recoil";

// 공지사항리스트 API companyNoticeSeq 구분값
export const NoticeDetailSeqAtom = atom<string>({
    key:'NoticeDetailSeq',
    default:'0'
  });
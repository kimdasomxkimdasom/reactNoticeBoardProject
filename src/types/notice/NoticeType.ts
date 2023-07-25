// noticeList API Type선언
export type noticeListType = {
    no:number,
    companyNoticeSeq: number,
    title: string,
    regDatetime:string,
    hasFile:boolean,
    isNoticeTop:string,
    isOpen:string,
    regUserSeq:number,
  }

// noticeWrite 컴포넌트 Type선언
export type noticeWriteType = {
  title: string,
  content:string,
  // companyNoticeDivision:string[],
  isOpen:string,
  isNoticeTop:string,
  keywords:string[],
}

// noticeModify 컴포넌트 Type선언
export type noticeModifyType = {
  title: string,
  content:string,
  // companyNoticeDivision:string[],
  isOpen:string,
  isNoticeTop:string,
  keywords:string[],
  delFileSeqs:string[],
}
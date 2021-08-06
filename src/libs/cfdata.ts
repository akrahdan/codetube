
declare global {
  interface Window { CFDATA: any; }
  
}

const getCFDATA = () =>
  (typeof window !== 'undefined' && window.CFDATA) || ({} as any);


export const cfdata = getCFDATA()

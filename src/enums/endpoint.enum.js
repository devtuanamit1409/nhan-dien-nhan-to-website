const BASE_URL = process.env.NEXT_PUBLIC_URL_BE;
export const ENDPOINT = {
  GET_50_QUESTIONS: `${BASE_URL}/api/trac-nghiem-50-caus`,
  GET_HOME: `${BASE_URL}/api/home`,
  GET_TINH_CACH: `${BASE_URL}/api/nhom-tinh-caches`,
  GET_FOOTER: `${BASE_URL}/api/footers`,
  GET_CAU_HOI_DANG_2: `${BASE_URL}/api/trac-nghiem-dang-2s`,
  GET_PAGE_DANG_2: `${BASE_URL}/api/page-trac-nghiem-dang-2`,
  GET_ANSWERS: `${BASE_URL}/api/trac-nghiem-50-cau/get-answer-types`,
  THONG_TIN_UNG_VIEN: `${BASE_URL}/api/thong-tin-ung-viens`,
  GET_ANSWERS_TYPE_2: `${BASE_URL}/api/cau-hoi-dang-2/get-answer-types`,
};

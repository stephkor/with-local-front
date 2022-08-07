const ERROR_400 =
  "요청으로 전달한 데이터의 형식이 유효하지 않습니다. 다시 시도해주세요.";
const ERROR_401 = "인증이 유효하지 않거나 만료되었습니다. 다시 로그인해주세요.";
const ERROR_403 = "요청에 대한 권한이 없습니다.";
const ERROR_404 = "요청에 대한 응답을 찾을 수 없습니다. 다시 시도해주세요.";
const ERROR_500 = "서버 에러가 발생했습니다. 관리자에게 문의하세요.";
const ERROR_UNKNOWN = "예상하지 못한 오류가 발생했습니다. 다시 시도해주세요.";
const TOKEN_EXPIRED = "토큰이 만료되었습니다. 다시 로그인하세요.";

const messages: { [key: string]: string } = {
  "400": ERROR_400,
  "401": ERROR_401,
  "403": ERROR_403,
  "404": ERROR_404,
  "500": ERROR_500,
  UNKNOWN: ERROR_UNKNOWN,
};

export default messages;

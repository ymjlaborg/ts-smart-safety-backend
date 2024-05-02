export const ERROR_CODES = {
  AUTH_NO_ENTERED: {
    CODE: 1010,
    MESSAGE: '아이디 또는 비밀번호가 입력되지 않았습니다.',
  },
  AUTH_NOT_FOUND_OFFICE: {
    CODE: 1011,
    MESSAGE: '존재하지 않는 검사소입니다.',
  },
  AUTH_NOT_MATCH: {
    CODE: 1012,
    MESSAGE: '아이디 또는 비밀번호가 일치하지 않습니다.',
  },
  AUTH_DUPLICATE_WORKER: {
    CODE: 1015,
    MESSAGE: '동일한 작업자 아이디가 존재합니다.',
  },
  AUTH_NO_ACCESS_TOKEN: {
    CODE: 1020,
    MESSAGE: '접근 토큰이 없습니다.',
  },
  AUTH_EXPIRED_ACCESS_TOKEN: {
    CODE: 1021,
    MESSAGE: '접근 토큰의 기간이 만료되었습니다.',
  },
  AUTH_NO_REFRESH_TOKEN: {
    CODE: 1022,
    MESSAGE: '갱신 토큰이 없습니다.',
  },
  AUTH_EXPIRED_REFRESH_TOKEN: {
    CODE: 1021,
    MESSAGE: '갱신 토큰의 기간이 만료되었습니다.',
  },
  AUTH_UNAUTHORIZED: {
    CODE: 1030,
    MESSAGE: '접근 권한이 없습니다.',
  },
  AUTH_BAD_API_KEY: {
    CODE: 1040,
    MESSAGE: 'API키가 올바르지 않습니다.',
  },
  DEVICE_TOKEN_NO: {
    CODE: 2010,
    MESSAGE: '디바이스 토큰이 없습니다.',
  },
  DEVICE_TOKEN_DUPLICATED: {
    CODE: 2020,
    MESSAGE: '동일한 디바이스 토큰있습니다.',
  },
  COURSE_NO: {
    CODE: 4010,
    MESSAGE: '등록된 업무 진로가 없습니다.',
  },
  COURSE_VALID: {
    CODE: 4020,
    MESSAGE: '올바르지 않는 업무 진로입니다.',
  },
  ALARM_NO: {
    CODE: 3010,
    MESSAGE: '존재하지 않는 알림입니다.',
  },
  COMMON_NOT_FOUND: {
    CODE: 9404,
    MESSAGE: '존재하지 않는 API 경로입니다.',
  },
  COMMON_INTERNAL_SERVER: {
    CODE: 9500,
    MESSAGE: '서버 오류가 발생하였습니다.',
  },
};

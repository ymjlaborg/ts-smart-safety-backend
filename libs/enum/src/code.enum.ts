/**
 * 노드 타입
 */
export enum NodeType {
  MonitoringNode = 0, // 모니터링 노드
  ControlNode = 1, // 제어 노드
}

/**
 * 노드 값 형태
 */
export enum NodeValue {
  Numberic = 0, // 숫자형
  Character = 1, // 문자형
}

/**
 * 작업자 상태
 */
export enum WorkerStatus {
  Use = 1, // 사용 중
  Deleted = 99, // 삭제
}

/**
 * 경고 단계
 */
export enum AlertLevel {
  Normal = 0, // 보통
  Caution = 1, // 주의
  Warning = 2, // 경고
}

/**
 * 알림 구분
 */
export enum AlertType {
  CarCrash = 0, // 차량 충돌
  StopLine = 1, // 정지선
  AbnormalBehavior = 2, // 이상행동
  Fire = 3, // 화재
  DangerZone = 4, // 위험구역진입
  Exit = 5, // 출구
  Gas = 6, // 가스
  PM = 7, // 미세먼지 / 초미세먼지
  LowTemperature = 8, // 낮은 기온
  HighTemperature = 9, // 높은 기온
}

export enum EntranceType {
  Entrance = 0, // 입구
  Exit = 1, // 출구
}

/**
 * true / false
 */
export enum Yn {
  N = 0, // false
  Y = 1, // true
}

/**
 * 토큰 서비스 구분
 */
export enum TokenServiceName {
  Worker = 'worker', // 작업자 알림 시스템
  Hr = 'hr', // 작업자 관리
  Control = 'control', // 통합 관제
  Waiting = 'waiting', // 대기실
}

/**
 * 토큰 타입
 */
export enum TokenType {
  Access = 1, // AccessToken
  Refresh = 2, // RefreshToken
}

export enum EventName {
  ControlAlert = 'control.alert',
  WorkerPush = 'worker.push',
  FireAlert = 'fire.alert',
}

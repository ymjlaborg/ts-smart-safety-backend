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

export enum WorkerStatus {
  Use = 1, // 사용 중
  Deleted = 99, // 삭제
}

/**
 * true / false
 */
export enum Yn {
  N = 0, // false
  Y = 1, // true
}

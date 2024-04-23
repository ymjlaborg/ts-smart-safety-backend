import { Yn } from '@app/enum';
import { ApiProperty } from '@nestjs/swagger';

class CourseDto {
  @ApiProperty({
    name: '노드 데이터',
    type: Number,
  })
  courseID: number;
  @ApiProperty({
    name: '노드 데이터',
  })
  courseName: string;
  @ApiProperty({
    name: '노드 데이터',
  })
  entranceType?: Yn = null;
}

export class NodeDataDto {
  @ApiProperty({
    name: '노드 데이터',
  })
  nodeDataID: number;
  @ApiProperty({
    name: '노드 데이터',
  })
  value: string;
  @ApiProperty({
    name: '노드 데이터',
  })
  lTime: Date;
  @ApiProperty({
    name: '노드 데이터',
  })
  nodeID: string;
  @ApiProperty({
    name: '노드 데이터',
  })
  nodeName: string;
  @ApiProperty({
    name: '노드 데이터',
  })
  course: CourseDto;
}

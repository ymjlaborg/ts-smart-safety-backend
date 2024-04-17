import { CourseDto } from './course.dto';

export class OfficeDto {
  officeID: number;
  officeName: string;
  courses: CourseDto[];
}

import { CourseDto } from './course.dto';

export class OfficeDto {
  officeID: number;
  officeName: string;
  officePw?: string;
  courses: CourseDto[];
}

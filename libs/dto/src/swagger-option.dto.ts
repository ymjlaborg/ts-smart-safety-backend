/**
 * Swagger Option dto
 *
 * @author Bart
 * @version 1.0
 */
export interface SwaggerOptionDto {
  title: string;
  description: string;
  version?: string | null;
  tag?: string | null;
  path?: string | null;
}

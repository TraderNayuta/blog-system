import { BaseDto } from 'src/common.dto';

export class postDto extends BaseDto {
  title: string;
  content: string;
  categoryIdList: string[];
  tagIdList: string[];
}

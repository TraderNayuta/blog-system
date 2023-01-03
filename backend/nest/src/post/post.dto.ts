import { BaseDto } from 'src/common.dto';

export class PostDto extends BaseDto {
  title: {
    zh: string;
    en: string;
  };
  content: string;
  categoryIdList: string[];
  tagIdList: string[];
}

import { BaseDto } from 'src/common.dto';

export class PostDto extends BaseDto {
  zhTitle: string;
  enTitle: string;
  categories: number[];
  tags: number[];
  zhContent: string;
  enContent: string;
}

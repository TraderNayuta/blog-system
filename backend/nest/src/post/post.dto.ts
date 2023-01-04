import { BaseDto } from 'src/common.dto';
import { PostStatus } from 'src/common.type';

export class PostDto extends BaseDto {
  zhTitle?: string;
  enTitle?: string;
  categories?: number[];
  tags?: number[];
  zhContent?: string;
  enContent?: string;
  status?: PostStatus;
}

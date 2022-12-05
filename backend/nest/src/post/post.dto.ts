import { Base } from 'src/common.dto';

export class postDto extends Base {
  title: string;
  content: string;
  categoryIdList: string[];
  tagIdList: string[];
}

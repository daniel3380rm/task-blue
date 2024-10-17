import {
  PipeTransform,
  Injectable,
  BadRequestException,
  ArgumentMetadata,
} from '@nestjs/common';
import { isValidObjectId } from '../validators/is-object-id.validator';

@Injectable()
export class ObjectIdPipe implements PipeTransform<string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(
        `${metadata.data} must be a valid ObjectId`,
      );
    }
    return value;
  }
}

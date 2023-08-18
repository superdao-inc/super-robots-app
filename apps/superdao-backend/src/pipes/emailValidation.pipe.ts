import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validateAndNormalizeEmail } from 'src/utils/validation/validateAndNormalizeEmail';

/*
 * This pipe is used to validate and normalize email addresses
 */
@Injectable()
export class EmailValidationPipe implements PipeTransform {
	transform(value: string | null, _metadata: ArgumentMetadata) {
		return validateAndNormalizeEmail(value);
	}
}

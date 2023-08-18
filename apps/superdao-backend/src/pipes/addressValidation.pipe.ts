import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validateAndNormalizeAddress } from 'src/utils/validation/validateAndNormalizeAddress';

/*
 * This pipe is used to validate and normalize wallet address
 */
@Injectable()
export class AddressValidationPipe implements PipeTransform {
	transform(value: string, _metadata: ArgumentMetadata) {
		return validateAndNormalizeAddress(value);
	}
}

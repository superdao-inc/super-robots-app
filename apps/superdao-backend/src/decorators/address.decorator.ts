import { registerDecorator, ValidationOptions } from 'class-validator';
import { isAddress as isEthersAddress } from 'ethers/lib/utils';

export function IsAddress(validationOptions?: ValidationOptions) {
	return (object: Object, propertyName: string) => {
		registerDecorator({
			name: 'IsAddress',
			target: object.constructor,
			propertyName,
			options: validationOptions,
			validator: {
				validate(value: any) {
					return typeof value === 'string' && isEthersAddress(value);
				},
				defaultMessage(args) {
					return `${args?.property} must be an ethers address`;
				}
			}
		});
	};
}

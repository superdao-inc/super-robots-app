import { AppError as AppErrorBase } from '@sd/errors';
import { toast } from 'src/components/toast/toast';

export class AppError extends AppErrorBase {
	static display(appError: AppError): void {
		toast.error(appError.options.description || appError.message);
	}
}

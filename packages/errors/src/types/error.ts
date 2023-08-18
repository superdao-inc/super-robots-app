import { type AxiosError } from 'axios';
import { type SetRequired } from 'type-fest';

export type AnyError = Error & Record<string, any>;
export type StrictAxiosError = SetRequired<AxiosError, 'request' | 'response'>;

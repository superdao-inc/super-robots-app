import { createContext } from 'react';

export type EmailSettingsContextValue = {
	nextAttemptToSendEmail?: number;
};

export const EmailSettingsContext = createContext<EmailSettingsContextValue>({});

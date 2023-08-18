import { isString } from '@sd/superdao-shared';
import { toUrlWithProtocol } from 'src/utils/urls';

const LONG_TEXT_BREAKPOINT = 600;

/**
 * Returns true if the passed value is a non-empty string, otherwise - false.
 * @param value
 */
export const getIsValueProvided = (value?: string | number | readonly string[] | undefined) =>
	isString(value) && value.trim().length !== 0;

export const isTextLimitAvailable = (text: string, maxLines: number) => {
	const lines = text.split('\n');
	const notEmptyLines = lines.map((l) => l.trim()).filter(Boolean);

	return notEmptyLines.length > maxLines || text.length > LONG_TEXT_BREAKPOINT;
};

export const formatText = (text: string) => {
	return formatLinksToMarkdown(text);
};

const formatLinksToMarkdown = (text: string) => {
	const availableDomainZones = ['com', 'co', 'org', 'ru', 'net', 'io'];

	const processItem = (item: string) => {
		try {
			const validUrl = toUrlWithProtocol(item);
			const urlData = new URL(validUrl);

			const hasValidZone = availableDomainZones.some((zone) => urlData.hostname.endsWith(`.${zone}`));
			if (!hasValidZone) return item;

			return `[${item}](${validUrl})`;
		} catch (e) {
			return item;
		}
	};

	const result = text.split(' ').map(processItem).join(' ');
	return result.split(`\n`).map(processItem).join(`\n`);
};

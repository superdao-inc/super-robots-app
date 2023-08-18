import { DateTime, Interval } from 'luxon';

export const dateToIntervalPreview = (date: DateTime, locale = 'en') => {
	const interval = Interval.fromDateTimes(date, DateTime.now());
	if (!interval.isValid) return '';

	if (interval.length('days') >= 1) {
		return date.toLocaleString({ month: 'short', day: 'numeric' }, { locale });
	}

	const duration = interval.toDuration(['hours', 'minutes', 'seconds']).toObject();

	for (const [key, value] of Object.entries(duration)) {
		if (value > 0) {
			return `${Math.floor(value)}${key.substring(0, 1)}`;
		}
	}

	return '';
};

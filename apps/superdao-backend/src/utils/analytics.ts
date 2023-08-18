export const getAnalyticsFormattedIP = (ip?: string): string | null => {
	try {
		if (!ip) return null;

		const formattedIp = ip.substring(0, 7) == '::ffff:' ? ip.substring(7) : ip; // ::ffff:127.0.0.1 => 127.0.0.1

		return formattedIp;
	} catch (error) {
		return null;
	}
};

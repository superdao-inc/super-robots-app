declare module '*module.css' {
	const styles: {
		[className: string]: string;
	};
	export default styles;
}

declare module '@analytics/session-utils';
declare module '@analytics/google-tag-manager';

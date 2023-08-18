import React, { Fragment } from 'react';
import { MarkdownToJSX } from 'markdown-to-jsx';

export const markdownConfig: MarkdownToJSX.Options = {
	forceBlock: true,
	disableParsingRawHTML: true,
	createElement: (type, props, children) => {
		const allowedElements = ['p', 'strong', 'ol', 'li'];

		// @ts-ignore
		if (allowedElements.includes(type)) {
			return React.createElement(type, { ...props }, children);
		}

		if (type === 'a') {
			return (
				// @ts-ignore
				<a key={props.key} href={props.href || ''} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		}

		if (type === 'img') {
			return React.createElement('p', { ...props }, (props as any).alt);
		}

		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}
};

export const tierDescriptionMarkdownConfig: MarkdownToJSX.Options = {
	forceBlock: true,
	disableParsingRawHTML: true,
	createElement: (type, props, children) => {
		const allowedElements = ['p', 'strong', 'em', 'ol', 'ul', 'li'];

		// @ts-ignore
		if (allowedElements.includes(type)) {
			return React.createElement(type, { ...props }, children);
		}

		if (type === 'a') {
			// @ts-ignore
			const url = props.href || '';

			return (
				<a key={props.key} href={url} className={`text-accentPrimary`} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		}

		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment key={props.key}>{children}</Fragment>;
	}
};

export const markdownOfferConfig: MarkdownToJSX.Options = {
	forceBlock: true,
	disableParsingRawHTML: true,
	createElement: (type, props, children) => {
		const allowedElements = ['p', 'strong', 'ol', 'li'];

		// @ts-ignore
		if (allowedElements.includes(type)) {
			return React.createElement(type, { ...props }, children);
		}

		if (type === 'a') {
			return (
				// @ts-ignore
				<a key={props.key} href={props.href || ''} target="_blank" rel="noopener noreferrer">
					{children}
				</a>
			);
		}

		if (type === 'img') {
			return (
				<p>
					<img alt={(props as any).alt} src={(props as any).src} style={{ maxHeight: 400 }} />
				</p>
			);
		}

		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <>{children}</>;
	}
};

export const forOwnersInfoMarkdownConfig: MarkdownToJSX.Options = {
	forceBlock: true,
	disableParsingRawHTML: true,
	createElement: (type, props, children) => {
		const allowedElements = ['p', 'strong', 'em', 'ol', 'ul', 'li'];

		// @ts-ignore
		if (allowedElements.includes(type)) {
			return React.createElement(type, { ...props }, children);
		}

		if (type === 'a') {
			// @ts-ignore
			const url = props.href || '';

			return (
				<a
					key={props.key}
					href={url}
					className={`text-accentPrimary font-semibold`}
					target="_blank"
					rel="noopener noreferrer"
				>
					{children}
				</a>
			);
		}

		// eslint-disable-next-line react/jsx-no-useless-fragment
		return <Fragment key={props.key}>{children}</Fragment>;
	}
};

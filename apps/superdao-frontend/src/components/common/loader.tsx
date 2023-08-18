import React, { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

type TypedSizes = 'sm' | 'md' | 'lg' | 'xl';

type LoaderSize = TypedSizes | string;

type LoaderColor = 'light' | 'dark' | string;

type LoaderProps = HTMLAttributes<HTMLDivElement> & {
	size?: LoaderSize;
	color?: LoaderColor;
};

const loaderSizes: Record<LoaderSize, string> = {
	sm: '14',
	md: '16',
	lg: '22',
	xl: '32',
	xxl: '44'
};

export const Loader: React.FC<LoaderProps> = ({ size = 'md', color = 'dark', ...props }) => (
	<LoaderElement size={loaderSizes[size] ?? +size} color={color} {...props} />
);

const loaderBg = (fillColor: string) => css`
	background-image: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16 1C16 0.447715 15.5518 -0.00325819 15.0006 0.0312288C11.8055 0.231135 8.73516 1.386 6.19349 3.35752C3.38777 5.53385 1.38573 8.58168 0.50267 12.021C-0.380388 15.4602 -0.0942827 19.0956 1.31593 22.3544C2.72613 25.6132 5.18031 28.3103 8.29194 30.0209C11.4036 31.7315 14.9958 32.3585 18.5029 31.803C22.0101 31.2475 25.2328 29.5412 27.6635 26.9528C30.0942 24.3643 31.5948 21.0408 31.929 17.5057C32.2317 14.3033 31.5616 11.0921 30.0184 8.2873C29.7521 7.80343 29.1312 7.66667 28.6649 7.9626V7.9626C28.1986 8.25853 28.064 8.87498 28.3259 9.36122C29.6337 11.7893 30.1988 14.5571 29.9379 17.3175C29.6455 20.4107 28.3324 23.3188 26.2056 25.5837C24.0787 27.8486 21.2588 29.3416 18.1901 29.8276C15.1213 30.3137 11.9781 29.7651 9.25545 28.2683C6.53278 26.7715 4.38537 24.4115 3.15143 21.5601C1.9175 18.7086 1.66716 15.5277 2.43984 12.5183C3.21251 9.50897 4.9643 6.84212 7.4193 4.93783C9.61016 3.23843 12.25 2.23248 15.0008 2.03569C15.5517 1.99628 16 1.55228 16 1V1Z' fill='${encodeURIComponent(
		fillColor
	)}'/%3E%3C/svg%3E%0A");
`;

const LoaderElement = styled.div<LoaderProps>`
	@keyframes rotate {
		100% {
			transform: rotate(360deg);
		}
	}

	animation: rotate 1s linear infinite;
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
	background-repeat: no-repeat;
	background-size: cover;
	${({ color }) =>
		loaderBg(
			(() => {
				if (color === 'light' || !color) return '#FFF';
				if (color === 'dark') return '#717A8C';
				return color;
			})()
		)}
`;

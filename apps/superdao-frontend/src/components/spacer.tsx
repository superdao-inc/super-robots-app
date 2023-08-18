import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Spacer = styled.div<{ width?: number; height?: number }>`
	flex-shrink: 0;
	flex-grow: 0;

	${(props) => {
		const { width = 0, height = 0 } = props;

		return css`
			width: ${width}px;
			height: ${height}px;
		`;
	}}
`;

import React from 'react';
import styled from '@emotion/styled';
import { Label } from './input';

type Props = {
	label: string;
	children: React.ReactNode;
};

export const LabelWrapper: React.FC<Props> = ({ label, children }) => (
	<Wrapper>
		<Label>{label}</Label>
		{children}
	</Wrapper>
);

const Wrapper = styled.label`
	width: 100%;
	position: relative;
`;

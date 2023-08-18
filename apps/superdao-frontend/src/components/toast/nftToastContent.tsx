import { MouseEventHandler } from 'react';

import styled from '@emotion/styled';
import { colors } from 'src/style/variables';
import { Body, Label1 } from 'src/components/text';

export type NftToastContentProps = {
	title: string;
	description?: string;
	actionProps?: ActionProps;
};

export type ActionProps = {
	title: string;
	onClick: MouseEventHandler<HTMLElement>;
};

export const NftToastContent = (props: NftToastContentProps) => {
	const { title, description, actionProps } = props;

	return (
		<Content>
			<Label1 color={colors.foregroundPrimary}>{title}</Label1>
			{description && <Description color={colors.foregroundPrimary}> {description}</Description>}
			{actionProps && <Action {...actionProps} />}
		</Content>
	);
};

const Content = styled.div`
	display: flex;
	align-items: center;
`;

const Description = styled(Body)`
	margin-left: 8px;
`;

const Action = (props: ActionProps) => {
	const { title, onClick } = props;

	return (
		<ActionWrapper>
			<Separator />
			<StyledLabel onClick={onClick} color={colors.accentPrimary}>
				{title}
			</StyledLabel>
		</ActionWrapper>
	);
};

const ActionWrapper = styled.div`
	margin-left: 16px;

	display: flex;
	align-items: center;
`;

const Separator = styled.div`
	height: 24px;
	width: 1px;
	display: inline-block;

	opacity: 0.16;
	background-color: ${colors.foregroundPrimary};
`;

const StyledLabel = styled(Label1)`
	display: inline-block;
	margin-left: 16px;
	cursor: pointer;
`;

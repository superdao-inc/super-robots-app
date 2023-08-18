import styled from '@emotion/styled';

import { HTMLAttributes } from 'react';
import { colors } from 'src/style';
import { WithChildren } from 'src/types/type.utils';

const StyledText = styled.span<{ color?: string }>`
	font-style: normal;
	color: ${(props) => props.color || colors.foregroundPrimary};
	display: block;

	margin: 0;
	padding: 0;
`;

export const StyledDisplayFont = styled(StyledText)`
	font-family: 'Archivo', sans-serif;
`;

const StyledTextFont = styled(StyledText)`
	font-family: 'Space Mono', monospace;
`;

export const ModalTitle = (props: WithChildren<HTMLAttributes<HTMLSpanElement>>) => {
	return <StyledDisplayFont {...props} className={`mb-2 text-2xl font-black ${props.className}`} />;
};

export const ModalText = (props: WithChildren<HTMLAttributes<HTMLSpanElement>>) => {
	return (
		<StyledTextFont
			{...props}
			className={`text-foregroundPrimary/70 text-[17px] leading-[28px] md:text-[18px] md:leading-[32px] ${props.className}`}
		/>
	);
};

export const NewTitle1 = styled(StyledDisplayFont)`
	font-size: 32px;
	line-height: 40px;
	font-weight: 900;
`;

export const Title1 = styled(StyledDisplayFont)`
	font-size: 24px;
	line-height: 32px;
	font-weight: 700;
`;

export const Title2 = styled(StyledDisplayFont)`
	font-size: 20px;
	line-height: 28px;
	font-weight: 700;
`;

export const NewTitle2 = styled(StyledDisplayFont)`
	font-size: 16px;
	line-height: 24px;
	font-weight: 500;
`;

export const MonospaceTitle2 = styled(StyledTextFont)`
	font-size: 20px;
	line-height: 28px;
	font-weight: 700;
`;

export const Title3 = styled(StyledTextFont)`
	font-size: 17px;
	line-height: 24px;
	font-weight: 700;
`;

export const Title4 = styled(StyledTextFont)`
	font-size: 18px;
	line-height: 32px;
	font-weight: 400;
`;

export const NewLabel1 = styled(StyledTextFont)`
	font-size: 16px;
	line-height: 24px;
	font-weight: 300;
`;

export const Label1 = styled(StyledTextFont)`
	font-size: 15px;
	line-height: 24px;
	font-weight: 600;
`;

export const Label2 = styled(StyledTextFont)`
	font-size: 14px;
	line-height: 20px;
	font-weight: 600;
`;

export const Label3 = styled(StyledTextFont)`
	font-size: 11px;
	line-height: 17px;
	font-weight: 500;
`;

export const Label4 = styled(StyledTextFont)`
	font-size: 17px;
	line-height: 24px;
	font-weight: 600;
`;

export const Label5 = styled(StyledTextFont)`
	font-size: 18px;
	line-height: 28px;
	font-weight: 600;
`;

export const Label6 = styled(StyledTextFont)`
	font-size: 20px;
	line-height: 24px;
	font-weight: 500;
`;

export const Article1 = styled(StyledTextFont)`
	font-size: 36px;
	line-height: 48px;
	font-weight: 700;
`;

export const Article2 = styled(StyledTextFont)`
	font-size: 28px;
	line-height: 40px;
	font-weight: 700;
`;

export const Display1 = styled(StyledTextFont)`
	font-size: 36px;
	line-height: 44px;
	font-weight: 700;
`;

export const Display2 = styled(StyledTextFont)`
	font-size: 28px;
	line-height: 34px;
	font-weight: 700;
`;

export const Display3 = styled(StyledTextFont)`
	font-size: 17px;
	line-height: 28px;
	font-weight: 400;
`;

export const Display4 = styled(StyledTextFont)`
	font-size: 20px;
	line-height: 28px;
	font-weight: 400;
`;

export const NewBody = styled(StyledTextFont)`
	font-size: 12px;
	line-height: 18px;
	font-weight: 400;
`;

export const Body = styled(StyledTextFont)`
	font-size: 15px;
	line-height: 24px;
	font-weight: 400;
`;

export const SubHeading = styled(StyledTextFont)`
	font-size: 14px;
	line-height: 20px;
	font-weight: 400;
`;

export const Headline = styled(StyledTextFont)`
	font-weight: 600;
	font-size: 15px;
	line-height: 21px;
`;

export const Caption = styled(StyledTextFont)`
	font-size: 13px;
	line-height: 18px;
	font-weight: 400;
`;

export const Detail = styled(StyledTextFont)`
	font-size: 10px;
	line-height: 12px;
	font-weight: 700;
`;

export const Ellipsis = styled.div<{ shouldNotWidth?: boolean }>`
	white-space: nowrap;
	width: ${(props) => !props.shouldNotWidth && '100%'};
	overflow: hidden;
	text-overflow: ellipsis;
`;

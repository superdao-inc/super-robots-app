import styled from '@emotion/styled';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { MagicIcon } from 'src/components';
import { colors } from 'src/style';

type Props = {
	src: string | undefined;
	isLoading: boolean;
	defaultSrc?: string;
};

export const RobotImage = (props: Props) => {
	const { src, isLoading, defaultSrc = '/assets/robot-example.jpg' } = props;

	const showPreview = !src;

	const { t } = useTranslation();

	return (
		<div className="relative">
			<Glow className="hidden lg:block" />
			<Border className="mx-auto sm:min-h-[400px] sm:w-[400px] lg:mx-0">
				<Wrapper className={cn('relative w-full transition-all sm:w-[400px]')}>
					<img src={src ?? defaultSrc} className="block h-auto w-full" />
					{showPreview && (
						<div className="z-1 text-foregroundPrimary absolute top-1/2 left-0 right-0 m-auto flex w-full max-w-[320px] -translate-y-1/2 flex-col items-center text-center">
							<MagicIcon fill={colors.foregroundSecondary} />
							<span className="w-[260px] pt-4">{t('features.babyRobots.robotPreviewText')}</span>
						</div>
					)}
					{isLoading}
				</Wrapper>
			</Border>
		</div>
	);
};

const Border = styled.div`
	background: linear-gradient(144.34deg, #c9ff31 2.02%, #8fff00 94.22%);
	border-radius: 24px;
	padding: 4px;
	position: relative;
	max-width: 100%;
`;

const Glow = styled.div`
	background: #8efe00;
	opacity: 0.6;
	filter: blur(80px);
	position: absolute;
	width: 250px;
	height: 250px;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

const Wrapper = styled.div`
	max-width: 100%;
	filter: drop-shadow(0px 10px 30px rgba(0, 0, 0, 0.25));
	border-radius: 20px;
	overflow: hidden;
`;

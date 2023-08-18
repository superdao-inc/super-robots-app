import { useTranslation } from 'next-i18next';
import styled from '@emotion/styled';

import { Label1 } from 'src/components/text';
import { colors } from 'src/style';
import { howToOpensea } from 'src/constants';
import { HintIcon } from 'src/components/assets/icons/hint';
import { openExternal } from 'src/utils/urls';

export const HowToNftButton = ({ className }: { className?: string }) => {
	const { t } = useTranslation();

	const handleOpenHowTo = () => {
		openExternal(howToOpensea);
	};

	return (
		<OpenHowTo className={className} onClick={handleOpenHowTo}>
			<StyledHintIcon />
			{t('modals.nft.newNft.howToOpensea')}
		</OpenHowTo>
	);
};

const OpenHowTo = styled(Label1)`
	display: flex;
	align-items: center;

	color: ${colors.foregroundSecondary};
	cursor: pointer;
	transition: color 300ms;

	&:hover {
		color: ${colors.accentPrimary};

		svg path {
			fill: ${colors.accentPrimary};
		}
	}
`;

const StyledHintIcon = styled(HintIcon)`
	margin-right: 8px;

	path {
		transition: fill 300ms;
	}
`;

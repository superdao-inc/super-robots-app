import { css } from '@emotion/react';
import { colors } from 'src/style';

export const datepickerStyle = css`
	.react-datepicker {
		border: unset;
		background: unset;

		&__month {
			margin: 0;
			margin-top: 6px;
		}

		&__header {
			color: ${colors.foregroundPrimary};
			border-bottom: unset;
			background: ${colors.backgroundSecondary};
			padding: 0;
		}

		&__current-month {
			width: max-content;
			color: ${colors.foregroundPrimary};
			background: ${colors.overlayTertiary};
			padding: 8px 12px;
			font-size: 14px;
			line-height: 20px;
			border-radius: 8px;
			margin: auto;
			margin-bottom: 20px;
		}

		&__navigation {
			top: 10px;
			display: flex;
			align-items: center;
			justify-content: center;

			&-icon {
				width: 24px;
				height: 24px;

				&--next::before {
					left: 3px;
					width: 12px;
					height: 12px;
				}

				&--previous::before {
					right: 3px;
					width: 12px;
					height: 12px;
				}
			}
		}

		&__day {
			width: 32px;
			height: 32px;
			color: ${colors.foregroundSecondary};
			display: inline-flex;
			align-items: center;
			justify-content: center;
			transition: 0.2s;
			margin: 2px 6px;

			&-name {
				width: 32px;
				height: 32px;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				color: ${colors.foregroundPrimary};
				margin: 2px 6px;
			}

			&-names {
				padding: 10px 0;
			}

			&:hover {
				transition: 0.2s;
				background: ${colors.overlaySecondary};
			}

			&--disabled {
				opacity: 0.2;

				&:hover {
					background: unset;
				}
			}

			&--outside-month {
				opacity: 0.2;
			}

			&--keyboard-selected {
				background: unset;
			}

			&--selected {
				transition: 0.2s;
				background: ${colors.accentPrimary};
				color: ${colors.foregroundPrimary};

				&:hover {
					background: ${colors.accentPrimary};
					color: ${colors.foregroundPrimary};
				}
			}
		}
	}
`;

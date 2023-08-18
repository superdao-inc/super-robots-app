import formData from 'form-data';
import Mailgun from 'mailgun.js';
import Client from 'mailgun.js/dist/lib/client';
import { Injectable } from '@nestjs/common';
import chunk from 'lodash/chunk';
import pick from 'lodash/pick';

import throttle from 'lodash/throttle';
import { CustomLogger } from '@dev/nestjs-common';
import { config } from 'src/config';

import { generateWhitelistEmailClaimTemplate, WhitelistEmailClaimType } from './templates/whitelistEmailClaim';
import { BuyNftSuccessEmailProps, generateBuyNftSuccessTemplate } from './templates/buyNftSuccess';
import { generateNftSuccessTemplate, NftSuccessEmailProps } from './templates/nftSuccess';
import { generateWhitelistEmailTemplate, WhitelistEmailProps } from './templates/whitelistEmail';
import { AdminEmailProps, generateAdminEmailTemplate } from './templates/adminEmail';
import {
	EmailConfirmationOptions,
	EmailPayload,
	UsersErc721MintParamsMap,
	UsersRewardMintParamsMap,
	UsersWalletAddressesMap,
	UsersWelcomeParamsMap,
	UsersWhitelistClaimParamsMap,
	VariablesMap
} from './email.types';
import { generateWelcomeTemplate, WelcomeEmailProps } from './templates/welcome';
import { generateEmailConfirmationTemplate } from './templates/emailConfirmation';
import { generateRewardMintSuccessTemplate } from './templates/rewardMintSuccess';
import { featureToggles } from '../featureToggles';
import { FEATURES } from '@sd/superdao-shared';
import { generateErc721MintSuccessTemplate } from './templates/erc721MintSuccess';

const BATCH_CHUNK_SIZE = 1000;

@Injectable()
export class EmailService {
	client: Client;

	constructor(private logger: CustomLogger) {
		this.logger = logger.createScope(EmailService.name);

		const mailgun = new Mailgun(formData);
		this.client = mailgun.client({
			username: 'api',
			key: config.mailgun.apiKey,
			url: 'https://api.eu.mailgun.net'
		});
	}

	private sendMessage(to: string[], payload: EmailPayload, variables?: VariablesMap) {
		return chunk(to, BATCH_CHUNK_SIZE).map(async (toChunk) => {
			if (!toChunk.length) return;

			try {
				let chunkPayload: any = {
					...payload,
					to: toChunk
				};

				if (variables) {
					chunkPayload = { ...chunkPayload, ['recipient-variables']: JSON.stringify(pick(variables, toChunk)) };
				}

				return this.client.messages.create(config.mailgun.domain, chunkPayload);
			} catch (error) {
				return Promise.reject(error);
			}
		});
	}

	async sendBuyNftSuccessMessage(to: string[], data: BuyNftSuccessEmailProps) {
		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `Your new NFT from ${data.daoName} 🤩`,
			html: generateBuyNftSuccessTemplate({ ...data, daoLink: `https://app.superdao.co/${data.daoSlug}` })
		};

		try {
			const chunks = this.sendMessage(to, payload);

			this.logger.log('Buy nft success e-mails was sent with params: ', {
				to,
				data
			});

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Buy nft success e-mails sending error:'), {
				error,
				params: { to, data }
			});
		}
	}

	async sendNftSuccessMessage(to: string[], data: NftSuccessEmailProps) {
		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `🦸 You’ve got a membership NFT from ${data.daoName}`,
			html: generateNftSuccessTemplate({ ...data, daoLink: `https://app.superdao.co/${data.daoSlug}` })
		};

		//TODO: it was in email prefab, but not in base template
		// preHeader: 'Congrats! You’ve got a membership NFT! Log in with your wallet on Superdao and see other members, chats and news...',
		// same with footer: string[]

		try {
			const chunks = this.sendMessage(to, payload);

			this.logger.log('Nft success e-mails was sent with params: ', {
				to,
				data
			});

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Nft success e-mails sending error:'), {
				error,
				params: { to, data }
			});
		}
	}

	async sendRewardMintSuccessMessage(to: string[], recipientVariablesByEmail: UsersRewardMintParamsMap, data: {}) {
		const recipientVariables = to.reduce((acc, email) => {
			acc[email] = recipientVariablesByEmail[email] ?? {
				tierName: '',
				tierImage: '',
				nftName: '',
				walletAddress: '',
				ownerName: '',
				ownerImage: '',
				userSlug: ''
			};
			return acc;
		}, {} as UsersRewardMintParamsMap);
		const { emailLinkHost } = config.mailgun;
		//TODO: offer email data
		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `Reward NFT 🎊`,
			html: generateRewardMintSuccessTemplate(false, `${emailLinkHost}/u/%recipient.userSlug%`)
		};

		try {
			const chunks = this.sendMessage(to, payload, recipientVariables);

			this.logger.log('Reward mint nft e-mails was sent with params: ', {
				to,
				recipientVariablesByEmail,
				data
			});

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Reward mint nft e-mails sending error:'), {
				error,
				params: { to, recipientVariablesByEmail, data }
			});
		}
	}

	async sendErc721MintSuccessMessage(to: string[], recipientVariablesByEmail: UsersErc721MintParamsMap) {
		const recipientVariables = to.reduce((acc, email) => {
			acc[email] = recipientVariablesByEmail[email] ?? {
				mintId: '',
				imageNameSha: '',
				wallet: '',
				tokenId: null
			};
			return acc;
		}, {} as UsersErc721MintParamsMap);

		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `Super Robot NFT 🎊`,
			html: generateErc721MintSuccessTemplate(false)
		};

		try {
			const chunks = this.sendMessage(to, payload, recipientVariables);

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Erc721 mint nft e-mails sending error:'), {
				error,
				params: { to, recipientVariablesByEmail }
			});
		}

		this.logger.log('Erc721 mint nft e-mails was sent with params: ', {
			to,
			recipientVariablesByEmail
		});
	}

	async sendWelcomeEmailMessage(
		to: string[],
		recipientVariablesByEmail: UsersWelcomeParamsMap,
		data: WelcomeEmailProps
	) {
		const recipientVariables = to.reduce((acc, email) => {
			acc[email] = recipientVariablesByEmail[email] ?? { walletAddress: '', tierName: '', tierImage: '' };
			return acc;
		}, {} as UsersWelcomeParamsMap);

		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `${data.daoName} membership NFT 🎊`,
			html: generateWelcomeTemplate({ ...data, daoLink: `https://app.superdao.co/${data.daoSlug}` })
		};

		try {
			const chunks = this.sendMessage(to, payload, recipientVariables);

			this.logger.log('Welcome e-mails was sent with params: ', {
				to,
				recipientVariablesByEmail,
				data
			});

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Welcome e-mails sending error:'), {
				error,
				params: { to, recipientVariablesByEmail, data }
			});
		}
	}

	async sendWhitelistEmailMessage(
		to: string[],
		recipientVariablesByEmail: UsersWalletAddressesMap,
		data: WhitelistEmailProps
	) {
		const recipientVariables = to.reduce((acc, email) => {
			acc[email] = recipientVariablesByEmail[email] ?? { walletAddress: '' };
			return acc;
		}, {} as UsersWalletAddressesMap);

		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `You were whitelisted by ${data.daoName}`,
			html: generateWhitelistEmailTemplate({ ...data, daoLink: `https://app.superdao.co/${data.daoSlug}` })
		};

		try {
			const chunks = this.sendMessage(to, payload, recipientVariables);

			this.logger.log('Whitelist e-mails was sent with params: ', {
				to,
				recipientVariablesByEmail,
				data
			});

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Whitelist e-mails sending error: '), {
				error,
				params: { to, recipientVariablesByEmail, data }
			});
		}
	}

	async sendAdminEmailMessage(to: string[], recipientVariablesByEmail: UsersWalletAddressesMap, data: AdminEmailProps) {
		const recipientVariables = to.reduce((acc, email) => {
			acc[email] = recipientVariablesByEmail[email] ?? { walletAddress: '' };
			return acc;
		}, {} as UsersWalletAddressesMap);

		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `You're now an admin of ${data.daoName}`,
			html: generateAdminEmailTemplate({ ...data, daoLink: `https://app.superdao.co/${data.daoSlug}` })
		};

		try {
			const chunks = this.sendMessage(to, payload, recipientVariables);

			this.logger.log('Admin e-mails was sent to: ', { to, recipientVariablesByEmail, data });

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Admin e-mails sending error: '), {
				error,
				params: { to, recipientVariablesByEmail, data }
			});
		}
	}

	async sendWhitelistEmailClaimMessage(
		to: string[],
		recipientVariablesByEmail: UsersWhitelistClaimParamsMap,
		data: WhitelistEmailClaimType
	) {
		// DAO Heroes has a claimDeployDao flag, others don't
		const subject = `${data.daoName} membership NFT 🎊`;

		const recipientVariables = to.reduce((acc, email) => {
			acc[email] = recipientVariablesByEmail[email] ?? { id: '', tierName: '', tierImage: '', tierId: '' };
			return acc;
		}, {} as UsersWhitelistClaimParamsMap);

		const payload: EmailPayload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject,
			html: generateWhitelistEmailClaimTemplate({
				...data,
				daoLink: `https://app.superdao.co/${data.daoSlug}/%recipient.tierId%?claim=email&claimId=%recipient.id%`
			})
		};

		try {
			const chunks = this.sendMessage(to, payload, recipientVariables);

			this.logger.log('Email-link-claim e-mails was sent with params: ', { to, recipientVariablesByEmail, data });

			return Promise.all(chunks);
		} catch (error) {
			this.logger.error(new Error('Email-link-claim e-mails sending error: '), {
				error,
				params: { to, recipientVariablesByEmail, data }
			});
		}
	}

	throttledSendTopUpWalletMessage = throttle(this.sendTopUpWalletMessage, 5 * 1000 * 60);

	async sendTopUpWalletMessage(
		balance: string,
		threshold: string,
		walletAddress: string,
		walletType: 'gasless' | 'signer'
	) {
		if (!featureToggles.isEnabled(FEATURES.SEND_LOW_BALANCE_EMAILS)) return;

		const to = config.balanceThreshold.emailToNotify;
		const environment = config.env.isProd ? 'PROD' : 'DEV';

		const payload = {
			from: `Superdao <noreply@${config.mailgun.domain}>`,
			subject: `⚠️ [${environment}] Top up the ${walletType} wallet for gas payments`,
			html: `<p>Current balance of ${walletAddress} is ${balance} MATIC. Please, top up to threshold ${threshold} MATIC to ${walletAddress} on Polygon.</p>`
		};

		const loggerParams = {
			to: to.join(', '),
			balance,
			from: payload.from,
			walletAddress
		};

		try {
			const chunks = this.sendMessage(to, payload);

			await Promise.all(chunks);

			this.logger.log(
				`Top up the ${walletType} wallet ${walletAddress} for gas payments e-mail was sent with params: `,
				loggerParams
			);
		} catch (error) {
			this.logger.error(
				new Error(`Top up the ${walletType} wallet ${walletAddress} for gas payments e-mail sending error: `),
				{
					error,
					params: loggerParams
				}
			);
		}
	}

	async sendEmailConfirmationMessage({ userId, email, ua, otp }: EmailConfirmationOptions) {
		const { domain } = config.mailgun;

		const chunks = this.sendMessage([email], {
			from: `Superdao <noreply@${domain}>`,
			subject: `Email confirmation`,
			html: generateEmailConfirmationTemplate({ otp, ua })
		});

		return Promise.all(chunks)
			.then(() => {
				this.logger.log('Email confirmation sent', { userId, email });
			})
			.catch((error) => {
				this.logger.error(new Error('Failed to send confirmation email'), { error, email });
				throw error;
			});
	}
}

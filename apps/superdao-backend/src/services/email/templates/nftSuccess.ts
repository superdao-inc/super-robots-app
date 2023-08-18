import mjml2html from 'mjml';

import { footer } from './footer';

export type NftSuccessEmailProps = {
	daoName: string;
	daoSlug: string;
	walletAddress: string;
};

export const generateNftSuccessTemplate = (
	{ daoName, walletAddress, daoLink }: NftSuccessEmailProps & { daoLink: string },
	noTransform?: boolean
) => {
	const mjml = `<mjml>
  <mj-head>
    <mj-style inline="inline">
      .section-width{
      width: 214px;
      height: 268px;
      padding: 0;
      }
      .orange{
      color: #FC7900;
      text-decoration: none;
      }
      .padding{
      padding: 0 32px 0 23px;
      display: block;
      }
      .avatar{
        width: 21px;
        height: 21px;
        display: inline-block;
        border-radius: 50%;
        background-size: cover;
        }
        .daoname{
          padding-left: 6px;
          font-weight: 400;
          font-size: 12px;
          line-height: 21px;
        }
        .flex{
          display:flex;
        align-items: center;
        }
    </mj-style>
    <mj-attributes>
      <mj-class name="orange" color="#FC7900" />
      <mj-text padding="0px 20px" />
      <mj-button padding="0px 20px" />
      <mj-all font-family="Helvetica Neue" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#fcf8f4">
    <mj-section padding-top="0" background-color="white">
      <mj-column>
        <mj-image padding-top="0" padding-bottom="0" src="https://app.superdao.co/assets/email-header-confett.png" />

        <mj-text font-size="30px" font-weight="700" line-height="42px">
          Hey! 👋
        </mj-text>
        <mj-spacer height="28px" />
        <mj-text font-weight="400" font-size="19px" line-height="28px">
          Congrats! You’ve got a membership NFT from ${daoName} to your wallet ${walletAddress}!
        </mj-text>
        <mj-spacer height="8px" />
        <mj-text font-weight="400" font-size="19px" line-height="28px">
          Log in with your wallet on Superdao and see other members, chats and news from ${daoName}
        </mj-text>
        <mj-spacer height="28px" />
        <mj-button align="center" height="48px" border-radius="8px" background-color="#FFCF01" color="black" font-size="17px" font-weight="700" line-height="24px" inner-padding="12px 24px" href="${daoLink}">
          <mj-text font-size="17px" font-weight="700" line-height="24px">Go to ${daoName}</mj-text>
        </mj-button>
        <mj-spacer height="7px" />
        <mj-text font-weight="400" font-size="19px" line-height="24px">
          Need help? Send us an <a class="orange" href="mailto:help@superdao.co">email</a> or reach out on <a class="orange" href="https://t.me/superdao_team">Telegram</a>
        </mj-text>
        <mj-spacer height="32px" />
        <mj-text font-weight="400" font-size="17px" line-height="24px">
          Cheers,
          <br />
          Superdao team 🦸
        </mj-text>
        <mj-spacer height="22px" />
        <mj-text font-weight="400" font-size="18px"><a href="mailto:help@superdao.co" style="color: #FC7900; text-decoration: none;">help@superdao.co</a></mj-text>
        <mj-spacer height="26px" />
      </mj-column>
    </mj-section>
    ${footer}
  </mj-body>
</mjml>`;

	return noTransform ? mjml : mjml2html(mjml).html;
};

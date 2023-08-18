import mjml2html from 'mjml';

import { newFooter } from './newFooter';

// TODO: FIXME: we cannot render rewards dynamicly, so need something like this https://github.com/mifi/mjml-dynamic

export const generateRewardMintSuccessTemplate = (noTransform?: boolean, link?: string) => {
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
  <mj-body background-color="white">
    <mj-section padding="0" padding-top="44px" background-color="white">
      <mj-column padding="0">
        <mj-text font-size="30px" font-weight="700" line-height="42px">
          You got %recipient.nftName% ✨
        </mj-text>
        <mj-spacer height="16px" />
        <mj-text font-weight="400" font-size="19px" line-height="28px">
          Log in to Superdao with your wallet %recipient.walletAddress% to see other NFTs
        </mj-text>
        <mj-spacer height="20px" />
        <mj-section padding="0" padding-left="5px" text-align="left">
        <mj-column width="214px">
          <mj-section css-class="section-width" background-color="#252B36" border-radius="12px" padding="11px">
            <mj-hero background-url="%recipient.tierImage%" border-radius="6px" width="190px" height="190px" />
            <mj-spacer height="11px" />
            <mj-text font-weight="700" font-size="16px" line-height="19px" color="white">%recipient.tierName%</mj-text>
            <mj-spacer height="6px" />
            <mj-section padding="0">
              <mj-column>
              <mj-social border-radius="10px" vertical-align="middle" padding="0" align="left" icon-size="21px">
                <mj-social-element icon-padding="0 6px 0 0" font-weight="400" font-size="12px" line-height="20px" color="#A2A8B4" src="%recipient.ownerImage%">%recipient.ownerName%
                </mj-social-element>
              </mj-social></mj-column>
            </mj-section>
          </mj-section>
        </mj-column>
          </mj-section>
        <mj-spacer height="28px" />
        <mj-button align="left" height="48px" border-radius="8px" background-color="#FFCF01" color="black" font-size="17px" font-weight="700" line-height="24px" inner-padding="12px 24px" href="${link}">
          <mj-text font-size="17px" font-weight="700" line-height="24px">View in profile</mj-text>
        </mj-button>
        <mj-spacer height="28px" />
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
      </mj-column>
    </mj-section>
    ${newFooter}
  </mj-body>
</mjml>`;

	return noTransform ? mjml : mjml2html(mjml).html;
};

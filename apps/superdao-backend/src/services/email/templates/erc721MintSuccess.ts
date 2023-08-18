import mjml2html from 'mjml';
import { config } from 'src/config';

import { newRobotsFooter } from './newRobotsFooter';

export const generateErc721MintSuccessTemplate = (noTransform?: boolean) => {
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
        <mj-text font-size="32px" font-weight="700" line-height="41px">
         There is your Super Robot  🎉
        </mj-text>
        <mj-spacer height="16px" />
        <mj-text font-weight="400" font-size="17px" line-height="28px">
          You've got NFT from Superdao. It is time to meet your brand-new Robot. It’s already on the way to your wallet
        </mj-text>
        <mj-spacer height="28px" />
        <mj-image width="540px" padding="0" fluid-on-mobile="true" border-radius="32px" src="https://storage.googleapis.com/superdao-robots-assets/generated-robots/%recipient.imageNameSha%.png" />
        <mj-spacer height="40px" />
        <mj-text font-weight="400" font-size="17px" line-height="28px">
          Visit OpenSea to be sure that you get the NFT and Join Super Robots community on Telegram
        </mj-text>
        <mj-spacer height="16px" />
        <mj-section padding="0">
          <mj-column padding-bottom="16px"><mj-button height="52px" href="https://discord.gg/rHAq2SFh66" color="white" background-color="#1DA1F2" border-radius="12px" line-height="21px" font-weight="700" font-size="17px" width="262px"><img src="https://static.superdao.co/email/iconDiscordWhite.png" style="width:24px; vertical-align:middle;" /> &nbsp; Join community</mj-button></mj-column>
          <mj-column><mj-button height="52px" width="262px" href="https://opensea.io/assets/matic/${config.robots.erc721BabyRobotContractAddress}/%recipient.tokenId%" line-height="21px" font-weight="700" font-size="17px" background-color="#f2f3f5" border-radius="12px" color="#171A1F"><img src="https://robot.superdao.co/emails/opensea_icon.png" style="width:24px; vertical-align:middle;" /> &nbsp; Check on OpenSea</mj-button></mj-column></mj-section>
        <mj-spacer height="22px" />
        <mj-divider border-width="2px" border-color="#EEEEEE" />
        <mj-spacer height="32px" />
        <mj-text line-height="24px" font-weight="500" font-size="20px">Help us improve your robot</mj-text>
         <mj-spacer height="8px" />
        <mj-text font-weight="700" font-size="20px" line-height="24px"><a href="https://forms.superdao.co/robotsfeedback" style="color: #FC7900; text-decoration: none;">Leave your feedback ➔</a></mj-text>
        <mj-spacer height="32px" />
        <mj-divider border-width="2px" border-color="#EEEEEE" />
        <mj-spacer height="15px" />
        <mj-text font-weight="400" font-size="17px" line-height="24px">
          Thanks for being a part of this journey<br/>Superdao Team
        </mj-text>
        <mj-spacer height="22px" />
        <mj-text font-weight="400" font-size="18px" line-height="15px"><a href="mailto:help@superdao.co" style="color: #FC7900; text-decoration: none;">help@superdao.co</a></mj-text>
      </mj-column>
    </mj-section>
    ${newRobotsFooter}
  </mj-body>
</mjml>`;

	return noTransform ? mjml : mjml2html(mjml).html;
};

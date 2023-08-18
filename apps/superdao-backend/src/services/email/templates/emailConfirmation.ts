import mjml2html from 'mjml';
import UAParser from 'ua-parser-js';

import { footer } from './footer';

type EmailConfirmationTemplateOptions = {
	otp: string;
	ua?: string;
};

export function generateEmailConfirmationTemplate({ otp, ua }: EmailConfirmationTemplateOptions): string {
	const parser = new UAParser(ua);

	const { name: browserName } = parser.getBrowser();
	const { name: osName } = parser.getOS();

	const input = `<mjml>
  <mj-head>
    <mj-style inline="inline">
      .orange {
        color: #FC7900;
        text-decoration: none;
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
        <mj-text font-size="32px" font-weight="700" line-height="41px">
          Verification code
        </mj-text>
				<mj-spacer height="16px" />
				<mj-text font-weight="400" font-size="17px" line-height="28px">
        	Here is your verification code
        </mj-text>
        <mj-spacer height="4px" />
        <mj-text font-size="28px" font-weight="700" line-height="36px">
          ${otp}
        </mj-text>
        <mj-spacer height="16px" />
        	<mj-text font-weight="400" font-size="17px" line-height="28px">
        	This login was requested ${
						ua ? `using ${browserName ?? ''}${osName ? `, ${osName}` : ''}` : ''
					} at ${new Date().toUTCString()}.
        </mj-text>
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
        <mj-spacer height="26px" />
      </mj-hero>
    </mj-section>
    ${footer}
  </mj-body>`;

	return mjml2html(input).html;
}

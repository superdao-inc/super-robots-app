import mjml2html from 'mjml';

import type { EmailData } from '../email.types';

import { footer } from './footer';

export const generateBaseTemplate = (data: EmailData) => {
	return mjml2html(`<mjml>
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
        background-image: ${data.dao?.hasAvatar ? 'url(' + data.dao.avatar + ')' : data.dao?.avatar};
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
          ${data.header}
        </mj-text>
        <mj-spacer height="28px" />
        ${data.paragraphs.map((p, index) => {
					return `
            <mj-text font-weight="400" font-size="19px" line-height="28px">
              ${p}
            </mj-text>
            ${data.paragraphs.length > 1 && index !== data.paragraphs.length && `<mj-spacer height="8px" />`}
        `;
				})}
        <mj-spacer height="28px" />
        <mj-button align="${
					data.isGrantRole || data.isWhitelist ? 'left' : 'center'
				}" height="48px" border-radius="8px" background-color="#FFCF01" color="black" font-size="17px" font-weight="700" line-height="24px" inner-padding="12px 24px" href="${
		data.btnLink
	}">
          <mj-text font-size="17px" font-weight="700" line-height="24px">${data.btnLabel}</mj-text>
        </mj-button>
        <mj-spacer height="7px" />
       ${
					data.tier &&
					`<mj-hero mode="fluid-height" height="300px" background-url="https://app.superdao.co/assets/email-confetti.png" padding-top="5px" padding-bottom="14px">
          <mj-section css-class="section-width" background-color="#252B36" border-radius="12px" padding="11px">
            <mj-image src="${data.tier.img}" border-radius="6px" width="190px" height="190px" />
            <mj-spacer height="11px" />
            <mj-text font-weight="700" font-size="16px" line-height="19px" color="white">${data.tier.name}</mj-text>
            <mj-spacer height="6px" />
            <mj-text font-weight="400" font-size="12px" line-height="21px" color="#A2A8B4">
              <div class="flex">
                <div class="avatar"></div>
                <span class="daoname">${data.dao?.name}</span>
              </div>
            </mj-text>
          </mj-section>
        </mj-hero>`
				}
        ${
					data.dao?.about &&
					`<mj-text font-weight="700" font-size="17px" line-height="24px">
        About DAO
      </mj-text>
      <mj-spacer height="8px" />
      <mj-text font-weight="400" font-size="17px" line-height="24px">
        ${data.dao.about}
      </mj-text>
      <mj-spacer height="40px" />
      `
				}
      ${(data.isGrantRole || data.isWhitelist) && `<mj-spacer height="33px" />`}
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
</mjml>`).html;
};

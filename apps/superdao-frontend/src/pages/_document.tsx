import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

import { isProduction } from 'src/constants';
import { shouldRedirectToMobileStub } from 'src/utils/shouldRedirectToMobileStub';

const SUPERDAO_TRACKER_ID = '512a2e01-8f41-4aaf-a2d1-cff70d737dd9';

// @ts-expect-error
class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);

		if (shouldRedirectToMobileStub(ctx.pathname) && ctx.res) {
			ctx.res.writeHead(302, {
				Location: `/mobile?from=${ctx.asPath}`
			});
			ctx.res.end();
			return {};
		}

		return {
			...initialProps
		};
	}

	render() {
		const { ids, css } = this.props as any;
		const emotionCss = ids?.join(' ');

		const googleTagManagerScript = isProduction ? (
			<noscript
				dangerouslySetInnerHTML={{
					__html: `
						<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M3GRF36"
						height="0" width="0" style="display:none;visibility:hidden"></iframe>
					`
				}}
			/>
		) : null;

		const superdaoTrackerScript = isProduction ? (
			<script
				dangerouslySetInnerHTML={{
					__html: `
              (function(i){typeof window<"u"&&!window.sdt&&(window.sdt=["page","track","identify"].reduce((n,d)=>(n[d]=async function(...e){window.sdtQueue||(window.sdtQueue=[]),window.sdtQueue.push({name:d,args:e})},n),{id:i}))
})("${SUPERDAO_TRACKER_ID}")
            `
				}}
			/>
		) : null;

		return (
			<Html lang="en">
				<Head>
					<style data-emotion-css={emotionCss} dangerouslySetInnerHTML={{ __html: css }} />
					{superdaoTrackerScript}
				</Head>
				<body>
					{googleTagManagerScript}
					<Main />
					<NextScript />
					{isProduction && (
						<script async src="https://static.superdao.co/supertracker-1.1.0.js" type="text/javascript" />
					)}
				</body>
			</Html>
		);
	}
}

export default MyDocument;

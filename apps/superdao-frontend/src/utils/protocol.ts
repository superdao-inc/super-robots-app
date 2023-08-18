import { SSRContext } from 'src/client/ssr';

// checking header to detect, is protocol secured or no, allows to configure full url in any environment: local, stage or prod
export const getProtocol = (ctx: SSRContext) => (ctx.req.headers['x-forwarded-proto'] ? 'https://' : 'http://');

// this is deprecated
// @ts-ignore
const { parse } = require('url');
const createServer = require('next/dist/server/next');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

main().catch((err) => {
	console.error(err);
	process.exit(1);
});

async function main() {
	const backendHost = process.env.BACKEND_SERVICE_URL || 'http://localhost:7999';

	const graphqlProxy = createProxyMiddleware({
		target: backendHost,
		changeOrigin: true
	});

	const dev = process.env.NODE_ENV !== 'production';
	const hostname = 'localhost';
	const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8000;

	const server = express();

	const nextApp = createServer({ dev, hostname, port });
	const handle = nextApp.getRequestHandler();
	await nextApp.prepare();

	server.use('/graphql', graphqlProxy);
	server.use('/socket.io', graphqlProxy);
	server.use('/api', graphqlProxy);
	server.all('*', (req: Request, res: Response) => {
		const parsedUrl = parse(req.url!, true);
		return handle(req, res, parsedUrl);
	});

	server.listen(port);
	console.log(`> Ready on http://${hostname}:${port}`);
}

import getConfig from 'next/config';
import * as ipfs from 'ipfs-http-client';

const { publicRuntimeConfig } = getConfig();

const infuraIpfsEndpoint = 'https://ipfs.infura.io:5001';
const infuraIpfsProjectId = publicRuntimeConfig.IPFS_INFURA_PROJECT_ID ?? '';
const infuraIpfsProjectSecret = publicRuntimeConfig.IPFS_INFURA_PROJECT_SECRET ?? '';

export class IpfsService {
	private readonly _client: ipfs.IPFSHTTPClient;

	constructor(endpoint: string, projectId: string, projectSecrtet: string) {
		const authorization = `Basic ${Buffer.from(`${projectId}:${projectSecrtet}`).toString('base64')}`;
		this._client = ipfs.create({
			url: `${endpoint}/api/v0`,
			headers: {
				authorization
			}
		});
	}

	async pushFileAndGetCid(file: File): Promise<string> {
		const ipfsResponse = await this._client.add(
			{
				content: await file.arrayBuffer()
			},
			{ pin: true }
		);

		return ipfsResponse.cid.toString();
	}

	async pushFileAndGetUri(file: File): Promise<string> {
		const cid = await this.pushFileAndGetCid(file);
		return `ipfs://${cid}`;
	}
}

export const ipfsService = new IpfsService(infuraIpfsEndpoint, infuraIpfsProjectId, infuraIpfsProjectSecret);

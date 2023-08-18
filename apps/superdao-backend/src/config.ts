import 'dotenv/config'; // .env setup
import { cleanEnv, host, port, str, url } from 'envalid';
import { ethers } from 'ethers';

const enableEnvalid = !process.env.DISABLE_ENVALID;

const envalidConfig = {
	NODE_ENV: str({ choices: ['test', 'development', 'production'], default: 'development' }),
	APP_ENV: str({ choices: ['dev', 'stage', 'prod'], default: 'dev' }),
	APP_ENV_SLUG: str({ default: 'dev' }),
	APP_ROLE: str({ choices: ['application', 'migration'], default: 'application' }),

	LOG_LEVEL: str({ default: 'debug' }),

	SESSION_KEY: str(),
	APP_PREVIEW_GEN_SERVICES_URL: url(),
	UPLOADCARE_PUBLIC_KEY: str(),

	MAILGUN_API_KEY: str(),
	MORALIS_API_KEY: str(),
	COVALENT_API_KEY: str(),

	PORT: port({ default: 8000 }),
	METRICS_PORT: port({ default: 9090 }),

	UNLEASH_SERVER_URL: str({ default: 'UNLEASH_URL' }),
	UNLEASH_SERVER_API_KEY: str({ default: 'UNLEASH_SECRET' }),

	DB_NAME: str(),
	DB_HOST: host(),
	DB_PORT: port(),
	DB_USER: str(),
	DB_PASSWORD: str(),

	REDIS_HOST: host(),
	REDIS_PORT: port(),
	REDIS_USER: str(),
	REDIS_PASSWORD: str(),

	RABBITMQ_HOST: host(),
	RABBITMQ_PORT: port(),
	RABBITMQ_USER: str(),
	RABBITMQ_PASSWORD: str(),

	KAFKA_HOST: host(),
	KAFKA_PORT: port(),
	KAFKA_USER: str(),
	KAFKA_PASSWORD: str(),

	MAGIC_SECRET_KEY: str(),

	VERIFICATION_JWT_SECRET: str(),

	CALL_FORWARDER_ADDRESS: str(),

	RECAPTCHA_SECRET_KEY: str(),

	REWARD_MINT_SORTED_SET_KEY: str(),
	REWARD_MINT_ACTIVE_TX_KEY: str(),

	SUPERDAO_APP_BASE_URL: str(),

	ROBOTS_GOOGLE_STORAGE_CREDENTIALS_JSON: str(),
	ROBOTS_GOOGLE_STORAGE_PROJECT_ID: str(),
	ROBOTS_BUCKET_NAME: str(),
	ROBOTS_GENERATED_FOLDER: str(),

	ROBOTS_ERC_721_ADDRESS: str(),

	SCORING_API_BASE_URL: str(),

	ERC_721_MINT_SORTED_SET_KEY: str(),
	ERC_721_MINT_ACTIVE_TX_KEY: str(),

	ROBOT_IMAGE_GENERATION_SORTED_SET_KEY: str(),
	ROBOT_IMAGE_GENERATION_ACTIVE_TX_KEY: str(),

	ROBOT_GRAPH_URL: str(),

	TOKEN_UPDATE_SORTED_SET_KEY: str(),
	SCRAPER_URL: str(),

	GNOSIS_WALLET_STAGE: str(),
	GNOSIS_WALLET_PROD: str()
};

const env = enableEnvalid
	? cleanEnv(process.env, envalidConfig)
	: cleanEnv(process.env, envalidConfig, {
			reporter: () => {}
	  });

const { NODE_ENV, APP_ENV, APP_ROLE } = env;

const rabbmitMqVhost: Record<typeof APP_ENV, string> = {
	dev: '/',
	stage: 'staging',
	prod: 'production'
};

const infuraCacheProxyServerUrls: Record<typeof APP_ENV, string> = {
	dev: 'https://ipfs..superdao.co',
	stage: 'https://ipfs..superdao.co',
	prod: 'https://ipfs..superdao.co'
};

const daoMaxLimit: Record<typeof APP_ENV, number> = {
	dev: 100000,
	stage: 100000,
	prod: 300
};

const emailLinkHosts: Record<typeof APP_ENV, string> = {
	dev: 'http://localhost:8000',
	stage: 'https://robots-stage.k8s.superdao.dev',
	prod: 'https://robot.superdao.co'
};

export const config = {
	appEnv: APP_ENV,
	env: {
		nodeEnv: NODE_ENV,
		isTest: NODE_ENV === 'test',
		isDev: NODE_ENV === 'development',
		isProd: NODE_ENV === 'production',
		isMigration: APP_ROLE === 'migration'
	},
	log: {
		level: env.LOG_LEVEL
	},
	session: {
		maxAge: 2 * 7 * 24 * 60 * 60 * 1000 // 2 weeks
	},
	ethers: {
		privateKey: process.env.SIGNER_WALLET_PRIVATE_KEY || '',
		airdropRewardPrivateKey: process.env.AIRDROP_REWARD_PRIVATE_KEY || '',
		gaslessWalletPrivateKey: process.env.GASLESS_WALLET_PRIVATE_KEY || ''
	},
	balanceThreshold: {
		// 1 MATIC = 1 ether
		get relayTankDeposit() {
			return ethers.utils.parseUnits(config.env.isProd ? '30' : '5', 'ether');
		},
		gaslessCallForwarder: ethers.utils.parseUnits('100', 'ether'),
		get ethersServiceSignerNotify() {
			return ethers.utils.parseUnits(config.env.isProd ? '100' : '10', 'ether');
		},
		get emailToNotify() {
			return config.env.isProd ? ['...@superdao.co', '...@superdao.co'] : ['...@superdao.co'];
		}
	},
	app: {
		port: env.PORT
	},
	metrics: {
		port: env.METRICS_PORT
	},
	db: {
		name: env.DB_NAME,
		host: env.DB_HOST,
		port: env.DB_PORT,
		user: env.DB_USER,
		password: env.DB_PASSWORD
	},
	redis: {
		host: env.REDIS_HOST,
		port: env.REDIS_PORT,
		user: env.REDIS_USER,
		password: env.REDIS_PASSWORD,
		prefix: 'api-'
	},
	rabbitMq: {
		hostname: env.RABBITMQ_HOST,
		port: env.RABBITMQ_PORT,
		username: env.RABBITMQ_USER,
		password: env.RABBITMQ_PASSWORD,
		vhost: rabbmitMqVhost[APP_ENV]
	},
	kafka: {
		host: env.KAFKA_HOST,
		port: env.KAFKA_PORT,
		username: env.KAFKA_USER,
		password: env.KAFKA_PASSWORD
	},
	keys: {
		uploadcarePublicKey: env.UPLOADCARE_PUBLIC_KEY,
		session: env.SESSION_KEY
	},
	urls: {
		previewGenServicesUrl: env.APP_PREVIEW_GEN_SERVICES_URL,
		infuraCacheProxyServerUrl: infuraCacheProxyServerUrls[APP_ENV]
	},
	polygon: {
		chainId: 137 as const,
		key: 'polygon' as const,
		networkName: 'matic',
		gasStationUrl: 'https://gasstation.polygon.technology/v2'
	},
	ethereum: {
		id: 1 as const,
		key: 'ethereum' as const
		// TBD
	},
	mailgun: {
		domain: '....superdao.co',
		apiKey: env.MAILGUN_API_KEY,
		emailLinkHost: emailLinkHosts[APP_ENV]
	},
	values: {
		daoMaxLimit: daoMaxLimit[APP_ENV]
	},
	moralis: {
		apiKey: env.MORALIS_API_KEY
	},
	covalent: {
		apiKey: env.COVALENT_API_KEY,
		baseURL: 'https://api.covalenthq.com'
	},
	gnosis: {
		// NOTE: gnosis is not cmpatible with mumbai, so matic only
		network: 'matic'
	},
	unleash: {
		url: env.UNLEASH_SERVER_URL,
		apiKey: env.UNLEASH_SERVER_API_KEY,
		environment: env.APP_ENV_SLUG
	},
	infura: {
		ipfsProjectId: process.env.IPFS_INFURA_PROJECT_ID || '',
		ipfsProjectSecret: process.env.IPFS_INFURA_PROJECT_SECRET || '',
		ipfsEndpoint: 'https://ipfs.infura.io:5001',
		ipfsGatewayUrl: 'https://ipfs.io/ipfs',

		polygonProjectId: process.env.INFURA_POLYGON_MAINNET_API_KEY || '',
		polygonUrl: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_POLYGON_MAINNET_API_KEY}`
	},
	superdaoApp: {
		baseUrl: env.SUPERDAO_APP_BASE_URL
	},
	alchemy: {
		apiKey: process.env.ALCHEMY_API_KEY
	},
	magic: {
		apiKey: process.env.MAGIC_PUBLISHABLE_KEY,
		secretKey: process.env.MAGIC_SECRET_KEY
	},
	contracts: {
		callForwarder: env.CALL_FORWARDER_ADDRESS
	},
	gnosisWallets: {
		stage: env.GNOSIS_WALLET_STAGE,
		production: env.GNOSIS_WALLET_PROD
	},
	itx: {
		deposit: process.env.ITX_DEPOSIT_CONTRACT
	},
	robotGraph: {
		url: env.ROBOT_GRAPH_URL
	},
	recaptcha: {
		key: env.RECAPTCHA_SECRET_KEY,
		url: 'https://www.google.com/recaptcha/api'
	},
	rewardMint: {
		REWARD_MINT_SORTED_SET_KEY: env.REWARD_MINT_SORTED_SET_KEY,
		REWARD_MINT_ACTIVE_TX_KEY: env.REWARD_MINT_ACTIVE_TX_KEY
	},
	api: {
		SCORING_API_BASE_URL: env.SCORING_API_BASE_URL
	},
	robots: {
		robotsGoogleStorageCredentialsJSON: env.ROBOTS_GOOGLE_STORAGE_CREDENTIALS_JSON,
		robotsGoogleStorageProjectId: env.ROBOTS_GOOGLE_STORAGE_PROJECT_ID,
		robotsBucketName: env.ROBOTS_BUCKET_NAME,
		robotsGeneratedFolder: env.ROBOTS_GENERATED_FOLDER,
		erc721BabyRobotContractAddress: env.ROBOTS_ERC_721_ADDRESS
	},
	erc721Mint: {
		ERC_721_MINT_SORTED_SET_KEY: env.ERC_721_MINT_SORTED_SET_KEY,
		ERC_721_MINT_ACTIVE_TX_KEY: env.ERC_721_MINT_ACTIVE_TX_KEY
	},
	robotImageGeneration: {
		ROBOT_IMAGE_GENERATION_SORTED_SET_KEY: env.ROBOT_IMAGE_GENERATION_SORTED_SET_KEY,
		ROBOT_IMAGE_GENERATION_ACTIVE_TX_KEY: env.ROBOT_IMAGE_GENERATION_ACTIVE_TX_KEY
	},
	tokenUpdate: {
		TOKEN_UPDATE_SORTED_SET_KEY: env.TOKEN_UPDATE_SORTED_SET_KEY,
		SCRAPER_URL: env.SCRAPER_URL
	}
};

export const provider = new ethers.providers.StaticJsonRpcProvider(config.infura.polygonUrl, {
	chainId: config.polygon.chainId,
	name: config.polygon.key
});

// Configure the ITX provider using Infura credentials – https://docs.infura.io/infura/features/itx-transactions/develop-with-itx
export const itx = new ethers.providers.InfuraProvider(config.polygon.networkName, config.infura.polygonProjectId);

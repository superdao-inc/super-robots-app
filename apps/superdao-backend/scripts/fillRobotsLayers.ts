import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { RobotLayerMap } from '@sd/superdao-shared';

import { initDB } from '../src/utils/db';
import { BabyRobotMint } from '../src/entities/babyRobot/babyRobotMint.model';
import { RobotMintAndWaitlistStatus } from '../src/entities/babyRobot/babyRobot.types';
import { BabyRobotsPreviewGenerator } from '../src/services/babyRobotsPreview/babyRobotsPreview.generator';
import { BabyRobotLayers } from '../src/entities/babyRobot/babyRobotLayers.model';

// pnpm script:fillRobotsLayers --host <database host> --port <database port> --database <database name> --username <username> --password <password>

const BATCH_SIZE = 1000;

(async () => {
	const { host, port, database, username, password } = yargs(hideBin(process.argv))
		.string('host')
		.string('database')
		.number('port')
		.string('username')
		.string('password')
		.parseSync();

	if (!host || !port || !database || !username || !password) {
		console.error('❌ parameters are missing');
		return;
	}

	const connection = await initDB({ host, database, username, password, port });

	const robotLayersRepo = connection.getRepository(BabyRobotLayers);
	const robotMintRepo = connection.getRepository(BabyRobotMint);
	const owners = await robotMintRepo.find({
		where: { status: RobotMintAndWaitlistStatus.CLAIMED },
		relations: { user: true }
	});

	const ownersWallets = owners.map((o) => o.user.walletAddress);

	const robotPreviewGenerator = new BabyRobotsPreviewGenerator();
	const robotLayerEntries: { wallet: string; layers: RobotLayerMap }[] = [];

	const saveEntriesInDatabase = async () => {
		await robotLayersRepo.insert(robotLayerEntries);
		robotLayerEntries.length = 0;
	};

	for (let i = 0; i < ownersWallets.length; i++) {
		const wallet = ownersWallets[i];
		const layers = await robotPreviewGenerator.getV2RandomLayers(wallet);

		const entry = new BabyRobotLayers();
		entry.wallet = wallet;
		entry.layers = layers;

		robotLayerEntries.push(entry);

		if (i !== 0 && i % (BATCH_SIZE - 1) === 0) {
			const entriesLength = robotLayerEntries.length;
			try {
				await saveEntriesInDatabase();
				console.log(`✨ inserted ${entriesLength} record(s) at ${i} index`);
			} catch (e) {
				console.error(`error`, e);
			}
		}
	}

	if (robotLayerEntries.length) {
		const entriesLength = robotLayerEntries.length;
		try {
			await saveEntriesInDatabase();
			console.log(`✨ inserted ${entriesLength} record(s) at the end of the loop`);
		} catch (e) {
			console.error(`error`, e);
		}
	}
})();

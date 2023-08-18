/* eslint-disable no-console */
import { exec } from 'child_process';

const migrationName = process.argv[2];
if (!migrationName) {
	throw new Error('Provide migration name. Example: AddPostColumnAtUserTable');
}

exec(`pnpm typeorm migration:generate ./src/migrations/${migrationName}`, (error, stdout) => {
	if (error) throw error;
	// eslint-disable-next-line no-console
	console.log(stdout);

	exec(`eslint --fix --quiet ./src/migrations/*-${migrationName}.ts`, (error, stdout) => {
		if (error) throw error;
		// eslint-disable-next-line no-console
		console.log(stdout);
	});
});

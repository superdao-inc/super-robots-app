import { DataSource } from 'typeorm';
import { cliOptions } from 'src/utils/ormConfig';

const cliDataSource = new DataSource(cliOptions);
export default cliDataSource;

import { DataSource } from 'typeorm';
import { distCliOptions } from 'src/utils/ormConfig';

const distCliDataSource = new DataSource(distCliOptions);
export default distCliDataSource;

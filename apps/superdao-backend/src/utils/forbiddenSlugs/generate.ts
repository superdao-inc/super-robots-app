import { join } from 'path';
import { writeFileSync } from 'fs';
import { _getForbiddenSlugs } from './getForbiddenSlugs';
import { SLUGS_PATHS_MAP, OUTPUT_FILE } from './config';

const generatedCode = _getForbiddenSlugs(SLUGS_PATHS_MAP);

writeFileSync(join(__dirname, OUTPUT_FILE), JSON.stringify(generatedCode));

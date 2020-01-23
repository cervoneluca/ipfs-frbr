import { execSync } from 'child_process';
import doTests from '../imports/test-all';

(async () => {
  doTests(true, execSync);
})();

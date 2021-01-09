import { Router } from 'express';
import user from './user';

const router = Router();

router.get('/', (_, res) => res.send('Welcome to Cashless Soko Backend..'));
router.use('/', user);

export default router;

import { Router } from 'express';
import product from './product';

const router = Router();

router.get('/', (_, res) => res.send('Welcome to SOLO DASHBOARD'));
router.use('/', product);

export default router;

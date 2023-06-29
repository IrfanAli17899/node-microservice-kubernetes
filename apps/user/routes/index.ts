import { Router } from 'express';
import signup from './signup';
import signin from './signin';
import getUser from './get-user';

const router = Router();

router
.post('/signup', signup)
.post('/signin', signin)
.get('/me', getUser);

export default router;
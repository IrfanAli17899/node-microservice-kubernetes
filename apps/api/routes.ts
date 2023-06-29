import { Router } from 'express';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { SERVICES_URL } from '@libs/core/config';

const router = Router();

router.use(
  '/api/user',
  createProxyMiddleware({
    target: SERVICES_URL.USER,
    changeOrigin: true,
    pathRewrite: {
      '^/api/user': '/',
    },
    onProxyReq: fixRequestBody
  })
);

router.use(
  '/api/todo',
  createProxyMiddleware({
    target: SERVICES_URL.TODO,
    changeOrigin: true,
    pathRewrite: {
      '^/api/todo': '/',
    },
    onProxyReq: fixRequestBody
  })
);

export default router;
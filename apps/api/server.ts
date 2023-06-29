import 'module-alias/register';
import bootstrap from '@libs/core/helpers/bootstrap';
import routes from './routes';
import apiErrorHandler from '@libs/core/middlewares/apiErrorHandler';

const port = 3000;
const app = bootstrap();

app
  .use(routes)
  .get('/', (_req, res) => res.send('<h1>Api Gateway Service</h1>'))
  .use(apiErrorHandler)

app.listen(port, () => {
  console.log(`API Gateway service running on port: ${port}`);
});

export default app;

import 'module-alias/register';
import bootstrap from '@libs/core/helpers/bootstrap';
import router from './routes';
import apiErrorHandler from '@libs/core/middlewares/apiErrorHandler';
import { sequelize } from '@libs/core/database';

const port = 3001;
const app = bootstrap();

app
  .use(router)
  .get('/', (req, res) => res.send('<h1>User Service</h1>'))
  .use(apiErrorHandler);

app.listen(port, () => {
  console.log(`User service running on port: ${port}`);
});

sequelize.sync().then(() => {
  console.log('User server db synced!')
});

export default app;
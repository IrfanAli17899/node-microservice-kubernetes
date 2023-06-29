import 'module-alias/register';
import bootstrap from '@libs/core/helpers/bootstrap';
import { sequelize } from '@libs/core/database';
import router from './routes';
import apiErrorHandler from '@libs/core/middlewares/apiErrorHandler';

const port = 3002;
const app = bootstrap();
app
  .use(router)
  .get('/', (req, res) => res.send('<h1>Todo Service</h1>'))
  .use(apiErrorHandler)

app.listen(port, () => {
  console.log(`Todo service running on port: ${port}`);
});

sequelize.sync().then(() => {
  console.log('Todo server db synced!')
});

export default app;
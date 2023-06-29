
import { Sequelize } from 'sequelize-typescript';
import { DB_CONFIG } from '../config';
import path from 'path';

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: DB_CONFIG.HOST,
    port: DB_CONFIG.PORT,
    database: DB_CONFIG.NAME,
    username: DB_CONFIG.USER,
    password: DB_CONFIG.PASSWORD,
    models:[path.join(__dirname, '../../../apps', '/**/entities/*entity.js')]
});

// const autoLoader = new AutoLoader(sequelize);

// Load models from the specified directory
// autoLoader.load(path.join(__dirname, 'models'));

// Export the sequelize instance
export { sequelize };
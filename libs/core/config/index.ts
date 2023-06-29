import 'dotenv/config';

export const jwtKey = 'your-secret-key';
export const debug = process.env.DEBUG

export const SERVICES_URL = {
    USER: process.env.USER_SERVICE_URL,
    TODO: process.env.TODO_SERVICE_URL,
}

export const DB_CONFIG = {
    HOST: process.env.DB_HOST,
    PORT: 5432,
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
}
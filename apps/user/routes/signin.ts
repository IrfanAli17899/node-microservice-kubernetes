import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';
import User  from '../entities/user.entity';
import { jwtKey } from '@libs/core/config';
import ApiError from '@libs/core/helpers/ApiError';

export interface SigninRequestBody {
    email: string;
    password: string;
}

const signinSchemas = {
    reqQuery: joi.object().length(0),
    reqBody: joi.object<SigninRequestBody>({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
};

async function signin(req: Request<SigninRequestBody>, res:Response) {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, 'Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtKey);
    res.send({ token });
}

export default wrap(signin, {
    catch: true,
    validate: signinSchemas,
});
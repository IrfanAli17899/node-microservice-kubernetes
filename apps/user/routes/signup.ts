import joi from 'joi';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';
import User from '../entities/user.entity';
import { jwtKey } from '@libs/core/config';
import ApiError from '@libs/core/helpers/ApiError';

export interface SignupRequestBody {
    email: string;
    password: string;
    name: string;
}

const signupSchemas = {
    reqQuery: joi.object().length(0),
    reqBody: joi.object<SignupRequestBody>({
        email: joi.string().email().required(),
        password: joi.string().required(),
        name: joi.string().required(),
    }),
};

async function signup(req: Request<SignupRequestBody>, res: Response) {
    const { email, password, name } = req.body;
    console.log("🚀 ~ file: signup.ts:29 ~ signup ~ req.body:", req.body)

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new ApiError(409, 'Email already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, jwtKey);
    res.send({ token })
}

export default wrap(signup, {
    catch: true,
    validate: signupSchemas,
});
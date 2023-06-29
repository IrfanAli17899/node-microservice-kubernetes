import ApiError from '../helpers/ApiError';
import { RequestHandlerWrapper } from '.';
import User from '@apps/user/entities/user.entity';
import { jwtKey } from '../config';
import jwt from 'jsonwebtoken';

const authedOnly: RequestHandlerWrapper = (handler) => async (req, res, next) => {
  try {

    // Extract the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new ApiError(401, 'Unauthorized');
    }

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, jwtKey);
    const userId = decoded.userId;

    // Find the user by the decoded userId
    const user = await User.findByPk(userId);
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    // Return user information
    res.locals.user = user;
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default authedOnly;

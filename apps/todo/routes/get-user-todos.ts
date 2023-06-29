import joi from 'joi';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';
import Todo from '../entities/todo.entity';

const getUserTodosSchemas = {
    reqQuery: joi.object().length(0),
    reqBody: joi.object().length(0),
};

async function getUserTodos(_req: Request, res: Response) {
    const userId = res.locals.user.id;
    const userTodos = await Todo.findAll({ where: { userId } });
    res.send(userTodos);
}

export default wrap(getUserTodos, {
    catch: true,
    authedOnly: true,
    validate: getUserTodosSchemas,
});
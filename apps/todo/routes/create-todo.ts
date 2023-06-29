import joi from 'joi';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';
import Todo from '../entities/todo.entity';

const createTodoSchemas = {
    reqQuery: joi.object().length(0),
    reqBody: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
    }),
};

async function createTodo(req: Request, res: Response) {
    const userId = res.locals.user.id;
    const { title, description } = req.body;
    const newTodo = await Todo.create({ title, description, userId });
    res.send(newTodo);
}

export default wrap(createTodo, {
    catch: true,
    authedOnly: true,
    validate: createTodoSchemas,
});
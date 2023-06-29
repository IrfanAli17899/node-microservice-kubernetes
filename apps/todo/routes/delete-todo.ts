import joi from 'joi';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';
import Todo from '../entities/todo.entity';
import { ApiError } from '@libs/core/helpers';

const deleteTodoSchemas = {
    reqQuery: joi.object().length(0),
    reqBody: joi.object().length(0),
};

async function deleteTodo(req: Request, res: Response) {
    const todoId = req.params.id;
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
        throw new ApiError(404, 'Todo not found');
    }

    // Delete the todo
    await todo.destroy();

    res.send(todo);

}

export default wrap(deleteTodo, {
    catch: true,
    authedOnly: true,
    validate: deleteTodoSchemas,
});
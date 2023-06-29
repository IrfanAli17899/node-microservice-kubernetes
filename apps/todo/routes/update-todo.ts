import joi from 'joi';

import { wrap } from '@libs/core/wrappers';

import { Request, Response } from '@libs/core/helpers/types';
import Todo from '../entities/todo.entity';
import { ApiError } from '@libs/core/helpers';

const updateTodoSchemas = {
    reqQuery:joi.object().length(0),
    reqBody: joi.object({
        title: joi.string(),
        description: joi.string(),
    }),
};

async function updateTodo(req: Request, res: Response) {
    const todoId = req.params.id;
    const { title, description } = req.body;
    const todo = await Todo.findByPk(todoId);
    
    if (!todo) {
        throw new ApiError(404, 'Todo not found');
    }

    todo.title = title || todo.title;
    todo.description = description || todo.description;
    await todo.save();
    res.send(todo);
}

export default wrap(updateTodo, {
    catch: true,
    authedOnly: true,
    validate: updateTodoSchemas,
});
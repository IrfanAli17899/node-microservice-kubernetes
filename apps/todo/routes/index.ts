import { Router } from 'express';
import createTodo from './create-todo';
import getUserTodos from './get-user-todos';
import updateTodo from './update-todo';
import deleteTodo from './delete-todo';

const router = Router();

router
.post('/', createTodo)
.get('/get', getUserTodos)
.put('/:id', updateTodo)
.delete('/:id', deleteTodo);

export default router;
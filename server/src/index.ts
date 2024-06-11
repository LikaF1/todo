import express from 'express';
import {ITodo} from './todo.interface';

const PORT = 1111;
const app = express();

app.use(express.json());

const list: ITodo[] = [];

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});

app.get('/list', (req, res) => {
  res.json(list);
});

app.get('/add', (req, res) => {
  const todo = req.body as ITodo;
  const lastTodo = list[list.length - 1];
  const lastId = lastTodo?.id || 0;

  todo.id = lastId + 1;

  list.push(todo);
  res.json(todo.id);
});
import express from 'express';
import {ITodo} from './todo.interface';
import { Store } from 'store';

const PORT = 1111;
const app = express();
const store = new Store();

app.use(express.json());

const list: ITodo[] = store.todos;

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});

app.post('/list', (req, res) => {
  res.json(list);
});

app.post('/add', (req, res) => {
  const todo = req.body as ITodo;
  const lastId= list[0]?.id || 0;

  store.write(list);

  todo.id = lastId + 1;
  list.splice(0, 0, todo);
  res.json(todo);
});

app.post('/remove', (req, res) => {
  const {id} = req.body;
  const index = list.findIndex((todo) => todo.id === id);

  store.write(list);

  if(index !== -1){
    list.splice(index, 1);
  }

  res.json(index);
});
import express from 'express';
import {ITodo} from './todo.interface';
import { Store } from 'store';

const PORT = 1111;
const app = express();
const store = new Store();

app.use(express.json());

const list: ITodo[] = [];

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`);
});

app.post('/list', (req, res) => {
  res.json(list);

  store.write(list);

});

app.post('/add', (req, res) => {
  const todo = req.body as ITodo;
  const lastTodo = list[list.length - 1];
  const lastId = lastTodo?.id || 0;

  todo.id = lastId + 1;
  store.add(todo);

  list.push(todo);
  res.json(todo);
});

app.post('/remove', (req, res) => {
  const {id} = req.body;
  const index = list.findIndex((todo) => todo.id === id);

  store.remove(index);

  if(index !== -1){
    list.splice(index, 1);
  }

  res.json(index);
});
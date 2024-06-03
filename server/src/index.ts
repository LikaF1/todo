import express from 'express';
import {ITodo} from './todo.interface';

const PORT = 1111;

const app = express();
app.use(express.json());


const list: ITodo[] = [];

app.set('view engine', 'ejs');
app.set('views', './templates');

app.listen(PORT, () => {
  console.log(`Сервер запущен: http://localhost:${PORT}`)
});

app.get('/', (req, res) => {
  res.render('index', {
    id: 1, name:"хуй", description:"большой хуй"
  });
});

app.get('/list', (req, res) => {
  res.json(list);
});

app.get('/add', (req, res) => {
  const todo = req.body as ITodo;

  console.log(todo);
  list.push(todo);
  console.log(list);
  res.status(200).send('Данные сохранены');
});
import { ITodo } from 'todo.interface';
import { writeFileSync } from 'fs';
import * as path from 'path';

let list: ITodo[] = [];
const filePath = path.join(__dirname, 'store.json');

try {
  list = require(filePath);
} catch (error) {
  console.error('Ошибка при загрузке файла:', error);
}

export class Store {
  public todos: ITodo[] = list;

  write(todos: ITodo[]): void{
    this.todos = todos;

    const data = JSON.stringify(this.todos, null, 2);

    writeFileSync('store.json', data, 'utf8');
  }
}
import { ITodo } from 'todo.interface';
import { writeFileSync } from 'fs';
import * as path from 'path';

console.log('aaaaa');

let list: ITodo[] = [];
const filePath = path.join(__dirname, 'store.json');

try {
  list = require(filePath);
} catch (error) {
  console.error('Ошибка при загрузке файла:', error);
  list = [];
}

export class Store {
  public todos: ITodo[] = list;

  write(todos: ITodo[]): void{
    this.todos = todos;

    const data = JSON.stringify(this.todos, null, 2);

    writeFileSync('store.json', data, 'utf8');
  }

  public add(todo: ITodo): void {
    this.todos.push(todo);
    this.save();
  }

  public remove(index: number): void {
    this.todos.splice(index, 1);
    this.save();
  }

  private save(): void {
    try {
      const data = JSON.stringify(this.todos, null, 2);

      writeFileSync('store.json', data, 'utf8');
    } catch (error) {
      console.error('Ошибка при записи в файл:', error);
    }
  }
}
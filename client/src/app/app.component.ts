import { Component } from '@angular/core';
import { BehaviorSubject, Observable, concatMap } from 'rxjs';
import { HttpService } from './http.service';
import { ITodo } from './todo.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  title = 'todo';
  list: ITodo[] = [];
  update$ = new BehaviorSubject<true>(true);

  list$: Observable<ITodo[]> = this.update$.pipe(
    concatMap(() => this.http.getList())
  );

  constructor(private http: HttpService) {}

  addItem() {
    this.list.push({
      name: '',
      description: '',
    });
  }

  saveItem(todo: ITodo) {
    this.http.saveTodo(todo).subscribe({
      next: () => {
        console.log('Обращение к серверу прошло успешно ');
        alert('Обращение к серверу прошло успешно ');
        this.update$.next(true);
        this.removeItem(todo);
      },
      error: (error) => {
        console.error('Ошибка в подключении к серверу:', error);
        alert('Ошибка в подключении к серверу:');
      }
    });
  }

  removeItem(todo: ITodo) {
    if (!todo.id) {
      this.list = this.list.filter(t => t !== todo);
      return;
    }

    const id = todo.id;

    this.http.removeTodo(todo.id).subscribe({
      next: () => {
        console.log('Обращение к серверу прошло успешно ');
        alert('Обращение к серверу прошло успешно ');
        this.update$.next(true);
      },
      error: (error) => {
        console.error('Ошибка в подключении к серверу:', error);
        alert('Ошибка в подключении к серверу:');
      }
    });
  }
}
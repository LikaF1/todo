import { ITodo } from './todo.interface';
import { HttpService } from './http.service';
import { Observable} from 'rxjs';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {

  title = 'todo';
  list: ITodo[] = [];
  list$: Observable<ITodo[]>  = this.http.getList();

  constructor(private http: HttpService) {}

  addItem() {
    this.list.push({
      name: '',
      description: '',
    });
  }

  saveItem(todo: ITodo) {
    this.http.saveTodo(todo).subscribe(
      (t) => {
        console.log('Обращение к серверу прошло успешно '+ t);
        alert('Обращение к серверу прошло успешно ');
      },
      (error) => {
        console.error('Ошибка в подключении к серверу:', error);
        alert('Ошибка в подключении к серверу:');
      }
    );
  }

  removeItem(id?: number) {
    if (id) {
      this.http.removeTodo(id).subscribe(
        (t) => {
          this.http.removeTodo(id);
          console.log('Обращение к серверу прошло успешно ' + t);
          alert('Обращение к серверу прошло успешно ');
        }
        ,(error) => {
          console.error('Ошибка в подключении к серверу:', error);
          alert('Ошибка в подключении к серверу:');
        }
      );
    } else {
      this.list = this.list.filter(todo => todo.id !== id);
    }
  }
}
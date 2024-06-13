import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ITodo } from './todo.interface';
import { HttpService } from './http.service';
import { CommonModule } from '@angular/common';
import { Observable} from 'rxjs';
import { TodoComponent } from '../components/todo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'todo';
  list: ITodo[] = [];
  list$: Observable<ITodo[]> = this.http.getList();

  constructor(private http: HttpService) {}

  addItem() {
    this.list.push({
      name: '', description: '',
    });
  }

  saveItem(todo: ITodo) {
    this.http.saveTodo(todo).subscribe((t) => console.log(t));
  }

  removeItem(id?: number) {
    if (id) {
      this.http.removeTodo(id).subscribe((t) => console.log(t));
    } else {
      this.list = this.list.filter(todo => todo.id !== id);
    }
  }
}
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { ITodo } from './todo.interface';
import { HttpService } from './http.service';
import { CommonModule } from '@angular/common';

Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
});
export class AppComponent {
  title = 'todo';
  list: ITodo[] = [];
  list$ = this.http.getList();

  constructor(private http: HttpService){}

  addItem() {
    this.list.push({
      id: this.list.length + 1, name: 'Новая задача', description: 'Описание',
    });
  }
  SaveItem(id: number, name: string, description: string) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].id === id) {
        this.list[i].name = name;
        this.list[i].description = description;
        break;
      }
    }
  }
}

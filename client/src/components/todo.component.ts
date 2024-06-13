import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../app/todo.interface';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-todo',
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})

export class TodoComponent {
  @Input() todo!: ITodo;
  @Output() save = new EventEmitter<ITodo>();
  @Output() remove = new EventEmitter<void>();

  saveItem() {
    this.save.emit(this.todo);
  }

  removeItem() {
    this.remove.emit();
  }
}

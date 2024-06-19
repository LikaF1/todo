import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ITodo } from '../todo.interface';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  @Input() todo!: ITodo;
  @Output() save = new EventEmitter<ITodo>();
  @Output() remove = new EventEmitter<void>();
  @ViewChild('name') name!: NgModel;
  @ViewChild('description') description!: NgModel;


  saveItem() {
    this.save.emit(this.todo);
    this.#reset();
  }

  removeItem() {
    this.remove.emit();
  }

  #reset() {
    this.name.control.markAsPristine();
    this.name.control.markAsUntouched();
    this.description.control.markAsPristine();
    this.description.control.markAsUntouched();
  }
}

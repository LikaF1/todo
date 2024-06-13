import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from './todo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getList(): Observable<ITodo[]> {
    return this.http.post<ITodo[]>('/api/list', undefined);
  }

  saveTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>('/api/add', todo);
  }

  removeTodo(id: number): Observable<ITodo> {
    return this.http.post<ITodo>('/api/list', {id});
  }
}

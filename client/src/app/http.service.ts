import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from './todo.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  constructor(private http: HttpClient) {}

  getList(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>('/list');
  }

}

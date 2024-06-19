import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodo } from './todo.interface';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getList(): Observable<ITodo[]> {
    return this.http.post<ITodo[]>('/api/list', undefined).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  saveTodo(todo: ITodo): Observable<ITodo> {
    return this.http.post<ITodo>('/api/add', todo).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  removeTodo(id: number): Observable<any> {
    return this.http.post<any>('/api/remove', { id }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  serviceUrl: string = '';

  constructor(private http: HttpClient) {
    this.serviceUrl = 'http://localhost:8080/api/';
  }

  addTask(task: Task): Observable<Task> {
    const userJsonString = localStorage.getItem('user');
    let user = null;
    if (userJsonString != null) {
      user = JSON.parse(userJsonString);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.post<Task>(
      this.serviceUrl + 'add',
      { task: task, userId: user.userId },
      httpOptions
    );
  }
  getTasks(): Observable<Task[]> {
    const userJsonString = localStorage.getItem('user');
    let user = null;
    if (userJsonString != null) {
      user = JSON.parse(userJsonString);
    }
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
      params: new HttpParams().set('userId', user.userId),
    };
    return this.http.get<Task[]>(this.serviceUrl + 'getTasks', httpOptions);
  }
  editTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.put<Task>(
      this.serviceUrl + 'edit/' + task.id,
      task,
      httpOptions
    );
  }
  deleteTask(task: Task): Observable<Task> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }),
    };
    return this.http.delete<Task>(
      this.serviceUrl + 'delete/' + task.id,
      httpOptions
    );
  }
}

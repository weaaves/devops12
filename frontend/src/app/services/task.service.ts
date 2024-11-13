import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://127.0.0.1:8000/api/tasks/';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, data);
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

  getTaskById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  updateTaskAssignees(taskId: number, userIds: number[]): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/${taskId}/`, { assigned_user_ids: userIds });
  }

  addComment(taskId: number, content: string) {
    return this.http.post(`http://127.0.0.1:8000/api/comments/`, { task: taskId, content });
  }

}

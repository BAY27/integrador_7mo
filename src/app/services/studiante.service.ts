import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudianteService {

  private apiUrl = 'http://localhost'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiantes.php/all`);
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/students`, student);
  }

  updateStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/estudiantes.php?action=update`, student);
  }

  deleteStudent(codestudiante: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/students/${codestudiante}`);
  }
}

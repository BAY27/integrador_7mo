import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudianteService {

  private apiUrl = 'http://localhost/WsBuses24'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getStudents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estudiantes.php/all`);
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/estudiantes.php`, student);
  }

  updateStudent(student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/estudiantes.php`, student);
  }

  deleteStudent(codestudiante: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/estudiantes.php?codestudiante=${codestudiante}`);
  }
}

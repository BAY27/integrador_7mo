import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bus {
  codbus: number;
  placa: string;
  color: string;
  marca: string;
  modelo: string;
  numeroasientos: number;
}

@Injectable({
  providedIn: 'root',
})
export class BusService {
  private apiUrl = 'http://localhost/buses.php'; // Replace with your API URL

  constructor(private http: HttpClient) {}

   getBuses(): Observable<any> {
    return  this.http.get(`${this.apiUrl}/all`);
  }

   createBus(bus: Bus): Observable<any> {
    return this.http.post(this.apiUrl, bus);
  }

   updateBus(bus: Bus): Observable<any> {
    return this.http.put(this.apiUrl, bus);
  }

   deleteBus(codbus: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}?codbus=${codbus}`);
  }
}

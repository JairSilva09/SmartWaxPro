import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private uri = 'https://nodeapp-ixbvpvjrjz.now.sh/appointments/set';
  constructor(private http: HttpClient) { }
  setAppointments(data): void {
    data = data.split(',');
    const obj = {
        zipcode: data[0],
        firstName: data[1],
        lastName: data[2],
        address: data[3],
        address2: data[4],
        city: data[5],
        state: data[6],
        postalCode: data[7]
      }
    this.http.post(this.uri, obj).subscribe(res => console.log('Done'));
  }
  getAppointments(): Observable<Object> {
    return this
      .http
      .get(`${this.uri}/appointments`);
  }
}

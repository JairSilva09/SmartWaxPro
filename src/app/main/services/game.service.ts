import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  private uri = 'https://nodeapp-ngcclufnxt.now.sh/games/add';
  // private uri = 'https://nodeappcesar.herokuapp.com/games/add';
  constructor(private http: HttpClient) { }

  addGame(name , price): void {
    const obj =  {
      name: name,
      price: price
    };
    // const headers = new HttpHeaders();
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');
    // headers.append('Access-Control-Allow-Methods', 'GET');
    // headers.append('Access-Control-Allow-Origin', '*');
    this.http.post(this.uri, obj).subscribe(res => console.log('Done'));
  }

  getGames(): Observable<Object> {
    return this
           .http
           .get(`${this.uri}/games`);
}
}

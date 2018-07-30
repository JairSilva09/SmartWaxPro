import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private uri = 'https://nodeapp-ixbvpvjrjz.now.sh/games/add';
  constructor(private http: HttpClient) { }
  addGame(name, price): void {
    const obj = {
      name: name,
      price: price
    };
    this.http.post(this.uri, obj).subscribe(res => console.log('Done'));
  }
  getGames(): Observable<Object> {
    return this
      .http
      .get(`${this.uri}/games`);
  }
}

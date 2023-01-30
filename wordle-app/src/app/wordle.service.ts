import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordleService {
  public baseUrl = "http://127.0.0.1:5000";

  constructor(private http: HttpClient) { }

  getWord(): Observable<any> {
    return this.http.get(this.baseUrl + "/get_word");
  }
}

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

  getTries(): Observable<any> {
    return this.http.get(this.baseUrl + "/get_tried_words");
  }

  submitTry(tryWord: string): Observable<any> {
    return this.http.post(this.baseUrl + "/guess/" + tryWord, {});
  }

  reset(): Observable<any> {
    return this.http.post(this.baseUrl + "/reset", {});
  }
}
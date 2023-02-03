import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordleService { // Service to handle all the requests to the backend
  public baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {} // Inject HttpClient into your component or service.

  getWord(): Observable<any> { // Get the word from the backend
    return this.http.get(this.baseUrl + '/get_word');
  }

  getTries(): Observable<any> { // Get the tried words from the backend
    return this.http.get(this.baseUrl + '/get_tried_words');
  }

  submitTry(tryWord: string): Observable<any> { // Submit a try to the backend
    return this.http.post(this.baseUrl + '/guess/' + tryWord, {});
  }

  reset(): Observable<any> { // Reset the game
    return this.http.get(this.baseUrl + '/new_game');
  }

  getCorrectLetters(word: string): Observable<any> { // Get the correct letters from the backend
    return this.http.post(this.baseUrl + '/get_correct_letters/' + word, {});
  }

  getMisplacedLetters(word: string): Observable<any> { // Get the misplaced letters from the backend
    return this.http.post(this.baseUrl + '/get_misplaced_letters/' + word, {});
  }

  getIncorrectLetters(word: string): Observable<any> { // Get the incorrect letters from the backend
    return this.http.post(this.baseUrl + '/get_incorrect_letters/' + word, {});
  }

  getNumberOfTries(): Observable<any> { // Get the number of tries from the backend
    return this.http.get(this.baseUrl + '/get_guess_count');
  }

  getTriesList(): Observable<any> { // Get the list of tries from the backend
    return this.http.get(this.baseUrl + '/get_tries');
  }

  isValidWord(word:string): Observable<any> { // Check if the word is valid
    return this.http.post(this.baseUrl + '/is_valid_word/' + word, {});
  }
}

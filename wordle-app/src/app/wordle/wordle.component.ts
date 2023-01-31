import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { WordleService } from '../wordle.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.scss']
})
export class WordleComponent {
  WordControl = new FormControl('');

  constructor(private ws: WordleService) { }

  word: string = "nancy";
  tries: string[] = [];
  correctLettersPosition = [];
  correctLetters: string[] = [];
  letters: string[] = Array.from(this.word);
  error: string = "";
  correct: string = "false";
  

  click(value: string) {

    // if value is 5 characters long, it's a valid word
    if (value.length == 5) {
      this.ws.submitTry(value).subscribe((data: any) => {
        this.tries = data['tried_words'];
        this.correctLettersPosition = data['correct_letters'];
        this.correct = data['correct'];
        this.error = data.body;
      });
    } else {
      this.error = "Word must be 5 characters long";
    }
    for (let i = 0; i < this.correctLettersPosition.length; i++) {
      this.correctLetters.push(this.word[this.correctLettersPosition[i]]);
    }
  }

  ngOnInit() {

  }

}

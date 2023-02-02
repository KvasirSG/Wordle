import { Component, ElementRef, HostListener, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { WordleService } from '../wordle.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent {
  WordControl = new FormControl('');

  constructor(private ws: WordleService) { }

  word: string = "";
  triedWords: string[] = [];
  triesList: [text: string, correctLettersPosition: number[], misplacedLettersPosition: number[]][] = [];
  feedback: string[] = [];
  numberOfTries: number = 0;
  correctLettersPosition: number[] = [];
  misplacedLettersPosition: number[] = [];
  correctLetters: string[] = [];
  misplacedLetters: string[] = [];
  letters: string[] = [];
  error: string = "";
  correct: boolean = false;
  debug: boolean = false;
  typedword: string[]= [];

  keyboardrow1: string[][] = [['q','','idle'], ['w','','idle'], ['e','','idle'], ['r','','idle'], ['t','','idle'], ['y','','idle'], ['u','','idle'], ['i','','idle'], ['o','','idle'], ['p','','idle']];
  keyboardrow2: string[][] = [['a','','idle'], ['s','','idle'], ['d','','idle'], ['f','','idle'], ['g','','idle'], ['h','','idle'], ['j','','idle'], ['k','','idle'], ['l','','idle']];
  keyboardrow3: string[][] = [['enter','wide-button', 'idle'],['z','','idle'], ['x','','idle'], ['c','','idle'], ['v','','idle'], ['b','','idle'], ['n','','idle'], ['m','','idle'], ['del','wide-button', 'idle']];
  keyboardrows: string[][][] = [this.keyboardrow1, this.keyboardrow2, this.keyboardrow3];
  

  click(value: string) {

    // if value is 5 characters long, it's a valid word
    if (value.length == 5) {
      this.ws.isValidWord(value).subscribe((data: any) => {
        if (!data['valid']) {
          this.error = "Word is not valid";
          this.resetKeyboard()
          this.updateKeyboard();
        }
        else{
          this.ws.submitTry(value).subscribe((data: any) => {
            this.triesList = data['tries'];
            this.numberOfTries = data['guess_count'];
            this.correctLetters = data['correct_letters'];
            this.misplacedLetters = data['misplaced_letters'];
            this.correctLettersPosition = data['correct_letters_pos'];
            this.misplacedLettersPosition = data['misplaced_letters_pos'];
            this.correct = data['correct'];
            this.error = data['error'];
            if (!data['correct']) {
              this.updateKeyboard();
            }
            this.correct = data['correct'];
          });
        }
      });

      
    } else {
      this.error = "Word must be 5 characters long";
    }
  }

  getError() {
    return this.error;
  }

  getStatus() {
    return this.correct;
  }

  getWord() {
    return this.word;
  }

  refreshWindow() {
    location.reload();
  }

  resetKeyboard() {
    for (let i = 0; i < this.keyboardrows.length; i++) {
      for (let j = 0; j < this.keyboardrows[i].length; j++) {
        this.keyboardrows[i][j][2] = 'idle';
      }
    }
  }

  updateKeyboard() {
    for (let i = 0; i < this.correctLetters.length; i++) {
      console.log(this.correctLetters[i])
      this.setKeyState(this.correctLetters[i], 'correct');
    }
    for (let i = 0; i < this.misplacedLetters.length; i++) {
      this.setKeyState(this.misplacedLetters[i], 'misplaced');
    }
  }
  reset() {
    this.ws.reset().subscribe((data: any) => {
      this.word = data['word'];
    });
    this.triesList = []
    this.triedWords = [];
    this.correctLettersPosition = [];
    this.correctLetters = [];
    this.numberOfTries = 0;
    this.error = "";
    this.correct = false;
    this.resetKeyboard();
  }

  debugToggle() {
    this.debug = !this.debug;
  }

  keyboard(key: string) {

    // if key in keyboardrows, keyboardrow is the row in which the key is located
    if (key != 'enter' && key != 'del') {
      this.setKeyState(key, 'active');
      if (this.typedword.length < 5) {
        console.log(key);
        this.typedword.push(key);
      }
    } else if (key == 'enter') {
      if (this.typedword.length == 5) {
        this.click(this.typedword.join(''));
        this.typedword = [];
      }
    } else if (key == 'del') {
      let delkey = this.typedword.pop();
      if (delkey) {
        this.setKeyState(delkey, 'idle');
      }
    }
    
  }

  setKeyState(key: string, state: string) {
    for (let i = 0; i < this.keyboardrows.length; i++) {
      for (let j = 0; j < this.keyboardrows[i].length; j++) {
        if (this.keyboardrows[i][j][0] == key) {
          this.keyboardrows[i][j][2] = state;
        }
      }
    }
  }

  ngOnInit() {
    this.ws.getWord().subscribe((data: any) => {
      this.word = data['word'];
      console.log(this.getWord());
      this.letters = this.word.split('');
    });

    this.ws.getTriesList().subscribe((data: any) => {
      this.triesList = data['tries'];
      for (let i = 0; i < this.triesList.length; i++) {
        this.numberOfTries += 1;
        if (this.triesList[i][1].length == 5) {
          this.correct = true;
        }
        for (let j = 0; j < this.triesList[i][0].length; j++) {
          if (this.triesList[i][1].includes(j)) {
            this.setKeyState(this.triesList[i][0][j], 'correct');
          } else if (this.triesList[i][2].includes(j)) {
            this.setKeyState(this.triesList[i][0][j], 'misplaced');
          } else {
            this.setKeyState(this.triesList[i][0][j], 'active');
          }
        }
      }
    });
  }

}

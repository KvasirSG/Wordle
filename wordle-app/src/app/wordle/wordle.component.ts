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

  constructor(private ws: WordleService) { } // inject WordleService into WordleComponent

  
  word: string = ""; // word to be guessed
  triedWords: string[] = []; // list of words already tried
  triesList: [text: string, correctLettersPosition: number[], misplacedLettersPosition: number[]][] = []; // list of tries with feedback
  feedback: string[] = []; // feedback for each try
  numberOfTries: number = 0; // number of tries
  correctLettersPosition: number[] = []; // position of correct letters
  misplacedLettersPosition: number[] = []; // position of misplaced letters
  correctLetters: string[] = []; // correct letters
  misplacedLetters: string[] = [];  // misplaced letters
  letters: string[] = []; // letters of the word to be guessed
  error: string = ""; // error message
  correct: boolean = false; // true if word is guessed
  debug: boolean = false; // true if debug mode is on
  typedword: string[]= []; // word typed by user

  // keyboard
  keyboardrow1: string[][] = [['q','','idle'], ['w','','idle'], ['e','','idle'], ['r','','idle'], ['t','','idle'], ['y','','idle'], ['u','','idle'], ['i','','idle'], ['o','','idle'], ['p','','idle']];
  keyboardrow2: string[][] = [['a','','idle'], ['s','','idle'], ['d','','idle'], ['f','','idle'], ['g','','idle'], ['h','','idle'], ['j','','idle'], ['k','','idle'], ['l','','idle']];
  keyboardrow3: string[][] = [['enter','wide-button', 'idle'],['z','','idle'], ['x','','idle'], ['c','','idle'], ['v','','idle'], ['b','','idle'], ['n','','idle'], ['m','','idle'], ['del','wide-button', 'idle']];
  keyboardrows: string[][][] = [this.keyboardrow1, this.keyboardrow2, this.keyboardrow3];
  
  // function to make a guess (called when user clicks on the button enter)
  guess(value: string) {

    // if value is 5 characters long, it's a valid word
    if (value.length == 5) {
      this.ws.isValidWord(value).subscribe((data: any) => {
        if (!data['valid']) { // if word is not valid, display error message
          this.error = "Word is not valid";
          this.resetKeyboard() // reset keyboard
          this.updateKeyboard(); // update keyboard
        }
        else{ // if word is valid, submit try
          this.ws.submitTry(value).subscribe((data: any) => {
            this.triesList = data['tries']; // update triesList
            this.numberOfTries = data['guess_count']; // update numberOfTries
            this.correctLetters = data['correct_letters']; // update correctLetters
            this.misplacedLetters = data['misplaced_letters']; // update misplacedLetters
            this.correctLettersPosition = data['correct_letters_pos']; // update correctLettersPosition
            this.misplacedLettersPosition = data['misplaced_letters_pos']; // update misplacedLettersPosition
            this.correct = data['correct']; // update correct
            this.error = data['error']; // update error
            if (!data['correct']) { // if word is not correct, update keyboard
              this.updateKeyboard(); // update keyboard
            }
            this.correct = data['correct']; // update correct
          });
        }
      });

      
    } else { // if value is not 5 characters long, it's not a valid word
      this.error = "Word must be 5 characters long";
    }
  }

  getError() { // get error message
    return this.error;
  }

  getStatus() { // get status of the game
    return this.correct;
  }

  getWord() { // get word to be guessed
    return this.word;
  }

  refreshWindow() { // refresh page
    location.reload();
  }

  resetKeyboard() { // reset keyboard
    for (let i = 0; i < this.keyboardrows.length; i++) {
      for (let j = 0; j < this.keyboardrows[i].length; j++) {
        this.keyboardrows[i][j][2] = 'idle';
      }
    }
  }

  updateKeyboard() { // update keyboard (set correct letters to green, and misplaced to orange)
    for (let i = 0; i < this.correctLetters.length; i++) {
      console.log(this.correctLetters[i])
      this.setKeyState(this.correctLetters[i], 'correct');
    }
    for (let i = 0; i < this.misplacedLetters.length; i++) {
      this.setKeyState(this.misplacedLetters[i], 'misplaced');
    }
  }
  reset() { // reset game
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

  debugToggle() { // toggle debug mode
    this.debug = !this.debug;
  }

  // function to handle keyboard input
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
        this.guess(this.typedword.join(''));
        this.typedword = [];
      }
    } else if (key == 'del') {
      let delkey = this.typedword.pop();
      if (delkey) {
        this.setKeyState(delkey, 'idle');
      }
    }
    
  }

  setKeyState(key: string, state: string) { // set state of key
    for (let i = 0; i < this.keyboardrows.length; i++) {
      for (let j = 0; j < this.keyboardrows[i].length; j++) {
        if (this.keyboardrows[i][j][0] == key) {
          this.keyboardrows[i][j][2] = state;
        }
      }
    }
  }

  ngOnInit() { // on init, get word and triesList
    this.ws.getWord().subscribe((data: any) => { // get word
      this.word = data['word']; // set word
      console.log(this.getWord()); // log word
      this.letters = this.word.split(''); // split word into letters
    });

    this.ws.getTriesList().subscribe((data: any) => { // get triesList
      this.triesList = data['tries']; // set triesList
      for (let i = 0; i < this.triesList.length; i++) { // loop through triesList
        this.numberOfTries += 1;
        if (this.triesList[i][1].length == 5) { // if all letters are correct, set correct to true
          this.correct = true;
        }
        for (let j = 0; j < this.triesList[i][0].length; j++) { // loop through letters in word
          if (this.triesList[i][1].includes(j)) { // if letter is correct, set state to correct
            this.setKeyState(this.triesList[i][0][j], 'correct');
          } else if (this.triesList[i][2].includes(j)) { // if letter is misplaced, set state to misplaced
            this.setKeyState(this.triesList[i][0][j], 'misplaced');
          } else { // if letter is not correct or misplaced, set state to active
            this.setKeyState(this.triesList[i][0][j], 'active');
          }
        }
      }
    });
  }

}

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

  keyboardrow1: string[][] = [['q','','false'], ['w','','false'], ['e','','false'], ['r','','false'], ['t','','false'], ['y','','false'], ['u','','false'], ['i','','false'], ['o','','false'], ['p','','false']];
  keyboardrow2: string[][] = [['a','','false'], ['s','','false'], ['d','','false'], ['f','','false'], ['g','','false'], ['h','','false'], ['j','','false'], ['k','','false'], ['l','','false']];
  keyboardrow3: string[][] = [['enter','wide-button'],['z','','false'], ['x','','false'], ['c','','false'], ['v','','false'], ['b','','false'], ['n','','false'], ['m','','false'], ['backspace','wide-button', 'false']];
  keyboardrows: string[][][] = [this.keyboardrow1, this.keyboardrow2, this.keyboardrow3];
  

  click(value: string) {

    // if value is 5 characters long, it's a valid word
    if (value.length == 5) {
      this.ws.submitTry(value).subscribe((data: any) => {
        this.triesList = data['tries'];
        this.numberOfTries = data['guess_count'];
        this.correctLetters = data['correct_letters'];
        this.misplacedLetters = data['misplaced_letters'];
        this.correctLettersPosition = data['correct_letters_pos'];
        this.misplacedLettersPosition = data['misplaced_letters_pos'];
        if (data['correct'] == "true") {
          this.correct = true;
        }
        this.correct = data['correct'];
      });
    } else {
      this.error = "Word must be 5 characters long";
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
  }

  debugToggle() {
    this.debug = !this.debug;
  }

  keyboard(key: string) {

    if (this.keyboardrows.includes(])){
      console.log(key);
    }
    
    if (this.typedword.length < 5) {
      console.log(key);
      this.typedword.push(key);
    }
  }

  ngOnInit() {
    this.ws.getWord().subscribe((data: any) => {
      this.word = data['word'];
      this.letters = this.word.split('');
    });

    this.ws.getTriesList().subscribe((data: any) => {
      this.triesList = data['tries'];
    });
  }

}

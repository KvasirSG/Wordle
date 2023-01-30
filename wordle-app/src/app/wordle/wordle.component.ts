import { Component } from '@angular/core';
import { WordleService } from '../wordle.service';

@Component({
  selector: 'app-wordle',
  templateUrl: './wordle.component.html',
  styleUrls: ['./wordle.component.css']
})
export class WordleComponent {

  constructor(private ws: WordleService) { }

  ngOnInit() {
    this.ws.getWord().subscribe((data) => {
      console.log(data["word"]);
    });
  }

}

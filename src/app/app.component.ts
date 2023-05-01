import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio';
}


function sort (raueme: Array<number>){
  for (let index = 0; index < raueme.length; index++) {
    if(raueme[index] > raueme[index + 1 ]){
      raueme[index + 1] = raueme[index];
    }
  }
}

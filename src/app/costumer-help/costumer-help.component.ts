import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-costumer-help',
  templateUrl: './costumer-help.component.html',
  styleUrls: ['./costumer-help.component.css']
})
export class CostumerHelpComponent implements OnInit {
  
  public report_text = "";
  public page = 0;
  constructor() { }

  ngOnInit() {
  }
  Exit(){
    this.page = 0;
  }
  Send(){
    console.log(this.report_text);
    this.page = 2;
  }

}

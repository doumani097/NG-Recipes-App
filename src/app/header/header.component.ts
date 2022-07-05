import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() Navigator = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  Navigate(page: string){
    this.Navigator.emit(page);
  }

}

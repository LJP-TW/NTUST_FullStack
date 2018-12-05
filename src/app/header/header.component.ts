import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

<<<<<<< HEAD
  constructor(public categoryService:CategoryService) { }
=======
  constructor(public authService: AuthService) { }
>>>>>>> master

  ngOnInit() {
  }

}

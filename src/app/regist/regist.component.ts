import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  name: string;
  pwd: string;
  rpwd: string;
  email: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  register() {
    if (this.authService.Register(this.name, this.pwd, this.email)) {
      console.log('Register success');
    } else {
      console.log('Register fail');
    }
  }
}

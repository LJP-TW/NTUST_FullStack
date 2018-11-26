import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

interface RegisterResponse {
  status: boolean;
}

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.Register(this.user).subscribe((data: RegisterResponse) => {
      console.log(data);
      if (data.status) {
        this.router.navigate(['/auth/login']);
      } else {
        alert('fail');
      }
    }, (error: RegisterResponse) => {
      alert('fail');
    });
  }
}

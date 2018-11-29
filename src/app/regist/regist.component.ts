import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

interface Message {
  email: string;
}

interface RegisterResponse {
  status: boolean;
  message: Message;
}

interface RegisterError {
  error: RegisterResponse;
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

  invalid = false;
  email_invalid = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.LoggedInRedirect();
  }

  register() {
    this.invalid = false;
    this.email_invalid = false;

    this.authService.Register(this.user).subscribe((data: RegisterResponse) => {
      if (data.status) {
        this.router.navigate(['/auth/login']);
      } else {
        alert('fail');
      }
    }, (error: RegisterError) => {
      this.invalid = true;
      if (typeof error.error.message.email !== 'undefined') {
        this.email_invalid = true;
      }

      this.user.password = '';
      this.user.confirm_password = '';
    });
  }
}

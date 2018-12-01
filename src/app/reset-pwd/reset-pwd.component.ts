import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Message {
  email: string;
  token: string;
}

interface ResetPwdResponse {
  status: boolean;
  message: Message;
}

interface ResetPwdError {
  error: ResetPwdResponse;
}

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit, OnDestroy {

  user = {
    email: '',
    token: '',
    password: '',
    confirm_password: '',
  };

  // Subscribe for activatedRoute
  sub: any;

  invalid = false;
  token_invalid = false;
  email_invalid = false;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.activatedRoute.params.subscribe(params => {
      this.user.token = params['token'];
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  resetPwd() {
    this.invalid = false;
    this.token_invalid = false;
    this.email_invalid = false;

    this.authService.ResetPwd(this.user).subscribe((data: ResetPwdResponse) => {
      if (data.status) {
        this.authService.Logout();
      } else {
        alert('fail');
      }
    }, (error: ResetPwdError) => {
      this.invalid = true;
      if (typeof error.error.message.token !== 'undefined') {
        this.token_invalid = true;
      } else if (typeof error.error.message.email !== 'undefined') {
        this.email_invalid = true;
      }

      this.user.password = '';
      this.user.confirm_password = '';
    });
  }
}

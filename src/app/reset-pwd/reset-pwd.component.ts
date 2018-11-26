import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

interface Message {
  password: string;
  token: string;
}

interface ResetPwdResponse {
  status: boolean;
  message: Message;
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

  // Subscribe
  sub: any;

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
    this.authService.ResetPwd(this.user).subscribe((data: ResetPwdResponse) => {
      if (data.status) {
        this.authService.Logout().subscribe((logoutData) => {
        });
        this.router.navigate(['/auth/login']);
      } else {
        alert('fail');
      }
    }, (error) => {
      alert('fail');
    });
  }
}

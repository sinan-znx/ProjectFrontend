import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FlashMessagesService } from '../../services/flash-message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private router: Router,
    private flashMsg: FlashMessagesService
  ) {}
  userCred = {
    email: '',
    password: '',
  };

  ngOnInit(): void {}
  loginClicked() {
    let user = this.userCred;
    this.auth.login(user).subscribe((res) => {
      console.log(res);

      if (res.success) {
        localStorage.setItem('token_id', res.token);
        localStorage.setItem('user_id', res.user.id);
        localStorage.setItem('isAdmin', res.isAdmin);
        this.router.navigate(['/']);
        this.flashMsg.show('Login Successfull', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
      } else {
        this.flashMsg.show(res.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      }
    });
  }
}

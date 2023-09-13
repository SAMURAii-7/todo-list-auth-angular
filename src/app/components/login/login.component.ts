import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() loginStatus: EventEmitter<boolean> = new EventEmitter();
  title: string = 'Todo List';
  isLogin: boolean = true;
  loginEmail: string = '';
  loginPassword: string = '';
  registerEmail: string = '';
  registerUsername: string = '';
  registerPassword: string = '';
  user: User = new User();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loginEmail = '';
    this.loginPassword = '';
    this.registerEmail = '';
    this.registerUsername = '';
    this.registerPassword = '';
    this.user = new User();
  }

  onLoginSubmit() {
    this.user.email = this.loginEmail;
    this.user.password = this.loginPassword;
    this.authService.loginUser(this.user).subscribe((res) => {
      this.ngOnInit();
      localStorage.setItem('user', JSON.stringify(res.user)); // send user body from backend
      localStorage.setItem('token', res.token);
      this.sendLoginStatus();
    });
  }

  onRegisterSubmit() {
    this.user.email = this.registerEmail;
    this.user.username = this.registerUsername;
    this.user.password = this.registerPassword;
    this.authService.registerUser(this.user).subscribe(() => {
      this.ngOnInit();
    });
  }

  sendLoginStatus() {
    this.loginStatus.emit(true);
  }
}

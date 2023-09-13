import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn() {
    const authToken = localStorage.getItem('token');
    if (authToken !== null) {
      this.isLoggedIn = true;
      this.authService.verifyToken(authToken).subscribe(() => {});
    } else {
      localStorage.removeItem('token');
      this.isLoggedIn = false;
    }
  }

  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn = false;
  }

  receiveLoginStatus($event: boolean) {
    this.isLoggedIn = $event;
  }

  getUsername() {
    const userJsonString = localStorage.getItem('user');
    let user = null;
    if (userJsonString != null) {
      user = JSON.parse(userJsonString);
    }
    return user.username;
  }
}

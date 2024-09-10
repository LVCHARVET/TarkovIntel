import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone : true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  pwd: string = '';

  constructor(private router: Router) {}

  onLogin() {
    if (this.login === 'y' && this.pwd === 'y') {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials');
    }
  }
}

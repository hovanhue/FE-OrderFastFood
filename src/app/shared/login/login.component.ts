import { Component, OnInit } from '@angular/core';
import {AutheService} from '../../service/authe.service';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  name = 'name';
  constructor(private authService: AutheService,
              private token: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.token.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
    }
  }

  onSubmit(): void{
    this.authService.login(this.form).subscribe(data => {
      this.token.saveToken(data.accessToken);
      console.log(data.accessToken);
      this.token.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.token.getUser().roles;
      this.reloadPage();
    }, error => {
      this.errorMessage = 'Thông tin đăng nhập không hợp lệ';
      this.isLoginFailed = true;
    });
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  reloadPage(): void {
    if (this.roles.includes('ROLE_ADMIN')){
      this.router.navigateByUrl('/admin');
      return;
    }

    if (this.roles.includes('ROLE_USER')){
      this.router.navigateByUrl('/');
      return;
    }
  }
}

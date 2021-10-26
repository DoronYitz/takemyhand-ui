import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { UserDataService } from '../services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMsg: string;

  profileForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern('^\\d{10}$')]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userData: UserDataService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.authService.login(form.value.phone, form.value.password).subscribe(
      (data: any) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);
        this.userData.onChange();
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMsg = err?.error?.message;
        if (!this.errorMsg) {
          this.errorMsg = 'משהו השתבש, נסה שנית מאוחר יותר';
        }
      }
    );
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get password() {
    return this.profileForm.get('password');
  }
}

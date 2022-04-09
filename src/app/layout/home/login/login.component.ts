import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { UserDataService } from 'src/app/core/services/user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  /**
   * Hide password
   */
  public hidePassword = true;
  /**
   * error msg from login route
   */
  public errorMsg: string;
  /**
   * loading bool
   */
  public loading = false;

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
    this.loading = true;
    this.authService.login(form.value.phone, form.value.password).subscribe(
      (data: any) => {
        this.loading = false;
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveRefreshToken(data.refreshToken);
        this.tokenStorage.saveUser(data);
        this.userData.onChange();
        this.router.navigate(['/']);
      },
      (err) => {
        this.loading = false;
        this.errorMsg =
          err?.error?.message ?? 'משהו השתבש, נסה שנית מאוחר יותר';
      }
    );
  }

  /**
   * Phone getter
   */
  get phone() {
    return this.profileForm.get('phone');
  }

  /**
   * Password getter
   */
  get password() {
    return this.profileForm.get('password');
  }
}

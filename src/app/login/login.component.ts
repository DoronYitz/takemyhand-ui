import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  errorMsg: string;

  profileForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.authService.login(form.value.phone, form.value.password).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/']);
      },
      (err) => {
        this.errorMsg = err?.error?.message;
        if (!this.errorMsg) {
          this.errorMsg = 'Something went wrong';
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

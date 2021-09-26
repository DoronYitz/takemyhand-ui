import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;

  profileForm = this.fb.group({
    phone: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm): void {
    this.authService.login(form.value.phone, form.value.password);
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  get password() {
    return this.profileForm.get('password');
  }
}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddEventComponent implements OnInit {
  public hide: boolean = true;
  private strongSecretRegex = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$'
  );

  profileForm = this.fb.group({
    title: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    category: ['', [Validators.required]],
    date: ['', [Validators.required]],
    active: [false],
    secret: [
      '',
      [Validators.required, Validators.pattern(this.strongSecretRegex)],
    ],
    description: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form.value);
  }

  get secret() {
    return this.profileForm.get('secret');
  }

  get title() {
    return this.profileForm.get('title');
  }

  get description() {
    return this.profileForm.get('description');
  }

  get date() {
    return this.profileForm.get('date');
  }

  get category() {
    return this.profileForm.get('category');
  }
}

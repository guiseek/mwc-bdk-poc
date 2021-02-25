import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mwc-angular-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form = this.builder.group({
    name: ['oi', [
      Validators.required
    ]],
  });
  constructor(readonly builder: FormBuilder) {
    window.setTimeout(() => {
      this.form.get('name').disable()
      window.setTimeout(() => {
        this.form.get('name').enable()
      }, 10000)
    }, 5000)
  }

  ngOnInit(): void {}
  onValueChange(value?: any) {
    console.log(value);
  }
}

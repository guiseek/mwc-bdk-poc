import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'mwc-angular-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form = this.builder.group({
    name: [{ value: 'Gui', disabled: true }],
  });
  constructor(readonly builder: FormBuilder) {
    window.setTimeout(() => {
      this.form.get('name').enable()
      window.setTimeout(() => {
        this.form.get('name').disable()
        window.setTimeout(() => {
          this.form.get('name').enable()
        }, 2500)
      }, 2500)
    }, 2500)
  }

  ngOnInit(): void {}
  onValueChange(value?: any) {
    console.log(value);
  }
}

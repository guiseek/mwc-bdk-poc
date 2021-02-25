import { Component, OnInit } from '@angular/core'
import { Formfield } from '@material/mwc-formfield'

@Component({
  selector: 'mwc-formfield',
  templateUrl: './formfield.component.html',
  styleUrls: ['./formfield.component.scss'],
})
export class FormfieldComponent {
  component = new Formfield()
}

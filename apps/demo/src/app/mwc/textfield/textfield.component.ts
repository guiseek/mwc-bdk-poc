import {
  Self,
  Inject,
  Output,
  Optional,
  Component,
  HostListener,
  EventEmitter,
  HostBinding,
  ChangeDetectorRef,
  AfterContentInit,
  ChangeDetectionStrategy,
} from '@angular/core'
import { NgControl } from '@angular/forms'
import { TextField } from '@material/mwc-textfield'
import { AbstractFormControl } from '@mwc-angular/bdk'

@Component({
  template: '',
  selector: 'mwc-textfield',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldComponent
  extends AbstractFormControl<string>
  implements AfterContentInit {
  component: TextField = new TextField()

  private _value: any = ''
  get value(): any {
    return this._value
  }
  @HostBinding('attr.value')
  set value(value: any) {
    this._value = value
  }

  @Output() valueChange = new EventEmitter()
  @HostListener('input', ['$event.target'])
  onValueChange({ value = '' }: HTMLInputElement) {
    this.valueChange.emit(value)
    this.control.setValue(value)
  }

  constructor(
    @Inject(NgControl)
    @Optional()
    @Self()
    ngControl: NgControl | null,
    @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef
  ) {
    super(ngControl, changeDetectorRef)
  }

  ngAfterContentInit(): void {
    this.value = this.control.value ?? this.getBackValue()
  }

  get focused(): boolean {
    return !!this.component
  }
  getBackValue(): string {
    return ''
  }
}

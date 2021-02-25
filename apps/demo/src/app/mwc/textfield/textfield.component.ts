import {
  Self,
  Input,
  Output,
  Optional,
  Component,
  HostListener,
  EventEmitter,
  HostBinding,
  Renderer2,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { TextField } from '@material/mwc-textfield';

@Component({
  selector: 'mwc-textfield',
  template: '',
})
export class TextfieldComponent implements ControlValueAccessor {
  component: TextField = new TextField();

  private _disabled: boolean;
  @Input('disabled')
  @HostBinding('attr.disabled')
  public get disabled(): boolean {
    return this._disabled;
  }
  public set disabled(value: boolean) {
    this._disabled = value;
  }

  private _value: any;
  @Input('value')
  @HostBinding('attr.value')
  public get value(): any {
    return this._value;
  }
  public set value(value: any) {
    this._value = value;
  }

  @Output() valueChange = new EventEmitter();
  @HostListener('input', ['$event.target'])
  onValueChange({ value }: HTMLInputElement) {
    this.valueChange.emit(value ? value : '');
    this.ngControl.control.setValue(value);
    this.value = value;
  }

  constructor(
    readonly renderer: Renderer2,
    readonly elementRef: ElementRef,
    @Optional() @Self() readonly ngControl: NgControl
  ) {
    this.ngControl.valueAccessor = this;
  }

  onChange(v: any): void {}
  onTouched(v: any): void {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }
}

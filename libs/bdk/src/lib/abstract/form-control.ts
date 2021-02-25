import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NgControl,
  NgModel,
} from '@angular/forms'
import { mwcAssert } from '../classes'
import { EMPTY_FUNCTION } from '../constants'
import { DefaultProp } from '../decorators'
import { backValue } from '../utils/miscellaneous'
import { merge, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { AbstractFormInteractive } from './form-interactive'

/**
 * Basic abstraction class ControlValueAccessor
 * for basic use in building form components
 */
@Directive()
export abstract class AbstractFormControl<T>
  extends AbstractFormInteractive
  implements OnDestroy, OnInit, ControlValueAccessor {
  private previousInternalValue?: T | null

  private onTouched = EMPTY_FUNCTION

  private onChange = EMPTY_FUNCTION

  protected readonly backValue = this.getBackValue()

  protected readonly destroy$ = new Subject<void>()

  @Input()
  @HostBinding('class.readonly')
  @DefaultProp()
  readOnly = false

  @Input()
  @DefaultProp()
  pseudoInvalid: boolean | null = null

  protected constructor(
    protected readonly ngControl: NgControl | null,
    protected readonly changeDetectorRef: ChangeDetectorRef
  ) {
    super()

    if (this.ngControl === null) {
      mwcAssert.assert(
        false,
        `NgControl not injected in ${this.constructor.name}!\n`,
        'Use [(ngModel)] or [formControl] or formControlName for correct work.'
      )
    } else {
      this.ngControl.valueAccessor = this
    }
  }

  @HostBinding('class.invalid')
  get computedInvalid(): boolean {
    return (
      !this.readOnly &&
      !this.disabled &&
      (this.pseudoInvalid !== null
        ? this.pseudoInvalid
        : this.touched && this.invalid)
    )
  }

  get value(): T {
    return backValue<T>(this.previousInternalValue, this.backValue)
  }

  get safeCurrentValue(): T {
    return backValue<T>(this.rawValue, this.backValue)
  }

  get invalid(): boolean {
    return this.safeNgControlData<boolean>(({ invalid }) => invalid, false)
  }

  get valid(): boolean {
    return this.safeNgControlData<boolean>(({ valid }) => valid, false)
  }

  get touched(): boolean {
    return this.safeNgControlData<boolean>(({ touched }) => touched, false)
  }

  get disabled(): boolean {
    return this.safeNgControlData<boolean>(({ disabled }) => disabled, false)
  }

  get control(): AbstractControl | null {
    return this.safeNgControlData<AbstractControl | null>(
      ({ control }) => control,
      null
    )
  }

  get computedName(): string | number | null {
    return this.controlName
  }

  protected get controlName(): string | number | null {
    return this.ngControl && this.ngControl.name
  }

  private get rawValue(): T | undefined {
    const { ngControl } = this

    if (ngControl === null) {
      return undefined
    }

    return ngControl instanceof NgModel &&
      this.previousInternalValue === undefined
      ? ngControl.viewModel
      : ngControl.value
  }

  ngOnInit() {
    if (
      !this.ngControl ||
      !this.ngControl.valueChanges ||
      !this.ngControl.statusChanges
    ) {
      return
    }

    merge(this.ngControl.valueChanges, this.ngControl.statusChanges)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshLocalValue(this.safeCurrentValue)
      })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }

  checkControlUpdate() {
    this.changeDetectorRef.markForCheck()
  }

  registerOnChange(onChange: (value: T) => void) {
    this.onChange = onChange
  }

  registerOnTouched(onTouched: () => void) {
    this.onTouched = onTouched
  }

  setDisabledState() {
    this.checkControlUpdate()
  }

  writeValue(value: T | null) {
    this.refreshLocalValue(
      this.ngControl instanceof NgModel &&
        this.previousInternalValue === undefined
        ? this.ngControl.model
        : value
    )
  }

  protected abstract getBackValue(): T

  protected updateFocused(focused: boolean) {
    if (!focused) {
      this.controlMarkAsTouched()
    }

    super.updateFocused(focused)
  }

  protected updateValue(value: T) {
    if (this.disabled || this.valueIdenticalComparator(this.value, value)) {
      return
    }

    this.previousInternalValue = value
    this.controlSetValue(value)
  }

  protected valueIdenticalComparator(oldValue: T, newValue: T): boolean {
    return oldValue === newValue
  }

  private safeNgControlData<T>(
    extractor: (ngControl: NgControl) => T | null | undefined,
    defaultFieldValue: T
  ): T {
    return backValue<T>(
      this.ngControl && extractor(this.ngControl),
      defaultFieldValue
    )
  }

  private controlMarkAsTouched() {
    this.onTouched()
    this.checkControlUpdate()
  }

  private controlSetValue(value: T) {
    this.onChange(value)
    this.checkControlUpdate()
  }

  private refreshLocalValue(value: T | null) {
    this.previousInternalValue = value
    this.checkControlUpdate()
  }
}

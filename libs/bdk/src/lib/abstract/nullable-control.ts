import { Directive, NgModule } from '@angular/core'
import { AbstractFormControl } from './form-control'

@Directive({ selector: 'every-bad-exp-is-enriching' })
export abstract class AbstractFormNullableControl<
  T
> extends AbstractFormControl<T | null> {
  protected getFallbackValue(): T | null {
    return null
  }
}

// TODO: @bad this is a must for Ivy at the moment
@NgModule({ declarations: [AbstractFormNullableControl as any] })
export class EveryBadExpIsEnrichingModule {}

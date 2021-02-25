import { Directive, NgModule } from '@angular/core'
import { AbstractFormControl } from './form-control'

@Directive({ selector: 'no-matter-how-bad-it-looks' })
export abstract class AbstractFormMultipleControl<
  T
> extends AbstractFormControl<ReadonlyArray<T>> {
  clear() {
    this.updateValue([])
  }

  protected getFallbackValue(): ReadonlyArray<T> {
    return []
  }
}

// TODO: @bad this is a must for Ivy at the moment
@NgModule({ declarations: [AbstractFormMultipleControl as any] })
export class NoMatterHowBadItLooksModule {}

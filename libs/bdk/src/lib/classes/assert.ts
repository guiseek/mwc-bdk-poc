import { isDevMode } from '@angular/core'
import { EMPTY_FUNCTION } from '../constants'

/**
 * This class is needed for its getter functionality, so we check
 * for DevMode only after application is bootstrapped
 */
export class MwcAssertHelper {
  bootstrapped = false

  get assert(): (assertion: boolean, ...args: any[]) => void {
    return !this.bootstrapped || !isDevMode()
      ? EMPTY_FUNCTION
      : Function.prototype.bind.call(console.assert, console)
  }
}

export const mwcAssert = new MwcAssertHelper()

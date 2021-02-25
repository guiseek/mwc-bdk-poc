import {
  Input,
  Output,
  Directive,
  EventEmitter,
  HostBinding,
} from '@angular/core'
import { DefaultProp } from '../decorators'
import { backValue } from '../utils/miscellaneous'

const MWC = 'mwc_interactive_'

/**
 * The most basic class for
 * interactive components
 */
@Directive()
export abstract class AbstractFormInteractive {
  private readonly autoIdString: string

  private static autoId = 0

  abstract disabled: boolean

  hovered = false

  pressed = false

  focusVisible = false

  abstract focused: boolean

  @Input()
  @DefaultProp()
  pseudoHovered: boolean | null = null

  @Input()
  @DefaultProp()
  pseudoPressed: boolean | null = null

  @Input()
  @DefaultProp()
  pseudoFocused: boolean | null = null

  /**
   * Determines if component is focusable with keyboard.
   */
  @Input()
  @DefaultProp()
  focusable = true

  @Input()
  @DefaultProp()
  nativeId = ''

  /**
   * Emits 'true' on focus and 'false' on blur.
   */
  @Output()
  readonly focusedChange = new EventEmitter<boolean>()

  @Output()
  readonly pressedChange = new EventEmitter<boolean>()

  @Output()
  readonly hoveredChange = new EventEmitter<boolean>()

  @Output()
  readonly focusVisibleChange = new EventEmitter<boolean>()

  constructor() {
    this.autoIdString = `${MWC}${AbstractFormInteractive.autoId++}${Date.now()}`
  }

  @HostBinding('class._disabled')
  get computedDisabled(): boolean {
    return this.disabled
  }

  @HostBinding('class._hovered')
  get computedHovered(): boolean {
    return !this.computedDisabled && backValue(this.pseudoHovered, this.hovered)
  }

  @HostBinding('class._pressed')
  get computedPressed(): boolean {
    return !this.computedDisabled && backValue(this.pseudoPressed, this.pressed)
  }

  get computedFocusable(): boolean {
    return !this.computedDisabled && (this.focusable || this.focused)
  }

  @HostBinding('class._focused')
  get computedFocused(): boolean {
    return !this.computedDisabled && backValue(this.pseudoFocused, this.focused)
  }

  @HostBinding('class._focus-visible')
  get computedFocusVisible(): boolean {
    return (
      !this.computedDisabled && backValue(this.pseudoFocused, this.focusVisible)
    )
  }

  get id(): string {
    return !!this.nativeId ? this.nativeId : this.autoIdString
  }

  protected updateHovered(hovered: boolean) {
    if (this.hovered === hovered) {
      return
    }

    this.hovered = hovered
    this.hoveredChange.emit(hovered)
  }

  protected updatePressed(pressed: boolean) {
    if (this.pressed === pressed) {
      return
    }

    this.pressed = pressed
    this.pressedChange.emit(pressed)
  }

  protected updateFocused(focused: boolean) {
    this.focusedChange.emit(focused)
  }

  protected updateFocusVisible(focusVisible: boolean) {
    if (this.focusVisible === focusVisible) {
      return
    }

    this.focusVisible = focusVisible
    this.focusVisibleChange.emit(focusVisible)
  }
}

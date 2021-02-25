export type MwcHandler<T, G> = (item: T) => G
export type MwcBooleanHandler<T> = MwcHandler<T, boolean>
export type MwcStringHandler<T> = MwcHandler<T, string>
export type MwcNumberHandler<T> = MwcHandler<T, number>

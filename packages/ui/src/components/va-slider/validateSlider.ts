import { warn } from '../../services/utils'

export const validateSlider = (value: number | number[], step: number, min: number, max: number, range: boolean) => {
  if ((Array.isArray(value) && !range) || (!Array.isArray(value) && range)) {
    warn(`The type "${Array.isArray(value) ? 'array' : typeof value}" of prop "model-value" does not match prop "range = ${range}".`)
  }

  if (max < min) {
    warn('The maximum value can not be less than the minimum value.')
  }

  if (min > max) {
    warn('The minimum value can not be greater than the maximum value.')
  }

  if ((max - min) % step !== 0) {
    warn('Step is illegal. Slider is nondivisible.')
  }

  const inRange = (v: number) => {
    if (v < min) {
      warn(`The value of the slider is ${v}, the minimum value is ${min}, the value of this slider can not be less than the minimum value`)
    } else if (v > max) {
      warn(`The value of the slider is ${v}, the maximum value is ${max}, the value of this slider can not be greater than the maximum value`)
    }
  }

  if (Array.isArray(value)) {
    value.map(inRange)
  } else {
    inRange(value)
  }

  return true
}

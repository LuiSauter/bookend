import { useEffect, useState } from 'react'
import {formatDate} from './useDateTimeFormat'

const isRelativeTimeFormatSupported =
  typeof Intl !== 'undefined' && Intl.RelativeTimeFormat

const DATE_UNITS = [['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60], ['second', 1] ]

export interface ITimeago {
  value: number | number
  unit: string | number
}

const getDateDiffs = (timestamp: number): ITimeago => {
  const now: number = Date.now()
  const elapsed = (timestamp - now) / 1000

  for (const [unitString, secondsInUnit] of DATE_UNITS) {
    const secondsUnit = Number(secondsInUnit)
    const unit = unitString.toString()

    const typeOfUnit = typeof unit
    const typeOfSegUnit = typeof secondsUnit

    if (typeOfUnit === 'string' && typeOfSegUnit === 'number') {
      if (Math.abs(elapsed) > secondsInUnit || unit === 'second') {
        const value = Math.round(elapsed / secondsUnit)
        return { value, unit }
      }
    }
  }
  return {value: Math.round(elapsed), unit: 'second'}
}

export default function useTimeAgo (timestamp: number): string {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))

  useEffect(() => {
    if (isRelativeTimeFormatSupported) {
      const interval = setInterval(() => {
        const newTimeAgo = getDateDiffs(timestamp)
        setTimeago(newTimeAgo)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [timestamp])

  if (!isRelativeTimeFormatSupported) {
    return formatDate(timestamp)
  }

  const rtf = new Intl.RelativeTimeFormat('es', { style: 'short' })
  const rdtf = new Intl.DateTimeFormat('es', { day: 'numeric', month: 'short' })

  const value = Number(timeago?.value)
  const unit = String(timeago?.unit)
  if (typeof value === 'undefined' && typeof unit === 'undefined') return ''
  for (const [unit, time] of DATE_UNITS) {
    const now: number = Date.now()
    const fe = (timestamp - now) / 1000
    const myTime = Number(time)
    if (Math.abs(fe) > time) {
      const value = Math.round(fe / myTime)
      if (unit === 'second') {
        return rtf.format(value, 'second').split('hace')[1]
      } else if (unit === 'minute') {
        return rtf.format(value, 'minute').split('hace')[1]
      } else if (unit === 'hour') {
        return rtf.format(value, 'hour').split('hace')[1]
      } else if (unit === 'day') {
        return rtf.format(value, 'day').split('hace')[1]
      } else if (unit === 'week') {
        return rdtf.format(value)
      }
    }
  }
  return rtf.format(-1, 'second')
}
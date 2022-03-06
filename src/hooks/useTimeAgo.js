import { useEffect, useState } from 'react'

const DATE_UNITS = [
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
  ['second', 1],
]

const months = [
  'Ene',
  'Feb',
  'Mar',
  'Abr',
  'May',
  'Jun',
  'Jul',
  'Ag',
  'Sep',
  'Oct',
  'Nov',
  'Dic',
]

// const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getDateDiffs = (timestamp) => {
  const now = Date.now()
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
  return { value: Math.round(elapsed), unit: 'second' }
}

export default function useTimeAgo(timestamp) {
  const [timeago, setTimeago] = useState(() => getDateDiffs(timestamp))
  const value = Number(timeago?.value)
  const unit = String(timeago?.unit)

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimeAgo = getDateDiffs(timestamp)
      setTimeago(newTimeAgo)
    }, 10000)
    return () => clearInterval(interval)
  }, [timestamp])

  if (typeof value === 'undefined' && typeof unit === 'undefined') {
    return { hourAndMinute: '1s', timeago: '1s' }
  }

  for (const [unit, time] of DATE_UNITS) {
    const now = Date.now()
    const fe = (timestamp - now) / 1000
    const myTime = Number(time)

    if (Math.abs(fe) > time) {
      const value = Math.abs(Math.round(fe / myTime))
      const dayFormat = new Date(timestamp)
      const minute = dayFormat.getMinutes()
      const hour = dayFormat.getHours()
      const day = dayFormat.getDate()
      const month = months[dayFormat.getMonth()]
      const year = dayFormat.getFullYear()
      const dateFormat = `${day} ${month}. ${year}`
      const hourAndMinute = `${hour}:${minute} ${
        hour > 0 && hour < 12 ? 'a. m.' : 'p. m.'
      }  ·  ${dateFormat}`
      if (unit === 'second') {
        return { hourAndMinute, timeago: value + 's' }
      } else if (unit === 'minute') {
        return { hourAndMinute, timeago: value + 'min' }
      } else if (unit === 'hour') {
        return { hourAndMinute, timeago: value + 'hr' }
      } else if (unit === 'day') {
        return { hourAndMinute, timeago: value + 'd' }
      } else if (unit === 'week') {
        const currentYear = new Date()

        if (dayFormat.getFullYear() === currentYear.getFullYear()) {
          return { hourAndMinute, timeago: `${day} ${month}.` }
        } else {
          return { hourAndMinute, timeago: dateFormat.split('20').join('') }
        }
      }
    }
  }
  return { hourAndMinute: '1s', timeago: '1s' }
}

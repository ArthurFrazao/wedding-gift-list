import { useState, useEffect } from 'react'
import { Container } from './styles'

export const COUNTDOWN_DATE = '2023-09-09T16:00:00'

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date()
  const difference = targetDate.getTime() - now.getTime()
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((difference / 1000 / 60) % 60)
  const seconds = Math.floor((difference / 1000) % 60)
  return { days, hours, minutes, seconds }
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const countDownDate = new Date('2023-09-09T16:00:00')
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(countDownDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <div>
        Faltam {timeLeft.days} dias {timeLeft.hours} horas {timeLeft.minutes}{' '}
        minutos e {timeLeft.seconds} segundos
      </div>
    </Container>
  )
}

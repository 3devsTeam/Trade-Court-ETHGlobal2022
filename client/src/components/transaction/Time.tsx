import React from 'react'

interface Props {
  id: string
  time: string
}

export const Time: React.FC<Props> = ({ id, time }) => {
  const date = new Date(time)

  const convertDate = (date: Date) => {
    return `${date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()}.${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }.${date.getFullYear()} ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
    }:${date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()}`
  }

  return (
    <div className="flex flex-col font-bold">
      <span>Created at: {convertDate(date)}</span>
      <span>Order number: {id}</span>
    </div>
  )
}

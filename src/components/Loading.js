import React from 'react'
import { ClockLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className="loading-container">
      <ClockLoader size={50} color="#e2e2e2" />
    </div>
  )
}

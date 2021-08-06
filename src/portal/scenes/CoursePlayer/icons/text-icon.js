import React from 'react'

export default ({ text }) => (
  <g
    stroke="none"
    strokeWidth="1"
    fill="none"
    fillRule="evenodd"
    fontFamily="PS TT Commons Roman, GothamSSm-Medium, Gotham SSm, Arial, sans-serif"
    fontSize="150"
    fontWeight="400"
    letterSpacing="4"
    transform="translate(255 310)"
  >
    <text fill="#FFFFFF" textAnchor="middle">
      <tspan>{text}</tspan>
    </text>
  </g>
)

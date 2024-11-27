import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import '../CSS/Props/Leaderboard.css'

Leaderbaord.propTypes = {
    name: propTypes.string,
    count: propTypes.number
  }

function Leaderbaord(prop) {
  return (
    <div>
        <div className="leaderboard-header">
          <p>Most Point's</p>
        </div>
            <li className="leaderboard-row">
              <div className='leaderboard-items'>
              <p className='counter'>{prop.count}</p>
              <a className='leaderboard-link'href='/Profile'>{prop.name}</a>
              </div>
            </li>
    </div>
  )
}

export default Leaderbaord
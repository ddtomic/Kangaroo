import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'

Leaderbaord.propTypes = {
    name: propTypes.string,
    count: propTypes.number
  }

function Leaderbaord(prop) {
  return (
    <div>
            <li className="leaderboard-row">

                <p className='counter'>{prop.count}.</p>
                <a className='leaderboard-link'href='/Profile'>{prop.name}</a>

            </li>
    </div>
  )
}

export default Leaderbaord
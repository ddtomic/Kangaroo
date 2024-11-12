import React from 'react'
import propTypes from 'prop-types'

LikeNotification.propTypes = {
    name: propTypes.string, 
    date: propTypes.string, 
    user: propTypes.string,
}

function LikeNotification(props){

    return(
        <div>
            <li>
                <div className='liked-container'>
                    <div className='liked-top'>
                        <h4>{props.name}</h4>
                        <h4>{props.date}</h4>
                    </div>
                    <div className="liked-bottom">
                        <h3>{props.user} liked your post!</h3>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default LikeNotification
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
                        <h5>{props.name}</h5>
                        <h5>{props.date}</h5>
                    </div>
                    <div className="liked-bottom">
                        <h5>{props.user} liked your post!</h5>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default LikeNotification
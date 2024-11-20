import React from 'react'
import propTypes from 'prop-types'


CommentNotification.propTypes = {
    name: propTypes.string, 
    date: propTypes.string, 
    user: propTypes.string
}



function CommentNotification(props) {
    return(
        <div>
            <li>
                <div className='commented-container'>
                    <div className='commented-top'>
                        <h4>{props.name}</h4>
                        <h4>{props.date}</h4>
                    </div>
                    <div className="commented-bottom">
                        <h3>{props.user} commented on your post!</h3>
                    </div>
                </div>
            </li>
        </div>
    )
}

export default CommentNotification